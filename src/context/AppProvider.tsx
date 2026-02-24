import { useState, type ReactNode } from 'react'
import { AppContext, type AppContextValue } from './AppContext'
import type { ColumnType, TaskType } from '../types'
import { TaskFilter } from '../types'
import { generateId } from '../utils/id'
import useLocalStorage from '../hooks/useLocalStorage'

const DEFAULT_COLUMNS: ColumnType[] = [
  { id: generateId(), title: 'To Do', tasks: [] },
  { id: generateId(), title: 'In Progress', tasks: [] },
]

const AppProvider = ({ children }: { children: ReactNode }) => {
  const { getValue: getColumns, saveValue: saveColumns } = useLocalStorage<ColumnType[]>({
    key: 'columns',
    defaultValue: DEFAULT_COLUMNS,
  })

  const [searchQuery, setSearchQuery] = useState('')
  const [taskFilter, setTaskFilter] = useState<TaskFilter>(TaskFilter.All)
  const [columns, setColumns] = useState<ColumnType[]>(getColumns() ?? [])
  const [selectedTaskIds, setSelectedTaskIds] = useState<Set<string>>(new Set())

  const persistColumns = (next: ColumnType[]) => {
    setColumns(next)
    saveColumns(next)
  }

  const addColumn = (title: string) => {
    const newColumn: ColumnType = { id: generateId(), title: title.trim(), tasks: [] }
    persistColumns([...columns, newColumn])
  }

  const deleteColumn = (columnId: string) => {
    const column = columns.find((c) => c.id === columnId)
    if (column) {
      setSelectedTaskIds((prev) => {
        const next = new Set(prev)
        column.tasks.forEach((t) => next.delete(t.id))
        return next.size === prev.size ? prev : next
      })
    }
    persistColumns(columns.filter((col) => col.id !== columnId))
  }

  const updateColumnTitle = (columnId: string, newTitle: string) => {
    persistColumns(
      columns.map((col) =>
        col.id === columnId ? { ...col, title: newTitle.trim() || 'Untitled' } : col,
      ),
    )
  }

  const reorderColumns = (fromIndex: number, toIndex: number) => {
    if (fromIndex === toIndex) return
    const reordered = [...columns]
    const [removed] = reordered.splice(fromIndex, 1)
    reordered.splice(toIndex, 0, removed)
    persistColumns(reordered)
  }

  const addTask = (columnId: string, taskText: string) => {
    const newTask: TaskType = { id: generateId(), text: taskText, completed: false }
    persistColumns(
      columns.map((col) =>
        col.id === columnId ? { ...col, tasks: [...col.tasks, newTask] } : col,
      ),
    )
  }

  const deleteTask = (taskId: string) => {
    setSelectedTaskIds((prev) => {
      if (!prev.has(taskId)) return prev
      const next = new Set(prev)
      next.delete(taskId)
      return next
    })
    persistColumns(
      columns.map((col) => ({
        ...col,
        tasks: col.tasks.filter((task) => task.id !== taskId),
      })),
    )
  }

  const toggleTaskCompletion = (taskId: string) => {
    persistColumns(
      columns.map((col) =>
        col.tasks.some((t) => t.id === taskId)
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

  const editTask = (taskId: string, newText: string) => {
    const trimmed = newText.trim()
    if (!trimmed) return
    persistColumns(
      columns.map((col) =>
        col.tasks.some((t) => t.id === taskId)
          ? {
              ...col,
              tasks: col.tasks.map((task) =>
                task.id === taskId ? { ...task, text: trimmed } : task,
              ),
            }
          : col,
      ),
    )
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
      const without = sourceCol!.tasks.filter((t) => t.id !== taskId)
      const next = [...without]
      next.splice(Math.min(targetIndex, without.length), 0, task)
      persistColumns(columns.map((c) => (c.id === sourceColumnId ? { ...c, tasks: next } : c)))
      return
    }

    persistColumns(
      columns.map((col) => {
        if (col.id === sourceColumnId) {
          return { ...col, tasks: col.tasks.filter((t) => t.id !== taskId) }
        }
        if (col.id === targetColumnId) {
          const next = [...col.tasks]
          next.splice(Math.min(targetIndex, col.tasks.length), 0, task)
          return { ...col, tasks: next }
        }
        return col
      }),
    )
  }

  const toggleTaskSelection = (taskId: string) => {
    setSelectedTaskIds((prev) => {
      const next = new Set(prev)
      if (next.has(taskId)) next.delete(taskId)
      else next.add(taskId)
      return next
    })
  }

  const clearTaskSelection = () => setSelectedTaskIds(new Set())

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

  const deleteSelectedTasks = () => {
    if (selectedTaskIds.size === 0) return
    persistColumns(
      columns.map((col) => ({
        ...col,
        tasks: col.tasks.filter((task) => !selectedTaskIds.has(task.id)),
      })),
    )
    setSelectedTaskIds(new Set())
  }

  const updateSelectedTasksCompletion = (completed: boolean) => {
    if (selectedTaskIds.size === 0) return
    persistColumns(
      columns.map((col) => ({
        ...col,
        tasks: col.tasks.map((task) =>
          selectedTaskIds.has(task.id) ? { ...task, completed } : task,
        ),
      })),
    )
  }

  const moveSelectedTasksToColumn = (targetColumnId: string) => {
    if (selectedTaskIds.size === 0) return

    const allTasks = columns.flatMap((col) => col.tasks)
    const tasksToMove = allTasks.filter((t) => selectedTaskIds.has(t.id))
    if (tasksToMove.length === 0) return

    persistColumns(
      columns.map((col) => {
        const withoutSelected = col.tasks.filter((t) => !selectedTaskIds.has(t.id))
        if (col.id === targetColumnId) {
          return { ...col, tasks: [...withoutSelected, ...tasksToMove] }
        }
        return { ...col, tasks: withoutSelected }
      }),
    )
    setSelectedTaskIds(new Set())
  }

  const value: AppContextValue = {
    columns,
    searchQuery,
    setSearchQuery,
    taskFilter,
    setTaskFilter,
    selectedTaskIds,
    toggleTaskSelection,
    clearTaskSelection,
    selectAllTasksInColumn,
    deselectAllTasksInColumn,
    isColumnFullySelected,
    addTask,
    addColumn,
    deleteColumn,
    deleteTask,
    deleteSelectedTasks,
    toggleTaskCompletion,
    updateSelectedTasksCompletion,
    editTask,
    updateColumnTitle,
    reorderColumns,
    moveTask,
    moveSelectedTasksToColumn,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export { AppProvider }
