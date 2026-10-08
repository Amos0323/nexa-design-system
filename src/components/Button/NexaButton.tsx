import Button, { type ButtonProps } from '@mui/material/Button'

export type NexaButtonVariant =
  'primary' | 'secondary' | 'outlined' | 'text' | 'destructive'
export interface NexaButtonProps extends Omit<
  ButtonProps,
  'variant' | 'color' | 'component' | 'href' | 'loadingIndicator'
> {
  /** Semantic intent; primary and secondary are filled actions. */
  variant?: NexaButtonVariant
}
const variants = {
  primary: { variant: 'contained', color: 'primary' },
  secondary: { variant: 'contained', color: 'secondary' },
  outlined: { variant: 'outlined', color: 'primary' },
  text: { variant: 'text', color: 'primary' },
  destructive: { variant: 'contained', color: 'error' },
} as const

/** A native action button. Navigation should use a link, not this component. */
export function NexaButton({
  variant = 'primary',
  type = 'button',
  loading = false,
  ...props
}: NexaButtonProps) {
  return (
    <Button
      {...props}
      {...variants[variant]}
      type={type}
      loading={loading}
      aria-busy={loading || undefined}
    />
  )
}
