import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { lazy, Suspense } from 'react'

const AreaSelect = lazy(() => import('../pages/AreaSelect'))
const Create = lazy(() => import('../pages/Create'))
const Prove = lazy(() => import('../pages/Prove'))
// Add more lazy-loaded components for other pages as needed

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<AreaSelect />} />
          <Route path="/Create" element={<Create />} />
          <Route path="/Prove" element={<Prove />} />
          {/* Add more routes for other pages as needed */}
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default Router
