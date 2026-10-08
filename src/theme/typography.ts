import type { TypographyVariantsOptions } from '@mui/material'
import { typographyTokens as token } from '../tokens'
export const typography: TypographyVariantsOptions = {
  fontFamily: token.fontFamily,
  h1: {
    fontSize: token.size.display,
    fontWeight: token.weight.bold,
    lineHeight: 1.15,
    letterSpacing: '-0.04em',
  },
  h2: {
    fontSize: token.size.heading,
    fontWeight: token.weight.bold,
    lineHeight: 1.25,
    letterSpacing: '-0.03em',
  },
  h3: {
    fontSize: token.size.title,
    fontWeight: token.weight.bold,
    lineHeight: 1.4,
  },
  body1: { fontSize: token.size.body, lineHeight: 1.7 },
  body2: { fontSize: token.size.small, lineHeight: 1.6 },
  button: { textTransform: 'none', fontWeight: token.weight.bold },
}
