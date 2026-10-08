import type { ReactNode } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
export interface NexaEmptyStateProps {
  title: string
  description?: string
  icon?: ReactNode
  action?: ReactNode
}
export function NexaEmptyState({
  title,
  description,
  icon,
  action,
}: NexaEmptyStateProps) {
  return (
    <Box
      sx={{
        p: 6,
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 3,
        height: '100%',
      }}
    >
      {icon && (
        <Box aria-hidden="true" sx={{ color: 'text.secondary' }}>
          {icon}
        </Box>
      )}
      <Typography variant="h3" component="p">
        {title}
      </Typography>
      {description && (
        <Typography color="text.secondary" sx={{ maxWidth: '40ch' }}>
          {description}
        </Typography>
      )}
      {action}
    </Box>
  )
}
