import Alert, { type AlertProps } from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'

export interface NexaAlertProps extends Pick<
  AlertProps,
  'children' | 'severity' | 'variant' | 'sx'
> {
  title?: string
  onDismiss?: () => void
  dismissLabel?: string
}
export function NexaAlert({
  title,
  children,
  severity = 'info',
  onDismiss,
  dismissLabel = 'Dismiss notification',
  ...props
}: NexaAlertProps) {
  return (
    <Alert
      {...props}
      severity={severity}
      role={severity === 'error' || severity === 'warning' ? 'alert' : 'status'}
      onClose={onDismiss}
      closeText={dismissLabel}
    >
      {title && <AlertTitle>{title}</AlertTitle>}
      {children}
    </Alert>
  )
}
