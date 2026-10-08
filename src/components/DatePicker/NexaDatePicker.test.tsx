import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useState } from 'react'
import dayjs, { type Dayjs } from 'dayjs'
import { describe, expect, it } from 'vitest'
import { renderNexa } from '../../test/renderNexa'
import { NexaDatePicker } from './NexaDatePicker'
function Example() {
  const [value, setValue] = useState<Dayjs | null>(dayjs('2026-10-15'))
  return (
    <>
      <NexaDatePicker label="Due date" value={value} onChange={setValue} />
      <output>{value?.format('YYYY-MM-DD')}</output>
    </>
  )
}
describe('NexaDatePicker', () => {
  it('changes a date section with the keyboard', async () => {
    renderNexa(<Example />)
    const user = userEvent.setup()
    await user.click(screen.getByRole('spinbutton', { name: 'Day' }))
    await user.keyboard('{ArrowUp}')
    expect(screen.getByText('2026-10-16')).toBeVisible()
  })
  it('communicates invalid date ranges', async () => {
    renderNexa(
      <NexaDatePicker
        label="Due date"
        value={dayjs('2026-09-20')}
        minDate={dayjs('2026-10-01')}
        helperText="Choose a date."
      />,
    )
    await waitFor(() =>
      expect(
        screen.getByText('Choose a date on or after the minimum date.'),
      ).toBeVisible(),
    )
    expect(screen.getByRole('group', { name: 'Due date' })).toHaveAttribute(
      'aria-invalid',
      'true',
    )
  })
  it('associates a required field with explicit error help', () => {
    renderNexa(
      <NexaDatePicker
        label="Due date"
        required
        error
        helperText="Date required."
      />,
    )
    const field = screen.getByRole('group', { name: /Due date/ })
    expect(field).toHaveAccessibleDescription('Date required.')
    expect(field).toHaveAttribute('aria-invalid', 'true')
  })
  it('disables calendar opening and date editing', () => {
    renderNexa(<NexaDatePicker label="Due date" disabled />)
    expect(screen.getByRole('button', { name: /Choose date/ })).toBeDisabled()
    for (const section of screen.getAllByRole('spinbutton'))
      expect(section).toHaveAttribute('aria-disabled', 'true')
  })
})
