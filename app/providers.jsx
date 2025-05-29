// app/providers.jsx
'use client'

import { ThemeProvider } from 'next-themes'
import { useEffect, useState } from 'react'

export function Providers({ children }) {
  const [mounted, setMounted] = useState(false)
  
  // Ensure component is mounted to prevent hydration errors
  useEffect(() => {
    setMounted(true)
  }, [])
  
  // Prevent rendering theme-specific components during server-side rendering
  if (!mounted) {
    return <>{children}</>
  }
  
  return (
    <ThemeProvider 
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
      themes={['light', 'dark', 'system']}
      value={{
        light: 'light',
        dark: 'dark',
        system: 'system',
      }}
    >
      {children}
    </ThemeProvider>
  )
}