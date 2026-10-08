import type { Meta, StoryObj } from '@storybook/react-vite'
import SearchOutlined from '@mui/icons-material/SearchOutlined'
import { NexaEmptyState } from './NexaEmptyState'
import { NexaButton } from '../Button/NexaButton'
const meta = {
  title: 'Components/Feedback/EmptyState',
  component: NexaEmptyState,
  tags: ['autodocs'],
  args: {
    title: 'No learners yet',
    description: 'Add your first learner to get started.',
  },
  parameters: {
    docs: {
      description: {
        component:
          'A content state with a clear explanation and optional next action. Icons are decorative. The title is a paragraph to avoid imposing a heading level inside grids or other nested layouts.',
      },
    },
  },
} satisfies Meta<typeof NexaEmptyState>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
export const WithAction: Story = {
  args: {
    icon: <SearchOutlined />,
    action: <NexaButton>Add learner</NexaButton>,
  },
}
export const Dark: Story = { globals: { theme: 'dark' } }
