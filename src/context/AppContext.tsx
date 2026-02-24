import { createContext } from 'react'
import type { ColumnType } from '../types'

export interface AppContextValue {
  columns: ColumnType[]
  searchQuery: string
  setSearchQuery: (value: string) => void
  selectedTaskIds: Set<string>
  toggleTaskSelection: (taskId: string) => void
  selectAllTasksInColumn: (columnId: string) => void
  deselectAllTasksInColumn: (columnId: string) => void
  isColumnFullySelected: (columnId: string) => boolean

  addTask: (columnId: string, taskText: string) => void
  addColumn: (title: string) => void
  deleteColumn: (columnId: string) => void
  deleteTask: (taskId: string) => void
  toggleTaskCompletion: (taskId: string) => void
  editTask: (taskId: string, newText: string) => void
  updateColumnTitle: (columnId: string, newTitle: string) => void
  reorderColumns: (fromIndex: number, toIndex: number) => void
  moveTask: (
    taskId: string,
    sourceColumnId: string,
    targetColumnId: string,
    targetIndex: number,
  ) => void
}

export const AppContext = createContext<AppContextValue | null>(null)
