import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { renderNexa } from '../../test/renderNexa'
import { NexaSwitch } from './NexaSwitch'
describe('NexaSwitch', () => {
  it('has a stable label and toggles with Space', async () => {
    renderNexa(<NexaSwitch label="Weekly digest" />)
    const user = userEvent.setup()
    await user.tab()
    await user.keyboard(' ')
    expect(screen.getByRole('switch', { name: 'Weekly digest' })).toBeChecked()
    await user.keyboard(' ')
    expect(
      screen.getByRole('switch', { name: 'Weekly digest' }),
    ).not.toBeChecked()
  })
  it('prevents changes when disabled', async () => {
    const change = vi.fn()
    renderNexa(<NexaSwitch label="Weekly digest" disabled onChange={change} />)
    await userEvent.click(screen.getByText('Weekly digest'))
    expect(screen.getByRole('switch')).toBeDisabled()
    expect(change).not.toHaveBeenCalled()
  })
})
