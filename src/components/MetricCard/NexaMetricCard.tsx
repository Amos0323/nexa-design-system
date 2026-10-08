import type { ReactNode } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { NexaCard } from '../Card/NexaCard'
export interface NexaMetricCardProps {
  label: string
  value: string | number
  trend?: string
  icon?: ReactNode
  supportingText?: string
}
export function NexaMetricCard({
  label,
  value,
  trend,
  icon,
  supportingText,
}: NexaMetricCardProps) {
  return (
    <NexaCard title={label} headingLevel="h2">
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
        <Typography
          variant="h2"
          component="p"
          sx={{ overflowWrap: 'anywhere' }}
        >
          {value}
        </Typography>
        {icon && (
          <Box aria-hidden="true" sx={{ color: 'primary.main' }}>
            {icon}
          </Box>
        )}
      </Box>
      {trend && (
        <Typography variant="body2" sx={{ mt: 3 }}>
          {trend}
        </Typography>
      )}
      {supportingText && (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          {supportingText}
        </Typography>
      )}
    </NexaCard>
  )
}
