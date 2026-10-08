import type { ReactNode } from 'react'
import {
  Box,
  Button,
  Container,
  Divider,
  Stack,
  Typography,
  useTheme,
} from '@mui/material'
import DarkModeOutlined from '@mui/icons-material/DarkModeOutlined'
import LightModeOutlined from '@mui/icons-material/LightModeOutlined'
import { useColorMode } from '../hooks/useColorMode'
import { spacingTokens } from '../tokens'

export function FoundationsDemo({ children }: { children?: ReactNode }) {
  const { mode, toggleMode } = useColorMode()
  const theme = useTheme()
  return (
    <>
      <Box
        component="a"
        href="#main-content"
        sx={{
          position: 'absolute',
          top: -100,
          left: 16,
          p: 3,
          bgcolor: 'background.paper',
          zIndex: 10,
          '&:focus': { top: 8 },
        }}
      >
        Skip to content
      </Box>
      <Box
        component="header"
        sx={{
          bgcolor: 'background.paper',
          borderBottom: 1,
          borderColor: 'divider',
        }}
      >
        <Container
          maxWidth="lg"
          sx={{
            py: 5,
            display: 'flex',
            gap: 4,
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
          }}
        >
          <Typography
            sx={{ fontWeight: 700, letterSpacing: '-0.04em', fontSize: 24 }}
          >
            nexa<span style={{ color: theme.palette.primary.main }}>.</span>
          </Typography>
          <Button
            variant="outlined"
            onClick={toggleMode}
            startIcon={
              mode === 'light' ? <DarkModeOutlined /> : <LightModeOutlined />
            }
            aria-label={`Switch to ${mode === 'light' ? 'dark' : 'light'} mode`}
          >
            {mode === 'light' ? 'Dark' : 'Light'} mode
          </Button>
        </Container>
      </Box>
      <Container
        component="main"
        id="main-content"
        tabIndex={-1}
        maxWidth="lg"
        sx={{ py: { xs: 10, md: 16 } }}
      >
        <Typography
          variant="h1"
          sx={{ fontSize: { xs: '2.25rem', md: '3rem' } }}
        >
          Nexa Design System
        </Typography>
        <Typography color="text.secondary" sx={{ mt: 4, maxWidth: 620 }}>
          A considered foundation for consistent, accessible enterprise
          experiences. Built with React, TypeScript, and Material UI.
        </Typography>
        <Stack
          direction="row"
          spacing={3}
          sx={{ mt: 6, mb: 12, alignItems: 'center' }}
        >
          <Box
            sx={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              bgcolor: 'secondary.main',
            }}
          />
          <Typography variant="body2" color="text.secondary">
            Foundations / Component library
          </Typography>
        </Stack>
        <Box
          component="section"
          aria-labelledby="typography-title"
          sx={{ mb: 12 }}
        >
          <Typography id="typography-title" variant="h3" component="h2">
            Typography
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mt: 2, mb: 6 }}
          >
            A clear hierarchy. A familiar voice.
          </Typography>
          <Box
            sx={{
              bgcolor: 'background.paper',
              border: 1,
              borderColor: 'divider',
              borderRadius: 2,
              p: { xs: 5, md: 8 },
            }}
          >
            <Typography variant="body2" color="text.secondary">
              Heading / 36px / Bold
            </Typography>
            <Typography variant="h2" component="p" sx={{ mt: 2, mb: 6 }}>
              Clarity by design.
            </Typography>
            <Divider sx={{ mb: 6 }} />
            <Typography variant="body2" color="text.secondary">
              Body / 16px / Regular
            </Typography>
            <Typography sx={{ mt: 2 }}>
              Good foundations make complex experiences feel simple.
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 4 }}>
              Supporting text / 14px — Small details, thoughtfully expressed.
            </Typography>
          </Box>
        </Box>
        <Box component="section" aria-labelledby="color-title" sx={{ mb: 12 }}>
          <Typography id="color-title" variant="h3" component="h2">
            Color
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mt: 2, mb: 6 }}
          >
            Purposeful accents that adapt to {mode} mode.
          </Typography>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
              gap: 6,
            }}
          >
            {(['primary', 'secondary'] as const).map((name) => (
              <Box
                key={name}
                sx={{
                  bgcolor: `${name}.main`,
                  color: `${name}.contrastText`,
                  borderRadius: 2,
                  p: 6,
                  minHeight: 150,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <Typography
                  sx={{ textTransform: 'capitalize', fontWeight: 700 }}
                >
                  {name}
                </Typography>
                <Typography component="code" variant="body2">
                  {theme.palette[name].main}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
        <Box component="section" aria-labelledby="spacing-title">
          <Typography id="spacing-title" variant="h3" component="h2">
            Spacing
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mt: 2, mb: 6 }}
          >
            A 4px base unit for predictable rhythm and balance.
          </Typography>
          <Box
            component="ul"
            sx={{
              listStyle: 'none',
              p: 0,
              m: 0,
              display: 'flex',
              gap: 6,
              flexWrap: 'wrap',
            }}
          >
            {spacingTokens.steps.map((step) => (
              <Box component="li" key={step} sx={{ minWidth: 64 }}>
                <Box
                  sx={{
                    height: 64,
                    display: 'flex',
                    alignItems: 'flex-end',
                    mb: 3,
                  }}
                >
                  <Box
                    sx={{
                      width: step * spacingTokens.unit,
                      height: 32,
                      bgcolor: 'primary.main',
                      borderRadius: 0.5,
                    }}
                  />
                </Box>
                <Typography variant="body2">
                  {step * spacingTokens.unit}px
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  space.{step}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
        {children}
        <Divider sx={{ mt: 12, mb: 6 }} />
        <Typography component="footer" variant="body2" color="text.secondary">
          Nexa Design System · Component release · React + MUI
        </Typography>
      </Container>
    </>
  )
}
