import { useContext } from 'react'
import { PortfolioContext, type PortfolioContextValue } from '@/context/portfolioContext'

export function usePortfolioData(): PortfolioContextValue {
  const value = useContext(PortfolioContext)
  if (!value) throw new Error('usePortfolioData must be used inside <PortfolioProvider>')
  return value
}
