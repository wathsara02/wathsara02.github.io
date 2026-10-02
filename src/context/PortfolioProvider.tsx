import { useState, type ReactNode } from 'react'
import { defaults } from '@/data/defaults'
import { validatePortfolioData } from '@/lib/schema'
import type { PortfolioData } from '@/types/portfolio'
import { PortfolioContext } from './portfolioContext'

const DRAFT_STORAGE_KEY = 'portfolio_draft_v2'

type StoredDraft = {
  /** Snapshot of the published data the draft was written against. */
  base: string
  data: PortfolioData
}

const PUBLISHED = JSON.stringify(defaults)

/**
 * A draft only applies while the published data it was based on is still live.
 * Once a deploy changes the defaults, the draft is stale and is ignored.
 */
function loadDraft(): PortfolioData {
  try {
    const saved = localStorage.getItem(DRAFT_STORAGE_KEY)
    if (!saved) return defaults
    const draft = JSON.parse(saved) as Partial<StoredDraft>
    const isCurrent = draft.base === PUBLISHED && validatePortfolioData(draft.data).length === 0
    return isCurrent && draft.data ? draft.data : defaults
  } catch {
    // Unreadable storage or corrupt JSON: the published defaults are always valid.
    return defaults
  }
}

export function PortfolioProvider({ children }: { children: ReactNode }) {
  const [portfolioData, setPortfolioData] = useState<PortfolioData>(loadDraft)

  const saveDraft = (data: PortfolioData) => {
    setPortfolioData(data)
    try {
      const draft: StoredDraft = { base: PUBLISHED, data }
      localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(draft))
    } catch {
      // Storage full or blocked: the draft still applies for this session.
    }
  }

  return (
    <PortfolioContext.Provider value={{ portfolioData, saveDraft }}>
      {children}
    </PortfolioContext.Provider>
  )
}
