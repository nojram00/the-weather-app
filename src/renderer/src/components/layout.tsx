import React from 'react'
import '../assets/layout.css'
import { Link } from 'react-router'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="layout">
      <header>
        <div>
          <span>Weather App</span>
        </div>

        <nav>
          <Link className="link" to="/weather">
            Forecast
          </Link>
          <Link className="link" to="/">
            Home
          </Link>
        </nav>
      </header>

      {children}
    </div>
  )
}
