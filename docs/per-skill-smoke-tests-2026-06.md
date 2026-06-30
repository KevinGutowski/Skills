# Per-Skill Smoke Tests

Purpose: one representative routing prompt per local skill. These are smoke tests, not full task-completion evals. A passing result means the skill's description and boundaries are strong enough that a fresh judge should pick the intended first skill from the available metadata.

Packet builder: `python3 scripts/build_skill_smoke_packet.py`
Checker: `python3 -B scripts/check_skill_smoke_tests.py`

## Test Matrix

| ID | Expected first skill | Prompt | Notes |
| --- | --- | --- | --- |
| S01 | `ai-experience-design` | Design the UX for an AI triage feature that suggests next actions, shows calibrated confidence without raw percentages, and lets users correct bad suggestions. | AI product UX, not coding-agent rules. |
| S02 | `apple-design` | Audit an iOS settings screen against current Apple design guidance, including navigation, search, visual accessibility, Liquid Glass, and App Intents entry points. | Apple HIG/design router. |
| S03 | `building-in-public` | Plan the first month of build-in-public posts for an indie side project, starting from a rough prototype and turning product learning into audience growth. | Indie maker/audience loop. |
| S04 | `client-work` | A client keeps asking for unlimited revisions after scope approval; help me price the next phase, reset feedback rules, and decide whether to walk away. | Client design work and scope. |
| S05 | `creating-skills` | Turn a source article, recurring PR review comments, and a few accepted examples into a reusable Claude skill with references and tests. | Skill authoring and source conversion. |
| S06 | `creative-coding` | Build a p5.js sketch with flocking particles, noise-driven color variation, and interactive sliders for generative art exploration. | Procedural/generative visuals. |
| S07 | `data-viz` | Choose and critique charts for comparing retention cohorts over time, avoiding misleading axes and chartjunk while preserving readable annotations. | Chart selection and integrity. |
| S08 | `design-craft` | This dashboard feels off; polish the spacing, shadows, radii, motion, and typography, then propose a small quality ritual to keep regressions from shipping. | Interface feel plus quality ritual. |
| S09 | `design-org-influence` | My PM rejected the redesign as "too much craft"; help me reframe the business case, opportunity cost, and stakeholder pitch. | Design buy-in and influence. |
| S10 | `design-principles` | Critique whether this feature supports user agency, responsibility, simplicity, craft, and delight before we add more settings. | High-level design principles. |
| S11 | `design-prototyping` | Plan a fake-it prototype and feedback session for a risky product idea before engineering builds the production version. | Prototype validation and review. |
| S12 | `design-systems` | Define semantic tokens, theming governance, adoption metrics, and an AI codegen context pack for a multi-brand design system. | Design system governance and AI context. |
| S13 | `devtools` | Design onboarding, command palette behavior, docs entry points, and OSS positioning for a new developer tool. | Developer-facing product design. |
| S14 | `dhh` | Do a DHH-style review of this Rails diff and call out over-engineering, unnecessary abstraction, and framework misuse. | Named persona review. |
| S15 | `feature-discoverability` | Users never find a hidden gesture in our app; decide whether to use TipKit, visible affordances, first-launch hints, or a different IA. | Feature discovery and hints. |
| S16 | `frontend-design` | Build a distinctive production-grade web app screen that avoids generic AI aesthetics and has polished visual direction. | Frontend generation. |
| S17 | `goal` | /goal Keep this thread focused on shipping the settings refactor, and warn me if I drift into unrelated redesign work. | Goal command and drift guard. |
| S18 | `graphics-fundamentals` | Explain why a blurred gradient looks banded on one display but smooth on another, covering color spaces, rasterization, and compression. | Mechanism backstop. |
| S19 | `hardware-product-design` | Design a wearable hardware enclosure, choose the primary input method, plan prototypes, and identify manufacturing tolerance risks. | Physical product design. |
| S20 | `learning-experience-design` | Design a workshop and job aid that help support reps adopt a new escalation process, with practice, feedback, and transfer checks. | Training and behavior change. |
| S21 | `logo-design` | Create a logo concept for a small coffee brand using brand nouns, many sketch directions, and a black-and-white presentation. | Logo/identity method. |
| S22 | `malleable-software` | Design a product surface that users can reshape for their own workflow, including editable structure, plugins, and AI-assisted changes. | End-user-resculptable software. |
| S23 | `motion` | Add a Motion spring animation to this React component, compare easing options, and check for jank with MotionScore. | Motion/Framer Motion tooling. |
| S24 | `notification-design` | Design a push notification strategy and permission flow that avoids fatigue, handles grouping, and works well on Apple Watch. | Notification strategy. |
| S25 | `people-management` | I am a new manager with an underperforming direct report; plan the next 1:1, feedback conversation, and career-growth follow-up. | Direct-report management. |
| S26 | `photographic-lighting` | Plan a product photo lighting setup for a glossy object, avoiding glare and unwanted reflections with family-of-angles tests. | Photo lighting. |
| S27 | `product-decision-making` | Decide whether this should be a setting, a smarter default, an onboarding step, or a feature we do not build, using metrics and product judgment. | Product decision tradeoff. |
| S28 | `rails` | Fix a Rails app with a slow Turbo page, N+1 queries, a risky migration, and Sidekiq jobs that fail in production. | Rails/Ruby router. |
| S29 | `research-cataloging` | Do an exhaustive source sweep for an old course: Wayback captures, OCR, captions, provenance ledger, and transcript readiness before conversion. | Research/archive router. |
| S30 | `route-planning` | Optimize the order for a multi-stop delivery route and explain why the current waypoint order backtracks. | Route optimization. |
| S31 | `shape-up` | Shape this product idea into a six-week pitch with appetite, fat-marker scope, risks, and betting-table framing. | Shape Up process. |
| S32 | `swiftui` | Debug a SwiftUI view with @State resets, LazyVStack scroll stutter, gesture hit-target issues, and a spring transition. | SwiftUI implementation craft. |
| S33 | `user-onboarding` | Design the empty dashboard, first-run setup path, and welcome copy for a new user who has no imported data yet. | First-run and empty state. |
| S34 | `user-research` | Write a research plan, screener, and field guide to decide whether interviews or a usability test will answer our product question. | Research planning. |
| S35 | `ux-writing` | Rewrite the validation error, settings labels, button text, and plan-name microcopy so the UI is clearer and less scary. | UI words and microcopy. |
| S36 | `web-design` | Tune CSS typography, forms, accessibility states, OKLCH colors, and animation values for a responsive web page. | Web/CSS craft decisions. |
| S37 | `working-with-ai` | Write AGENTS.md rules and a multi-agent review loop for coding agents working in our repo without leaking secrets or inventing standards. | Teams using AI/coding agents. |
| S38 | `write-clear-prose` | Line edit this essay for clarity, rhythm, structure, and plain language while preserving the author's voice. | Long-form prose. |
| S39 | `x-post-reader` | Read this public x.com status URL and summarize the tweet plus the author's recent related posts. | Public X post reader. |
