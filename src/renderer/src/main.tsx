import './assets/main.css'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { HashRouter, Routes, Route } from 'react-router'
import Forecast from './pages/forecast'
import Test from './pages/test'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/weather" element={<Forecast />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </HashRouter>
  </StrictMode>
)
