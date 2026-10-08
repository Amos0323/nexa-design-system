# Figma handoff documentation

> Publication update: [Nexa Figma design](https://www.figma.com/design/dOGqmnvbpkcCjZDKagTMVH) is now supplied. Metadata confirms Cover and Foundations frames on page 00 Cover & Foundations. The specifications below originated before that file was supplied; component/node bindings, visual parity and designer sign-off remain unverified. Treat creation instructions as a reconciliation checklist for the existing file.

Phase 4 prepares a Figma-to-code workflow for the implemented Nexa Design System. **A design URL is now supplied; verified node mappings and Dev Mode validation are not claimed.** Proposed Figma structures are specifications to create manually.

1. [Token mapping and source-of-truth audit](token-mapping.md)
2. [Component properties and React API mapping](component-mapping.md)
3. [Designer → developer handoff guide](handoff-guide.md)
4. [Dev Mode checklist](dev-mode-checklist.md)
5. [Implementation traceability](implementation-traceability.md)
6. [Learning Administration handoff example](examples/learning-admin-handoff.md)
7. [Exact manual Figma preparation steps](figma-preparation.md)

Storybook's Guides / Figma Handoff summarizes the workflow and links back to these references. Markdown copies are included with the static Storybook build under handoff/ so links also work without a hosted repository. Existing TypeScript tokens and the MUI adapter remain authoritative; no duplicate token JSON or new runtime dependencies were introduced.
