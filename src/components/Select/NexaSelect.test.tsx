import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useState } from 'react'
import { describe, expect, it, vi } from 'vitest'
import { renderNexa } from '../../test/renderNexa'
import { NexaSelect } from './NexaSelect'
const options = [
  { value: 'africa', label: 'Africa' },
  { value: 'europe', label: 'Europe' },
  { value: 'asia', label: 'Asia', disabled: true },
] as const
function Example() {
  const [value, setValue] = useState<'africa' | 'europe' | 'asia' | ''>('')
  return (
    <NexaSelect
      label="Region"
      value={value}
      onValueChange={setValue}
      options={options}
    />
  )
}
describe('NexaSelect', () => {
  it('selects a typed value from the popup', async () => {
    renderNexa(<Example />)
    const user = userEvent.setup()
    await user.click(screen.getByRole('combobox'))
    await user.click(screen.getByRole('option', { name: 'Europe' }))
    expect(screen.getByRole('combobox')).toHaveTextContent('Europe')
  })
  it('opens and chooses an option using the keyboard', async () => {
    renderNexa(<Example />)
    const user = userEvent.setup()
    await user.tab()
    await user.keyboard('{ArrowDown}{Enter}')
    expect(screen.getByRole('combobox')).toHaveTextContent('Africa')
  })
  it('associates label, required state, and error help', () => {
    renderNexa(
      <NexaSelect
        label="Region"
        value=""
        options={options}
        onValueChange={() => {}}
        error
        required
        helperText="Choose a region."
      />,
    )
    const select = screen.getByRole('combobox', { name: /Region/ })
    expect(select).toHaveAttribute('aria-required', 'true')
    expect(select).toHaveAttribute('aria-invalid', 'true')
    expect(select).toHaveAccessibleDescription('Choose a region.')
  })
  it('does not open a disabled select', async () => {
    const change = vi.fn()
    renderNexa(
      <NexaSelect
        label="Region"
        value=""
        options={options}
        onValueChange={change}
        disabled
      />,
    )
    await userEvent.click(screen.getByRole('combobox'))
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
    expect(change).not.toHaveBeenCalled()
  })
  it('marks unavailable options disabled', async () => {
    renderNexa(<Example />)
    await userEvent.click(screen.getByRole('combobox'))
    expect(screen.getByRole('option', { name: 'Asia' })).toHaveAttribute(
      'aria-disabled',
      'true',
    )
  })
})
