# Backgrounding Work

## Contents
- When to background
- Idempotency
- Job design patterns
- Background job processors
- Memory and reliability

## Why This Matters

Every millisecond your Rails controller spends talking to Stripe, sending an email, or generating a PDF is a millisecond the user is staring at a spinner. Worse, external services have unpredictable latency — a Stripe call that usually takes 200ms might take 3 seconds when their API is slow. By moving this work to background jobs, your response times become fast and predictable, and your app stays resilient when third-party services degrade.

## When to Background

Move work out of the request/response cycle when:

| Condition | Example |
|-----------|---------|
| Contacts external service over network | Sending email, Stripe charges, API calls |
| Always takes > 150% of average response time | PDF generation, video transcoding |
| User doesn't need the result immediately | Welcome emails, analytics processing |
| Work can be retried independently | File processing, data imports |

```ruby
# Bad: email blocks the response
class User < ApplicationRecord
  after_commit :send_signup_email

  def send_signup_email
    UserMailer.signup_email(self).deliver  # blocks!
  end
end

# Good: email sent asynchronously
class User < ApplicationRecord
  after_commit :send_signup_email

  def send_signup_email
    UserMailer.signup_email(self).deliver_later
  end
end
```

Backgrounding decreases average response times and makes them more predictable. This improves scalability per Little's Law.

## Idempotency

**Every background job must be safe to run twice.** Background processors guarantee "at-least-once" delivery, not "exactly-once."

```ruby
# Bad: sends duplicate emails if run twice
class UserSignupMailJob < ApplicationJob
  def perform(user)
    UserMailer.signup_email(to: user).deliver
  end
end

# Good: checks if work was already done
class UserSignupMailJob < ApplicationJob
  around_perform do |job, block|
    user = job.arguments.first
    user.with_lock do
      return if user.signup_email_sent?
      if block.call
        user.update!(signup_email_sent: true)
      end
    end
  end

  def perform(user)
    UserMailer.signup_email(to: user).deliver
  end
end
```

The `with_lock` block prevents two workers from processing the same user simultaneously. The `signup_email_sent?` check prevents duplicate work.

**Naturally idempotent operations** don't need guards: setting `car.color = "red"` produces the same result regardless of how many times it runs.

## Job Design Patterns

### Keep jobs small

Jobs should do one unit of work. Small jobs = predictable execution time = efficient worker utilization.

```ruby
# Bad: one giant job processing 10,000 records
class ProcessAllUsersJob < ApplicationJob
  def perform
    User.find_each { |user| process(user) }  # blocks one worker for minutes
  end
end

# Good: fan out to individual jobs
class EnqueueUserProcessingJob < ApplicationJob
  def perform
    User.find_each { |user| ProcessUserJob.perform_later(user.id) }
  end
end

class ProcessUserJob < ApplicationJob
  def perform(user_id)
    process(User.find(user_id))  # fast, parallelizable
  end
end
```

### Separate queues by execution time

Jobs in the same queue should have roughly similar execution times. Don't mix 10-second video transcoding jobs with 100ms email jobs—the slow jobs will block the fast ones.

```ruby
class TranscodeVideoJob < ApplicationJob
  queue_as :slow
  def perform(video_id); end
end

class SendEmailJob < ApplicationJob
  queue_as :default
  def perform(user_id); end
end
```

### Set aggressive timeouts

Network timeouts should be short. If a job fails due to timeout, it'll be retried automatically.

```ruby
class ApiSyncJob < ApplicationJob
  def perform(record_id)
    # Use library-specific timeouts, NOT Ruby's Timeout module
    response = HTTP.timeout(connect: 5, read: 10).get(url)
  end
end
```

Ruby's `Timeout` module is unreliable—always use timeouts built into the HTTP/database library.

### Handle failures

Every job should have a plan for failure:

```ruby
class ImportJob < ApplicationJob
  retry_on Net::ReadTimeout, wait: :polynomially_longer, attempts: 5
  discard_on ActiveRecord::RecordNotFound

  def perform(record_id)
    record = Record.find(record_id)
    record.with_lock do
      # Work inside a transaction so partial failures roll back
      import(record)
    end
  end
end
```

Set up exception notifications so you're alerted when jobs fail repeatedly (not on every single failure—transient failures are normal).

## Background Job Processors

| Processor | Backend | Threading | Best For |
|-----------|---------|-----------|----------|
| **SolidQueue** | Database | Multi-threaded | Rails 8+/37signals-style apps, no Redis needed |
| **Sidekiq** | Redis | Multi-threaded | Very high throughput or existing Redis/Sidekiq systems |
| **Que** | PostgreSQL | Advisory locks | High reliability requirements |
| **Resque** | Redis | Multi-process | Legacy apps |

Start with **Solid Queue** for Rails 8 apps when simplicity and transactional
reliability matter more than raw queue throughput. Use **Sidekiq** when measured
job volume, latency targets, or existing infrastructure justify Redis-backed
throughput.

### Scaling workers

Use Little's Law: `Workers needed = Avg job time × Jobs enqueued/sec`

Scale based on **queue depth**, not job execution time. A small queue backlog is fine for background work—unlike web requests, jobs don't need immediate completion.

## Memory Considerations

Background jobs are especially prone to memory bloat:

1. Job loads thousands of AR objects → process memory balloons
2. GC frees the objects but Ruby doesn't return memory to OS
3. Process appears to use hundreds of MB permanently

**Fix:** Use `find_each` with batch limits in jobs:

```ruby
# Bad: loads everything at once
User.where(needs_sync: true).each { |u| sync(u) }

# Good: loads in batches
User.where(needs_sync: true).find_each(batch_size: 100) { |u| sync(u) }
```

Sidekiq especially aggravates fragmentation due to its multi-threaded nature. Use jemalloc with Sidekiq.

## Reliability vs Performance

| Approach | Reliability | Speed |
|----------|------------|-------|
| Redis-backed (Sidekiq) | At-least-once, jobs can be lost on crash | Very fast |
| Sidekiq Pro (super_fetch) | Better reliability with blocking pop/push | Fast |
| Database-backed (Que, SolidQueue) | ACID-compliant, highly reliable | Slower |

If a lost job would cause real harm (financial transactions, critical notifications), use a database-backed queue or Sidekiq Pro. In Rails 8 apps, Solid Queue is the default database-backed option to consider before adding Redis.

### Colocation

Your queue backend (Redis, Postgres) must be in the same datacenter as your application. Network latency of 50-80ms per job operation adds up fast with thousands of jobs.
