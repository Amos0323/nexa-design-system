import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { renderNexa } from '../../test/renderNexa'
import { NexaAppShell } from './NexaAppShell'
import { NexaSidebar } from './NexaSidebar'
import { NexaBreadcrumbs } from './NexaBreadcrumbs'
import { NexaTopBar } from './NexaTopBar'
const items = [
  { id: 'learning', label: 'Learning', href: '#learning', count: 24 },
  { id: 'reports', label: 'Reports', href: '#reports' },
]
describe('enterprise navigation', () => {
  it('marks the current navigation link and renders counts', () => {
    renderNexa(<NexaSidebar items={items} activeId="learning" />)
    expect(
      screen.getByRole('navigation', { name: 'Primary navigation' }),
    ).toBeVisible()
    expect(screen.getByRole('link', { name: /Learning/ })).toHaveAttribute(
      'aria-current',
      'page',
    )
    expect(screen.getByRole('link', { name: 'Reports' })).not.toHaveAttribute(
      'aria-current',
    )
    expect(screen.getByText('24')).toBeVisible()
  })
  it('opens mobile navigation, traps focus, closes with Escape, and restores the trigger', async () => {
    renderNexa(
      <NexaAppShell title="Workspace" navigation={items}>
        <h1>Records</h1>
      </NexaAppShell>,
    )
    const user = userEvent.setup()
    const trigger = screen.getByRole('button', { name: 'Open navigation' })
    await user.click(trigger)
    const close = screen.getByRole('button', { name: 'Close navigation' })
    await waitFor(() => expect(close).toHaveFocus())
    await user.tab({ shift: true })
    expect(screen.getByRole('link', { name: 'Reports' })).toHaveFocus()
    await user.keyboard('{Escape}')
    await waitFor(() =>
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument(),
    )
    expect(trigger).toHaveFocus()
  })
  it('closes mobile navigation after selecting a destination', async () => {
    renderNexa(
      <NexaAppShell title="Workspace" navigation={items}>
        <h1>Records</h1>
      </NexaAppShell>,
    )
    await userEvent.click(
      screen.getByRole('button', { name: 'Open navigation' }),
    )
    await userEvent.click(screen.getByRole('link', { name: 'Reports' }))
    await waitFor(() =>
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument(),
    )
  })
  it('exposes a main landmark and skip destination', () => {
    renderNexa(
      <NexaAppShell title="Workspace" navigation={items}>
        <h1>Records</h1>
      </NexaAppShell>,
    )
    expect(
      screen.getByRole('link', { name: 'Skip to main content' }),
    ).toHaveAttribute('href', '#' + screen.getByRole('main').id)
  })
  it('uses links for ancestors and text for the breadcrumb current page', () => {
    renderNexa(
      <NexaBreadcrumbs
        items={[{ label: 'Home', href: '#home' }, { label: 'Records' }]}
      />,
    )
    expect(screen.getByRole('navigation', { name: 'Breadcrumb' })).toBeVisible()
    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute(
      'href',
      '#home',
    )
    expect(screen.getByText('Records')).toHaveAttribute('aria-current', 'page')
    expect(
      screen.queryByRole('link', { name: 'Records' }),
    ).not.toBeInTheDocument()
  })
  it('exposes the top bar menu state', async () => {
    const open = vi.fn()
    renderNexa(
      <NexaTopBar title="Workspace" onMenuClick={open} menuOpen={false} />,
    )
    const button = screen.getByRole('button', { name: 'Open navigation' })
    expect(button).toHaveAttribute('aria-expanded', 'false')
    await userEvent.click(button)
    expect(open).toHaveBeenCalledTimes(1)
  })
})
