import type { Meta, StoryObj } from '@storybook/react-vite'
import Stack from '@mui/material/Stack'
import { NexaStatusBadge } from './NexaStatusBadge'
const meta = {
  title: 'Components/StatusBadge',
  component: NexaStatusBadge,
  tags: ['autodocs'],
  args: { label: 'Draft', status: 'default', size: 'small' },
  argTypes: {
    status: {
      control: 'select',
      options: ['default', 'success', 'warning', 'error', 'info', 'neutral'],
    },
    size: { control: 'inline-radio', options: ['small', 'medium'] },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Non-interactive status chip. Always supply a meaningful text label; color alone must not communicate status. Neutral uses an outline.',
      },
    },
  },
} satisfies Meta<typeof NexaStatusBadge>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
export const Statuses: Story = {
  render: () => (
    <Stack direction="row" useFlexGap spacing={3} sx={{ flexWrap: 'wrap' }}>
      {(
        ['default', 'success', 'warning', 'error', 'info', 'neutral'] as const
      ).map((status) => (
        <NexaStatusBadge key={status} status={status} label={status} />
      ))}
    </Stack>
  ),
}
export const Dark: Story = { globals: { theme: 'dark' } }
