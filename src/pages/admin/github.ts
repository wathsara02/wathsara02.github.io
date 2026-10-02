import type { PortfolioData } from '@/types/portfolio'

const OWNER = 'wathsara02'
const REPO = 'wathsara02.github.io'
const BRANCH = 'main'
const DATA_FILE = 'src/data/defaults.json'
const CONTENTS_API = `https://api.github.com/repos/${OWNER}/${REPO}/contents/${DATA_FILE}`
const COMMIT_MESSAGE = 'content: update portfolio data via admin'

// Session-scoped on purpose: the token is gone once the tab closes.
const TOKEN_STORAGE_KEY = 'gh_pat'

export function loadToken(): string {
  return sessionStorage.getItem(TOKEN_STORAGE_KEY) ?? ''
}

export function storeToken(token: string): void {
  if (token) sessionStorage.setItem(TOKEN_STORAGE_KEY, token)
  else sessionStorage.removeItem(TOKEN_STORAGE_KEY)
}

/** btoa only accepts Latin-1, so encode to UTF-8 bytes first. */
function toBase64(text: string): string {
  const bytes = new TextEncoder().encode(text)
  return btoa(Array.from(bytes, (byte) => String.fromCharCode(byte)).join(''))
}

async function githubRequest(token: string, init?: RequestInit): Promise<Record<string, unknown>> {
  const response = await fetch(`${CONTENTS_API}?ref=${BRANCH}`, {
    cache: 'no-store',
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github+json',
      'Content-Type': 'application/json',
    },
  })
  const body: unknown = await response.json().catch(() => ({}))
  const payload = (typeof body === 'object' && body !== null ? body : {}) as Record<string, unknown>
  if (!response.ok) {
    const reason = typeof payload.message === 'string' ? payload.message : response.statusText
    throw new Error(`GitHub (${response.status}): ${reason}`)
  }
  return payload
}

/** Commits the data file to the main branch, which triggers the deploy workflow. */
export async function commitPortfolioData(token: string, data: PortfolioData): Promise<void> {
  const current = await githubRequest(token)
  await githubRequest(token, {
    method: 'PUT',
    body: JSON.stringify({
      message: COMMIT_MESSAGE,
      content: toBase64(`${JSON.stringify(data, null, 2)}\n`),
      sha: current.sha,
      branch: BRANCH,
    }),
  })
}
