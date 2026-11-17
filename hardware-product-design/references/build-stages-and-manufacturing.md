# Build Stages and Manufacturing Depth

Read this when planning a hardware program end to end: sequencing prototypes into builds, writing part specs, reviewing samples, choosing finishes, or scheduling certification. Part 1 is drawn from the sources in [sources.md](sources.md). Part 2 is a general-practice checklist that the sources do not cover; it is labelled as such and needs checking against the actual factory, product category, and market.

## Contents

- Part 1: What the sources support
  - The prototype ladder
  - Spec and sample discipline
  - Yield, churn, and money
- Part 2: General-practice checklist (not from the sources)
  - Build stages: EVT, DVT, PVT
  - DFM and tolerances
  - CMF
  - Certification gotchas
- How to use the two parts together

## Part 1: What the sources support

### The prototype ladder

The talks describe a consistent order. Each rung answers one question and unblocks the next. Quotes for each rung are in the SKILL.md "Prototype physical things" section.

| Rung | Question it answers | Source example |
|---|---|---|
| Non-functional mockup | Does the object feel right, and where do inputs and sensors sit? | Humane's first model, which did nothing |
| Primitive capability demo | Does the riskiest signal exist at all? | Humane's banana-calories demo; Augmental's on-or-off detector |
| Ugly cabled rig | Can software start now, in parallel with enclosures? | Humane's "Iron Man" rig |
| Test jig | Can electronics and sensing iterate without fabricating the enclosure each time? | Augmental's dev board with the "licker pad" |
| Capability ladder | Can the proven signal grow into the product-grade input? | Augmental: detector, then 3×3 grid, then trackpad |
| True-context model | Does it work at the real distance, angle, and lighting? | Jae Park's foam-core Echo Show at 10 feet |
| Factory samples | Does the factory build what the spec says? | Fellow's sample reviews; Work Louder's keycaps |

Rule: do not skip a rung because a later one is more exciting. The sources' failures (keycaps that "sprung off the keyboard", a gray batch that should have been matte black) are late-rung failures of spec and sample review, not of concept.

### Spec and sample discipline

- **The spec is the only quality gate.** Manufacturers "would be happy to make anything for us, even if it was riddled with mistakes" (Work Louder).
- **Write deviations as numbers.** Fellow's specs state the surface grade and "the exact percent deviation you're allowed". A spec that says "high quality finish" cannot be failed, so it cannot be enforced.
- **Review samples and dictate the process** with suppliers (Fellow). Quality is an engineering process with the factory, not an inspection at the end.
- **One supplier per part, not one manufacturer for everything** (Work Louder), so one failure does not restart the whole program.

### Yield, churn, and money

- **Yield work is invisible and takes schedule.** Tome: a part redesigned so "99% of them now come out of the factory instead of 95".
- **Parts come and go.** A component maker can stop making a part; plan for substitutions as well as revisions (Tome).
- **Gate on unit economics before tooling** and bound inventory (Work Louder: priced to cover mistakes and future development, with an explicit break-even count).
- **Own the defect recovery plan.** The factory's offer was 10% off the next order (Work Louder).

## Part 2: General-practice checklist (not from the sources)

Everything in Part 2 is **general hardware practice written for this reference. It is not drawn from the talks in `sources.md` and carries no source attribution.** Stage names, quantities, and exit criteria vary by company and contract manufacturer. Use it as a list of questions to ask, then confirm answers with the mechanical engineer, the factory, and a test lab.

### Build stages: EVT, DVT, PVT

| Stage | Purpose | Typical exit question |
|---|---|---|
| Prototype (pre-EVT) | Prove the concept and architecture with rigs, jigs, and printed or machined parts. | Is the riskiest capability proven and the architecture frozen enough to build boards and enclosures together? |
| EVT (engineering validation test) | First builds that combine works-like and looks-like. Validate function against the spec. | Does every function work on integrated units? Are the known issues listed with owners? |
| DVT (design validation test) | Units from production-intent tooling and processes. Run reliability, environmental, and certification testing on these. | Does the design pass tests on parts made the production way? Is the design frozen? |
| PVT (production validation test) | Run the real line at intended speed with real operators, fixtures, and packaging. | Are yield, cycle time, and test coverage at target? Could these units be sold? |
| MP (mass production) | Ramp and sustain. | Is yield holding, and is there a process for changes and part substitutions? |

Checks:

- [ ] Each stage has written exit criteria agreed before the build, not after.
- [ ] Changes after DVT are treated as expensive: they can invalidate tooling, test results, and certification.
- [ ] Software has a build to run on at every stage (the sources' rig rule, carried forward).
- [ ] Factory test fixtures and test software are designed alongside the product, not at PVT.

### DFM and tolerances

- [ ] The process is chosen before the form is final (injection moulding, CNC, die casting, sheet metal each constrain geometry differently).
- [ ] For moulded parts: draft angles, uniform wall thickness, undercuts, parting lines, gate and ejector marks, and sink over ribs and bosses reviewed with the toolmaker.
- [ ] The factory's DFM report is read and answered line by line; each accepted compromise is recorded.
- [ ] Tolerances are set from function (fit, seal, feel), and a stack-up is done for every assembly where parts mate. Tighter than needed costs money; looser than needed fails in assembly.
- [ ] Critical dimensions are marked on the drawing and measured on samples; first-article inspection reports are requested.
- [ ] Finishes are included in the stack-up: paint, plating, and anodising add or remove thickness.
- [ ] Assembly is designed: part count, fastener types, orientation, access for tools, and rework or repair path.

### CMF

CMF is colour, material, finish.

- [ ] Each visible part has a named colour reference, material grade, and finish or texture standard, not a screen colour.
- [ ] Signed physical masters exist: a golden sample plus limit samples showing the lightest, darkest, and worst acceptable defect.
- [ ] Colour is judged under agreed lighting, and across materials that must match (the same colour on plastic and metal rarely matches without work).
- [ ] Cosmetic acceptance criteria are written per surface class (primary face, secondary, hidden).
- [ ] Finish durability is tested for the use: abrasion, sweat, sunscreen, UV, cleaning agents.

Source link: the Work Louder gray-instead-of-matte-black batch is what a missing colour master and limit sample looks like.

### Certification gotchas

Regulatory requirements depend on product category, market, and date. **Do not treat this list as compliance advice.** Confirm with an accredited test lab or regulatory specialist; `coverage-gaps.md` keeps regulatory and safety advice parked for this reason.

- [ ] Target markets are listed early; each has its own radio, EMC, safety, and materials rules.
- [ ] Any radio (Bluetooth, Wi-Fi, cellular) triggers radio certification. A pre-certified module reduces the work; it rarely removes it, and antenna or enclosure changes can reopen it.
- [ ] Batteries bring transport testing, shipping restrictions, and safety standards. Ask the cell or pack supplier for existing reports.
- [ ] Medical, assistive, child-directed, and body-worn products carry extra regimes and long lead times.
- [ ] A pre-compliance scan is run on EVT or early DVT units, so failures surface while the design can still change.
- [ ] Formal testing is done on production-intent units; later hardware changes may require retest.
- [ ] Lab lead times, sample quantities, and label or manual requirements are in the schedule and the packaging design.

## How to use the two parts together

1. Place the project on the prototype ladder (Part 1). If a rung is unproven, build that before planning builds.
2. Use Part 2 to draft stage gates and questions for the factory and the lab. Mark each answer as confirmed or assumed.
3. Feed costs and yield assumptions back into the unit-economics gate in SKILL.md "Manufacturing reality".
