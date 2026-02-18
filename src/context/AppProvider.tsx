import { useState, type ReactNode } from 'react'
import { AppContext, type AppContextValue } from './AppContext'

const AppProvider = ({ children }: { children: ReactNode }) => {
  const [searchQuery, setSearchQuery] = useState('')

  const value: AppContextValue = {
    state: {
      tasks: {},
      columns: {},
      columnOrder: [],
    },
    searchQuery,
    setSearchQuery,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export { AppProvider }
