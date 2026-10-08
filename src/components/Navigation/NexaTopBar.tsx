import type { ReactNode } from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import MenuOutlined from '@mui/icons-material/MenuOutlined'
export interface NexaTopBarProps {
  title: string
  actions?: ReactNode
  onMenuClick?: () => void
  menuOpen?: boolean
  menuId?: string
}
export function NexaTopBar({
  title,
  actions,
  onMenuClick,
  menuOpen,
  menuId,
}: NexaTopBarProps) {
  return (
    <AppBar
      component="header"
      position="static"
      color="inherit"
      elevation={0}
      sx={{ borderBottom: 1, borderColor: 'divider' }}
    >
      <Toolbar sx={{ gap: 3, flexWrap: 'wrap', py: 2 }}>
        {onMenuClick && (
          <IconButton
            aria-label="Open navigation"
            aria-expanded={menuOpen}
            aria-controls={menuId}
            onClick={onMenuClick}
          >
            <MenuOutlined />
          </IconButton>
        )}
        <Typography
          sx={{
            fontWeight: 700,
            flex: 1,
            minWidth: 0,
            overflowWrap: 'anywhere',
          }}
        >
          {title}
        </Typography>
        {actions && (
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            {actions}
          </Box>
        )}
      </Toolbar>
    </AppBar>
  )
}
