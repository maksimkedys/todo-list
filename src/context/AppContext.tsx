import { createContext } from 'react'
import type { ColumnType } from '../types'

export interface AppContextValue {
  columns: ColumnType[]
  searchQuery: string
  setSearchQuery: (value: string) => void

  addTask: (columnId: string, taskText: string) => void
  addColumn: (title: string) => void
  deleteColumn: (columnId: string) => void
  deleteTask: (taskId: string) => void
  toggleTaskCompletion: (taskId: string) => void
}

export const AppContext = createContext<AppContextValue | null>(null)
