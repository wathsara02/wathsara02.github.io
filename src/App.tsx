import { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ErrorBoundary } from '@/components/layout/ErrorBoundary'
import { PortfolioProvider } from '@/context/PortfolioProvider'
import { Portfolio } from '@/pages/Portfolio'

// The editor is only ever opened by the site owner, so visitors never download it.
const Admin = lazy(() => import('@/pages/admin/Admin').then((module) => ({ default: module.Admin })))

export default function App() {
  return (
    <ErrorBoundary>
      <PortfolioProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/admin" element={<Suspense fallback={null}><Admin /></Suspense>} />
            <Route path="*" element={<Portfolio />} />
          </Routes>
        </BrowserRouter>
      </PortfolioProvider>
    </ErrorBoundary>
  )
}
