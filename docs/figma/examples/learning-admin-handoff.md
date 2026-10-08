# Learning Administration: handoff example

> Publication update: [Nexa Figma design](https://www.figma.com/design/dOGqmnvbpkcCjZDKagTMVH) is now supplied. Metadata confirms Cover and Foundations frames on page 00 Cover & Foundations. The specifications below originated before that file was supplied; component/node bindings, visual parity and designer sign-off remain unverified. Treat creation instructions as a reconciliation checklist for the existing file.

## Evidence status

This is a retrospective handoff specification derived from the existing implementation, not a claim that a designer supplied a Figma screen. Implemented: React composition, theme, components, stories and tests. Pending: Figma variables/component sets/example frames, Dev Mode inspection, visual comparison and designer/QA approval. Figma reference: see the publication update above; reviewed design version remains pending.

## Design requirement

A learning administrator needs a quick view of total learners, active courses, completion rate, overdue learning, and a learner table with statuses, search and filtering. The current showcase presents 1,284 learners, 42 active courses, 86% completion, and 117 overdue items. These organization-level figures are illustrative and deliberately not calculated from the 24 sample rows. Label that distinction in the design.

## Design interpretation and component selection

Use NexaAppShell for stable navigation and the page landmark; NexaTopBar/NexaSidebar are composed within it. NexaBreadcrumbs establishes context. Four NexaMetricCards communicate the summary with text labels and optional trends. NexaDataGrid compares Employee ID, Name, Department, Course, Status, Completion, and Due date. Status cells use NexaStatusBadge: Completed/success, In progress/info, Overdue/error, Not started/neutral. A NexaDatePicker filters due dates; an outlined NexaButton triggers a simulated refresh.

The grid toolbar supplies search, column controls, filters and export through MUI. Keep the existing community feature set and single-criterion filter/sort contract. Do not draw premium grouping or pinned-column features as if they were already implemented.

## Responsive decisions to annotate in Figma

| Width/rule       | Implemented decision                                                                                  |
| ---------------- | ----------------------------------------------------------------------------------------------------- |
| Below 600px      | One metric column; content padding 16px; stacked records heading/action                               |
| 600–1199px       | Two metric columns; content padding 24px; modal navigation drawer                                     |
| 1200px and above | Four metric columns; 256px persistent sidebar; content padding 32px                                   |
| All widths       | Metrics gap 16px; grid height 32rem; date-control max width 22rem; main content min-width 0           |
| Heading          | 32px below 600px, 40px from 600px; semantic h1 with inherited H1 weight/line height                   |
| Narrow grid      | Columns scroll internally; pagination remains reachable; some footer text is hidden to preserve space |

Create example frames at 320, 390, 768, 1024 and 1440px, plus notes at the actual transitions. Show the drawer open as well as closed. The 24-row grid is virtualized; do not equate the number of visible rows with total records. At small widths, internal horizontal scrolling is a deliberate compromise, not document overflow. A future mobile detail view is outside this example.

## Accessibility decisions

Use one main landmark, a skip link, ordered headings, real navigation links, current-page semantics, and labels for icon controls. Preserve MUI grid arrow-key behavior and calendar date sections. The drawer traps focus, accepts Escape, and restores its trigger; the close button receives initial focus. Provide visible status text so meaning is not color-only. Associate date helper/validation text. Mark the grid's surrounding region busy during loading and announce selection count. Use existing focus indicators and reduced-motion behavior.

Plan manual screen-reader, high-contrast and zoom/reflow checks with the designer/QA. A static Figma prototype cannot verify DOM roles or focus restoration.

## Implementation decisions

The composition lives in [EnterpriseShowcase.tsx](../../../src/demo/EnterpriseShowcase.tsx); typed sample data and columns live in [enterpriseData.tsx](../../../src/demo/enterpriseData.tsx). It is lazy-loaded from App.tsx, with no router/backend/authentication. Tokens and the theme are retained. The date picker stores Dayjs or null; filtering compares local calendar days inclusively. Clearing the date restores the unfiltered date range. Search and column filtering then operate on the supplied rows. Selection remains consumer-observed via the MUI model.

Refresh waits 450ms locally; it is not a network request. Loading, Empty and Error stories make otherwise transient states reviewable. The standalone NexaPagination is not used inside the grid: MUI owns its footer and zero-based pagination model.

## Testing performed and acceptance still required

Phase 3 recorded 75 passing unit tests, 10 passing browser tests, light/dark axe scans without violations in scanned states, responsive checks at the five widths, and builds/lint/type/format checks. Phase 4 reruns validation after adding documentation. See the [traceability matrix](../implementation-traceability.md) for the exact tests and known coverage gaps.

Tests cover grid sort/search/page/selection, empty/error/loading feedback, date validation and keyboard editing, drawer focus, calendar opening/closing, and theme contrast. They do not establish Figma visual parity; cross-component date filtering and full filter-menu interactions still require explicit manual acceptance.

When reviewing the supplied file, compare the same data, viewport, theme, font and state. Record each difference as expected platform variation, implementation defect, or design-system change request. Acceptance record fields: real node/version link; code revision; story ID; viewport/theme/font; screenshots; keyboard/screen-reader findings; deviation owner; designer/developer/QA decision and date. All Figma review/sign-off fields are currently pending.
