---
tags: [react]
max_turns: 20
timeout_seconds: 600
allowed_tools: [Read, Glob, Grep, Skill, Write, Edit, Bash]
---

Add a "scheduled message" mode to this component: it should show a date-time picker above the footer and a "Schedule" button instead of "Send". React 19, no React Compiler.

```tsx
type Props = {
  onSubmit: (text: string) => void
  isThread?: boolean
  isDMThread?: boolean
  isEditing?: boolean
  isForwarding?: boolean
  isReadOnly?: boolean
  showAttachments?: boolean
  showFormatting?: boolean
  channelId?: string
  dmId?: string
}

export function Composer(props: Props) {
  const [text, setText] = useState('')
  return (
    <form onSubmit={() => props.onSubmit(text)}>
      {!props.isEditing && <Header />}
      <Input value={text} onChange={setText} readOnly={props.isReadOnly} />
      {props.isDMThread ? <AlsoSendToDM id={props.dmId} />
        : props.isThread ? <AlsoSendToChannel id={props.channelId} /> : null}
      <Footer>
        {props.showAttachments && <Attachments />}
        {props.showFormatting && <Formatting />}
        {props.isEditing ? <EditActions />
          : props.isForwarding ? <ForwardActions /> : <SendButton />}
      </Footer>
    </form>
  )
}
```
