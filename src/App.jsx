import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { PortfolioProvider } from '@/context/PortfolioContext'
import { Portfolio } from '@/pages/Portfolio'
import { Admin } from '@/pages/Admin'

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Portfolio />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <PortfolioProvider>
      <BrowserRouter>
        <AnimatedRoutes />
      </BrowserRouter>
    </PortfolioProvider>
  )
}

