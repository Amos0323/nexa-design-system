import {
  screen,
  waitForElementToBeRemoved,
  within,
} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { renderNexa } from '../test/renderNexa'
import { ComponentsShowcase } from './ComponentsShowcase'
describe('component showcase', () => {
  it('validates access-policy confirmation before opening review', async () => {
    renderNexa(<ComponentsShowcase />)
    const user = userEvent.setup()
    const policy = screen.getByRole('checkbox', {
      name: /reviewed the access policy/,
    })
    await user.click(screen.getByRole('button', { name: 'Review changes' }))
    expect(policy).toHaveFocus()
    expect(policy).toBeInvalid()
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })
  it('reviews, saves, and dismisses feedback', async () => {
    renderNexa(<ComponentsShowcase />)
    const user = userEvent.setup()
    await user.click(
      screen.getByRole('checkbox', { name: /reviewed the access policy/ }),
    )
    await user.click(screen.getByRole('button', { name: 'Review changes' }))
    const dialog = screen.getByRole('dialog', {
      name: 'Save workspace settings?',
    })
    expect(within(dialog).getByText('Customer experience')).toBeVisible()
    const save = within(dialog).getByRole('button', { name: 'Save changes' })
    await user.click(save)
    expect(save).toBeDisabled()
    await waitForElementToBeRemoved(dialog, { timeout: 3000 })
    expect(
      screen.getByText(/Settings saved for Customer experience/),
    ).toBeVisible()
    await user.click(
      screen.getByRole('button', { name: 'Dismiss notification' }),
    )
    expect(screen.queryByText(/Settings saved for/)).not.toBeInTheDocument()
  })
  it('focuses an empty required name and resets the form', async () => {
    renderNexa(<ComponentsShowcase />)
    const user = userEvent.setup()
    const input = screen.getByRole('textbox', { name: /Workspace name/ })
    await user.clear(input)
    await user.click(screen.getByRole('button', { name: 'Review changes' }))
    expect(input).toHaveFocus()
    expect(input).toHaveAccessibleDescription('Enter a workspace name.')
    await user.click(screen.getByRole('button', { name: 'Reset form' }))
    expect(input).toHaveValue('Customer experience')
    expect(input).not.toHaveAttribute('aria-invalid', 'true')
  })
})
