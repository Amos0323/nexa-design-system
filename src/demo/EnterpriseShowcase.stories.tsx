import type { Meta, StoryObj } from '@storybook/react-vite'
import { EnterpriseShowcase } from './EnterpriseShowcase'
const meta = {
  title: 'Patterns/Enterprise/Learning Administration',
  component: EnterpriseShowcase,
  tags: ['autodocs'],
  render: (args) => <EnterpriseShowcase key={args.initialState} {...args} />,
  parameters: {
    nexa: { fullBleed: true },
    docs: {
      description: {
        component:
          'Composition example only, not LearningOps. Summary numbers are illustrative and the grid contains 24 deterministic sample records. Date filtering, row selection, grid controls, refresh, and error recovery work locally.',
      },
    },
  },
} satisfies Meta<typeof EnterpriseShowcase>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
export const Loading: Story = { args: { initialState: 'loading' } }
export const Empty: Story = { args: { initialState: 'empty' } }
export const Error: Story = { args: { initialState: 'error' } }
export const Dark: Story = { globals: { theme: 'dark' } }
