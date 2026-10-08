import type { Meta, StoryObj } from '@storybook/react-vite'
import { useArgs } from 'storybook/preview-api'
import { NexaRadioGroup, type NexaRadioGroupProps } from './NexaRadioGroup'
function ControlledRadioGroup(args: NexaRadioGroupProps) {
  const [, updateArgs] = useArgs<NexaRadioGroupProps>()
  return (
    <NexaRadioGroup
      {...args}
      onValueChange={(value) => updateArgs({ value })}
    />
  )
}
const meta = {
  title: 'Components/RadioGroup',
  component: NexaRadioGroup,
  tags: ['autodocs'],
  render: ControlledRadioGroup,
  args: {
    label: 'Workspace access',
    value: 'restricted',
    options: [
      { value: 'restricted', label: 'Invite only' },
      { value: 'team', label: 'Everyone in the team' },
      { value: 'public', label: 'Public (unavailable)', disabled: true },
    ],
    onValueChange: () => {},
    orientation: 'vertical',
    disabled: false,
    error: false,
    required: false,
  },
  argTypes: {
    orientation: {
      control: 'inline-radio',
      options: ['vertical', 'horizontal'],
    },
    onValueChange: { control: false },
    value: { control: 'select', options: ['', 'restricted', 'team'] },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Controlled typed radio options in a fieldset with a legend. Native radio inputs provide arrow-key navigation. Disabled options are skipped.',
      },
    },
  },
} satisfies Meta<typeof NexaRadioGroup>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
export const Horizontal: Story = { args: { orientation: 'horizontal' } }
export const Disabled: Story = { args: { disabled: true } }
export const Error: Story = {
  args: {
    value: '',
    error: true,
    required: true,
    helperText: 'Choose an access policy.',
  },
}
export const Dark: Story = { globals: { theme: 'dark' } }
