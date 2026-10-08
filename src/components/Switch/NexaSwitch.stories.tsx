import type { Meta, StoryObj } from '@storybook/react-vite'
import { useArgs } from 'storybook/preview-api'
import { NexaSwitch, type NexaSwitchProps } from './NexaSwitch'
function ControlledSwitch(args: NexaSwitchProps) {
  const [, updateArgs] = useArgs<NexaSwitchProps>()
  return (
    <NexaSwitch
      {...args}
      onChange={(event) => updateArgs({ checked: event.target.checked })}
    />
  )
}
const meta = {
  title: 'Components/Switch',
  component: NexaSwitch,
  tags: ['autodocs'],
  render: ControlledSwitch,
  args: { label: 'Weekly email digest', checked: false, disabled: false },
  parameters: {
    docs: {
      description: {
        component:
          'A labeled binary setting. Uses a native checkbox with switch semantics; Space toggles it. Keep the label stable when the state changes.',
      },
    },
  },
} satisfies Meta<typeof NexaSwitch>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
export const Enabled: Story = { args: { checked: true } }
export const Disabled: Story = { args: { disabled: true } }
export const Dark: Story = { globals: { theme: 'dark' } }
