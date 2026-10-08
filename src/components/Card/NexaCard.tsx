import { useId, type ReactNode } from 'react'
import Card, { type CardProps } from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'

export interface NexaCardProps extends Pick<
  CardProps,
  'children' | 'sx' | 'id'
> {
  title: string
  subtitle?: string
  actions?: ReactNode
  /** Match the surrounding document outline. */
  headingLevel?: 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}
export function NexaCard({
  title,
  subtitle,
  actions,
  children,
  headingLevel = 'h3',
  ...props
}: NexaCardProps) {
  const titleId = useId()
  return (
    <Card
      {...props}
      component="section"
      variant="outlined"
      aria-labelledby={titleId}
    >
      <CardHeader
        title={title}
        subheader={subtitle}
        slotProps={{
          title: { id: titleId, component: headingLevel, variant: 'h3' },
        }}
      />
      <CardContent>{children}</CardContent>
      {actions && (
        <CardActions sx={{ px: 4, pb: 4, gap: 2, flexWrap: 'wrap' }}>
          {actions}
        </CardActions>
      )}
    </Card>
  )
}
