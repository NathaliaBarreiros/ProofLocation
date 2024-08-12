import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { lazy, Suspense } from 'react'

const AreaSelect = lazy(() => import('../pages/AreaSelect'))
const Create = lazy(() => import('../pages/Create'))
const Proove = lazy(() => import('../pages/Proove'))
// Add more lazy-loaded components for other pages as needed

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<AreaSelect />} />
          <Route path="/Create" element={<Create />} />
          <Route path="/Proove" element={<Proove />} />
          {/* Add more routes for other pages as needed */}
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default Router
