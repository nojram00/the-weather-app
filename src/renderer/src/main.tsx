import './assets/main.css'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { createBrowserRouter, RouterProvider } from 'react-router'
import Forecast from './pages/forecast'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path: '/weather',
    element: <Forecast />
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
