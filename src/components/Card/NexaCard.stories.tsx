import type { Meta, StoryObj } from '@storybook/react-vite'
import Typography from '@mui/material/Typography'
import { NexaCard } from './NexaCard'
import { NexaButton } from '../Button/NexaButton'
const meta = {
  title: 'Components/Card',
  component: NexaCard,
  tags: ['autodocs'],
  args: {
    title: 'Workspace details',
    subtitle: 'Manage how your team collaborates.',
    children: (
      <Typography>
        Compose forms, summaries, or other content inside a consistent surface.
      </Typography>
    ),
    headingLevel: 'h3',
  },
  argTypes: {
    headingLevel: {
      control: 'select',
      options: ['h2', 'h3', 'h4', 'h5', 'h6'],
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'A labeled section with title, optional subtitle, content, and actions. Set headingLevel to fit the page outline. The card itself is not clickable or focusable.',
      },
    },
  },
} satisfies Meta<typeof NexaCard>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
export const WithActions: Story = {
  args: {
    actions: (
      <>
        <NexaButton>Save</NexaButton>
        <NexaButton variant="text">Cancel</NexaButton>
      </>
    ),
  },
}
export const ContentOnly: Story = { args: { subtitle: undefined } }
export const Dark: Story = { globals: { theme: 'dark' } }
