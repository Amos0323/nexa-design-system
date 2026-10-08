import type { Meta, StoryObj } from '@storybook/react-vite'
import { FoundationsDemo } from './FoundationsDemo'
import { NexaProvider } from '../theme/NexaProvider'
const meta = {
  title: 'Foundations/Overview',
  component: FoundationsDemo,
} satisfies Meta<typeof FoundationsDemo>
export default meta
type Story = StoryObj<typeof meta>
export const Light: Story = {
  render: () => (
    <NexaProvider>
      <FoundationsDemo />
    </NexaProvider>
  ),
}
export const Dark: Story = {
  render: () => (
    <NexaProvider initialMode="dark">
      <FoundationsDemo />
    </NexaProvider>
  ),
}
