import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { toggleTheme, setTheme } from '../store/themeSlice'

export const useTheme = () => {
  const theme = useSelector((state) => state.theme.mode)
  const dispatch = useDispatch()

  // Initialize theme on component mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    const initialTheme = savedTheme || systemTheme

    dispatch(setTheme(initialTheme))

    // Apply theme to document
    if (initialTheme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }

    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = (e) => {
      if (!localStorage.getItem('theme')) {
        const newTheme = e.matches ? 'dark' : 'light'
        dispatch(setTheme(newTheme))
      }
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [dispatch])

  const toggle = () => {
    dispatch(toggleTheme())
  }

  const setMode = (mode) => {
    dispatch(setTheme(mode))
  }

  return {
    theme,
    toggle,
    setMode,
    isDark: theme === 'dark',
  }
}
