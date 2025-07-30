import React, { useEffect, useRef } from 'react'
import '../assets/weather-visual.css'

export default function Container({ time, rain, temp }: { time: any[]; rain: any[]; temp: any[] }) {
  return (
    <div className="weather-container">
      {time.map((t, index) => (
        <React.Fragment key={index}>
          <WeatherCard time={t} rain={rain[index]} temp={temp[index]} />
        </React.Fragment>
      ))}
    </div>
  )
}

function WeatherCard({ time, rain, temp }: { time?: string; rain?: number; temp?: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (cardRef.current) {
      const el = cardRef.current
      const hours = new Date(time!).getHours()

      if (hours < 12) {
        el.dataset['time'] = 'morning'
      } else if (hours >= 12 && hours < 18) {
        el.dataset['time'] = 'afternoon'
      } else {
        el.dataset['time'] = 'night'
      }
    }
  })

  return (
    <div ref={cardRef} className="weather-card">
      <div className="content">
        <span>{time}</span>
        <div>
          <div>
            <RainIcon />
          </div>
          <span>{Number(rain).toFixed(2)}</span>
        </div>
        <div>
          <div>
            <ThermometerIcon />
          </div>
          <span>{Number(temp).toFixed(2)}&deg;C</span>
        </div>
      </div>
    </div>
  )
}

function ThermometerIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M14 14.76V5a2 2 0 1 0-4 0v9.76a5 5 0 1 0 4 0z"
        stroke="black"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="18" r="2" fill="red" />
    </svg>
  )
}

function RainIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M16 13H7a4 4 0 1 1 1.5-7.7 5 5 0 1 1 9.5 4.2 3.5 3.5 0 0 1-2 6.5z"
        stroke="black"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <line x1="8" y1="20" x2="8" y2="22" stroke="blue" strokeWidth="2" />
      <line x1="12" y1="20" x2="12" y2="23" stroke="blue" strokeWidth="2" />
      <line x1="16" y1="20" x2="16" y2="22" stroke="blue" strokeWidth="2" />
    </svg>
  )
}
