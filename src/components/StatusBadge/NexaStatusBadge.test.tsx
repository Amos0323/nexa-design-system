import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { renderNexa } from '../../test/renderNexa'
import { NexaStatusBadge } from './NexaStatusBadge'
describe('NexaStatusBadge', () => {
  it.each([
    'default',
    'success',
    'warning',
    'error',
    'info',
    'neutral',
  ] as const)(
    'communicates %s with visible text instead of color alone',
    (status) => {
      renderNexa(<NexaStatusBadge status={status} label="Needs review" />)
      expect(screen.getByText('Needs review')).toBeVisible()
      expect(screen.queryByRole('button')).not.toBeInTheDocument()
    },
  )
})
