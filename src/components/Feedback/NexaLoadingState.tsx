import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'
export interface NexaLoadingStateProps {
  label?: string
  minHeight?: number | string
}
export function NexaLoadingState({
  label = 'Loading content…',
  minHeight = '12rem',
}: NexaLoadingStateProps) {
  return (
    <Box
      role="status"
      sx={{
        minHeight,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 4,
        p: 4,
      }}
    >
      <CircularProgress
        aria-hidden="true"
        size={32}
        sx={{
          '@media (prefers-reduced-motion: reduce)': {
            animation: 'none',
            '& circle': { animation: 'none' },
          },
        }}
      />
      <Typography>{label}</Typography>
    </Box>
  )
}
