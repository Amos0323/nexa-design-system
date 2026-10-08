import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useState } from 'react'
import { describe, expect, it, vi } from 'vitest'
import { renderNexa } from '../../test/renderNexa'
import { NexaRadioGroup } from './NexaRadioGroup'
const options = [
  { value: 'private', label: 'Private' },
  { value: 'team', label: 'Team' },
  { value: 'public', label: 'Public', disabled: true },
] as const
function Example() {
  const [value, setValue] = useState<'private' | 'team' | 'public'>('private')
  return (
    <NexaRadioGroup
      label="Access"
      value={value}
      onValueChange={setValue}
      options={options}
    />
  )
}
describe('NexaRadioGroup', () => {
  it('supports arrow-key selection and skips disabled options', async () => {
    renderNexa(<Example />)
    const user = userEvent.setup()
    await user.tab()
    await user.keyboard('{ArrowRight}')
    expect(screen.getByRole('radio', { name: 'Team' })).toBeChecked()
    await user.keyboard('{ArrowRight}')
    expect(screen.getByRole('radio', { name: 'Private' })).toBeChecked()
    expect(screen.getByRole('radio', { name: 'Public' })).toBeDisabled()
  })
  it('associates group and individual inputs with helper text', () => {
    renderNexa(
      <NexaRadioGroup
        label="Access"
        value=""
        options={options}
        onValueChange={() => {}}
        required
        error
        helperText="Choose access."
      />,
    )
    expect(
      screen.getByRole('radiogroup', { name: /Access/ }),
    ).toHaveAccessibleDescription('Choose access.')
    for (const radio of screen.getAllByRole('radio')) {
      expect(radio).toHaveAccessibleDescription('Choose access.')
      expect(radio).toHaveAttribute('required')
      expect(radio).toHaveAttribute('aria-invalid', 'true')
    }
  })
  it('disables every option when the group is disabled', async () => {
    const change = vi.fn()
    renderNexa(
      <NexaRadioGroup
        label="Access"
        value="private"
        options={options}
        onValueChange={change}
        disabled
      />,
    )
    await userEvent.click(screen.getByText('Team'))
    expect(change).not.toHaveBeenCalled()
    for (const radio of screen.getAllByRole('radio'))
      expect(radio).toBeDisabled()
  })
})
