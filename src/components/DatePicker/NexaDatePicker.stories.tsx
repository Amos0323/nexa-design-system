import { useState } from 'react'
import dayjs, { type Dayjs } from 'dayjs'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { NexaDatePicker, type NexaDatePickerProps } from './NexaDatePicker'
function Example(args: NexaDatePickerProps) {
  const [value, setValue] = useState<Dayjs | null>(null)
  return <NexaDatePicker {...args} value={value} onChange={setValue} />
}
const meta = {
  title: 'Components/Inputs/DatePicker',
  component: NexaDatePicker,
  tags: ['autodocs'],
  args: {
    label: 'Due date',
    helperText: 'Use the calendar or edit the date sections.',
  },
  render: (args) => <Example {...args} />,
  parameters: {
    docs: {
      description: {
        component:
          'Day.js adapter with Dayjs | null values. Retains the accessible segmented MUI field. Range violations receive an error and explanation; callers can subscribe to onError/onChange validation context.',
      },
    },
  },
} satisfies Meta<typeof NexaDatePicker>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
export const Required: Story = { args: { required: true } }
export const Disabled: Story = { args: { disabled: true } }
export const Error: Story = {
  args: {
    error: true,
    helperText: 'A due date is required before publishing.',
  },
}
export const DateRange: Story = {
  args: {
    minDate: dayjs('2026-10-01'),
    maxDate: dayjs('2026-10-31'),
    referenceDate: dayjs('2026-10-15'),
    helperText: 'Choose a date in October 2026.',
  },
}
export const Dark: Story = { globals: { theme: 'dark' } }
