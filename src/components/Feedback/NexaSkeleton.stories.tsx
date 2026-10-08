import type { Meta, StoryObj } from '@storybook/react-vite'
import { NexaSkeleton } from './NexaSkeleton'
const meta = {
  title: 'Components/Feedback/Skeleton',
  component: NexaSkeleton,
  tags: ['autodocs'],
  args: { variant: 'card', label: 'Loading card…' },
  argTypes: {
    variant: { control: 'select', options: ['card', 'table', 'metric'] },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Static card, table, and metric patterns reserve space without shimmer. One accessible status label replaces the decorative placeholder shapes.',
      },
    },
  },
} satisfies Meta<typeof NexaSkeleton>
export default meta
type Story = StoryObj<typeof meta>
export const Card: Story = {}
export const Table: Story = {
  args: { variant: 'table', label: 'Loading table…' },
}
export const Metric: Story = {
  args: { variant: 'metric', label: 'Loading metric…' },
}
export const Dark: Story = { globals: { theme: 'dark' } }
