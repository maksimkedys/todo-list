import { useState, type ReactNode } from 'react'
import { AppContext, type AppContextValue } from './AppContext'
import type { ColumnType, TaskType } from '../types'
import { generateId } from '../utils/id'
import useLocalStorage from '../hooks/useLocalStorage'

const DEFAULT_COLUMNS: ColumnType[] = [
  {
    id: generateId(),
    title: 'To Do',
    tasks: [],
  },
  {
    id: generateId(),
    title: 'In Progress',
    tasks: [],
  },
]

const AppProvider = ({ children }: { children: ReactNode }) => {
  const { getValue: getColumns, saveValue: saveColumns } = useLocalStorage<ColumnType[]>({
    key: 'columns',
    defaultValue: DEFAULT_COLUMNS,
  })

  const [searchQuery, setSearchQuery] = useState('')
  const [columns, setColumns] = useState<ColumnType[]>(getColumns() ?? [])

  const addTask = (columnId: string, taskText: string) => {
    const newTaskId = generateId()
    const newTask: TaskType = {
      id: newTaskId,
      text: taskText,
      completed: false,
    }

    const newColumns = columns.map((col) =>
      col.id === columnId ? { ...col, tasks: [...col.tasks, newTask] } : col,
    )

    setColumns(newColumns)
    saveColumns(newColumns)
  }

  const addColumn = (title: string) => {
    const newColumn: ColumnType = {
      id: generateId(),
      title: title.trim(),
      tasks: [],
    }
    setColumns((prev) => [...prev, newColumn])
    saveColumns([...columns, newColumn])
  }

  const deleteColumn = (columnId: string) => {
    const newColumns = columns.filter((col) => col.id !== columnId)
    setColumns(newColumns)
    saveColumns(newColumns)
  }

  const deleteTask = (taskId: string) => {
    const newColumns = columns.map((col) => ({
      ...col,
      tasks: col.tasks.filter((task) => task.id !== taskId),
    }))
    setColumns(newColumns)
    saveColumns(newColumns)
  }

  const toggleTaskCompletion = (taskId: string) => {
    const newColumns = columns.map((col) =>
      col.tasks.find((task) => task.id === taskId)
        ? {
            ...col,
            tasks: col.tasks.map((task) =>
              task.id === taskId ? { ...task, completed: !task.completed } : task,
            ),
          }
        : col,
    )
    setColumns(newColumns)
    saveColumns(newColumns)
  }

  const value: AppContextValue = {
    columns,
    searchQuery,
    setSearchQuery,
    addTask,
    addColumn,
    deleteColumn,
    deleteTask,
    toggleTaskCompletion,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export { AppProvider }
