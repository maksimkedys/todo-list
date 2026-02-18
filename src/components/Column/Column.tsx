import type { ColumnType, TaskType } from '../../types'
import Task from '../Task'
import InlineForm from '../InlineForm'
import cn from 'classnames'
import { useState } from 'react'

interface ColumnProps {
  column: ColumnType
  tasks?: TaskType[]
  onAddTask?: (columnId: string, taskText: string) => void
  onDeleteColumn?: (columnId: string) => void
}

const Column = ({ column, tasks, onAddTask, onDeleteColumn }: ColumnProps) => {
  const [isAddingTask, setIsAddingTask] = useState(false)
  const [newTaskText, setNewTaskText] = useState('')

  if (!tasks) return null

  const handleAddTask = () => {
    if (newTaskText.trim() && onAddTask) {
      onAddTask(column.id, newTaskText.trim())
      setNewTaskText('')
      setIsAddingTask(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleAddTask()
    if (e.key === 'Escape') {
      setIsAddingTask(false)
      setNewTaskText('')
    }
  }

  return (
    <div className={cn('bg-primary-950 flex w-320 flex-col gap-2 rounded-xl p-4')}>
      <div className="text-primary-100 mb-1 flex items-start justify-between gap-2">
        <h2 className="text-lg font-bold">{column.title}</h2>
        {onDeleteColumn && (
          <button
            type="button"
            onClick={() => onDeleteColumn(column.id)}
            className="text-primary-400 hover:text-primary-300 shrink-0 rounded p-1 transition-colors"
            aria-label="Delete column"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-primary-400"
            >
              <path
                d="M5.12817 8.15391C5.12817 10.4103 5.12817 13.5898 5.12817 15.1283C5.23074 16.4616 5.3333 18.2052 5.43587 19.436C5.53843 20.8719 6.7692 22.0001 8.2051 22.0001H15.7948C17.2307 22.0001 18.4615 20.8719 18.5641 19.436C18.6666 18.2052 18.7692 16.4616 18.8718 15.1283C18.9743 13.5898 18.8718 10.4103 18.8718 8.15391H5.12817Z"
                fill="currentColor"
              />
              <path
                d="M19.1795 5.07698H16.6154L15.7949 3.53852C15.2821 2.61545 14.359 2.00006 13.3333 2.00006H10.8718C9.84615 2.00006 8.82051 2.61545 8.41026 3.53852L7.38462 5.07698H4.82051C4.41026 5.07698 4 5.48724 4 5.8975C4 6.30775 4.41026 6.71801 4.82051 6.71801H19.1795C19.5897 6.71801 20 6.41032 20 5.8975C20 5.38468 19.5897 5.07698 19.1795 5.07698ZM9.12821 5.07698L9.64103 4.25647C9.84615 3.84621 10.2564 3.53852 10.7692 3.53852H13.2308C13.7436 3.53852 14.1538 3.74365 14.359 4.25647L14.8718 5.07698H9.12821Z"
                fill="currentColor"
              />
            </svg>
          </button>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2">
        {column.tasks.map((task) => (
          <Task key={task.id} task={task} />
        ))}

        {isAddingTask ? (
          <InlineForm
            value={newTaskText}
            onChange={setNewTaskText}
            placeholder="Enter task name..."
            onSubmit={handleAddTask}
            onCancel={() => {
              setIsAddingTask(false)
              setNewTaskText('')
            }}
            onKeyDown={handleKeyDown}
            submitDisabled={!newTaskText.trim()}
            variant="default"
          />
        ) : (
          <button
            onClick={() => setIsAddingTask(true)}
            className="border-primary-700 text-primary-400 hover:border-primary-600 hover:bg-primary-900 hover:text-primary-300 mt-1 flex items-center justify-center gap-2 rounded-lg border-2 border-dashed bg-transparent px-4 py-3 text-sm font-medium transition-all"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-primary-400"
            >
              <path
                d="M12 5V19M5 12H19"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Add task
          </button>
        )}
      </div>
    </div>
  )
}

export default Column
