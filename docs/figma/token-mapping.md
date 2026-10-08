# Figma token mapping

> Publication update: [Nexa Figma design](https://www.figma.com/design/dOGqmnvbpkcCjZDKagTMVH) is now supplied. Metadata confirms Cover and Foundations frames on page 00 Cover & Foundations. The specifications below originated before that file was supplied; component/node bindings, visual parity and designer sign-off remain unverified. Treat creation instructions as a reconciliation checklist for the existing file.

Status: proposed Figma specification based on the implemented Nexa theme. No Figma library, variables, styles, or Dev Mode comparison has been created or verified in this phase. Names below are the names to create, not existing Figma identifiers.

## Source of truth and audit

[TypeScript tokens](../../src/tokens/index.ts) own primitive values and explicit semantic status colors. The [theme adapter](../../src/theme/index.ts) owns their MUI interpretation: [palette](../../src/theme/palette.ts), [typography](../../src/theme/typography.ts), [spacing](../../src/theme/spacing.ts), [shape](../../src/theme/shape.ts), and [breakpoints](../../src/theme/breakpoints.ts). MUI supplies unspecified defaults. This distinction prevents a Figma variable name from implying a TypeScript token that does not exist.

Create a **Primitives** collection for raw colors and numeric dimensions, and a **Semantic** collection with **Light** and **Dark** modes for roles. Alias semantic colors to primitives where a corresponding primitive exists. The status colors currently live directly in semanticColors; enter their values in the semantic modes without inventing an unused primitive palette. Use text styles for composite typography and effect styles for composite shadows. Breakpoints are documented layout rules, not automatic Figma responsive behavior.

## Primitive colors

Each row represents one proposed COLOR variable. These values have no independent MUI palette path; the semantic table specifies their use.

| Figma variable           | Nexa token                | Value   | Purpose                                                 |
| ------------------------ | ------------------------- | ------- | ------------------------------------------------------- |
| color/indigo/main        | colors.indigo.main        | #4338CA | Light primary                                           |
| color/indigo/light       | colors.indigo.light       | #A5B4FC | Dark primary                                            |
| color/teal/main          | colors.teal.main          | #0F766E | Light secondary                                         |
| color/teal/light         | colors.teal.light         | #5EEAD4 | Dark secondary                                          |
| color/neutral/white      | colors.neutral.white      | #FFFFFF | Light surface and foreground on strong light-mode fills |
| color/neutral/canvas     | colors.neutral.canvas     | #F6F7FB | Light canvas                                            |
| color/neutral/ink        | colors.neutral.ink        | #172033 | Light primary text                                      |
| color/neutral/muted      | colors.neutral.muted      | #566176 | Light secondary text                                    |
| color/neutral/night      | colors.neutral.night      | #111827 | Dark canvas and foreground on strong dark-mode fills    |
| color/neutral/surface    | colors.neutral.surface    | #1F2937 | Dark surface                                            |
| color/neutral/lightText  | colors.neutral.lightText  | #F3F4F6 | Dark primary text                                       |
| color/neutral/darkMuted  | colors.neutral.darkMuted  | #B8C2D3 | Dark secondary text                                     |
| color/neutral/border     | colors.neutral.border     | #DDE1EB | Light divider                                           |
| color/neutral/darkBorder | colors.neutral.darkBorder | #3B475B | Dark divider                                            |

## Semantic colors

In this table, colors.* references are aliases to the matching Primitives variable. semanticColors.* references are direct values in the Semantic collection. The words light/dark on semanticColors mean **theme modes**, whereas colors.indigo.light is a primitive shade. Do not confuse either with MUI's generated palette.primary.light shade.

| Figma variable               | Nexa source: Light / Dark                            | MUI theme path                 | Purpose                    |
| ---------------------------- | ---------------------------------------------------- | ------------------------------ | -------------------------- |
| color/primary/main           | colors.indigo.main / colors.indigo.light             | palette.primary.main           | Primary actions            |
| color/secondary/main         | colors.teal.main / colors.teal.light                 | palette.secondary.main         | Secondary actions          |
| color/primary/contrastText   | colors.neutral.white / colors.neutral.night          | palette.primary.contrastText   | Text on primary fill       |
| color/secondary/contrastText | colors.neutral.white / colors.neutral.night          | palette.secondary.contrastText | Text on secondary fill     |
| color/background/default     | colors.neutral.canvas / colors.neutral.night         | palette.background.default     | Page canvas                |
| color/background/paper       | colors.neutral.white / colors.neutral.surface        | palette.background.paper       | Cards and menus            |
| color/text/primary           | colors.neutral.ink / colors.neutral.lightText        | palette.text.primary           | Body and heading text      |
| color/text/secondary         | colors.neutral.muted / colors.neutral.darkMuted      | palette.text.secondary         | Supporting text            |
| color/divider                | colors.neutral.border / colors.neutral.darkBorder    | palette.divider                | Separators                 |
| color/success/main           | semanticColors.success.light #166534 / .dark #86EFAC | palette.success.main           | Success feedback           |
| color/warning/main           | semanticColors.warning.light #92400E / .dark #FCD34D | palette.warning.main           | Warning feedback           |
| color/error/main             | semanticColors.error.light #B42318 / .dark #FDA29B   | palette.error.main             | Errors/destructive actions |
| color/info/main              | semanticColors.info.light #075985 / .dark #7DD3FC    | palette.info.main              | Informational feedback     |
| color/success/contrastText   | colors.neutral.white / colors.neutral.night          | palette.success.contrastText   | Text on success fill       |
| color/warning/contrastText   | colors.neutral.white / colors.neutral.night          | palette.warning.contrastText   | Text on warning fill       |
| color/error/contrastText     | colors.neutral.white / colors.neutral.night          | palette.error.contrastText     | Text on error fill         |
| color/info/contrastText      | colors.neutral.white / colors.neutral.night          | palette.info.contrastText      | Text on info fill          |

MUI derives unspecified light/dark shades, action hover/selected/disabled colors, and default component states. They are **not** standalone Nexa tokens. Capture their resolved appearance from createNexaTheme(mode) and Storybook before building Figma states; do not approximate a disabled button with an arbitrary opacity. The helper-text override uses palette.text.secondary even when disabled. Focus outlines use currentColor with 3px width; offsets differ by rule in [component overrides](../../src/theme/components.ts). Neutral StatusBadge uses MUI's default Chip colors, not a new neutral palette role.

## Typography

The font stack is typographyTokens.fontFamily: `"Segoe UI", Roboto, Arial, sans-serif`. Figma text styles require a concrete installed font. Start with Segoe UI where available; record the chosen family and platform during comparison. CSS fallbacks do not imply identical glyph metrics. Do not silently replace the stack with another brand font.

Suggested primitive NUMBER variables: typography/weight/regular = 400, medium = 500, bold = 700. Size variables: small = 14, body = 16, title = 24, heading = 36, display = 48px. These map to typographyTokens.weight and .size respectively. Pixel equivalents assume a 16px browser root; React keeps rem sizing for user scaling.

| Figma text style  | Nexa source                                 | MUI theme path    | Size / weight / line height / tracking                |
| ----------------- | ------------------------------------------- | ----------------- | ----------------------------------------------------- |
| Typography/H1     | size.display + weight.bold; adapter metrics | typography.h1     | 48px / 700 / 115% / -4%                               |
| Typography/H2     | size.heading + weight.bold; adapter metrics | typography.h2     | 36px / 700 / 125% / -3%                               |
| Typography/H3     | size.title + weight.bold; adapter metrics   | typography.h3     | 24px / 700 / 140% / MUI default                       |
| Typography/Body1  | size.body; adapter line height              | typography.body1  | 16px / MUI regular / 170% / MUI default               |
| Typography/Body2  | size.small; adapter line height             | typography.body2  | 14px / MUI regular / 160% / MUI default               |
| Typography/Button | weight.bold; textTransform none             | typography.button | MUI size/line height/tracking / 700 / original casing |

Line-height and tracking values above live in the adapter, not the primitive token object. H4–H6, subtitle, caption, overline, and unspecified button metrics remain MUI defaults: inspect the resolved theme before making corresponding styles. HTML heading level and visual typography are separate decisions. The enterprise page overrides H1 to 32px below sm and 40px from sm; document this as a **template override**, not a changed H1 token.

## Spacing, radius, and layout

| Figma NUMBER variable                   | Nexa source                | MUI usage/path                 | Value / purpose                |
| --------------------------------------- | -------------------------- | ------------------------------ | ------------------------------ |
| spacing/unit                            | spacingTokens.unit         | spacing(1)                     | 4px base                       |
| spacing/1, /2, /3, /4, /6, /8, /12, /16 | spacingTokens.steps × unit | spacing(n), sx p/gap/m with n  | 4, 8, 12, 16, 24, 32, 48, 64px |
| radius/small                            | radiusTokens.small         | No global shape binding        | 4px available primitive        |
| radius/medium                           | radiusTokens.medium        | shape.borderRadius             | 8px base                       |
| radius/large                            | radiusTokens.large         | No global shape binding        | 16px available primitive       |
| layout/sidebarWidth                     | layoutTokens.sidebarWidth  | AppShell width (no theme path) | 256px desktop/drawer width     |

Important conversions: Figma padding 16px → sx p: 4; Figma radius 8px → sx borderRadius: 1. MUI numeric borderRadius multiplies the theme base; borderRadius: 8 would produce 64px. For a literal 4px radius use a unit-bearing value derived from radiusTokens.small, not numeric sx 4. The listed spacing steps are recommended, not a restriction on MUI's spacing function.

| Figma layout reference | Nexa source          | MUI path              | Min width |
| ---------------------- | -------------------- | --------------------- | --------- |
| breakpoint/xs          | theme/breakpoints.ts | breakpoints.values.xs | 0px       |
| breakpoint/sm          | theme/breakpoints.ts | breakpoints.values.sm | 600px     |
| breakpoint/md          | theme/breakpoints.ts | breakpoints.values.md | 900px     |
| breakpoint/lg          | theme/breakpoints.ts | breakpoints.values.lg | 1200px    |
| breakpoint/xl          | theme/breakpoints.ts | breakpoints.values.xl | 1536px    |

Breakpoints are adapter constants, not exports in src/tokens. They may be documented as NUMBER variables for reference, but Figma layouts still require constraints/auto layout and explicit responsive annotations. AppShell switches at lg; the metrics use 1/2/4 columns at xs/sm/lg.

## Elevation audit

| Proposed Figma effect style | Nexa source         | CSS value                      | MUI binding / status       |
| --------------------------- | ------------------- | ------------------------------ | -------------------------- |
| Elevation/Token/None        | shadowTokens.none   | none                           | Not wired to theme.shadows |
| Elevation/Token/Subtle      | shadowTokens.subtle | 0 2px 8px rgb(17 24 39 / 6%)   | Available primitive only   |
| Elevation/Token/Raised      | shadowTokens.raised | 0 8px 24px rgb(17 24 39 / 12%) | Available primitive only   |

For Subtle/Raised use x=0, y=2/8, blur=8/24, spread=0, color #111827 at 6%/12%. Do not apply these styles to dialogs/menus and claim parity. Nexa currently retains MUI's 25-entry shadows array and outlined Cards. If Figma needs an elevation used by a MUI component, inspect that resolved theme.shadows[index] and create a separate Elevation/MUI/index effect style, preserving multiple shadow layers and dark-mode surface treatment. Unifying the two scales requires a future design decision and visual review.

## Synchronization decision

No manually maintained tokens.json is introduced. TypeScript plus the resolved MUI theme remain authoritative for code; these tables are a reviewed specification, not a runtime token source. A future exporter must import those modules, emit a chosen schema deterministically (including modes and units), and have CI compare generated output against source. Select an actual Figma import consumer first; JSON alone does not create variables or text/effect styles. Update this mapping, stories, and the future Figma library together whenever tokens or adapter rules change.
