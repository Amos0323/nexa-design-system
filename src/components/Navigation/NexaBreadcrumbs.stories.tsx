import type { Meta, StoryObj } from '@storybook/react-vite'
import { NexaBreadcrumbs } from './NexaBreadcrumbs'
const meta = {
  title: 'Components/Navigation/Breadcrumbs',
  component: NexaBreadcrumbs,
  tags: ['autodocs'],
  args: {
    items: [
      { label: 'Workspace', href: '#workspace' },
      { label: 'Learning', href: '#learning' },
      { label: 'Learner records' },
    ],
  },
  parameters: {
    docs: {
      description: {
        component:
          'Labeled navigation for a hierarchy. The last item is non-interactive and marked as the current page; preceding items link when href is supplied.',
      },
    },
  },
} satisfies Meta<typeof NexaBreadcrumbs>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
export const Dark: Story = { globals: { theme: 'dark' } }
