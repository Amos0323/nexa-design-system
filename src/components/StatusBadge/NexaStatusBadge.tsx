import Chip, { type ChipProps } from '@mui/material/Chip'

export type NexaStatus =
  'default' | 'success' | 'warning' | 'error' | 'info' | 'neutral'
export interface NexaStatusBadgeProps extends Pick<ChipProps, 'size' | 'sx'> {
  label: string
  status?: NexaStatus
}
/** Non-interactive status text: the label carries meaning independently of color. */
export function NexaStatusBadge({
  status = 'default',
  size = 'small',
  ...props
}: NexaStatusBadgeProps) {
  return (
    <Chip
      {...props}
      size={size}
      color={status === 'neutral' ? 'default' : status}
      variant={status === 'neutral' ? 'outlined' : 'filled'}
    />
  )
}
