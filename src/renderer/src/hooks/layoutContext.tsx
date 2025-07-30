/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState } from 'react'

const LayoutContext = createContext<{
  showVisual: boolean
  setVisual: (value: boolean) => void
}>({
  showVisual: false,
  setVisual: (value: boolean) => console.log(value)
})

export function LayoutProvider({ children }: { children: React.ReactNode }) {
  const [showVisual, setVisual] = useState(false)

  return (
    <LayoutContext.Provider value={{ showVisual, setVisual }}>{children}</LayoutContext.Provider>
  )
}

export function useLayout() {
  const context = useContext(LayoutContext)
  if (!context) throw new Error('useLayout must be used within LayoutProvider')
  return context
}
