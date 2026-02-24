import { createContext } from 'react'
import type { ColumnType } from '../types'
import type { TaskFilter } from '../types'

export interface AppContextValue {
  columns: ColumnType[]
  searchQuery: string
  setSearchQuery: (value: string) => void
  taskFilter: TaskFilter
  setTaskFilter: (value: TaskFilter) => void
  selectedTaskIds: Set<string>
  toggleTaskSelection: (taskId: string) => void
  clearTaskSelection: () => void
  selectAllTasksInColumn: (columnId: string) => void
  deselectAllTasksInColumn: (columnId: string) => void
  isColumnFullySelected: (columnId: string) => boolean

  addTask: (columnId: string, taskText: string) => void
  addColumn: (title: string) => void
  deleteColumn: (columnId: string) => void
  deleteTask: (taskId: string) => void
  deleteSelectedTasks: () => void
  toggleTaskCompletion: (taskId: string) => void
  updateSelectedTasksCompletion: (completed: boolean) => void
  editTask: (taskId: string, newText: string) => void
  updateColumnTitle: (columnId: string, newTitle: string) => void
  reorderColumns: (fromIndex: number, toIndex: number) => void
  moveTask: (
    taskId: string,
    sourceColumnId: string,
    targetColumnId: string,
    targetIndex: number,
  ) => void
  moveSelectedTasksToColumn: (targetColumnId: string) => void
}

export const AppContext = createContext<AppContextValue | null>(null)
