import { useMemo, useState, type PropsWithChildren } from 'react'
import { CssBaseline, ThemeProvider, type PaletteMode } from '@mui/material'
import { ColorModeContext } from '../hooks/useColorMode'
import { createNexaTheme } from '.'
export function NexaProvider({
  children,
  initialMode = 'light',
}: PropsWithChildren<{ initialMode?: PaletteMode }>) {
  const [mode, setMode] = useState<PaletteMode>(initialMode)
  const theme = useMemo(() => createNexaTheme(mode), [mode])
  const value = useMemo(
    () => ({
      mode,
      toggleMode: () =>
        setMode((current) => (current === 'light' ? 'dark' : 'light')),
    }),
    [mode],
  )
  return (
    <ColorModeContext.Provider value={value}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}
