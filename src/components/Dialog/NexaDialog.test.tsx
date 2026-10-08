import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useState } from 'react'
import { describe, expect, it, vi } from 'vitest'
import { renderNexa } from '../../test/renderNexa'
import { NexaDialog } from './NexaDialog'
import { NexaButton } from '../Button/NexaButton'
function Example({ onSave = () => {} }: { onSave?: () => void }) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <NexaButton onClick={() => setOpen(true)}>Review</NexaButton>
      <NexaDialog
        open={open}
        title="Save settings?"
        description="Applies to your team."
        onClose={() => setOpen(false)}
        primaryAction={{
          label: 'Save',
          onClick: () => {
            onSave()
            setOpen(false)
          },
        }}
      />
    </>
  )
}
describe('NexaDialog', () => {
  it('is not present when closed', () => {
    renderNexa(
      <NexaDialog
        open={false}
        title="Save?"
        onClose={() => {}}
        primaryAction={{ label: 'Save', onClick: () => {} }}
      />,
    )
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })
  it('names and describes the dialog, focuses cancel, and restores focus after Escape', async () => {
    renderNexa(<Example />)
    const user = userEvent.setup()
    const trigger = screen.getByRole('button', { name: 'Review' })
    await user.click(trigger)
    expect(
      screen.getByRole('dialog', { name: 'Save settings?' }),
    ).toHaveAccessibleDescription('Applies to your team.')
    await waitFor(() =>
      expect(screen.getByRole('button', { name: 'Cancel' })).toHaveFocus(),
    )
    await user.keyboard('{Escape}')
    await waitFor(() =>
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument(),
    )
    expect(trigger).toHaveFocus()
  })
  it('keeps Tab navigation inside the dialog', async () => {
    renderNexa(<Example />)
    const user = userEvent.setup()
    await user.click(screen.getByRole('button', { name: 'Review' }))
    await waitFor(() =>
      expect(screen.getByRole('button', { name: 'Cancel' })).toHaveFocus(),
    )
    await user.tab()
    expect(screen.getByRole('button', { name: 'Save' })).toHaveFocus()
    await user.tab()
    expect(screen.getByRole('button', { name: 'Cancel' })).toHaveFocus()
    await user.tab({ shift: true })
    expect(screen.getByRole('button', { name: 'Save' })).toHaveFocus()
  })
  it('cancels without invoking the primary action', async () => {
    const save = vi.fn()
    renderNexa(<Example onSave={save} />)
    await userEvent.click(screen.getByRole('button', { name: 'Review' }))
    await userEvent.click(screen.getByRole('button', { name: 'Cancel' }))
    await waitFor(() =>
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument(),
    )
    expect(save).not.toHaveBeenCalled()
  })
  it('invokes the primary action and allows the consumer to close', async () => {
    const save = vi.fn()
    renderNexa(<Example onSave={save} />)
    await userEvent.click(screen.getByRole('button', { name: 'Review' }))
    await userEvent.click(screen.getByRole('button', { name: 'Save' }))
    await waitFor(() =>
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument(),
    )
    expect(save).toHaveBeenCalledTimes(1)
  })
  it('blocks actions and Escape while loading, then allows recovery', async () => {
    const close = vi.fn()
    const save = vi.fn()
    const props = {
      open: true,
      title: 'Save?',
      onClose: close,
      primaryAction: { label: 'Save', onClick: save },
    }
    const { rerender } = renderNexa(<NexaDialog {...props} loading />)
    const user = userEvent.setup()
    expect(screen.getByRole('button', { name: 'Save' })).toBeDisabled()
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeDisabled()
    await user.keyboard('{Enter}{Escape}')
    expect(close).not.toHaveBeenCalled()
    expect(save).not.toHaveBeenCalled()
    rerender(<NexaDialog {...props} />)
    await user.click(screen.getByRole('button', { name: 'Cancel' }))
    expect(close).toHaveBeenCalledWith('cancel')
  })
})
