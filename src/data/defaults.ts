import type { PortfolioData } from '@/types/portfolio'
import raw from './defaults.json'

// The admin panel commits defaults.json; validatePortfolioData is the runtime check.
export const defaults: PortfolioData = raw as PortfolioData
