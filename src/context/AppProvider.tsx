import { useState, type ReactNode } from 'react'
import { AppContext, type AppContextValue } from './AppContext'
import type { ColumnType, TaskType } from '../types'
import { generateId } from '../utils/id'

const AppProvider = ({ children }: { children: ReactNode }) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [columns, setColumns] = useState<ColumnType[]>([
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
  ])

  const addTask = (columnId: string, taskText: string) => {
    const newTaskId = generateId()
    const newTask: TaskType = {
      id: newTaskId,
      text: taskText,
      completed: false,
    }

    setColumns((prevColumns) =>
      prevColumns.map((col) =>
        col.id === columnId ? { ...col, tasks: [...col.tasks, newTask] } : col,
      ),
    )
  }

  const addColumn = (title: string) => {
    const newColumn: ColumnType = {
      id: generateId(),
      title: title.trim(),
      tasks: [],
    }
    setColumns((prev) => [...prev, newColumn])
  }

  const deleteColumn = (columnId: string) => {
    setColumns((prev) => prev.filter((col) => col.id !== columnId))
  }

  const deleteTask = (taskId: string) => {
    setColumns((prevColumns) =>
      prevColumns.map((col) => ({
        ...col,
        tasks: col.tasks.filter((task) => task.id !== taskId),
      })),
    )
  }

  const toggleTaskCompletion = (taskId: string) => {
    setColumns((prevColumns) =>
      prevColumns.map((col) =>
        col.tasks.find((task) => task.id === taskId)
          ? {
              ...col,
              tasks: col.tasks.map((task) =>
                task.id === taskId ? { ...task, completed: !task.completed } : task,
              ),
            }
          : col,
      ),
    )
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
