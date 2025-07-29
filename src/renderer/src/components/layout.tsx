import React from 'react'
import '../assets/layout.css'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="layout">
      <header>
        <div>
          <span>Weather App</span>
        </div>

        <nav>
          <a href="/weather">Forecast</a>
          <a href="/">Home</a>
        </nav>
      </header>

      {children}
    </div>
  )
}
