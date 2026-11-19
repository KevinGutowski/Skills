---
tags: [react]
max_turns: 20
timeout_seconds: 600
allowed_tools: [Read, Glob, Grep, Skill, Write, Edit, Bash]
---

This route handler is slow when one chat is slow: no author lookup starts until every chat has loaded. Rewrite `loadAuthors` so each author lookup starts as soon as its own chat is ready. Keep the handler's error handling working: if any lookup fails, the handler must still return the 502.

```ts
async function loadAuthors(chatIds: string[]) {
  const chats = await Promise.all(chatIds.map(id => getChat(id)))
  const authors = await Promise.all(chats.map(chat => getUser(chat.author)))
  return authors
}

export async function GET(req: Request) {
  try {
    const authors = await loadAuthors(parseIds(req))
    return Response.json(authors.map(a => a.name))
  } catch {
    return new Response('upstream failed', { status: 502 })
  }
}
```
