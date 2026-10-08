# Nexa Design System

[![CI](https://github.com/Amos0323/nexa-design-system/actions/workflows/ci.yml/badge.svg)](https://github.com/Amos0323/nexa-design-system/actions/workflows/ci.yml)

An enterprise React design system portfolio project demonstrating Front-End / UX Developer skills: typed UI architecture, Material UI theming, responsive design, accessibility, testing, and documentation.

## Current scope

Phases 1–3 provide the original ten components, twelve enterprise components, and a Learning Administration composition. Phase 4 adds Figma handoff specifications and a Storybook guide without changing runtime components or design tokens. It remains a source-level library, not a published package. LearningOps, micro-frontends, authentication, backend persistence, and publishing remain out of scope.

## Technology

React 19, TypeScript 6 (strict mode), Vite 8, MUI 9, Emotion, MUI Icons, MUI X Community Data Grid and Date Pickers, Day.js, Storybook 10, Vitest, React Testing Library, ESLint, Prettier, and GitHub Actions. Exact resolved versions are recorded in package-lock.json.

## Getting started

Use Node.js 24 LTS (specified in .nvmrc and CI) and npm. No environment variables, credentials, API keys, backend, or database are required.

```sh
git clone https://github.com/Amos0323/nexa-design-system.git
cd nexa-design-system
npm ci
npm run dev
```

Open the local URL printed by Vite. For foundations and component documentation, run `npm run storybook` and open http://localhost:6006.

## Scripts

| Command                   | Purpose                                                            |
| ------------------------- | ------------------------------------------------------------------ |
| `npm run dev`             | Vite development server                                            |
| `npm run build`           | TypeScript check and production build to dist/                     |
| `npm run preview`         | Preview the production build locally                               |
| `npm run lint`            | ESLint, with zero warnings allowed                                 |
| `npm run typecheck`       | Strict TypeScript checks for application, tests, and configuration |
| `npm test`                | Run all Vitest tests once                                          |
| `npm run test:a11y`       | Browser interactions, axe accessibility, and responsive checks     |
| `npm run test:watch`      | Interactive test watch mode                                        |
| `npm run format`          | Format source and documentation                                    |
| `npm run format:check`    | Verify formatting without modifying files                          |
| `npm run storybook`       | Run Storybook locally                                              |
| `npm run build-storybook` | Build static Storybook to storybook-static/                        |

## Architecture

```text
src/
  components/  MUI wrappers and enterprise compositions, public props, colocated stories and tests
  foundations/ Token showcase and light/dark Storybook stories
  demo/        Workspace settings and lazy-loaded enterprise showcase
  index.ts     Public source entry point
  theme/       MUI adapter, provider, and theme contract tests
  tokens/      Framework-independent primitive design values
  hooks/       Color mode context and consumer hook
  utils/       Reserved for shared pure helpers
  types/       Shared typed option contract
  test/        Testing Library setup and themed render helper
```

Tokens feed the MUI theme, which feeds components and the demo. The theme separates palette, typography, spacing, breakpoints, shape, and component overrides. `createNexaTheme(mode)` can be used independently; `NexaProvider` adds React context, CssBaseline, and mode switching. Mode defaults to light and is session-local; reloading resets it. Storybook component stories use a global Theme toolbar plus explicit Dark examples; foundation stories retain their existing providers.

The spacing unit is **4px**, so `theme.spacing(4)` and `sx={{ p: 4 }}` mean 16px. Numeric MUI border radius values multiply the theme's 8px base. Shadow tokens are available for future components; MUI's default elevation scale is intentionally retained until an elevation specification is agreed. Typography uses a system font stack, with no external font requests.

Keep component-specific types, tests, and stories colocated. Use named exports for reusable modules. Compose MUI primitives before adding abstractions. No routing or global state library is needed. Component behavior stays in MUI; state and submission behavior stay with consumers.

## Accessibility and responsive behavior

The demo provides semantic landmarks, labeled sections, a single h1, a keyboard-accessible skip link, visible focus indicators, and a text-labeled theme button. Swatches display their role and hex value so color is not the only information channel. Color swatches collapse to one column on small screens; spacing samples wrap.

Tests cover keyboard interaction, native disabled states, loading, labels and helper/error associations, option selection, dialog focus trapping/restoration and actions, demo validation/save behavior, theme contracts, and WCAG AA normal-text contrast (4.5:1) for semantic color pairs and text on both surfaces. These are targeted checks, not a complete accessibility certification. Screen-reader and broader assistive-technology review remain part of developer acceptance.

## Component library

Nexa provides 22 components and patterns:

| Area               | Components                                                          |
| ------------------ | ------------------------------------------------------------------- |
| Actions and inputs | Button, TextField, Select, Checkbox, RadioGroup, Switch, DatePicker |
| Data display       | Card, StatusBadge, MetricCard, DataGrid                             |
| Navigation         | Pagination, AppShell, Sidebar, TopBar, Breadcrumbs                  |
| Feedback           | Alert, Dialog, LoadingState, EmptyState, ErrorState, Skeleton       |

All public React names use the Nexa prefix. Components retain MUI behavior, with consistent theme defaults and public TypeScript APIs. Consumers own values, selection, actions and request state.

## Component usage

Import from the source entry point within this repository:

```tsx
import { useState } from 'react'
import {
  NexaProvider,
  NexaButton,
  NexaTextField,
  NexaSelect,
  NexaCard,
} from './src'
import type { NexaOption } from './src'

type Region = 'africa' | 'europe'
const regions: readonly NexaOption<Region>[] = [
  { value: 'africa', label: 'Africa' },
  { value: 'europe', label: 'Europe' },
]

function WorkspacePreview() {
  const [region, setRegion] = useState<Region | ''>('')
  return (
    <NexaProvider>
      <NexaCard title="Workspace">
        <NexaTextField label="Workspace name" required />
        <NexaSelect<Region>
          label="Region"
          options={regions}
          value={region}
          onValueChange={setRegion}
        />
        <NexaButton variant="outlined" onClick={() => setRegion('')}>
          Clear region
        </NexaButton>
      </NexaCard>
    </NexaProvider>
  )
}
```

See [component contracts](src/components/README.md) for state ownership, typed options, ref support, modal behavior, and extension guidance. No package import name is advertised until library packaging and publishing are configured.

The demo's Review changes action validates the form, opens a confirmation, simulates a brief pending save, and shows dismissible feedback. Data exists only in memory. The separate action-style specimens demonstrate appearance and intentionally perform no operations.

## Figma & Design Handoff

The [Nexa Figma design](https://www.figma.com/design/dOGqmnvbpkcCjZDKagTMVH) is the design reference for foundations, reusable components, patterns and a Learning Administration example. This is the owner-provided scope. A publication-time metadata inspection confirms a **00 Cover & Foundations** page with Cover and Foundations frames; completeness of the remaining component/pattern/example content has not been independently verified.

Nexa documents the relationship between design tokens/components, Dev Mode inspection, React APIs, Storybook and verification. Earlier preparation documents remain specifications to reconcile with the supplied file. **Complete Figma-to-code validation, published team-library status, Code Connect integration, WCAG certification and designer sign-off are not claimed.**

Start with the [handoff documentation index](docs/figma/README.md): [token mapping](docs/figma/token-mapping.md), [component mapping](docs/figma/component-mapping.md), [workflow](docs/figma/handoff-guide.md), [Dev Mode checklist](docs/figma/dev-mode-checklist.md), [traceability](docs/figma/implementation-traceability.md), and the [Learning Administration case study](docs/figma/examples/learning-admin-handoff.md). The [manual preparation guide](docs/figma/figma-preparation.md) specifies the exact Figma pages, collections, styles, component sets and example frames to create next.

Storybook includes **Guides / Figma Handoff**, a concise consumer guide with links to component docs and bundled Markdown references. Existing TypeScript tokens and MUI theme adapters remain authoritative; no duplicate token JSON is maintained. Primitive shadows remain available tokens, while components still use MUI's existing elevation scale. Documentation makes that distinction explicit.

## Continuous integration

[GitHub Actions](https://github.com/Amos0323/nexa-design-system/actions/workflows/ci.yml) uses Node 24, npm download caching, and npm ci. It runs formatting, lint, type checking, unit tests, the app build, the static Storybook build, and Chromium browser accessibility tests on pushes and pull requests. The job uses read-only permissions and retains browser failure artifacts for seven days.

The badge reflects the actual remote workflow status; local checks do not establish hosted CI success. Deployment, package publishing and branch protection are not configured.

## AI-assisted development

AI assists implementation and exploration. Architectural decisions, code review, testing, accessibility review, and final acceptance remain developer responsibilities. Review generated changes and test evidence before merging. Future phases should record component decisions, design references, and acceptance criteria alongside their stories.

## Enterprise components and decisions

Open `/?view=enterprise` or use the Enterprise components link in the foundation demo. Metrics are illustrative; the grid contains 24 deterministic sample records. Sorting, filtering, pagination, row selection, date filtering, and refresh/retry operate locally.

- **NexaDataGrid** preserves generic row types and MUI column/model/slot APIs, with named empty/error states, busy feedback, and accessible quick search. It uses the MIT community edition; pages are limited to 100 rows, and advanced multi-column filtering/sorting are outside this wrapper's scope. See [MUI pagination](https://mui.com/x/react-data-grid/pagination/). Server-mode props remain available, but no server is implemented.
- **NexaDatePicker** uses a local Day.js adapter, Dayjs-or-null values, min/max validation, associated helper/error text, and MUI's segmented keyboard field and calendar dialog. Dates are local calendar dates; locale/time-zone configuration and serialization need an explicit consuming-product policy.
- **NexaPagination** uses one-based page numbers; MUI Grid pagination models use zero-based pages. Consumers own both states.
- **NexaAppShell**, **NexaTopBar**, **NexaSidebar**, and **NexaBreadcrumbs** use real navigation links and current-page semantics. The shell owns one main landmark and a skip link. At the existing lg breakpoint (1200px), navigation becomes a persistent sidebar; smaller screens use MUI's modal drawer with focus trapping, Escape, and focus restoration.
- **NexaLoadingState**, **NexaEmptyState**, **NexaErrorState**, and **NexaSkeleton** standardize feedback without owning fetching. Skeleton patterns cover cards, tables, and metrics, with animation disabled. Loading spinners honor reduced motion.
- **NexaMetricCard** composes the existing card and typography, with text-based trend information.

Existing tokens and theme modules remain the source of visual decisions. A sidebar-width layout token was added. Thin wrappers preserve MUI behavior; application data and async simulations stay in demo/. Enterprise code is loaded on demand using React.lazy instead of introducing a router.

The grid retains its columns within a horizontally scrollable viewport on narrow screens. This preserves comparison and keyboard grid navigation without forcing the document to overflow. It is a deliberate table usability tradeoff; a product-specific record-detail view may be preferable for intensive mobile workflows.

## Browser accessibility and acceptance

`npm run test:a11y` runs Playwright browser interactions, axe scans in both themes, responsive checks at 320/390/768/1024/1440px, drawer focus restoration, and grid/calendar interactions. Install the browser once:

```sh
npx playwright install chromium
npm run test:a11y
```

On Windows with Edge installed, PowerShell can use `$env:PLAYWRIGHT_CHANNEL='msedge'` before the test command. CI installs Chromium and runs the same suite. Browser artifacts are ignored by Git; failing tests retain traces.

Storybook includes Data Display, Inputs, Navigation, Feedback, and Patterns/Enterprise groups, controls, explicit Dark examples, and the accessibility addon. Use its accessibility panel when exploring states. Automated axe checks do not certify WCAG compliance. Developer acceptance should also include screen-reader announcements, zoom/reflow, high-contrast mode, keyboard operation of grid menus/calendar/dialogs, and review against approved Figma specifications.

The app and Storybook currently emit large-chunk advisories due to MUI X and documentation dependencies. The enterprise demo is lazy loaded; arbitrary vendor chunk splitting is intentionally deferred until a concrete hosting/cache strategy is chosen.

## Testing strategy and validation baseline

The existing baseline is **76 unit tests across 19 files**, **10 browser tests**, **103 Storybook stories**, and **24 documentation entries**. These are counts, not a coverage percentage. [Historical validation records](docs/validation-history.md) retain earlier phase evidence. Consult GitHub Actions for the current remote result.

Vitest and React Testing Library exercise behavior with accessible queries and a StrictMode/theme wrapper. Playwright uses a real browser for interactions, responsive layout and axe scans. Manual accessibility and design comparison complement both layers. The browser suite starts Vite on port 4173; avoid an unrelated server on that port.

## Known limitations and future improvements

- Data, refresh and saves are local simulations; there is no persistence, authentication, backend or database.
- Large-chunk build advisories remain. The enterprise view is lazy loaded; further splitting should follow a measured hosting/cache strategy.
- The grid scrolls horizontally on small screens. A product-specific mobile detail view remains future work.
- Full filter-panel behavior and composed date-filter results still need explicit manual acceptance; see the traceability document.
- Reconcile the supplied Figma file with token/variant specifications and record visual, screen-reader, high-contrast and zoom/reflow acceptance.
- Future phases can add visual regression, broader browser coverage and library packaging/versioning. The demo is not an npm package.

## Recommended deployment configuration

Host the app and Storybook as separate static projects using Node 24:

| Site           | Install | Build                   | Output           |
| -------------- | ------- | ----------------------- | ---------------- |
| Nexa demo      | npm ci  | npm run build           | dist             |
| Nexa Storybook | npm ci  | npm run build-storybook | storybook-static |

Keep Storybook assets and its handoff/ directory together. The app's enterprise view uses a query parameter, so no custom path router is currently required. No environment secrets are needed. Hosting under a subdirectory requires reviewing the Vite asset base. No deployment has been performed.
