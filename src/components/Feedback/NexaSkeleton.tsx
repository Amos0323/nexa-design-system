import Box from '@mui/material/Box'
import Skeleton from '@mui/material/Skeleton'
import { visuallyHidden } from '@mui/utils'
export interface NexaSkeletonProps {
  variant?: 'card' | 'table' | 'metric'
  label?: string
}
/** Static skeletons are deliberately animation-free, including reduced-motion mode. */
export function NexaSkeleton({
  variant = 'card',
  label = 'Loading content…',
}: NexaSkeletonProps) {
  return (
    <Box
      role="status"
      sx={{
        p: 4,
        border: 1,
        borderColor: 'divider',
        borderRadius: 1,
        minHeight:
          variant === 'table'
            ? '24rem'
            : variant === 'card'
              ? '16rem'
              : '10rem',
      }}
    >
      <Box component="span" sx={visuallyHidden}>
        {label}
      </Box>
      <Box aria-hidden="true">
        <Skeleton animation={false} width="45%" height={32} />
        {Array.from(
          { length: variant === 'table' ? 6 : variant === 'card' ? 3 : 1 },
          (_, index) => (
            <Skeleton
              key={index}
              animation={false}
              variant="rounded"
              height={variant === 'metric' ? 48 : 32}
              sx={{ mt: 4 }}
            />
          ),
        )}
      </Box>
    </Box>
  )
}
