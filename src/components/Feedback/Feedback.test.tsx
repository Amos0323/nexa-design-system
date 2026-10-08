import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { renderNexa } from '../../test/renderNexa'
import { NexaEmptyState } from './NexaEmptyState'
import { NexaErrorState } from './NexaErrorState'
import { NexaLoadingState } from './NexaLoadingState'
import { NexaSkeleton } from './NexaSkeleton'
import { NexaButton } from '../Button/NexaButton'
describe('feedback patterns', () => {
  it('offers an optional empty-state action', async () => {
    const add = vi.fn()
    renderNexa(
      <NexaEmptyState
        title="No learners"
        description="Add a learner."
        action={<NexaButton onClick={add}>Add learner</NexaButton>}
      />,
    )
    await userEvent.click(screen.getByRole('button', { name: 'Add learner' }))
    expect(add).toHaveBeenCalledTimes(1)
  })
  it('retries from an error message', async () => {
    const retry = vi.fn()
    renderNexa(
      <NexaErrorState description="Records unavailable." onRetry={retry} />,
    )
    expect(screen.getByRole('alert')).toHaveTextContent('Records unavailable.')
    await userEvent.click(screen.getByRole('button', { name: 'Try again' }))
    expect(retry).toHaveBeenCalledTimes(1)
  })
  it('announces loading only once', () => {
    renderNexa(<NexaLoadingState label="Loading records" />)
    expect(screen.getByRole('status')).toHaveTextContent('Loading records')
    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument()
  })
  it.each(['card', 'table', 'metric'] as const)(
    'provides one accessible label for %s skeleton',
    (variant) => {
      renderNexa(<NexaSkeleton variant={variant} label="Loading records" />)
      expect(screen.getByRole('status')).toHaveTextContent('Loading records')
    },
  )
})
