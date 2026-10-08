import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { renderNexa } from '../../test/renderNexa'
import { NexaCheckbox } from './NexaCheckbox'
describe('NexaCheckbox', () => {
  it('toggles with Space and with its label', async () => {
    renderNexa(<NexaCheckbox label="Accept policy" />)
    const user = userEvent.setup()
    await user.tab()
    await user.keyboard(' ')
    expect(screen.getByRole('checkbox')).toBeChecked()
    await user.click(screen.getByText('Accept policy'))
    expect(screen.getByRole('checkbox')).not.toBeChecked()
  })
  it('associates required and error help with the input', () => {
    renderNexa(
      <NexaCheckbox
        label="Accept policy"
        required
        error
        helperText="Acceptance is required."
      />,
    )
    const input = screen.getByRole('checkbox', { name: /Accept policy/ })
    expect(input).toBeRequired()
    expect(input).toBeInvalid()
    expect(input).toHaveAccessibleDescription('Acceptance is required.')
  })
  it('cannot change when disabled', async () => {
    const change = vi.fn()
    renderNexa(
      <NexaCheckbox
        label="Accept policy"
        defaultChecked
        disabled
        onChange={change}
      />,
    )
    await userEvent.click(screen.getByText('Accept policy'))
    expect(screen.getByRole('checkbox')).toBeDisabled()
    expect(screen.getByRole('checkbox')).toBeChecked()
    expect(change).not.toHaveBeenCalled()
  })
})
