import type { ReactNode } from 'react'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Typography from '@mui/material/Typography'
export interface NexaNavigationItem {
  id: string
  label: string
  href: string
  icon?: ReactNode
  count?: number
}
export interface NexaSidebarProps {
  items: readonly NexaNavigationItem[]
  activeId?: string
  label?: string
  onNavigate?: () => void
}
export function NexaSidebar({
  items,
  activeId,
  label = 'Primary navigation',
  onNavigate,
}: NexaSidebarProps) {
  return (
    <Box component="nav" aria-label={label} sx={{ p: 3 }}>
      <List disablePadding>
        {items.map((item) => (
          <ListItem key={item.id} disablePadding sx={{ mb: 2 }}>
            <ListItemButton
              component="a"
              href={item.href}
              selected={item.id === activeId}
              aria-current={item.id === activeId ? 'page' : undefined}
              onClick={onNavigate}
              sx={{ borderRadius: 1, gap: 2 }}
            >
              {item.icon && (
                <ListItemIcon sx={{ minWidth: 0, color: 'inherit' }}>
                  {item.icon}
                </ListItemIcon>
              )}
              <ListItemText
                primary={item.label}
                sx={{ overflowWrap: 'anywhere' }}
              />
              {item.count != null && (
                <Typography
                  component="span"
                  variant="body2"
                  sx={{ bgcolor: 'action.selected', borderRadius: 1, px: 2 }}
                  aria-label={item.count + ' items'}
                >
                  {item.count}
                </Typography>
              )}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  )
}
