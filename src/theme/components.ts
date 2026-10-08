import type { Components, Theme } from '@mui/material'
export const components: Components<Theme> = {
  MuiButtonBase: {
    styleOverrides: {
      root: {
        '&.Mui-focusVisible': {
          outline: '3px solid currentColor',
          outlineOffset: 2,
        },
      },
    },
  },
  MuiFormHelperText: {
    styleOverrides: {
      root: ({ theme }) => ({
        '&.Mui-disabled': { color: theme.palette.text.secondary },
      }),
    },
  },
  MuiButton: { defaultProps: { disableElevation: true } },
  MuiCssBaseline: {
    styleOverrides: {
      body: { margin: 0 },
      '*': { boxSizing: 'border-box' },
      'a:focus-visible, button:focus-visible': {
        outline: '3px solid currentColor',
        outlineOffset: 4,
      },
    },
  },
}
