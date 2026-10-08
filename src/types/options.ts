/** Stable, unique, non-empty string values support literal unions and form data. */
export interface NexaOption<Value extends string = string> {
  value: Value
  label: string
  disabled?: boolean
}
