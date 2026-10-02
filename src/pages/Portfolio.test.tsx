import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, test } from 'vitest'
import { PortfolioProvider } from '@/context/PortfolioProvider'
import { defaults } from '@/data/defaults'
import { SECTIONS } from '@/lib/sections'
import { Portfolio } from './Portfolio'

const renderPortfolio = () => render(<PortfolioProvider><Portfolio /></PortfolioProvider>)

beforeEach(() => localStorage.clear())

describe('Portfolio page', () => {
  test('has exactly one top-level heading containing the full name', () => {
    renderPortfolio()

    const headings = screen.getAllByRole('heading', { level: 1 })

    expect(headings).toHaveLength(1)
    expect(headings[0]).toHaveTextContent(/wathsara\s+kalhara/i)
  })

  test('every navigation link points at a section that exists', () => {
    const { container } = renderPortfolio()
    const nav = screen.getByRole('navigation', { name: 'Main navigation' })

    const targets = within(nav).getAllByRole('link').map((link) => link.getAttribute('href'))

    expect(targets).toEqual(SECTIONS.map(({ id }) => `#${id}`))
    for (const target of targets) {
      expect(container.querySelector(`section${target}`)).not.toBeNull()
    }
  })

  test('renders every project with its links', () => {
    renderPortfolio()

    for (const project of defaults.projects) {
      expect(screen.getByRole('heading', { level: 3, name: project.title })).toBeInTheDocument()
    }
    expect(screen.getByRole('link', { name: 'Live: Intelligent Omi' })).toHaveAttribute('href', 'https://omilk.vercel.app/')
  })

  test('hides the CV button while no resume is configured', () => {
    renderPortfolio()

    expect(screen.queryByRole('link', { name: /download cv/i })).not.toBeInTheDocument()
  })

  test('applies a saved draft over the published defaults', () => {
    const data = { ...defaults, meta: { ...defaults.meta, tagline: 'Draft tagline', resumeUrl: '' } }
    localStorage.setItem('portfolio_draft_v2', JSON.stringify({ base: JSON.stringify(defaults), data }))

    renderPortfolio()

    expect(screen.getByText('Draft tagline')).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/wathsara/i)
  })

  test('ignores a draft written against older published data', () => {
    const data = { ...defaults, meta: { ...defaults.meta, tagline: 'Stale tagline' } }
    localStorage.setItem('portfolio_draft_v2', JSON.stringify({ base: 'older', data }))

    renderPortfolio()

    expect(screen.queryByText('Stale tagline')).not.toBeInTheDocument()
  })

  test('falls back to the defaults when the saved draft is corrupt', () => {
    localStorage.setItem('portfolio_draft_v2', '{not json')

    renderPortfolio()

    expect(screen.getByText(defaults.meta.tagline)).toBeInTheDocument()
  })

  test('mobile menu opens, exposes its state, and closes on Escape', async () => {
    const user = userEvent.setup()
    renderPortfolio()
    const toggle = screen.getByRole('button', { name: 'Open menu' })

    await user.click(toggle)

    expect(toggle).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByRole('navigation', { name: 'Mobile navigation' })).toBeInTheDocument()

    await user.keyboard('{Escape}')

    expect(toggle).toHaveAttribute('aria-expanded', 'false')
    expect(screen.queryByRole('navigation', { name: 'Mobile navigation' })).not.toBeInTheDocument()
    expect(toggle).toHaveFocus()
  })
})
