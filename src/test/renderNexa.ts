import { createElement, StrictMode, type ReactElement } from 'react'
import { render } from '@testing-library/react'
import type { PaletteMode } from '@mui/material'
import { NexaProvider } from '../theme/NexaProvider'
export function renderNexa(ui: ReactElement, mode: PaletteMode = 'light') {
  return render(ui, {
    wrapper: ({ children }) =>
      createElement(
        StrictMode,
        null,
        createElement(NexaProvider, { initialMode: mode }, children),
      ),
  })
}
