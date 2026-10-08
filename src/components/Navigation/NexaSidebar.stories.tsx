import type { Meta, StoryObj } from '@storybook/react-vite'
import SchoolOutlined from '@mui/icons-material/SchoolOutlined'
import { NexaSidebar } from './NexaSidebar'
const meta = {
  title: 'Components/Navigation/Sidebar',
  component: NexaSidebar,
  tags: ['autodocs'],
  args: {
    activeId: 'learning',
    items: [
      {
        id: 'learning',
        label: 'Learning',
        href: '#learning',
        icon: <SchoolOutlined />,
        count: 117,
      },
      { id: 'reports', label: 'Reports', href: '#reports' },
    ],
  },
  parameters: {
    docs: {
      description: {
        component:
          'Semantic navigation with real links, aria-current, optional decorative icons and visible counts. AppShell composes the same sidebar in desktop and mobile contexts.',
      },
    },
  },
} satisfies Meta<typeof NexaSidebar>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
export const ActiveReports: Story = { args: { activeId: 'reports' } }
export const Dark: Story = { globals: { theme: 'dark' } }
