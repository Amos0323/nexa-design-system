# Components

Nexa components compose MUI and inherit the existing theme. Each directory contains the public implementation, Storybook stories, and behavior tests. Import via `src/index.ts` (components plus provider/theme) or `src/components/index.ts` (components only).

| Component       | Contract                                                                                                                                                                                         |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| NexaButton      | Native button. Semantic `variant`: primary, secondary, outlined, text, destructive. Defaults to `type="button"`; set submit explicitly. MUI loading disables activation. Ref targets the button. |
| NexaTextField   | Required visible label, outlined styling, native event callbacks. `inputProps` for native attributes, `inputRef` for focus, start/end adornments.                                                |
| NexaSelect      | Controlled single selection. `value`, `options`, `onValueChange`. Empty string means no selection.                                                                                               |
| NexaCheckbox    | Visible label, optional required/error/helper state. Native checked/defaultChecked and onChange behavior.                                                                                        |
| NexaRadioGroup  | Controlled `value`, `options`, `onValueChange`, and horizontal/vertical orientation. Fieldset/legend plus native radios.                                                                         |
| NexaSwitch      | Visible stable label. Checked/defaultChecked and onChange follow native input behavior.                                                                                                          |
| NexaCard        | Non-interactive labeled section with title, subtitle, children, optional actions, and configurable heading level.                                                                                |
| NexaAlert       | Success/info are polite status messages; warning/error are assertive alerts. Optional controlled dismissal.                                                                                      |
| NexaStatusBadge | Non-interactive MUI Chip with a meaningful text label. Neutral is outlined; other status variants are filled.                                                                                    |
| NexaDialog      | Controlled open state, title, optional plain-text description, composable content, primary action, cancel label, and close reason.                                                               |

## Typed options

Select and RadioGroup share `NexaOption<Value extends string>`. Use stable, unique, non-empty string values (including string literal unions). The callback returns the selected option value without a cast. The option list is readonly; disabled options cannot be selected. Multi-select, object/number values, and free-form entry are deliberately out of scope.

## State ownership

TextField, Checkbox, and Switch accept standard controlled or uncontrolled input props. Do not mix the two modes during a mount. Select and RadioGroup are controlled so application state remains explicit. Text inputs use native `onChange` events; option controls expose `onValueChange` because their public value type is narrower than the DOM event type.

NexaDialog never saves data or closes itself. `onClose` reports cancel, Escape, or backdrop intent; the consumer updates `open`. A primary action runs its supplied callback. While loading, every dismissal path and action is blocked. Consumers must clear loading after success, failure, or a timeout and provide actionable error feedback. A non-loading cancel action receives initial focus; MUI retains its focus trap and restores the trigger. For structured dialog content, omit `description` rather than flattening all content into an ARIA description.

## Styling and extension

Use the Nexa provider once at the application root. Component styling uses MUI theme values and spacing. Common MUI props are retained where useful; implementation slots and unsafe modal focus switches are intentionally not exposed. Use composition for content and actions, and request a documented API extension before bypassing accessibility defaults. Interactive adornments must have their own accessible labels.

## Stories and validation

Every component is under `Components` in Storybook with autodocs, a default story, relevant state examples, and a Dark story. The Theme toolbar can switch other component stories between modes. Controlled input stories synchronize with Storybook args. Dialog examples open from a trigger to demonstrate focus return; loading examples intentionally remain pending until changed through Controls.

Tests cover interactions, native disabled behavior, loading, accessible names/descriptions, error associations, typed selection, keyboard navigation, dialog focus and consumer-driven actions. Tests avoid class names and snapshots. Browser validation covers actual layout, native focus behavior, and console health; JSDOM cannot replace that review.

## Enterprise extension

The public barrel also exports NexaDataGrid (generic MUI row/column and controlled model APIs), NexaDatePicker (Dayjs | null), NexaPagination (one-based controlled page), NexaAppShell, NexaSidebar, NexaTopBar, NexaBreadcrumbs, NexaLoadingState, NexaEmptyState, NexaErrorState, NexaSkeleton, and NexaMetricCard with their public prop types. Import MUI grid column/model types from @mui/x-data-grid.

Use AppShell at page level: it owns the main landmark. Navigation items have stable IDs and real hrefs. Consumers own active navigation, data, selection, and request state; wrappers do not fetch data. ErrorState calls onRetry without assuming a network service. Skeleton variants share the same status-label contract. Date validation messages are provided for invalid/min/max dates; external error/helperText take precedence. DatePicker intentionally owns its text-field slot to guarantee label/error associations.
