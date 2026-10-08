import type { Meta, StoryObj } from '@storybook/react-vite'
import { useArgs } from 'storybook/preview-api'
import { NexaCheckbox, type NexaCheckboxProps } from './NexaCheckbox'
function ControlledCheckbox(args: NexaCheckboxProps) {
  const [, updateArgs] = useArgs<NexaCheckboxProps>()
  return (
    <NexaCheckbox
      {...args}
      onChange={(event) => updateArgs({ checked: event.target.checked })}
    />
  )
}
const meta = {
  title: 'Components/Checkbox',
  component: NexaCheckbox,
  tags: ['autodocs'],
  render: ControlledCheckbox,
  args: {
    label: 'I have reviewed the access policy',
    checked: false,
    disabled: false,
    required: false,
    error: false,
  },
  parameters: {
    docs: {
      description: {
        component:
          'Labeled native checkbox. Checked and defaultChecked follow React controlled/uncontrolled conventions; onChange receives the native input event.',
      },
    },
  },
} satisfies Meta<typeof NexaCheckbox>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
export const Checked: Story = { args: { checked: true } }
export const Disabled: Story = { args: { disabled: true } }
export const Error: Story = {
  args: {
    required: true,
    error: true,
    helperText: 'Review the policy to continue.',
  },
}
export const Dark: Story = { globals: { theme: 'dark' } }
