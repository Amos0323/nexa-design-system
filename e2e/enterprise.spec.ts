import { test, expect, type Page } from '@playwright/test'
import { createRequire } from 'node:module'
declare global {
  interface Window {
    axe: typeof import('axe-core')
  }
}
const require = createRequire(import.meta.url)
async function scan(page: Page) {
  await page.addScriptTag({ path: require.resolve('axe-core/axe.min.js') })
  const violations = await page.evaluate(async () =>
    (await window.axe.run(document)).violations.map(
      ({ id, impact, nodes }) => ({
        id,
        impact,
        nodes: nodes.map(({ target, failureSummary }) => ({
          target,
          failureSummary,
        })),
      }),
    ),
  )
  expect(violations).toEqual([])
}
for (const view of ['', '?view=enterprise']) {
  for (const mode of ['light', 'dark']) {
    test(view + ' accessibility ' + mode, async ({ page }) => {
      const errors: string[] = []
      page.on('pageerror', (error) => errors.push(error.message))
      page.on('console', (message) => {
        if (message.type() === 'error') errors.push(message.text())
      })
      await page.goto('/' + view)
      if (view) await expect(page.getByRole('grid')).toBeVisible()
      if (mode === 'dark')
        await page.getByRole('button', { name: /switch to dark/i }).click()
      await scan(page)
      expect(errors).toEqual([])
    })
  }
}
for (const width of [320, 390, 768, 1024, 1440]) {
  test('enterprise responsive ' + width, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 })
    await page.goto('/?view=enterprise')
    await expect(page.getByRole('grid')).toBeVisible()
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true)
    const next = page.getByRole('button', { name: 'Go to next page' })
    await next.scrollIntoViewIfNeeded()
    await expect(next).toBeInViewport()
    if (width < 1200) {
      const open = page.getByRole('button', { name: 'Open navigation' })
      await open.click()
      await expect(
        page.getByRole('button', { name: 'Close navigation' }),
      ).toBeFocused()
      if (width === 390) await scan(page)
      await page.keyboard.press('Escape')
      await expect(open).toBeFocused()
    }
  })
}
test('enterprise grid interactions', async ({ page }) => {
  await page.goto('/?view=enterprise')
  const header = page.getByRole('columnheader', { name: /^Name/ })
  await header.click()
  await expect(header).toHaveAttribute('aria-sort', 'ascending')
  await page.getByRole('button', { name: 'Search', exact: true }).click()
  const search = page.getByRole('searchbox', { name: 'Search' })
  await search.fill('Thandi')
  await expect(
    page.getByRole('gridcell', { name: 'Thandi Nkosi', exact: true }),
  ).toBeVisible()
  await expect(page.getByText('1–1 of 1')).toBeVisible()
  await search.fill('')
  await expect(page.getByText('1–10 of 24')).toBeVisible()
  await page.getByRole('button', { name: 'Go to next page' }).click()
  await expect(page.getByText('11–20 of 24')).toBeVisible()
  await page.getByRole('row').nth(1).getByRole('checkbox').check()
  await page.getByRole('button', { name: /choose date/i }).click()
  await expect(page.getByRole('dialog')).toBeVisible()
  await page.keyboard.press('Escape')
  await expect(page.getByRole('dialog')).not.toBeVisible()
})
