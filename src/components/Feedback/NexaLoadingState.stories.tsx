import type { Meta, StoryObj } from '@storybook/react-vite'
import { NexaLoadingState } from './NexaLoadingState'
const meta = {
  title: 'Components/Feedback/LoadingState',
  component: NexaLoadingState,
  tags: ['autodocs'],
  args: { label: 'Loading learner records…' },
  parameters: {
    docs: {
      description: {
        component:
          'A polite loading announcement with reserved height. Match minHeight to the content being replaced. The spinner respects reduced motion.',
      },
    },
  },
} satisfies Meta<typeof NexaLoadingState>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
export const Dark: Story = { globals: { theme: 'dark' } }
