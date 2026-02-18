import { useContext } from 'react'
import { AppContext, type AppContextValue } from '../context/AppContext'

export const useAppContext = (): AppContextValue => {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useAppContext must be used within AppProvider')

  return ctx
}
