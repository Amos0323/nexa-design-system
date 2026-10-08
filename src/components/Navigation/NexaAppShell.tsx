import { useId, useRef, useState, type ReactNode } from 'react'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'
import CloseOutlined from '@mui/icons-material/CloseOutlined'
import { NexaSidebar, type NexaNavigationItem } from './NexaSidebar'
import { NexaTopBar } from './NexaTopBar'
import { layoutTokens } from '../../tokens'
export interface NexaAppShellProps {
  title: string
  navigation: readonly NexaNavigationItem[]
  activeId?: string
  actions?: ReactNode
  children: ReactNode
}
export function NexaAppShell({
  title,
  navigation,
  activeId,
  actions,
  children,
}: NexaAppShellProps) {
  const theme = useTheme()
  const desktop = useMediaQuery(theme.breakpoints.up('lg'))
  const [open, setOpen] = useState(false)
  const id = useId()
  const closeRef = useRef<HTMLButtonElement>(null)
  const mainId = id + '-main'
  const drawerId = id + '-navigation'
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        bgcolor: 'background.default',
      }}
    >
      <Box
        component="a"
        href={'#' + mainId}
        sx={{
          position: 'absolute',
          top: -100,
          left: 16,
          zIndex: theme.zIndex.modal + 1,
          bgcolor: 'background.paper',
          p: 3,
          '&:focus': { top: 8 },
        }}
      >
        Skip to main content
      </Box>
      {desktop ? (
        <Box
          component="aside"
          sx={{
            width: layoutTokens.sidebarWidth,
            flexShrink: 0,
            borderRight: 1,
            borderColor: 'divider',
            bgcolor: 'background.paper',
          }}
        >
          <Typography sx={{ p: 6, fontWeight: 700 }} variant="h3" component="p">
            nexa.
          </Typography>
          <NexaSidebar items={navigation} activeId={activeId} />
        </Box>
      ) : (
        <Drawer
          open={open}
          onClose={() => setOpen(false)}
          slotProps={{
            paper: {
              id: drawerId,
              'aria-label': 'Application navigation',
              sx: {
                width: layoutTokens.sidebarWidth,
                maxWidth: 'calc(100vw - 32px)',
              },
            },
            transition: { onEntered: () => closeRef.current?.focus() },
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              p: 4,
            }}
          >
            <Typography sx={{ fontWeight: 700 }}>nexa.</Typography>
            <IconButton
              ref={closeRef}
              autoFocus
              aria-label="Close navigation"
              onClick={() => setOpen(false)}
            >
              <CloseOutlined />
            </IconButton>
          </Box>
          <NexaSidebar
            items={navigation}
            activeId={activeId}
            onNavigate={() => setOpen(false)}
          />
        </Drawer>
      )}
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <NexaTopBar
          title={title}
          actions={actions}
          onMenuClick={desktop ? undefined : () => setOpen(true)}
          menuOpen={open && !desktop}
          menuId={open && !desktop ? drawerId : undefined}
        />
        <Box
          component="main"
          id={mainId}
          tabIndex={-1}
          sx={{ p: { xs: 4, sm: 6, lg: 8 }, minWidth: 0 }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  )
}
