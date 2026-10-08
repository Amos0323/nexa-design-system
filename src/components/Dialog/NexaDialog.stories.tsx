import type { Meta, StoryObj } from '@storybook/react-vite'
import { useArgs } from 'storybook/preview-api'
import { NexaDialog, type NexaDialogProps } from './NexaDialog'
import { NexaButton } from '../Button/NexaButton'
function InteractiveDialog(args: NexaDialogProps) {
  const [, updateArgs] = useArgs<NexaDialogProps>()
  return (
    <>
      <NexaButton onClick={() => updateArgs({ open: true })}>
        Open dialog
      </NexaButton>
      <NexaDialog
        {...args}
        onClose={() => updateArgs({ open: false })}
        primaryAction={{
          ...args.primaryAction,
          onClick: () => updateArgs({ open: false }),
        }}
      />
    </>
  )
}
const meta = {
  title: 'Components/Dialog',
  component: NexaDialog,
  tags: ['autodocs'],
  render: InteractiveDialog,
  args: {
    open: false,
    title: 'Save workspace settings?',
    description: 'These changes will apply to everyone in this workspace.',
    primaryAction: { label: 'Save changes', onClick: () => {} },
    onClose: () => {},
    loading: false,
    cancelLabel: 'Cancel',
  },
  parameters: {
    docs: {
      story: { inline: false, height: 450 },
      description: {
        component:
          'Controlled confirmation dialog. Cancel receives initial focus; MUI traps focus and restores the trigger after closing. Loading blocks cancel, Escape, backdrop dismissal, and duplicate actions. Consumers must clear loading on both success and failure.',
      },
    },
  },
} satisfies Meta<typeof NexaDialog>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
export const Destructive: Story = {
  args: {
    title: 'Delete workspace?',
    description: 'This action cannot be undone.',
    primaryAction: {
      label: 'Delete workspace',
      variant: 'destructive',
      onClick: () => {},
    },
  },
}
export const Loading: Story = { args: { loading: true } }
export const DisabledAction: Story = {
  args: {
    primaryAction: { label: 'Save changes', disabled: true, onClick: () => {} },
  },
}
export const Dark: Story = { globals: { theme: 'dark' } }
