import type { PaletteMode, PaletteOptions } from '@mui/material'
import { colors, semanticColors } from '../tokens'
export const createPalette = (mode: PaletteMode): PaletteOptions => ({
  mode,
  ...Object.fromEntries(
    Object.entries(semanticColors).map(([role, values]) => [
      role,
      {
        main: values[mode],
        contrastText:
          mode === 'light' ? colors.neutral.white : colors.neutral.night,
      },
    ]),
  ),
  primary: {
    main: mode === 'light' ? colors.indigo.main : colors.indigo.light,
    contrastText:
      mode === 'light' ? colors.neutral.white : colors.neutral.night,
  },
  secondary: {
    main: mode === 'light' ? colors.teal.main : colors.teal.light,
    contrastText:
      mode === 'light' ? colors.neutral.white : colors.neutral.night,
  },
  background: {
    default: mode === 'light' ? colors.neutral.canvas : colors.neutral.night,
    paper: mode === 'light' ? colors.neutral.white : colors.neutral.surface,
  },
  text: {
    primary: mode === 'light' ? colors.neutral.ink : colors.neutral.lightText,
    secondary:
      mode === 'light' ? colors.neutral.muted : colors.neutral.darkMuted,
  },
  divider: mode === 'light' ? colors.neutral.border : colors.neutral.darkBorder,
})
