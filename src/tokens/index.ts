export const colors = {
  indigo: { main: '#4338CA', light: '#A5B4FC' },
  teal: { main: '#0F766E', light: '#5EEAD4' },
  neutral: {
    white: '#FFFFFF',
    canvas: '#F6F7FB',
    ink: '#172033',
    muted: '#566176',
    night: '#111827',
    surface: '#1F2937',
    lightText: '#F3F4F6',
    darkMuted: '#B8C2D3',
    border: '#DDE1EB',
    darkBorder: '#3B475B',
  },
} as const
export const typographyTokens = {
  fontFamily: '"Segoe UI", Roboto, Arial, sans-serif',
  weight: { regular: 400, medium: 500, bold: 700 },
  size: {
    small: '0.875rem',
    body: '1rem',
    title: '1.5rem',
    heading: '2.25rem',
    display: '3rem',
  },
} as const
export const spacingTokens = {
  unit: 4,
  steps: [1, 2, 3, 4, 6, 8, 12, 16],
} as const
export const radiusTokens = { small: 4, medium: 8, large: 16 } as const
export const shadowTokens = {
  none: 'none',
  subtle: '0 2px 8px rgb(17 24 39 / 6%)',
  raised: '0 8px 24px rgb(17 24 39 / 12%)',
} as const

/** Semantic foreground colors, paired with explicit contrasting text. */
export const semanticColors = {
  success: { light: '#166534', dark: '#86EFAC' },
  warning: { light: '#92400E', dark: '#FCD34D' },
  error: { light: '#B42318', dark: '#FDA29B' },
  info: { light: '#075985', dark: '#7DD3FC' },
} as const

export const layoutTokens = { sidebarWidth: 256 } as const
