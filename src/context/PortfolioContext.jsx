import { createContext, useContext, useState } from 'react'
import { defaults } from '@/data/defaults'

function deepMerge(target, source) {
  const result = { ...target }
  for (const key in source) {
    if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
      result[key] = deepMerge(target[key] || {}, source[key])
    } else if (source[key] === '' && target[key]) {
      result[key] = target[key]
    } else {
      result[key] = source[key]
    }
  }
  return result
}

const PortfolioContext = createContext(null)

export function PortfolioProvider({ children }) {
  const [data, setData] = useState(() => {
    try {
      const saved = localStorage.getItem('portfolio_data')
      return saved ? deepMerge(defaults, JSON.parse(saved)) : defaults
    } catch {
      return defaults
    }
  })

  const updateSection = (key, value) => {
    setData(prev => {
      const updated = { ...prev, [key]: value }
      localStorage.setItem('portfolio_data', JSON.stringify(updated))
      return updated
    })
  }

  return (
    <PortfolioContext.Provider value={{ portfolioData: data, updateSection }}>
      {children}
    </PortfolioContext.Provider>
  )
}

export const usePortfolio = () => useContext(PortfolioContext)
