import type { Meta, StoryObj } from '@storybook/react-vite'
import { NexaTextField } from './NexaTextField'
const meta = {
  title: 'Components/TextField',
  component: NexaTextField,
  tags: ['autodocs'],
  args: {
    label: 'Workspace name',
    placeholder: 'e.g. Customer experience',
    helperText: 'Visible to everyone in your workspace.',
    required: false,
    disabled: false,
    error: false,
  },
  parameters: {
    docs: {
      description: {
        component:
          'Outlined input with a required visible label and stable helper association. Supports native attributes via inputProps and focus via inputRef. Supply controlled value/onChange or an uncontrolled defaultValue.',
      },
    },
  },
} satisfies Meta<typeof NexaTextField>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
export const Required: Story = { args: { required: true } }
export const Error: Story = {
  args: { error: true, helperText: 'Enter a workspace name.' },
}
export const Disabled: Story = {
  args: { disabled: true, defaultValue: 'Managed workspace' },
}
export const Adornments: Story = {
  args: {
    label: 'Monthly budget',
    startAdornment: 'R',
    endAdornment: 'ZAR',
    helperText: 'Excludes tax.',
    inputProps: { inputMode: 'decimal' },
  },
}
export const Multiline: Story = {
  args: { label: 'Description', multiline: true, minRows: 3 },
}
export const Dark: Story = { globals: { theme: 'dark' } }
