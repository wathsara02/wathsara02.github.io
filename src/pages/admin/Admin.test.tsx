import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import { PortfolioProvider } from '@/context/PortfolioProvider'
import { Admin } from './Admin'

const renderAdmin = () =>
  render(<PortfolioProvider><MemoryRouter><Admin /></MemoryRouter></PortfolioProvider>)

const savedDraft = () => JSON.parse(localStorage.getItem('portfolio_draft_v2') ?? 'null')?.data ?? null

beforeEach(() => {
  localStorage.clear()
  sessionStorage.clear()
})
afterEach(() => vi.unstubAllGlobals())

describe('Admin', () => {
  test('saves edits as a local draft when GitHub is not connected', async () => {
    const user = userEvent.setup()
    renderAdmin()
    const tagline = screen.getByLabelText('Tagline')

    await user.clear(tagline)
    await user.type(tagline, 'New tagline')
    await user.click(screen.getByRole('button', { name: 'Save draft' }))

    expect(savedDraft().meta.tagline).toBe('New tagline')
    expect(screen.getByRole('status')).toHaveTextContent(/this browser only/i)
  })

  test('refuses to save invalid data and lists the problem', async () => {
    const user = userEvent.setup()
    renderAdmin()

    await user.clear(screen.getByLabelText('Full name'))
    await user.click(screen.getByRole('button', { name: 'Save draft' }))

    expect(screen.getByRole('status')).toHaveTextContent('meta.name: required')
    expect(savedDraft()).toBeNull()
  })

  test('commits the data file to GitHub when a token is set', async () => {
    sessionStorage.setItem('gh_pat', 'test-token')
    const fetchMock = vi.fn()
      .mockResolvedValueOnce(new Response(JSON.stringify({ sha: 'abc123' }), { status: 200 }))
      .mockResolvedValueOnce(new Response('{}', { status: 200 }))
    vi.stubGlobal('fetch', fetchMock)
    const user = userEvent.setup()
    renderAdmin()

    await user.click(screen.getByRole('button', { name: 'Save & deploy' }))

    expect(await screen.findByText(/committed/i)).toBeInTheDocument()
    const [url, request] = fetchMock.mock.calls[1] as [string, RequestInit]
    const body = JSON.parse(String(request.body))
    expect(url).toContain('/contents/src/data/defaults.json')
    expect(request.method).toBe('PUT')
    expect(body.sha).toBe('abc123')
    expect(JSON.parse(new TextDecoder().decode(Uint8Array.from(atob(body.content), (c) => c.charCodeAt(0)))).meta.name).toBe('Wathsara Kalhara')
  })

  test('reports a GitHub failure without losing the local draft', async () => {
    sessionStorage.setItem('gh_pat', 'bad-token')
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response(JSON.stringify({ message: 'Bad credentials' }), { status: 401 })))
    const user = userEvent.setup()
    renderAdmin()

    await user.click(screen.getByRole('button', { name: 'Save & deploy' }))

    expect(await screen.findByText(/publishing failed.*Bad credentials/i)).toBeInTheDocument()
    expect(savedDraft()).not.toBeNull()
  })
})
