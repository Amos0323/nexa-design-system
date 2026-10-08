import type { Meta, StoryObj } from '@storybook/react-vite'
import { NexaTopBar } from './NexaTopBar'
import { NexaButton } from '../Button/NexaButton'
const meta = {
  title: 'Components/Navigation/TopBar',
  component: NexaTopBar,
  tags: ['autodocs'],
  args: {
    title: 'Learning administration',
    actions: <NexaButton variant="text">Account</NexaButton>,
  },
  parameters: {
    docs: {
      description: {
        component:
          'Application header with composable actions. Pass onMenuClick only when navigation is collapsible; AppShell owns expanded state and the drawer.',
      },
    },
  },
} satisfies Meta<typeof NexaTopBar>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
export const WithMenu: Story = {
  args: { onMenuClick: () => {}, menuOpen: false },
}
export const Dark: Story = { globals: { theme: 'dark' } }
