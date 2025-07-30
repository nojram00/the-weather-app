import React, { useEffect, useRef } from 'react'
import '../assets/layout.css'
import { Link } from 'react-router'
import { LayoutProvider } from '@renderer/hooks/layoutContext'

export default function Layout({ children }: { children: React.ReactNode }) {
  // const [sidebarOpen, toggleSidebar] = useState(false)
  const sidebarRef = useRef<HTMLDivElement>(null)

  useRef(() => {
    console.log(window.location)
  })

  useEffect(() => {
    if (sidebarRef.current) {
      const el = sidebarRef.current

      const hours = new Date().getHours()

      if (hours < 12) {
        el.dataset['time'] = 'morning'
      } else if (hours >= 12 && hours < 18) {
        el.dataset['time'] = 'afternoon'
      } else {
        el.dataset['time'] = 'night'
      }
    }
  }, [])

  return (
    <LayoutProvider>
      <div className="layout">
        <header>
          <div>
            {/* Disable Sidebar for now... */}
            {/* <button onClick={() => toggleSidebar(!sidebarOpen)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="white"
                height={20}
                width={20}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button> */}
            <span>Weather App</span>
          </div>

          <nav>
            <Link className="link" to="/">
              Home
            </Link>
            <Link className="link" to="/weather">
              Forecast
            </Link>
            <Link className="link" to="/air-quality">
              Air Quality Index
            </Link>
          </nav>
        </header>

        {/* Sidebar - Coming Soon */}
        {/* <div
          className="sidebar"
          inert={sidebarOpen ? false : true}
          ref={sidebarRef}
          data-open={sidebarOpen}
        >
          <div>
            <button onClick={() => toggleSidebar(!sidebarOpen)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="white"
                height={20}
                width={20}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>
          </div>
        </div> */}

        {children}
      </div>
    </LayoutProvider>
  )
}
