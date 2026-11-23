import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react'
import { Avatar, Badge, Bar, BrandMark, Button, Card, Connector, Count, Divider, Icon, Meter, Row, Stage, Stream, Text, Window, useReducedMotion } from '../../kit'
import type { Act, BrandName, Layout, Rect } from '../../kit'
import './relay-bento.css'

// The features section of Relay, a shared support inbox, on a white page in
// a 1000px column. Started from examples/bento: the same tile frame, type
// sizes, one Stage per tile at 1:1, and copy as page HTML beside it.
//
// The tile list, written before any tile was built:
//
//   Tile          Span   Kind        The one thing                         Moves
//   Inbox         2 × 1  Hero UI     one conversation, a teammate on it    Replying arrives on the row
//   SLA           1 × 1  Stat        "4 min", on the one dark tile         counts down from 15
//   Assign        1 × 1  Diagram     a billing ticket routed to one of 3   the lines draw in
//   Drafts        1 × 1  Component   the drafted reply and its Send        the reply writes in
//   Integrations  1 × 1  Collection  app marks running off the corner      the marks settle in
//
// Checked against references/bento.md: two of five tiles are UI (the hero
// and the draft card); one hero; one window in the grid (the hero's); every
// neighbor is a different kind, across and down; no name, string or mark
// appears in two tiles; the stat and its unit share a line and sit directly
// under their lead, with the SLA meter closing the tile's foot.

const STEP = 110
const LEAD = 450

// Relay's look: one warm accent, handed to every Stage as tokens.
const LOOK = { '--ss-accent': '#e5482d', '--ss-accent-soft': '#fdebe6', '--ss-accent-text': '#b3351c' }

type Beat = { on: boolean }
const before: Beat = { on: false }
const after: Beat = { on: true }
const beat = (i: number) => async (a: Act<Beat>) => {
  await a.wait(LEAD + i * STEP)
  await a.set({ on: true })
}

function Tile({ area, title, children, picture, dark }: { area: string; title: ReactNode; children?: ReactNode; picture?: ReactNode; dark?: boolean }) {
  return (
    <section className={`rb-tile rb-tile--${area}`} data-dark={dark || undefined} data-crop>
      {title ? (
        <p className="rb-copy">
          {title} {children}
        </p>
      ) : (
        children
      )}
      {picture}
    </section>
  )
}

// The tile owns the crop. Match its current width so an inner Stage never
// slices a window before the tile edge or shifts its content off the copy gutter.
function usePictureWidth() {
  const ref = useRef<HTMLDivElement>(null)
  const [width, setWidth] = useState(340)
  useLayoutEffect(() => {
    const node = ref.current
    if (!node) return
    const measure = () => setWidth(Math.max(1, node.getBoundingClientRect().width))
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(node)
    return () => observer.disconnect()
  }, [])
  return [ref, width] as const
}

/* ---------------- Inbox (hero) ---------------- */

const CONVERSATIONS = [
  { from: 'Marta Kowalski', subject: 'Change of delivery address', time: '1m', owner: 'Noor' },
  { from: 'Amara Diallo', subject: 'Charged twice for one order', time: '4m', owner: 'Leo', live: true },
  { from: 'Theo Lambert', subject: 'Promo code not applying', time: '12m', owner: 'Omar' },
]

// What the crop cuts: the rows that follow, as filler
const MORE = [
  { name: 92, line: 148, rest: 118 },
  { name: 74, line: 126, rest: 136 },
]

function Conversations({ on }: { on: boolean }) {
  return (
    <div className="rb-list">
      {CONVERSATIONS.map((c) => (
        <Row key={c.from} pad={10} selected={c.live} lead={<Avatar name={c.from} size={32} />} title={<Text>{c.from}</Text>} subtitle={<Text>{c.subject}</Text>}>
          <span className="rb-trail">
            <span className="rb-owner">
              <Avatar name={c.owner} size={20} />
              {c.live && (
                <Badge tone="accent" dot className="rb-live" data-on={on || undefined}>
                  Replying
                </Badge>
              )}
            </span>
            <Text className="rb-time">{c.time}</Text>
            <span className="rb-rest">
              <Bar w={20} h={20} r={10} tone={2} />
              <Bar w={136} h={6} tone={2} />
            </span>
          </span>
        </Row>
      ))}
      {MORE.map((m, i) => (
        <Row key={i} pad={10} lead={<Bar w={32} h={32} r={16} tone={2} />} title={<Bar w={m.name} h={6} tone={3} />} subtitle={<Bar w={m.line} h={6} tone={2} />}>
          <span className="rb-trail">
            <span className="rb-owner">
              <Bar w={20} h={20} r={10} tone={2} />
            </span>
            <Bar w={22} h={6} tone={2} className="rb-time" />
            <span className="rb-rest">
              <Bar w={20} h={20} r={10} tone={2} />
              <Bar w={m.rest} h={6} tone={2} />
            </span>
          </span>
        </Row>
      ))}
    </div>
  )
}

function Mailbox({ on, layout }: { on: boolean; layout: Layout }) {
  if (layout !== 'wide') {
    return (
      <Window title="Inbox" className="rb-window rb-window--compact" body={{ 'data-crop': '' }}>
        <Conversations on={on} />
      </Window>
    )
  }
  return (
    <Window
      className="rb-window"
      body={{ 'data-crop': '' }}
      title="Inbox"
      toolbar={
        <span className="rb-tools">
          <Bar w={54} h={24} r={7} tone={2} />
          <Bar w={24} h={24} r={7} tone={2} />
        </span>
      }
      sidebarWidth={156}
      sidebar={
        <nav className="rb-side">
          {[46, 72, 58, 64, 40].map((w, i) => (
            <span key={i} className="rb-nav" data-active={i === 0 || undefined}>
              <Bar w={12} h={12} r={3} tone={i === 0 ? 4 : 2} />
              <Bar w={w} h={6} tone={i === 0 ? 4 : 2} />
            </span>
          ))}
          {/* The team, under the views: filler the tile crops */}
          <span className="rb-nav-rule" />
          {[62, 48, 70].map((w, i) => (
            <span key={w} className="rb-nav">
              <Bar w={16} h={16} r={8} tone={2} />
              <Bar w={w} h={6} tone={2} />
            </span>
          ))}
        </nav>
      }
    >
      <Conversations on={on} />
    </Window>
  )
}

function Inbox() {
  const [picture, width] = usePictureWidth()
  return (
    <Tile
      area="hero"
      title={<b>One inbox, the whole team.</b>}
      picture={
        <div ref={picture} className="rb-picture rb-picture--aligned">
          <Stage<Beat> width={width} height={width < 600 ? 300 : 286} initial={before} poster={after} play="once" script={beat(0)} tokens={LOOK} className="rb-stage">
            {(s, _rect, layout) => <Mailbox on={s.on} layout={width < 600 ? 'compact' : layout} />}
          </Stage>
        </div>
      }
    >
      See who is on a conversation before two of you answer it.
    </Tile>
  )
}

/* ---------------- SLA (stat) ---------------- */

// Type, not a picture: page text in the tile, with one number that counts
// down once as the grid scrolls in.
function useInView<T extends Element>(delay: number) {
  const ref = useRef<T>(null)
  const [seen, setSeen] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    let t = 0
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      io.disconnect()
      t = window.setTimeout(() => setSeen(true), delay)
    }, { threshold: 0.4 })
    io.observe(el)
    return () => {
      io.disconnect()
      clearTimeout(t)
    }
  }, [delay])
  return [ref, seen] as const
}

const TARGET = 15
const REPLY = 4

function Sla() {
  const reduced = useReducedMotion()
  const [ref, seen] = useInView<HTMLDivElement>(LEAD + STEP)
  const done = seen || reduced
  return (
    <Tile area="stat" dark title={null}>
      <div ref={ref} className="rb-stat">
        <span className="rb-stat-lead">First reply in</span>
        <span className="rb-stat-number">
          <Count value={done ? REPLY : TARGET} duration={1100} />
          <span className="rb-stat-unit"> min</span>
        </span>
        <span className="rb-stat-label">the median, with a timer on every conversation.</span>
        <span className="rb-timer">
          <span className="rb-timer-row">
            <span>SLA target</span>
            <span className="rb-timer-value">{TARGET}:00</span>
          </span>
          <Meter value={done ? REPLY / TARGET : 1} className="rb-meter" />
        </span>
      </div>
    </Tile>
  )
}

/* ---------------- Assign (diagram) ---------------- */

const TEAM = [
  { name: 'Priya', picked: true },
  { name: 'Tomás' },
  { name: 'Wen' },
]

function Assign() {
  const [picture, width] = usePictureWidth()
  return (
    <Tile
      area="assign"
      title={<b>Routed, not dumped.</b>}
      picture={
        <div ref={picture} className="rb-picture rb-picture--aligned">
          <Stage<Beat> width={width} height={206} initial={before} poster={after} play="once" script={beat(2)} tokens={LOOK} className="rb-stage">
            {(s, rect) => {
              const right = (r: Rect) => ({ x: r.x + r.width, y: r.y + r.height / 2 })
              const left = (r: Rect) => ({ x: r.x, y: r.y + r.height / 2 })
              const from = rect('ticket')
              return (
                <>
                  <span className="rb-node rb-ticket" data-target="ticket">
                    <Icon name="mail" filled size={14} />
                    <Text>Billing</Text>
                  </span>
                  <div className="rb-team">
                    {TEAM.map((p) => (
                      <span key={p.name} className="rb-node rb-person" data-target={`p-${p.name}`} data-picked={(p.picked && s.on) || undefined}>
                        <Avatar name={p.name} size={22} />
                        <Text>{p.name}</Text>
                      </span>
                    ))}
                  </div>
                  {from &&
                    [...TEAM].reverse().map((p) => {
                      const to = rect(`p-${p.name}`)
                      return to ? (
                        <Connector key={p.name} from={right(from)} to={left(to)} route="step" show={s.on} dots={p.picked ? 'end' : 'none'} className={p.picked ? 'rb-line rb-line--picked' : 'rb-line'} />
                      ) : null
                    })}
                </>
              )
            }}
          </Stage>
        </div>
      }
    >
      Rules send each ticket to the person who owns the topic.
    </Tile>
  )
}

/* ---------------- Drafts (component) ---------------- */

const REPLY_TEXT = 'Hi Hannah, your replacement charger shipped this morning and should reach you by Friday.'
const REPLY_WORDS = REPLY_TEXT.split(' ').length

function Drafts() {
  const [picture, width] = usePictureWidth()
  return (
    <Tile
      area="draft"
      title={<b>A reply, already drafted.</b>}
      picture={
        <div ref={picture} className="rb-picture rb-picture--aligned">
          <Stage<Beat> width={width} height={206} initial={before} poster={after} play="once" script={beat(3)} tokens={LOOK} className="rb-stage">
            {(s) => (
              <Card lift pad="medium" gap={12} className="rb-draft">
                <Text className="rb-draft-source">Drafted from your past replies</Text>
                <Stream text={REPLY_TEXT} count={s.on ? REPLY_WORDS : 0} className="rb-draft-body" />
                <div className="rb-draft-actions">
                  <Button variant="primary">Send</Button>
                  <Button>Edit</Button>
                </div>
                <Divider />
                <div className="rb-draft-quote" aria-hidden>
                  <Bar w={178} h={6} tone={2} />
                  <Bar w={132} h={6} tone={2} />
                </div>
              </Card>
            )}
          </Stage>
        </div>
      }
    >
      Written from your own answers, yours to edit and send.
    </Tile>
  )
}

/* ---------------- Integrations (collection) ---------------- */

// Real marks from the kit's registry, on a grid that runs off the tile's
// right and bottom edges. The whole ones lead; the cut ones are the "and more",
// and no mark that is a letter or a number sits where the edge would cut it.
// This tile's copy is a line shorter, so its Stage is taller: one gap under the copy.
const MARK = 66
const PITCH = 84
const MARKS: BrandName[][] = [
  ['slack', 'gmail', 'shopify', 'linear'],
  ['notion', 'github', 'zoom', 'figma'],
  ['google-sheets', 'dropbox', 'google-drive', 'google-meet'],
]

function Integrations() {
  const [picture, width] = usePictureWidth()
  return (
    <Tile
      area="apps"
      title={<b>Works where you work.</b>}
      picture={
        <div ref={picture} className="rb-picture rb-picture--aligned">
          <Stage<Beat> width={width} height={230} initial={before} poster={after} play="once" script={beat(4)} tokens={LOOK} className="rb-stage">
            {(s) => (
              <div className="rb-marks" data-on={s.on || undefined}>
                {MARKS.map((row, r) =>
                  row.map((brand, c) => (
                    <span key={brand} className="rb-mark" style={{ left: c * PITCH, top: r * PITCH, transitionDelay: `${(r + c) * 45}ms` }}>
                      <BrandMark brand={brand} size={MARK} width={MARK} />
                    </span>
                  )),
                )}
              </div>
            )}
          </Stage>
        </div>
      }
    >
      Tickets in from chat, email and your store.
    </Tile>
  )
}

export default function RelayBento() {
  return (
    <div className="relay-bento">
      <div className="rb-grid">
        <Inbox />
        <Sla />
        <Assign />
        <Drafts />
        <Integrations />
      </div>
    </div>
  )
}
