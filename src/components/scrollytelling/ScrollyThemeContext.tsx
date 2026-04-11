'use client'

import { createContext, useContext } from 'react'
import { type ThemeConfig, getThemeConfig, type ScrollyThemeName } from './theme-config'

const ScrollyThemeContext = createContext<ThemeConfig>(getThemeConfig('warm'))

export function ScrollyThemeProvider({
  theme,
  children,
}: {
  theme?: ScrollyThemeName
  children: React.ReactNode
}) {
  const config = getThemeConfig(theme)
  return (
    <ScrollyThemeContext.Provider value={config}>
      {children}
    </ScrollyThemeContext.Provider>
  )
}

export function useScrollyTheme(): ThemeConfig {
  return useContext(ScrollyThemeContext)
}
