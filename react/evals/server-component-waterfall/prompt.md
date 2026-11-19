---
tags: [react]
max_turns: 20
timeout_seconds: 600
allowed_tools: [Read, Glob, Grep, Skill, Write, Edit, Bash]
---

Our Next.js App Router dashboard takes about 2 seconds before anything shows. Each of these calls is roughly 400 ms. Make it faster.

```tsx
// app/dashboard/page.tsx
export default async function DashboardPage() {
  const session = await auth()
  const config = await fetchConfig()
  const projects = await fetchProjects(session.user.id)
  const activity = await fetchActivity(session.user.id)
  const billing = await fetchBilling(session.user.id)

  return (
    <Shell config={config}>
      <ProjectList projects={projects} />
      <ActivityFeed activity={activity} />
      <BillingPanel billing={billing} />
    </Shell>
  )
}
```
