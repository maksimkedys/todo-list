import { createContext } from 'react'
import type { AppState } from '../types'

export interface AppContextValue {
  state: AppState
  searchQuery: string
  setSearchQuery: (value: string) => void
}

export const AppContext = createContext<AppContextValue | null>(null)
