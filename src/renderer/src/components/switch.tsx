import React from 'react'
import { useLayout } from '../hooks/layoutContext'

export default function Switch() {
  const { setVisual, showVisual } = useLayout()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (setVisual != null) {
      setVisual(e.target.checked)
    }

    const event: CustomEvent<{ value: boolean }> = new CustomEvent('switchToggled', {
      detail: {
        value: e.target.checked
      }
    })
    document.dispatchEvent(event)
  }

  return (
    <label htmlFor="switchBtn" className="switch">
      <input type="checkbox" id="switchBtn" checked={showVisual} onChange={handleChange} />
      <div className="circle"></div>
    </label>
  )
}
