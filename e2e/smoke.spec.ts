import { expect, test } from '@playwright/test'

const BREAKPOINTS = [320, 375, 768, 1024, 1440, 1920]

test('home page loads with no console errors', async ({ page }) => {
  const errors: string[] = []
  page.on('console', (message) => { if (message.type() === 'error') errors.push(message.text()) })
  page.on('pageerror', (error) => errors.push(error.message))

  await page.goto('/')

  await expect(page.getByRole('heading', { level: 1 })).toContainText(/wathsara/i)
  expect(errors).toEqual([])
})

for (const width of BREAKPOINTS) {
  test(`no horizontal overflow at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 })
    await page.goto('/')

    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)

    expect(overflow).toBeLessThanOrEqual(0)
  })
}

test('navigation link scrolls its section into view', async ({ page }) => {
  await page.goto('/')

  await page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: 'Projects' }).click()

  await expect(page.locator('#projects')).toBeInViewport()
  await expect(page).toHaveURL(/#projects$/)
})

test('mobile menu navigates and closes', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 800 })
  await page.goto('/')

  await page.getByRole('button', { name: 'Open menu' }).click()
  await page.getByRole('navigation', { name: 'Mobile navigation' }).getByRole('link', { name: 'Contact' }).click()

  await expect(page.getByRole('navigation', { name: 'Mobile navigation' })).toBeHidden()
  await expect(page.locator('#contact')).toBeInViewport()
})

test('admin route loads without a password gate', async ({ page }) => {
  await page.goto('/admin')

  await expect(page.getByRole('heading', { level: 1, name: 'Portfolio admin' })).toBeVisible()
})

test('deep link through the 404 redirect lands on the admin page', async ({ page }) => {
  await page.goto('/?p=%2Fadmin')

  await expect(page).toHaveURL(/\/admin$/)
  await expect(page.getByRole('heading', { level: 1, name: 'Portfolio admin' })).toBeVisible()
})

test('content is visible with reduced motion', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/')

  await expect(page.getByRole('heading', { level: 2, name: /about/i })).toBeVisible()
  await expect(page.locator('#contact h2')).toHaveCSS('opacity', '1')
})
