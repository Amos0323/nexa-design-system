import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { createRef } from 'react'
import { renderNexa } from '../../test/renderNexa'
import { NexaTextField } from './NexaTextField'
describe('NexaTextField', () => {
  it('associates label and helper text with the input and accepts typing', async () => {
    renderNexa(
      <NexaTextField label="Name" helperText="Use your full name." required />,
    )
    const input = screen.getByRole('textbox', { name: 'Name' })
    expect(input).toBeRequired()
    expect(input).toHaveAccessibleDescription('Use your full name.')
    await userEvent.type(input, 'Avery')
    expect(input).toHaveValue('Avery')
  })
  it('exposes an invalid field and preserves external descriptions', () => {
    renderNexa(
      <>
        <p id="policy">Company policy.</p>
        <NexaTextField
          label="Name"
          error
          helperText="Enter a name."
          inputProps={{ 'aria-describedby': 'policy' }}
        />
      </>,
    )
    const input = screen.getByRole('textbox')
    expect(input).toBeInvalid()
    expect(input).toHaveAccessibleDescription('Enter a name. Company policy.')
  })
  it('prevents editing a disabled field', async () => {
    renderNexa(<NexaTextField label="Name" disabled defaultValue="Avery" />)
    const input = screen.getByRole('textbox')
    await userEvent.type(input, 'Other')
    expect(input).toBeDisabled()
    expect(input).toHaveValue('Avery')
  })
  it('keeps repeated labels uniquely associated and exposes input refs', () => {
    const ref = createRef<HTMLInputElement>()
    renderNexa(
      <>
        <NexaTextField
          label="Name"
          helperText="First"
          inputRef={ref}
          startAdornment="#"
          endAdornment="USD"
        />
        <NexaTextField label="Name" helperText="Second" />
      </>,
    )
    const inputs = screen.getAllByRole('textbox')
    expect(inputs[0].id).not.toBe(inputs[1].id)
    expect(inputs[0]).toHaveAccessibleDescription('First')
    expect(inputs[1]).toHaveAccessibleDescription('Second')
    expect(ref.current).toBe(inputs[0])
  })
})
