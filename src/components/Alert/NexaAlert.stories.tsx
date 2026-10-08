import type { Meta, StoryObj } from '@storybook/react-vite'
import { NexaAlert, type NexaAlertProps } from './NexaAlert'
import { NexaButton } from '../Button/NexaButton'
import { useState } from 'react'
const meta = {
  title: 'Components/Alert',
  component: NexaAlert,
  tags: ['autodocs'],
  args: {
    severity: 'info',
    title: 'Workspace update',
    children: 'Your changes apply to this workspace only.',
  },
  argTypes: {
    severity: {
      control: 'select',
      options: ['success', 'info', 'warning', 'error'],
    },
    variant: { control: 'select', options: ['standard', 'outlined', 'filled'] },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Success and info use polite status announcements; warning and error use alert semantics. Dismissal is controlled by the consumer. Avoid announcing static content unnecessarily.',
      },
    },
  },
} satisfies Meta<typeof NexaAlert>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
export const Success: Story = {
  args: { severity: 'success', children: 'Changes saved.' },
}
export const Warning: Story = {
  args: { severity: 'warning', children: 'Your access policy needs review.' },
}
export const Error: Story = {
  args: {
    severity: 'error',
    children: 'Changes could not be saved. Try again.',
  },
}
function DismissibleAlert(args: NexaAlertProps) {
  const [visible, setVisible] = useState(true)
  return visible ? (
    <NexaAlert {...args} onDismiss={() => setVisible(false)}>
      Your changes have been saved.
    </NexaAlert>
  ) : (
    <NexaButton onClick={() => setVisible(true)}>Show notification</NexaButton>
  )
}
export const Dismissible: Story = {
  render: (args) => <DismissibleAlert {...args} />,
}
export const Dark: Story = { globals: { theme: 'dark' } }
