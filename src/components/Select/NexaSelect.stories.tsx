import type { Meta, StoryObj } from '@storybook/react-vite'
import { useArgs } from 'storybook/preview-api'
import { NexaSelect, type NexaSelectProps } from './NexaSelect'
function ControlledSelect(args: NexaSelectProps) {
  const [, updateArgs] = useArgs<NexaSelectProps>()
  return (
    <NexaSelect {...args} onValueChange={(value) => updateArgs({ value })} />
  )
}
const meta = {
  title: 'Components/Select',
  component: NexaSelect,
  tags: ['autodocs'],
  render: ControlledSelect,
  args: {
    label: 'Region',
    value: '',
    options: [
      { value: 'africa', label: 'Africa' },
      { value: 'europe', label: 'Europe' },
      { value: 'asia', label: 'Asia Pacific', disabled: true },
    ],
    onValueChange: () => {},
    helperText: 'Choose a hosting region.',
    disabled: false,
    required: false,
    error: false,
  },
  argTypes: {
    onValueChange: { control: false },
    value: { control: 'select', options: ['', 'africa', 'europe'] },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Controlled single select. NexaOption<T> uses unique non-empty strings, retaining literal union types in onValueChange. Empty string means no selection. MUI manages the popup and keyboard navigation.',
      },
    },
  },
} satisfies Meta<typeof NexaSelect>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
export const Selected: Story = { args: { value: 'africa' } }
export const Required: Story = { args: { required: true } }
export const Error: Story = {
  args: {
    error: true,
    required: true,
    helperText: 'Choose a region before continuing.',
  },
}
export const Disabled: Story = { args: { disabled: true, value: 'africa' } }
export const Dark: Story = { globals: { theme: 'dark' } }
