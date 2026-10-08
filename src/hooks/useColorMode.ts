import { createContext, useContext } from 'react'
import type { PaletteMode } from '@mui/material'
interface ColorModeValue {
  mode: PaletteMode
  toggleMode: () => void
}
export const ColorModeContext = createContext<ColorModeValue | undefined>(
  undefined,
)
export function useColorMode() {
  const context = useContext(ColorModeContext)
  if (!context) throw new Error('useColorMode must be used within NexaProvider')
  return context
}
