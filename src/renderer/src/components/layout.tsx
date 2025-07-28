import React from 'react'
import '../assets/layout.css'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen relative flex flex-col items-center bg-dark">
      <header className="fixed z-10 top-0 bg-primary w-full p-5 text-white flex justify-between">
        <div>
          <span>Weather App</span>
        </div>

        <nav className="flex gap-4">
          <a className="hover:text-light" href="/weather">
            Forecast
          </a>
          <a className="hover:text-light" href="/">
            Home
          </a>
        </nav>
      </header>

      {children}
    </div>
  )
}
