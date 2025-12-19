# Delegated Types Pattern - 37signals Architecture

**The core pattern powering Basecamp and HEY content systems.**

Used for 10+ years in Basecamp without requiring a rewrite. Enables treating all content uniformly while maintaining type-specific behavior.

## What Problem Does It Solve?

**Challenge:** You have many content types (messages, documents, comments, uploads, events) that are mostly similar but slightly different.

**Traditional approaches:**
1. **Single Table Inheritance (STI)** - One huge table with all columns for all types
   - Problem: Table grows widthwise, migrations become expensive
   - Problem: Every new type requires modifying the main table

2. **Separate Tables** - Messages table, Documents table, Comments table, etc.
   - Problem: Hard to query across types
   - Problem: Hard to paginate mixed content (timeline view)
   - Problem: Each type needs its own controllers, copiers, exporters

**Delegated types solution:** One lean metadata table (`recordings`) that delegates to specific content tables (`recordables`).

## The Pattern

### Architecture

```
recordings (parent table - lean metadata)
├── recordable_id      # Points to specific content
├── recordable_type    # "Message", "Document", "Comment"
├── creator_id
├── bucket_id          # Container (project, template)
├── parent_id          # Tree structure
├── position
├── color
└── timestamps

recordables (child tables - specific content)
├── messages           # title, content
├── documents          # title, content
├── comments           # body
├── uploads            # file reference
├── events             # starts_at, ends_at
└── ...23 more types
```

### Key Components

**1. Recordings Table (Metadata Only)**
- No text columns, no heavy data
- Just foreign keys, integers, timestamps
- Never grows widthwise
- Fast to query and migrate

**2. Recordable Tables (Content Only)**
- Specific columns per type
- Can vary dramatically (events have `starts_at`, messages don't)
- Adding new types = new table, no migration of existing tables

**3. Immutable Recordables**
- Never update recordables in place
- Create new versions instead
- Enables perfect version history

**4. Events Table (Change Tracking)**
- Links recording to recordable at a point in time
- Enables "what did this look like 3 versions ago?"
- Powers change logs and history views

**5. Tree Structure**
- Recordings organized parent/child
- Message Board → Messages → Comments → Attachments
- All are recordings, different types

## Rails Implementation

### Model Setup

```ruby
# app/models/recording.rb
class Recording < ApplicationRecord
  include Recordables  # The concern that sets up delegated types
  
  belongs_to :bucket
  belongs_to :parent, class_name: "Recording", optional: true
  has_many :children, class_name: "Recording", foreign_key: :parent_id
  
  belongs_to :creator, class_name: "User"
end

# app/models/concerns/recordables.rb
module Recordables
  extend ActiveSupport::Concern
  
  included do
    delegated_type :recordable, types: RECORDABLE_TYPES
  end
end

# app/models/recordable.rb (base module)
module Recordable
  extend ActiveSupport::Concern
  
  # Define capabilities that recordables can opt into
  def commentable? = false
  def exportable? = false
  def copyable? = true
  def subscribable? = false
end

# app/models/message.rb
class Message < ApplicationRecord
  include Recordable
  has_one :recording, as: :recordable, touch: true
  
  # Opt into capabilities
  def commentable? = true
  def exportable? = true
  def subscribable? = true
end

# app/models/document.rb
class Document < ApplicationRecord
  include Recordable
  has_one :recording, as: :recordable, touch: true
  
  def commentable? = true
  def exportable? = true
end
```

### Rails Conveniences

```ruby
# Query by type
Recording.messages           # Only recordings with message recordables
Recording.documents          # Only recordings with document recordables
Recording.comments           # Only recordings with comment recordables

# Access recordable
recording.recordable         # Generic - returns message/document/comment
recording.message            # Specific - returns message or raises
recording.document           # Specific - returns document or raises

# Tree navigation
recording.children           # All child recordings
recording.children.comments  # Only comment children
recording.parent             # Parent recording
```

## The Power: Uniform Operations

### Generic Controllers

```ruby
# ONE controller for archiving ANY type
class RecordingsController < ApplicationController
  def create
    @recording = Recording.create!(recording_params)
  end
  
  def destroy
    @recording = Recording.find(params[:id])
    @recording.destroy
  end
end

class Recordings::ArchivalsController < ApplicationController
  def create  # Archive ANY recording type
    @recording = Recording.find(params[:recording_id])
    @recording.archive
  end
end
```

No separate `DocumentsController`, `MessagesController`, `CommentsController` for archiving/trashing/restoring.

### Efficient Copying

```ruby
# Copying a message = create new recording row pointing to same recordable
source_recording = Recording.find(123)
new_recording = Recording.create!(
  recordable: source_recording.recordable,  # Same content!
  bucket: target_bucket,
  creator: Current.user
)
```

**Benefits:**
- Instant (no content duplication)
- Storage efficient (one message recordable, many recordings)
- Demo projects: thousands of accounts, one set of content

### Mixed-Type Queries with Pagination

```ruby
# Timeline: messages, documents, comments, uploads mixed together
# Single query, single ORDER BY, works with LIMIT/OFFSET
@timeline_items = current_account
  .recordings
  .where(recordable_type: ["Message", "Document", "Comment", "Upload"])
  .order(created_at: :desc)
  .limit(50)
  
# Then load recordables in batches per type
@timeline_items.each do |recording|
  recording.recordable  # Efficient with preload
end
```

### Version History

```ruby
# Because recordables are immutable
class Document < ApplicationRecord
  def update_content(new_content)
    # Don't update in place - create new version
    new_version = Document.create!(
      title: self.title,
      content: new_content
    )
    
    # Update recording to point to new version
    recording.update!(recordable: new_version)
    
    # Track change in events
    recording.events.create!(
      action: "updated",
      recordable: new_version,
      creator: Current.user
    )
  end
end

# Show version history
recording.events.each do |event|
  event.recordable  # The document as it looked at that moment
end

# Revert to old version
old_event = recording.events.find(event_id)
recording.update!(recordable: old_event.recordable)
```

### Caching

```ruby
# Cache at recording level, not recordable level
<% cache recording do %>
  <%= render recording.recordable %>
<% end %>

# Invalidate: just touch the recording
recording.touch  # Busts cache for any type
```

### API Responses

```ruby
# Mobile apps get ONE API endpoint
GET /recordings?since=2024-01-01

# Returns mixed types - mobile can handle generically
# New types added = no mobile app update needed
```

## When to Use Delegated Types

**Good fit:**
- Content management systems (Basecamp, Notion-style apps)
- Timeline/feed features with mixed content
- When you need uniform operations across types
- When copying/moving content frequently
- When you want efficient pagination of mixed types

**Not a good fit:**
- Types are fundamentally different (User vs Payment)
- No need for mixed queries
- Types don't share common operations

## Comparison to Alternatives

| Approach | Table Growth | Query Performance | New Type Cost | Copying |
|----------|--------------|-------------------|---------------|---------|
| **Single Table Inheritance** | Grows widthwise with every type | Fast (one table) | Expensive (migrate big table) | Slow (duplicate content) |
| **Separate Tables** | Each table separate | Slow (UNION queries) | Cheap (new table) | Slow (duplicate content) |
| **Delegated Types** | Parent stays lean | Fast (one parent query) | Cheap (new table) | Instant (just metadata) |

## Trade-offs

**Advantages:**
- ✅ Scalable (10+ years without rewrite in Basecamp)
- ✅ Adding new types is trivial
- ✅ Uniform interface for all content
- ✅ Efficient copying and version history
- ✅ Mixed-type queries and pagination
- ✅ Small team can maintain large codebase

**Disadvantages:**
- ❌ Higher learning curve
- ❌ Less intuitive than "rich model" approach
- ❌ Recordable-specific behavior needs context passed in
- ❌ N+1 by design (mitigated with preload)
- ❌ Not standard Rails convention (less familiar to new devs)

## Architecture in Practice

### Basecamp Structure

```
Bucket (delegated type)
├── Project (bucketable)
├── Template (bucketable)
└── Ping (bucketable)

Recording (delegated type)
├── Message (recordable)
├── Document (recordable)
├── Comment (recordable)
├── Upload (recordable)
├── Event (recordable)
├── Todo (recordable)
├── Card (recordable)
└── ...23 more types

Event (change tracking)
├── records who/when
└── points to recordable version
```

**Access control:** Through buckets
- Bucket has accesses (users)
- Users can see all recordings in bucket
- Recordables have no access logic

**Navigation:** Through tree
- Message Board (recording)
  - Message (recording)
    - Comment (recording)
      - Attachment (recording)

### HEY Calendar Structure

```
Calendar (bucket)

Recording (with calendar-specific metadata)
├── starts_at   # On the recordings table!
├── ends_at     # Because ALL calendar items need these
└── recordable

Recordables:
├── Event
├── Countdown
├── Todo
├── CircledDay
└── ...
```

**Key difference:** When ALL types need certain fields, put them on the recordings table (starts_at, ends_at for calendar items).

## Migration Path

### Starting Fresh
1. Create `recordings` table (lean, just metadata)
2. Define recordable types (messages, documents, etc.)
3. Add `delegated_type :recordable` to Recording
4. Build features generically from day one

### Migrating Existing App

**From separate tables:**
```ruby
# Old: messages table with all metadata + content
# New: recordings table (metadata) + messages table (content only)

Message.find_each do |message|
  # Create recordable (content only)
  recordable = Message.create!(
    title: message.title,
    content: message.content
  )
  
  # Create recording (metadata only)
  Recording.create!(
    recordable: recordable,
    creator_id: message.creator_id,
    created_at: message.created_at,
    # ...other metadata
  )
end
```

**From STI:**
```ruby
# Old: one huge table with all columns
# New: recordings + specific recordable tables

LegacyContent.find_each do |content|
  # Extract type-specific content
  recordable = case content.type
  when "Message"
    Message.create!(title: content.title, body: content.body)
  when "Document"
    Document.create!(title: content.title, content: content.content)
  # ...
  end
  
  # Create recording with shared metadata
  Recording.create!(
    recordable: recordable,
    creator_id: content.creator_id,
    # ...shared metadata
  )
end
```

## DHH Quote

> "You can build entirely new features that should take months in like a week, two weeks. We've been running this architecture for 10 years."

## Resources

- Rails API: `ActiveRecord::DelegatedType`
- Rails Guides: Active Record Associations
- RECORDABLES video episode (37signals Dev)
- Based on 10+ years of production use in Basecamp and HEY
