import Box from '@mui/material/Box'
import { NexaAlert } from '../Alert/NexaAlert'
import { NexaButton } from '../Button/NexaButton'
export interface NexaErrorStateProps {
  title?: string
  description: string
  onRetry?: () => void
  retryLabel?: string
}
export function NexaErrorState({
  title = 'Something went wrong',
  description,
  onRetry,
  retryLabel = 'Try again',
}: NexaErrorStateProps) {
  return (
    <Box sx={{ p: 4 }}>
      <NexaAlert severity="error" title={title}>
        {description}
      </NexaAlert>
      {onRetry && (
        <NexaButton variant="outlined" onClick={onRetry} sx={{ mt: 4 }}>
          {retryLabel}
        </NexaButton>
      )}
    </Box>
  )
}
