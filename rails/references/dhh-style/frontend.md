# Frontend - DHH Rails Style

## Contents

- [Turbo Patterns](#turbo-patterns)
- [Action Text / Rich Text](#action-text--rich-text)
- [HTML+ERB Templates](#htmlerb-templates)
- [Stimulus Controllers](#stimulus-controllers)
- [CSS Architecture](#css-architecture)
- [View Patterns](#view-patterns)

## Turbo Patterns

**Turbo Streams** for partial updates:
```erb
<%# app/views/cards/closures/create.turbo_stream.erb %>
<%= turbo_stream.replace @card %>
```

**Morphing** for complex updates:
```ruby
render turbo_stream: turbo_stream.morph(@card)
```

**Fragment caching** with `cached: true`:
```erb
<%= render partial: "card", collection: @cards, cached: true %>
```

**No ViewComponents** - standard partials work fine.

## Action Text / Rich Text

Lexxy 1.0 is the stable 37signals/Basecamp direction for richer editing: tables,
markdown, live syntax highlighting, and extensible features on top of Meta's
Lexical toolkit. It already powers Basecamp, Fizzy, and Campfire, and is planned
as the next Rails default. For new applications or standard Action Text setups,
prefer Lexxy; Rails 8.2 can opt in with `config.action_text.editor = :lexxy`.

When replacing Trix, test existing content through the complete
save-render-re-edit round trip. Keep canonical Action Text attachment markup
compatible, update sanitizer allowlists for Lexxy's additional elements, and
exercise legacy attachment and embed forms rather than testing only new content.
Use Playwright for real clipboard, keyboard, focus, and multi-browser behavior;
reserve Rails system coverage for the persistence and rendering boundary.

Sources: https://dev.37signals.com/lexxy-1-0/ and
https://github.com/basecamp/once-campfire/pull/224

For rich-text attachments, keep visible captions and accessibility descriptions
separate. Pass explicit `alt` text through Action Text attachments when the image
conveys content; do not infer alt text from filenames, and do not force screen
reader descriptions to appear as visible captions.

Treat rich-text toolbars and their menus as real composite widgets. Keep arrow
navigation inside the active toolbar or menu, make Escape return focus
predictably, expose disabled controls with `aria-disabled`, use
`menuitemradio`/`menuitemcheckbox` with `aria-checked` for selectable options,
and label color swatches by both color and purpose. Hide decorative icons from
the accessibility tree so controls are announced once by name.

Source: https://github.com/basecamp/lexxy/pull/1173

## HTML+ERB Templates

Rails 8.2 defaults HTML+ERB templates to Herb, which parses HTML and ERB as one
syntax tree and reports structural errors such as unclosed tags at compile time.
Before adopting the 8.2 framework defaults, run `bin/rails herb:check`; it
compiles every HTML+ERB template through Herb, reports failing paths, and exits
non-zero so CI can gate the migration.

Fix the reported templates before switching. If a staged upgrade needs more
time, temporarily keep `config.action_view.erb_implementation = :erubi` rather
than discovering incompatibilities only when request paths render them.

Sources: https://github.com/rails/rails/pull/58721 and
https://github.com/rails/rails/pull/58770

## Stimulus Controllers

52 controllers in Fizzy, split 62% reusable, 38% domain-specific.

**Characteristics:**
- Single responsibility per controller
- Configuration via values/classes
- Events for communication
- Private methods with #
- Most under 50 lines

**Examples:**

```javascript
// copy-to-clipboard (25 lines)
import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static values = { content: String }

  copy() {
    navigator.clipboard.writeText(this.contentValue)
    this.#showFeedback()
  }

  #showFeedback() {
    this.element.classList.add("copied")
    setTimeout(() => this.element.classList.remove("copied"), 1500)
  }
}
```

```javascript
// auto-click (7 lines)
import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  connect() {
    this.element.click()
  }
}
```

```javascript
// toggle-class (31 lines)
import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static classes = ["toggle"]
  static values = { open: { type: Boolean, default: false } }

  toggle() {
    this.openValue = !this.openValue
  }

  openValueChanged() {
    this.element.classList.toggle(this.toggleClass, this.openValue)
  }
}
```

```javascript
// dialog (64 lines) - for modal dialogs
// local-save (59 lines) - localStorage persistence
// drag-and-drop (150 lines) - the largest, still reasonable
```

## CSS Architecture

Vanilla CSS with modern features, no preprocessors.

**CSS @layer** for cascade control:
```css
@layer reset, base, components, modules, utilities;

@layer reset {
  *, *::before, *::after { box-sizing: border-box; }
}

@layer base {
  body { font-family: var(--font-sans); }
}

@layer components {
  .btn { /* button styles */ }
}

@layer modules {
  .card { /* card module styles */ }
}

@layer utilities {
  .hidden { display: none; }
}
```

**OKLCH color system** for perceptual uniformity:
```css
:root {
  --color-primary: oklch(60% 0.15 250);
  --color-success: oklch(65% 0.2 145);
  --color-warning: oklch(75% 0.15 85);
  --color-danger: oklch(55% 0.2 25);
}
```

**Dark mode** via CSS variables:
```css
:root {
  --bg: oklch(98% 0 0);
  --text: oklch(20% 0 0);
}

@media (prefers-color-scheme: dark) {
  :root {
    --bg: oklch(15% 0 0);
    --text: oklch(90% 0 0);
  }
}
```

**Native CSS nesting:**
```css
.card {
  padding: var(--space-4);

  & .title {
    font-weight: bold;
  }

  &:hover {
    background: var(--bg-hover);
  }
}
```

**~60 minimal utilities** vs Tailwind's hundreds.

**Modern features used:**
- `@starting-style` for enter animations
- `color-mix()` for color manipulation
- `:has()` for parent selection
- Logical properties (`margin-inline`, `padding-block`)
- Container queries

## View Patterns

**Standard partials** - no ViewComponents:
```erb
<%# app/views/cards/_card.html.erb %>
<article id="<%= dom_id(card) %>" class="card">
  <%= render "cards/header", card: card %>
  <%= render "cards/body", card: card %>
  <%= render "cards/footer", card: card %>
</article>
```

**Fragment caching:**
```erb
<% cache card do %>
  <%= render "cards/card", card: card %>
<% end %>
```

**Collection caching:**
```erb
<%= render partial: "card", collection: @cards, cached: true %>
```

**Simple component naming** - no strict BEM:
```css
.card { }
.card .title { }
.card .actions { }
.card.golden { }
.card.closed { }
```
