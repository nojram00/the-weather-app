import { useEffect, useRef } from 'react'
import '../assets/realtime-clock.css'

export default function RealtimeClock() {
  const timeContainer = useRef<HTMLSpanElement>(null)
  const dateContainer = useRef<HTMLSpanElement>(null)
  useEffect(() => {
    const interval = setInterval(() => {
      const date = new Date()
      const time = date.toLocaleTimeString()
      const d = date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
      timeContainer.current!.innerHTML = time
      dateContainer.current!.innerHTML = d
    }, 1000)
    return () => clearInterval(interval)
  }, [])
  return (
    <div className="clock-container">
      <span className="date" ref={dateContainer}></span>
      <span className="clock" ref={timeContainer}></span>
    </div>
  )
}
