import type { Meta, StoryObj } from '@storybook/react-vite'
import Typography from '@mui/material/Typography'
import { NexaAppShell } from './NexaAppShell'
const meta = {
  title: 'Components/Navigation/AppShell',
  component: NexaAppShell,
  tags: ['autodocs'],
  args: {
    title: 'Nexa workspace',
    activeId: 'overview',
    navigation: [
      { id: 'overview', label: 'Overview', href: '#overview' },
      { id: 'records', label: 'Records', href: '#records', count: 24 },
    ],
    children: (
      <>
        <Typography variant="h1">Workspace overview</Typography>
        <Typography>
          Resize below 1200px to explore the keyboard-accessible navigation
          drawer.
        </Typography>
      </>
    ),
  },
  parameters: {
    nexa: { fullBleed: true },
    docs: {
      description: {
        component:
          'Full-page shell: one main landmark, desktop sidebar at lg (1200px), temporary modal navigation below lg. MUI traps and restores focus; closing or selecting a link dismisses the drawer.',
      },
    },
  },
} satisfies Meta<typeof NexaAppShell>
export default meta
type Story = StoryObj<typeof meta>
export const Desktop: Story = {}
export const Responsive: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Use a 390px browser/preview viewport to exercise the mobile drawer.',
      },
    },
  },
}
export const Dark: Story = { globals: { theme: 'dark' } }
