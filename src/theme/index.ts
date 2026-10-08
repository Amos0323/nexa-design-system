import { createTheme, type PaletteMode } from '@mui/material'
import { createPalette } from './palette'
import { typography } from './typography'
import { spacing } from './spacing'
import { breakpoints } from './breakpoints'
import { shape } from './shape'
import { components } from './components'
export const createNexaTheme = (mode: PaletteMode = 'light') =>
  createTheme({
    palette: createPalette(mode),
    typography,
    spacing,
    breakpoints,
    shape,
    components,
  })
