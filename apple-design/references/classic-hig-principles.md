# Classic HIG Principles

*Scope: Durable doctrine from the local Apple Books copies of Apple's 2014 iOS and OS X Human Interface Guidelines. Use for historical rationale, platform mental models, modality, feedback, standard-control semantics, Mac keyboard/help conventions, and why current HIG rules exist. For exact current specs, always check [hig.md](hig.md).*

Sources: Apple Inc., *iOS Human Interface Guidelines* (2014, local EPUB `877942287.epub`, extracted to `/tmp/books/ios-human-interface-guidelines-2014.txt`) and Apple Inc., *OS X Human Interface Guidelines* (2014, local EPUB `930571558.epub`, extracted to `/tmp/books/osx-human-interface-guidelines-2014.txt`).

## Current-HIG Boundary

Use this file for principles that survive redesigns: content-first UI, clarity, depth as hierarchy, direct manipulation, user control, standard semantic controls, Mac menu/keyboard/help discipline, and feedback. Do **not** use it as the source of current metrics, component appearances, iOS-7/Yosemite visual styling, 3D Touch, old typography, deprecated OS X APIs, or present-day Liquid Glass behavior. Current letter-of-law lives in [hig.md](hig.md); Liquid Glass specifics live in [liquid-glass-design-system.md](liquid-glass-design-system.md).

## iOS 2014: Deference, Clarity, Depth

- **Deference:** Apple named the content-first rule directly: "The UI helps people understand and interact with the content, but never competes with it." Translate this today as: chrome earns its place only when it clarifies state, navigation, or action.
- **Clarity:** legible text, precise icons, subtle adornment, functional focus. The lasting move is not "flat design"; it is pruning decoration until the content and available actions read immediately.
- **Depth:** visual layers and motion communicate hierarchy, origin, and return path. Depth is an information system, not a decorative shadow system. If motion or glass does not explain where something came from, what layer it occupies, or how to get back, it is probably garnish.
- **Customization test:** customize only when it helps the task. If a custom control performs a standard action, first ask whether a standard control plus tint/appearance changes solves it. If behavior must be custom, make it visibly non-standard enough that users do not misapply standard expectations.

## Enduring Design Principles

- **Aesthetic integrity:** appearance and behavior must fit the app's purpose; this is not a beauty contest. Serious tools earn trust through restraint and predictable behavior; immersive experiences can justify stronger atmosphere because exploration is part of the task.
- **Consistency:** consistency is transfer of learning, not slavish copying. Check three layers: Apple-platform conventions, internal terminology/icons/behaviors, and continuity with prior app versions where users have built habits.
- **Direct manipulation:** prefer acting on objects over operating remote controls for those objects. The payoff is engagement plus visible causality: drag, pinch, rotate, reorder, scrub, and manipulate where the thing lives when that fits the task.
- **Feedback:** feedback acknowledges action, shows result, and reports progress. Put status where it belongs in the UI instead of interrupting; use sound only as a secondary channel.
- **Metaphor:** use a metaphor to suggest use, not to inherit physical-world limitations. The metaphor should help the first minute, then disappear into the task.
- **User control:** "People—not apps—should initiate and control actions." The app may suggest, warn, and prevent accidental harm, but users need chances to cancel before commitment, confirm destructive operations, and stop work already underway.

## Navigation, Modality, and Onboarding

- **Navigation shape follows content shape.** Hierarchical, flat, and content-driven navigation are different information structures. Mixing is acceptable when one top-level area contains a deeper hierarchy; the test is whether the path is logical, predictable, and easy to follow.
- **One path by default.** If a screen must appear in multiple contexts, consider a temporary view instead of duplicating navigation paths. This keeps "where am I?" and "how do I get back?" answerable.
- **Modality is a tax.** Use it when attention is critical or a self-contained task must be completed/abandoned to avoid ambiguous data. Keep modal work short, narrow, and easy to exit; avoid modal hierarchies that become a mini app.
- **Alerts interrupt, so they must earn interruption.** Reserve them for essential, actionable information. If the user cannot act, prefer inline status, passive feedback, or a normal view.
- **Onboarding is last resort:** first make the core action discoverable; onboarding cannot compensate for a confusing app design. If onboarding remains necessary, make it brief, skippable, remembered, and timed to the task.

## Mac-Specific Doctrine

- **Mac apps are windows plus the system menu bar.** Unlike iOS, Mac apps have persistent menus, multiple windows, keyboard accelerators, drag-and-drop, Help, and document state. Do not port iOS structure straight across; choose a Mac app style: single-window utility, single-window shoebox, or multiwindow document app.
- **Least restrictive modality.** Prefer the narrowest mode that solves the problem: document-modal sheet before app-wide lockout. Make modes visible, easy to leave, and autosave work done inside them.
- **Feedback starts immediately.** Acknowledge input and commands as soon as possible; fast feedback makes the app feel responsive. Show partial results for long work; do not leave the window blank until completion.
- **Drag-and-drop is a contract.** Preserve inactive-window selections when users may drag from them; show drag images, badges for multi-item drags, destination highlighting, insertion indicators, and zoomback/confirmation for failed or non-undoable drops.
- **Keyboard shortcuts are scarce.** "If you can't find a unique and easy-to-use keyboard shortcut for a command, don't use one at all." Respect system shortcuts, use Command as the primary modifier, reserve Shift-Command for complementary commands, use Option sparingly, and avoid Control except when necessary.
- **Help should use platform channels.** Do not build a custom help viewer for a frustrated user. Use Help menu, contextual Help where available, and help tags/tooltips for element-level hints. Tooltip copy starts with the action, names only the hovered element, uses sentence-style capitalization, and should "Use the fewest words possible."

## Standard Controls and System Images

- Prefer standard controls when they perform standard actions: users understand them, accessibility comes for free or cheaper, and system redesigns update them.
- Never use system icons by visual resemblance alone. System-provided images have semantic meanings; if the meaning does not match, design your own. This rule is older than SF Symbols and still applies to them.
- Avoid mixing UI styles from different OS eras. In modern terms: do not combine old custom chrome, pre-Liquid-Glass bars, and current system materials in one surface unless the contrast is intentionally scoped and tested.
- Custom UI has a higher burden: it must be internally consistent, explain itself, preserve accessibility, and avoid overshadowing the content it exists to serve.

## Relationship to Other Apple References

- [hig.md](hig.md) — fetch current specs and component rules; use it to override this historical file.
- [apple-navigation-design.md](apple-navigation-design.md) — current navigation, tab/sidebar, menu/action-sheet, iPad, and pointer routing.
- [liquid-glass-design-system.md](liquid-glass-design-system.md) — current 2025+ material, shape, toolbar, tab, and scroll-edge guidance.
- [ios-brand-identity.md](ios-brand-identity.md) — modern iOS brand/customization guidance; this file supplies the older content-first and standard-control rationale.
- [apple-visual-accessibility.md](apple-visual-accessibility.md) — current accessibility settings and platform split.
- `swiftui` — implementation details for windows, commands, keyboard shortcuts, drag/drop, gestures, materials, and accessibility APIs.
