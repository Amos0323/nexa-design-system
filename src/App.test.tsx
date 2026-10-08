import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import App from './App'
describe('foundation demo', () => {
  it('exposes the main landmark and labeled foundation sections', () => {
    render(<App />)
    expect(
      screen.getByRole('heading', { level: 1, name: 'Nexa Design System' }),
    ).toBeVisible()
    expect(screen.getByRole('main')).toHaveAttribute('id', 'main-content')
    for (const name of ['Typography', 'Color', 'Spacing'])
      expect(screen.getByRole('region', { name })).toBeVisible()
  })
  it('switches palette and accessible control label with the keyboard', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.tab()
    expect(screen.getByRole('link', { name: 'Skip to content' })).toHaveFocus()
    await user.tab()
    expect(
      screen.getByRole('button', { name: 'Switch to dark mode' }),
    ).toHaveFocus()
    await user.keyboard('{Enter}')
    expect(
      screen.getByRole('button', { name: 'Switch to light mode' }),
    ).toBeVisible()
    expect(screen.getByText('#A5B4FC')).toBeVisible()
    await user.keyboard('{Enter}')
    expect(screen.getByText('#4338CA')).toBeVisible()
  })
})
