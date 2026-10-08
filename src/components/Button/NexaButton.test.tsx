import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { createRef } from 'react'
import { renderNexa } from '../../test/renderNexa'
import { NexaButton } from './NexaButton'
describe('NexaButton', () => {
  it('is a native button and activates from the keyboard', async () => {
    const click = vi.fn()
    renderNexa(<NexaButton onClick={click}>Save</NexaButton>)
    const user = userEvent.setup()
    await user.tab()
    expect(screen.getByRole('button', { name: 'Save' })).toHaveFocus()
    await user.keyboard('{Enter}')
    expect(click).toHaveBeenCalledTimes(1)
  })
  it('does not implicitly submit a form', async () => {
    const submit = vi.fn((e) => e.preventDefault())
    renderNexa(
      <form onSubmit={submit}>
        <NexaButton>Review</NexaButton>
      </form>,
    )
    await userEvent.click(screen.getByRole('button'))
    expect(submit).not.toHaveBeenCalled()
  })
  it('submits when explicitly requested', async () => {
    const submit = vi.fn((e) => e.preventDefault())
    renderNexa(
      <form onSubmit={submit}>
        <NexaButton type="submit">Save</NexaButton>
      </form>,
    )
    await userEvent.click(screen.getByRole('button'))
    expect(submit).toHaveBeenCalledTimes(1)
  })
  it.each([{ disabled: true }, { loading: true }])(
    'prevents activation in state %j',
    async (props) => {
      const click = vi.fn()
      renderNexa(
        <NexaButton {...props} onClick={click}>
          Save
        </NexaButton>,
      )
      const button = screen.getByRole('button', { name: 'Save' })
      expect(button).toBeDisabled()
      const user = userEvent.setup()
      await user.tab()
      expect(button).not.toHaveFocus()
      await user.keyboard('{Enter} ')
      expect(click).not.toHaveBeenCalled()
      if (props.loading) {
        expect(button).toHaveAttribute('aria-busy', 'true')
        expect(screen.getByRole('progressbar')).toHaveAccessibleName('Save')
      }
    },
  )
  it('forwards a ref to the native button', () => {
    const ref = createRef<HTMLButtonElement>()
    renderNexa(<NexaButton ref={ref}>Save</NexaButton>)
    expect(ref.current).toBe(screen.getByRole('button'))
  })
})
