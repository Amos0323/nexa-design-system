# Designer → developer handoff

> Publication update: [Nexa Figma design](https://www.figma.com/design/dOGqmnvbpkcCjZDKagTMVH) is now supplied. Metadata confirms Cover and Foundations frames on page 00 Cover & Foundations. The specifications below originated before that file was supplied; component/node bindings, visual parity and designer sign-off remain unverified. Treat creation instructions as a reconciliation checklist for the existing file.

## Status and ownership

Implemented: tokens/theme, React components, Storybook, automated tests, and the Learning Administration showcase. Planned: a Nexa Figma library, variable/style bindings, approved example frames, real node links, and designer/QA sign-off. This phase prepares the workflow; it does not claim a completed Figma handoff or Dev Mode validation.

Code tokens/theme are authoritative for implemented values; Storybook is the executable reference for component behavior. Future approved Figma files communicate design intent. Disagreements must be reviewed and resolved in both places rather than declaring either artifact silently correct.

## Workflow

1. **Designer selects Nexa components** from the future library. Use instances and retain component/property names from the [component map](component-mapping.md).
2. **Bind approved variables and styles.** Use Semantic roles with Light/Dark modes, primitive dimensions, and text/effect styles from the [token map](token-mapping.md). Identify intentional exceptions.
3. **Prepare responsive layouts.** Supply representative 320, 390, 768, 1024, and 1440px frames plus rules at sm=600 and lg=1200. Specify fluid widths, wrapping, min/max constraints, and scroll ownership; screenshots alone are insufficient.
4. **Developer inspects in Figma Dev Mode**, once a real file and access are available. Record the exact frame/node URL and design version, inspect variable bindings and component properties, and read interaction notes. Dev Mode exposes component and variable information; consult [Figma's guide](https://help.figma.com/hc/en-us/articles/15023124644247-Guide-to-Dev-Mode-in-Figma) and [variable inspection reference](https://help.figma.com/hc/en-us/articles/27882809912471-Variables-in-Dev-Mode).
5. **Map to existing React APIs.** Check supported states in Storybook and public types. Keep values, events, and fetching in the consumer; raise missing variants before creating duplicates.
6. **Interpret generated code.** Extract intent and constraints; do not paste absolute-positioned CSS, magic numbers, or new colors over working MUI components.
7. **Use Nexa/MUI tokens.** Translate 16px spacing to theme.spacing(4), not spacing(16); apply semantic palette paths rather than copied hex values.
8. **Implement responsive behavior.** Reuse AppShell navigation, grid scrolling, existing breakpoints, and content wrapping. Record any accepted small-screen compromise.
9. **Compare at matching conditions.** Align viewport, theme, data, font availability, zoom, component state, and design version. Capture browser/Figma evidence side by side and record deltas with severity and owner.
10. **Verify accessibility.** Exercise keyboard, labels, errors, focus return, contrast, zoom/reflow, reduced motion, and screen-reader announcements. Run automated checks; inspect warnings and manual gaps.
11. **Review with designer and QA.** Resolve deltas or explicitly accept them, link evidence to the change, and update mappings/stories if the contract changed. Developer acceptance remains required in AI-assisted work.

## What a ready handoff contains

| Information         | Required detail                                                                                        |
| ------------------- | ------------------------------------------------------------------------------------------------------ |
| Identity            | Real file/frame/node link, owner, version/date, review status; never an invented URL                   |
| Dimensions          | Auto-layout direction, fill/hug/fixed sizing, min/max widths, viewport size                            |
| Spacing             | Padding/gaps as bound variables, density and scroll ownership                                          |
| Typography          | Text style, concrete comparison font, weight, line height, tracking, wrapping/truncation               |
| Variants and states | Property names, normal/hover/focus/disabled/selected/error/loading/empty states                        |
| Responsive behavior | Breakpoint rules, stacking, drawer transition, overflow and long-content behavior                      |
| Interactions        | Trigger/outcome, keyboard sequence, focus destination/return, dismissal, pending/retry behavior        |
| Assets              | Existing MUI icon names first; export settings, licensing and accessible purpose for custom assets     |
| Accessibility       | Landmarks/heading intent, labels/helper text, status announcements, color-independent meaning          |
| Acceptance          | Relevant Storybook stories/tests, comparison evidence, open deviations, designer/developer/QA sign-off |

## Change and acceptance record

For each future handoff record: requirement; real design URL/version (pending until supplied); code revision; Storybook story IDs; viewport/theme/font; automated commands/results; manual findings; accepted deviations; reviewers/date. Keep proposed, implemented, and verified statuses separate. A passing build proves neither visual parity nor screen-reader usability.
