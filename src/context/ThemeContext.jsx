import { createContext, useEffect, useState } from 'react'

export const ThemeContext = createContext(null)

function getInitialTheme() {
  try {
    const saved = localStorage.getItem('theme')
    if (saved) return saved
  } catch {
    // localStorage unavailable, fall through to system preference
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(getInitialTheme)

  // Whenever the theme changes: update the <html> class and remember the choice
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    try {
      localStorage.setItem('theme', theme)
    } catch {
      // ignore storage errors
    }
  }, [theme])

  const toggleTheme = () =>
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}