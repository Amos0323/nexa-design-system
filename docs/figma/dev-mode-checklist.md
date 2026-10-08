# Dev Mode checklist

> Publication update: [Nexa Figma design](https://www.figma.com/design/dOGqmnvbpkcCjZDKagTMVH) is now supplied. Metadata confirms Cover and Foundations frames on page 00 Cover & Foundations. The specifications below originated before that file was supplied; component/node bindings, visual parity and designer sign-off remain unverified. Treat creation instructions as a reconciliation checklist for the existing file.

Use when an actual design is available. All Figma-specific checks are **pending** for Nexa until a library and example frames are created. The existing code is not evidence that these checks occurred.

## Intake and inspection

- [ ] Record a real Figma frame/node link, version, designer, scope, and acceptance criteria.
- [ ] Inspect the component instance and main component; identify detached/custom layers.
- [ ] Match component name, variant, size, state, text, and icon properties to the Nexa public API.
- [ ] Inspect variable bindings and active Light/Dark mode; distinguish raw primitives from semantic roles.
- [ ] Inspect padding, gap, alignment, dimensions, fill/hug/fixed sizing, and constraints. Convert pixels to Nexa's 4px spacing unit correctly.
- [ ] Inspect text styles: font, size, weight, line height, tracking, truncation and multiline behavior. Record fallback-font differences.
- [ ] Read responsive rules and inspect narrow/intermediate/wide frames; confirm behavior between frames, including the 1200px navigation switch.
- [ ] Inspect default, hover, focus, pressed, disabled, checked/selected, error, loading, empty, and retry states where applicable.
- [ ] Identify MUI icons before exporting duplicate SVGs. Confirm decorative vs meaningful use and labels for icon-only controls.
- [ ] Inspect interactions: action vs navigation, keyboard sequence, dialogs/menus, focus return, loading lockout, and failure recovery.
- [ ] Compare with existing Nexa components and Storybook controls. Record unsupported variants for review instead of bypassing the system.

## Do not blindly copy Dev Mode code

Generated CSS describes selected layers, not the application's semantic structure, state ownership, reusable APIs, responsive intent, or keyboard behavior. A static width or hex value may represent a token binding or a single frame rather than a product requirement. Rebuilding MUI controls from visual layers loses established focus and accessibility behavior.

Example: Figma gap=16px and primary fill=#4338CA should normally become theme spacing(4) and palette.primary.main, not spacing(16) or a fixed light-mode color. An 8px corner maps to sx borderRadius: 1 because Nexa's shape base is 8px. A highlighted navigation item maps to activeId and aria-current behavior, not just a background rectangle. Use [token mapping](token-mapping.md) and [component mapping](component-mapping.md) to translate intent.

## Implementation and accessibility review

- [ ] Use semantic headings/landmarks and real links/buttons; do not add ARIA that duplicates native semantics.
- [ ] Ensure labels persist, required/error/helper text is associated, and visible names match accessible names.
- [ ] Verify focus visibility, tab/arrow navigation, disabled controls, modal trapping/restoration, and Escape behavior.
- [ ] Check contrast in both themes, color-independent status text, zoom/reflow, and reduced motion.
- [ ] Test realistic long names, empty/error/loading data, selection, search, and narrow-screen grid scrolling.
- [ ] Run lint, typecheck, unit tests, build, Storybook build, format:check, and browser accessibility tests.
- [ ] Compare the browser with the correct frame/theme/data/font; record visual deltas and manual screen-reader findings.
- [ ] Review with designer/QA; capture decisions, unresolved issues, evidence links and the approved version.

See [Figma's inspection guide](https://help.figma.com/hc/en-us/articles/22012921621015-Guide-to-inspecting) for tool operation. This checklist specifies Nexa's acceptance process, not a claim that those operations have been performed.
