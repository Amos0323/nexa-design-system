# Manual Figma preparation

> Publication update: [Nexa Figma design](https://www.figma.com/design/dOGqmnvbpkcCjZDKagTMVH) is now supplied. Metadata confirms Cover and Foundations frames on page 00 Cover & Foundations. The specifications below originated before that file was supplied; component/node bindings, visual parity and designer sign-off remain unverified. Treat creation instructions as a reconciliation checklist for the existing file.

This document originally specified the manual Figma build; a design file has since been supplied (see above). This is the build specification for the next manual design step; do not mark it complete until the actual file has been reviewed. No Code Connect or token-import integration is configured.

## 1. Create the file and pages

Create a Figma Design file named **Nexa Design System** with these pages:

| Page           | Create manually                                                                                                                              |
| -------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| 00 Cover       | Name, purpose, owners, version, implementation status, link to this repository and real Storybook deployment when available                  |
| 01 Foundations | Color swatches in both modes; typography specimens; spacing/radius scales; elevation samples with token-vs-MUI distinction; breakpoint rules |
| 02 Components  | Component sets and documentation frames for the mapped React APIs                                                                            |
| 03 Patterns    | Loading, Empty, Error, Skeleton (card/table/metric), Application Shell                                                                       |
| 04 Templates   | Reusable enterprise page layout with navigation, breadcrumbs, metrics and a data region                                                      |
| 05 Examples    | Learning Administration populated, loading, empty and error screens; Light/Dark and responsive examples                                      |

## 2. Create and bind variables/styles

Follow the exact names/values in [token-mapping.md](token-mapping.md). Create Primitives COLOR variables for the 14 raw colors and NUMBER variables for spacing, radius, weights, sizes and sidebar width. Create Semantic COLOR roles with Light/Dark modes; alias to primitives where available and enter explicit semantic status values where no primitive exists. Document breakpoints as layout references.

Create Typography/H1, H2, H3, Body1, Body2 and Button text styles after inspecting the resolved metrics. Record the concrete installed font used for comparison. Create the token shadow effect styles as **available but not globally applied**; create separate MUI elevation styles only for levels actually used, from resolved theme values. Bind components to semantic colors and text styles, not copied hex values. Review both modes before proceeding.

## 3. Build component sets

Use [component-mapping.md](component-mapping.md) for exact prop names and supported values. Create Button, Text Field, Select, Checkbox, Radio Group (with radio item), Switch, Card, Alert, Status Badge, Dialog, Date Picker, Pagination, Sidebar, Top Bar, Breadcrumbs, Data Grid and Metric Card. Create the feedback/shell patterns on page 03.

For each set, add relevant appearance, size and state properties. Use text properties for labels and instance swaps for icons. Make Light/Dark a variable mode rather than duplicating every variant. Include normal/hover/focus/pressed/disabled/selected/error/loading states where meaningful; document states that are automatic in code. Do not create unsupported props such as Checkbox indeterminate or Dialog secondaryAction.

Use auto layout, resizing constraints and realistic long text. Annotate focus and keyboard behavior separately from visual variants. Build the grid header/cell/status/toolbar/empty/error regions as a composition, while keeping the React mapping at NexaDataGrid rather than promising a separate public component per internal layer.

## 4. Create the example and handoff evidence

Use the [Learning Administration brief](examples/learning-admin-handoff.md). Create 320/390/768/1024/1440px frames, theme examples, the mobile drawer open state, and loading/empty/error examples. Annotate the 600px and 1200px transitions, grid scrolling, date filtering, selection and simulated refresh. Use the same sample data to make comparison meaningful.

Add real file/node links and design version to [traceability](implementation-traceability.md), plus available Storybook links as implementation references. Walk through [the checklist](dev-mode-checklist.md) in Dev Mode with a developer. Compare at matching viewports/fonts/themes, resolve differences, and record designer/developer/QA acceptance. Only then describe the file as an implemented and reviewed Figma library. Publishing it to a team library is a separate explicit design-team step.
