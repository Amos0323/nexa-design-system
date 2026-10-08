import Breadcrumbs from '@mui/material/Breadcrumbs'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'
export interface NexaBreadcrumbItem {
  label: string
  href?: string
}
export interface NexaBreadcrumbsProps {
  items: readonly NexaBreadcrumbItem[]
  label?: string
}
export function NexaBreadcrumbs({
  items,
  label = 'Breadcrumb',
}: NexaBreadcrumbsProps) {
  return (
    <Breadcrumbs aria-label={label} sx={{ mb: 6 }}>
      {items.map((item, index) =>
        index === items.length - 1 ? (
          <Typography key={index} aria-current="page" color="text.primary">
            {item.label}
          </Typography>
        ) : item.href ? (
          <Link key={index} href={item.href} underline="hover" color="inherit">
            {item.label}
          </Link>
        ) : (
          <Typography key={index} color="text.secondary">
            {item.label}
          </Typography>
        ),
      )}
    </Breadcrumbs>
  )
}
