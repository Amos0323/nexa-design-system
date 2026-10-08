import { describe, expect, it } from 'vitest'
import { getContrastRatio } from '@mui/material'
import { createNexaTheme } from '.'
describe('theme contract', () => {
  it.each(['light', 'dark'] as const)(
    '%s theme has accessible text pairs and consistent spacing',
    (mode) => {
      const theme = createNexaTheme(mode)
      expect(theme.palette.mode).toBe(mode)
      expect(theme.spacing(4)).toBe('16px')
      expect(theme.shape.borderRadius).toBe(8)
      for (const color of [
        theme.palette.primary,
        theme.palette.secondary,
        theme.palette.success,
        theme.palette.warning,
        theme.palette.error,
        theme.palette.info,
      ])
        expect(
          getContrastRatio(color.main, color.contrastText),
        ).toBeGreaterThanOrEqual(4.5)
      for (const surface of [
        theme.palette.background.default,
        theme.palette.background.paper,
      ]) {
        expect(
          getContrastRatio(theme.palette.text.primary, surface),
        ).toBeGreaterThanOrEqual(4.5)
        expect(
          getContrastRatio(theme.palette.text.secondary, surface),
        ).toBeGreaterThanOrEqual(4.5)
      }
    },
  )
})
