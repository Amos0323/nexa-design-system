import { screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { renderNexa } from '../../test/renderNexa'
import { NexaCard } from './NexaCard'
import { NexaButton } from '../Button/NexaButton'
describe('NexaCard', () => {
  it('creates a labeled region with the requested heading level', () => {
    renderNexa(
      <NexaCard title="Workspace" subtitle="Details" headingLevel="h2">
        Team details
      </NexaCard>,
    )
    const card = screen.getByRole('region', { name: 'Workspace' })
    expect(within(card).getByRole('heading', { level: 2 })).toHaveTextContent(
      'Workspace',
    )
    expect(within(card).getByText('Details')).toBeVisible()
    expect(card).not.toHaveAttribute('tabindex')
  })
  it('composes interactive actions', async () => {
    const click = vi.fn()
    renderNexa(
      <NexaCard
        title="Workspace"
        actions={<NexaButton onClick={click}>Save</NexaButton>}
      >
        Details
      </NexaCard>,
    )
    await userEvent.click(screen.getByRole('button', { name: 'Save' }))
    expect(click).toHaveBeenCalledTimes(1)
  })
})
