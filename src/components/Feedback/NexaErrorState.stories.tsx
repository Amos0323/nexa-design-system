import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { NexaErrorState, type NexaErrorStateProps } from './NexaErrorState'
import { NexaLoadingState } from './NexaLoadingState'
import { NexaAlert } from '../Alert/NexaAlert'
function RetryExample(args: NexaErrorStateProps) {
  const [state, setState] = useState('error')
  return state === 'loading' ? (
    <NexaLoadingState />
  ) : state === 'ready' ? (
    <NexaAlert severity="success">Records loaded.</NexaAlert>
  ) : (
    <NexaErrorState
      {...args}
      onRetry={() => {
        setState('loading')
        setTimeout(() => setState('ready'), 500)
      }}
    />
  )
}
const meta = {
  title: 'Components/Feedback/ErrorState',
  component: NexaErrorState,
  tags: ['autodocs'],
  args: {
    description:
      'Learner records could not be loaded. Check your connection and try again.',
  },
  parameters: {
    docs: {
      description: {
        component:
          'Assertive error feedback with an optional retry button. The consumer owns recovery, pending state, and error details; never expose raw server exceptions.',
      },
    },
  },
} satisfies Meta<typeof NexaErrorState>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
export const Retry: Story = { render: (args) => <RetryExample {...args} /> }
export const Dark: Story = { globals: { theme: 'dark' } }
