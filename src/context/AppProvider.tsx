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
  const [selectedTaskIds, setSelectedTaskIds] = useState<Set<string>>(new Set())

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

  const editTask = (taskId: string, newText: string) => {
    const trimmed = newText.trim()
    if (!trimmed) return
    const newColumns = columns.map((col) =>
      col.tasks.some((t) => t.id === taskId)
        ? {
            ...col,
            tasks: col.tasks.map((task) =>
              task.id === taskId ? { ...task, text: trimmed } : task,
            ),
          }
        : col,
    )
    setColumns(newColumns)
    saveColumns(newColumns)
  }

  const updateColumnTitle = (columnId: string, newTitle: string) => {
    const trimmed = newTitle.trim() || 'Untitled'
    const newColumns = columns.map((col) =>
      col.id === columnId ? { ...col, title: trimmed } : col,
    )
    setColumns(newColumns)
    saveColumns(newColumns)
  }

  const toggleTaskSelection = (taskId: string) => {
    setSelectedTaskIds((prev) => {
      const next = new Set(prev)
      if (next.has(taskId)) next.delete(taskId)
      else next.add(taskId)
      return next
    })
  }

  const selectAllTasksInColumn = (columnId: string) => {
    const column = columns.find((c) => c.id === columnId)
    if (!column) return
    setSelectedTaskIds((prev) => {
      const next = new Set(prev)
      column.tasks.forEach((t) => next.add(t.id))
      return next
    })
  }

  const deselectAllTasksInColumn = (columnId: string) => {
    const column = columns.find((c) => c.id === columnId)
    if (!column) return
    setSelectedTaskIds((prev) => {
      const next = new Set(prev)
      column.tasks.forEach((t) => next.delete(t.id))
      return next
    })
  }

  const isColumnFullySelected = (columnId: string) => {
    const column = columns.find((c) => c.id === columnId)
    if (!column || column.tasks.length === 0) return false
    return column.tasks.every((t) => selectedTaskIds.has(t.id))
  }

  const reorderColumns = (fromIndex: number, toIndex: number) => {
    if (fromIndex === toIndex) return
    const reordered = [...columns]
    const [removed] = reordered.splice(fromIndex, 1)
    reordered.splice(toIndex, 0, removed)
    setColumns(reordered)
    saveColumns(reordered)
  }

  const moveTask = (
    taskId: string,
    sourceColumnId: string,
    targetColumnId: string,
    targetIndex: number,
  ) => {
    const sourceCol = columns.find((c) => c.id === sourceColumnId)
    const task = sourceCol?.tasks.find((t) => t.id === taskId)
    if (!task) return

    if (sourceColumnId === targetColumnId) {
      const col = sourceCol!
      const without = col.tasks.filter((t) => t.id !== taskId)
      const insertIndex = Math.min(targetIndex, without.length)
      const next = [...without]
      next.splice(insertIndex, 0, task)
      const newColumns = columns.map((c) => (c.id === sourceColumnId ? { ...c, tasks: next } : c))
      setColumns(newColumns)
      saveColumns(newColumns)
      return
    }

    const newColumns = columns.map((col) => {
      if (col.id === sourceColumnId) {
        return { ...col, tasks: col.tasks.filter((t) => t.id !== taskId) }
      }
      if (col.id === targetColumnId) {
        const insertIndex = Math.min(targetIndex, col.tasks.length)
        const next = [...col.tasks]
        next.splice(insertIndex, 0, task)
        return { ...col, tasks: next }
      }
      return col
    })
    setColumns(newColumns)
    saveColumns(newColumns)
  }

  const value: AppContextValue = {
    columns,
    searchQuery,
    setSearchQuery,
    selectedTaskIds,
    toggleTaskSelection,
    selectAllTasksInColumn,
    deselectAllTasksInColumn,
    isColumnFullySelected,
    addTask,
    addColumn,
    deleteColumn,
    deleteTask,
    toggleTaskCompletion,
    editTask,
    updateColumnTitle,
    reorderColumns,
    moveTask,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export { AppProvider }
