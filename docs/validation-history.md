# Historical local validation

These records describe earlier phase acceptance, not current GitHub Actions status.

## Phase 3 validation record

Local validation: 75 Vitest tests across 19 files (26 added this phase), 10 Playwright tests in Edge, and zero axe violations in the tested light/dark demo states and open mobile navigation. Storybook contains 103 stories and 23 documentation entries; this phase added 49 stories and 13 docs entries. Lint, strict typecheck, production build, Storybook build, and formatting checks pass.

Production JavaScript: foundation entry 514.45 kB / 158.69 kB gzip; lazy enterprise chunk 704.88 kB / 211.12 kB gzip. The earlier foundation entry was 506.68 kB / 155.39 kB gzip. These are build-output sizes, not measured network performance or a published package footprint. The remaining chunk-size warnings are recorded rather than silenced. CI configuration is present but a hosted GitHub Actions run has not been observed.

## Phase 4 validation record

Figma handoff documentation and Storybook configuration were added without changing runtime components, tokens, theme values, or dependencies. Storybook now contains 103 stories and 24 documentation entries. The new guide was inspected in Edge: its semantic mapping table renders, the bundled Markdown reference returns successfully, component navigation works, and no page errors were observed. Repository source links and Storybook reference IDs were checked.

All 76 unit tests across 19 files and all 10 browser tests pass. One existing long form test initially exceeded its five-second limit; access-policy validation and save/dismiss behavior were separated into focused cases, repeated DOM queries were reduced, and dialog removal is observed directly. Assertions and timeout limits were retained. This accounts for the increase from 75 to 76 tests. Lint, typecheck, production build, Storybook build and formatting checks pass. Existing large-chunk advisories remain; application bundle sizes are unchanged from Phase 3. No Figma library, Dev Mode comparison, hosted CI execution, or designer sign-off was performed.
