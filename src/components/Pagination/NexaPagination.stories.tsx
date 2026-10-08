import type { Meta, StoryObj } from '@storybook/react-vite'
import { useArgs } from 'storybook/preview-api'
import { NexaPagination, type NexaPaginationProps } from './NexaPagination'
function Controlled(args: NexaPaginationProps) {
  const [, updateArgs] = useArgs<NexaPaginationProps>()
  return (
    <NexaPagination {...args} onPageChange={(page) => updateArgs({ page })} />
  )
}
const meta = {
  title: 'Components/Navigation/Pagination',
  component: NexaPagination,
  tags: ['autodocs'],
  args: { page: 1, count: 12, onPageChange: () => {}, label: 'Course pages' },
  render: Controlled,
  parameters: {
    docs: {
      description: {
        component:
          'One-based pagination for non-grid lists. The consumer slices or fetches content. Do not use this to replace the Data Grid footer.',
      },
    },
  },
} satisfies Meta<typeof NexaPagination>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
export const Disabled: Story = { args: { disabled: true } }
export const Dark: Story = { globals: { theme: 'dark' } }
