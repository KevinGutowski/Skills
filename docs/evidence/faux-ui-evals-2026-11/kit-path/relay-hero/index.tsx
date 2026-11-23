import { Avatar, Badge, Bar, Button, Icon, Menu, Popover, Row, Stage, Text, Toast, Window, type Act, type Layout, type Point } from '../../kit'
import './relay.css'

// Relay, a shared support inbox: the hero beside the landing page's headline.
// Beats: the agent opens Assign on the selected ticket, picks a teammate, the
// button and the ticket's row take her avatar and a toast confirms it. The
// payoff holds, then Undo on the toast puts the ticket back, so the loop
// resets with a cause.
//
// Framing: hero-demo's stage (720 x 340, one 32px gutter, the window off the
// bottom), on a transparent stage because the page is white. The menu hangs
// from the button's right edge and the customer's words stop short of it, so
// its edge only ever crosses blank surface.
//
// Real strings: the inbox and its three top tickets, the customer's message,
// Assign, the three teammates, the toast. Everything else is placeholder.

type S = { menu: boolean; assigned: boolean; toast: boolean }

const initial: S = { menu: false, assigned: false, toast: false }

// The still is the payoff: the ticket assigned, the toast still up
const poster: S = { menu: false, assigned: true, toast: true }

const SUBJECT = 'Charged twice'
const CUSTOMER = 'Noah Kim'
const TEAM = ['Leo Park', 'Maya Chen', 'Priya Shah']
const PICK = 1
const MATE = TEAM[PICK]

type Ticket = { from: string; subject: string; time: string; who?: string } | { bars: [number, number, number] }

const TICKETS: Ticket[] = [
  { from: 'Ana Souza', subject: 'Update billing email', time: '9:58', who: TEAM[0] },
  { from: CUSTOMER, subject: SUBJECT, time: '9:41' },
  { from: 'Tom Becker', subject: 'CSV export fails', time: '9:12', who: TEAM[2] },
  { bars: [62, 118, 22] },
  { bars: [74, 96, 22] },
]
const STORY = 1

// The cursor rests on blank surface beside the thread, where the menu's
// middle row opens: it is already there when the pick is made
const REST: Record<Layout, Point> = { wide: { x: 636, y: 118 }, compact: { x: 299, y: 100 } }
const MENU: Record<Layout, number> = { wide: 160, compact: 140 }

async function script(a: Act<S>) {
  await a.wait(1200)

  // 1. Open the assign control on the selected ticket
  a.mark('open')
  await a.click({ at: 'assign', x: 0.5, y: 0.72 })
  await a.set({ menu: true })
  await a.wait(900)

  // 2. Down to a teammate, and pick her
  a.mark('pick')
  await a.move({ at: `mate-${PICK}`, x: 0.78, y: 0.6 })
  await a.wait(600)
  await a.click()

  // 3. The menu goes; the button and the ticket's row take her avatar, then
  //    the toast confirms it
  await a.set({ menu: false, assigned: true })
  await a.wait(450)
  await a.set({ toast: true })
  a.mark('hold')
  await a.wait(2800)

  // 4. Undo on the toast: the cause of the reset
  a.mark('undo')
  await a.click({ at: 'undo', x: 0.8, y: 0.78 })
  await a.set({ toast: false, assigned: false })
  await a.wait(1500)
  await a.move('rest')
  await a.wait(900)
}

export default function RelayHero() {
  return (
    <Stage<S> width={720} height={340} compact={{ below: 600, width: 358, height: 340 }} initial={initial} poster={poster} script={script} cursor={{ at: REST }} className="rl">
      {(s, rect, layout) => {
        const wide = layout === 'wide'
        const button = rect('assign')
        const status = (
          <Badge tone="success" dot className="rl-status">
            Open
          </Badge>
        )
        return (
          <>
            <Window
              className="rl-window"
              sidebar={wide ? <Tickets assigned={s.assigned} /> : undefined}
              sidebarWidth={232}
              title={wide ? SUBJECT : undefined}
              lead={wide ? status : undefined}
              toolbar={
                <Button
                  className="rl-assign"
                  data-target="assign"
                  data-open={s.menu || undefined}
                  icon={s.assigned ? <Avatar name={MATE} size={18} /> : undefined}
                  trailingIcon={<Icon name="chevron-down" size={14} />}
                >
                  {s.assigned ? MATE : 'Assign'}
                </Button>
              }
              body={{ className: 'rl-body', 'data-crop': true }}
            >
              <div className="rl-thread">
                {!wide && (
                  <div className="rl-subject">
                    <Text>{SUBJECT}</Text>
                  </div>
                )}
                <Row
                  className="rl-message"
                  lead={<Avatar name={CUSTOMER} size={28} />}
                  title={CUSTOMER}
                  subtitle="noah@fernhill.co"
                  preview="I was charged twice for March. Can you refund one?"
                />
                {/* The reply so far, as filler: it runs off the bottom */}
                <Row
                  lead={<Avatar size={28} />}
                  title={<Bar w={68} tone={4} />}
                  subtitle={<Bar w={104} tone={2} />}
                  preview={[318, 286, 330, 302, 322, 244, 310, 268]}
                />
              </div>
            </Window>

            <Popover show={s.menu} origin="top right" className="rl-menu" style={{ left: button.x + button.width - MENU[layout], top: button.y + button.height + 6, width: MENU[layout] }}>
              <Menu
                items={TEAM.map((name) => (
                  <>
                    <Avatar name={name} size={18} />
                    <Text>{name}</Text>
                  </>
                ))}
                targets={TEAM.map((_, i) => `mate-${i}`)}
              />
            </Popover>

            <Toast
              show={s.toast}
              className="rl-toast"
              action={
                <Button variant="ghost" size="small" className="rl-undo" data-target="undo">
                  Undo
                </Button>
              }
            >
              {`Assigned to ${MATE}`}
            </Toast>

            <span data-target="rest" style={{ position: 'absolute', left: REST[layout].x, top: REST[layout].y }} />
          </>
        )
      }}
    </Stage>
  )
}

/** The inbox: three real tickets round the story, placeholders off the crop.
 *  Each row trails its assignee; the story's row has none until it is given one. */
function Tickets({ assigned }: { assigned: boolean }) {
  return (
    <>
      <div className="rl-inbox">
        <Text>Inbox</Text>
      </div>
      <div className="rl-list">
        {TICKETS.map((t, i) =>
          'bars' in t ? (
            <Row key={i} pad={10} title={<Bar w={t.bars[0]} tone={4} />} subtitle={<Bar w={t.bars[1]} tone={2} />} meta={<Bar w={t.bars[2]} tone={2} />}>
              <Avatar size={20} />
            </Row>
          ) : (
            <Row key={i} pad={10} selected={i === STORY} title={t.from} subtitle={t.subject} meta={t.time}>
              {i === STORY ? <Avatar name={MATE} size={20} className="rl-who" data-show={assigned || undefined} /> : <Avatar name={t.who} size={20} />}
            </Row>
          ),
        )}
      </div>
    </>
  )
}
