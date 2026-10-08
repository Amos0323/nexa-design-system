import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { renderNexa } from '../../test/renderNexa'
import { NexaAlert } from './NexaAlert'
describe('NexaAlert', () => {
  it.each(['info', 'success'] as const)('announces %s politely', (severity) => {
    renderNexa(<NexaAlert severity={severity}>Saved</NexaAlert>)
    expect(screen.getByRole('status')).toHaveTextContent('Saved')
  })
  it.each(['warning', 'error'] as const)(
    'announces %s urgently',
    (severity) => {
      renderNexa(<NexaAlert severity={severity}>Review required</NexaAlert>)
      expect(screen.getByRole('alert')).toHaveTextContent('Review required')
    },
  )
  it('provides a labeled keyboard-accessible dismiss action', async () => {
    const dismiss = vi.fn()
    renderNexa(
      <NexaAlert onDismiss={dismiss} dismissLabel="Dismiss saved message">
        Saved
      </NexaAlert>,
    )
    const user = userEvent.setup()
    await user.tab()
    expect(
      screen.getByRole('button', { name: 'Dismiss saved message' }),
    ).toHaveFocus()
    await user.keyboard('{Enter}')
    expect(dismiss).toHaveBeenCalledTimes(1)
  })
  it('does not render a dismiss button without a handler', () => {
    renderNexa(<NexaAlert>Saved</NexaAlert>)
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })
})
