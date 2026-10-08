import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { renderNexa } from '../../test/renderNexa'
import { NexaPagination } from './NexaPagination'
describe('NexaPagination', () => {
  it('reports one-based page changes from the keyboard', async () => {
    const change = vi.fn()
    renderNexa(
      <NexaPagination
        page={1}
        count={5}
        onPageChange={change}
        label="Course pages"
      />,
    )
    const next = screen.getByRole('button', { name: 'Go to next page' })
    next.focus()
    await userEvent.keyboard('{Enter}')
    expect(change).toHaveBeenCalledWith(2)
    expect(
      screen.getByRole('navigation', { name: 'Course pages' }),
    ).toBeVisible()
  })
  it('disables page navigation', () => {
    renderNexa(
      <NexaPagination page={1} count={5} onPageChange={() => {}} disabled />,
    )
    for (const button of screen.getAllByRole('button'))
      expect(button).toBeDisabled()
  })
})
