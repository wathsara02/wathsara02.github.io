import { createContext } from 'react'
import type { PortfolioData } from '@/types/portfolio'

export type PortfolioContextValue = {
  portfolioData: PortfolioData
  /** Replaces the whole draft and persists it to this browser only. */
  saveDraft: (data: PortfolioData) => void
}

export const PortfolioContext = createContext<PortfolioContextValue | null>(null)
