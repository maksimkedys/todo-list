import cn from 'classnames'
import type { TaskType } from '../../types'
import { useAppContext } from '../../hooks/useAppContext'

interface TaskProps {
  task: TaskType
}

const Task = ({ task }: TaskProps) => {
  const { deleteTask, toggleTaskCompletion } = useAppContext()

  const { id, text, completed } = task

  return (
    <div
      className={cn(
        'group border-primary-800 bg-primary-900 flex items-center gap-3 rounded-lg border p-4',
        'shadow-soft transition-all duration-200',
        'hover:border-primary-700 hover:shadow-soft-lg hover:-translate-y-0.5',
        completed && 'opacity-60',
      )}
    >
      <input
        type="checkbox"
        checked={completed}
        onChange={() => {
          toggleTaskCompletion(id)
        }}
        className={cn(
          'border-primary-700 bg-primary-800 text-primary-500 h-5 w-5 cursor-pointer rounded',
          'focus:ring-primary-500 focus:ring-offset-primary-900 focus:ring-2 focus:ring-offset-2',
          'transition-colors',
        )}
      />
      <span
        className={cn(
          'text-primary-100 flex-1 text-sm font-medium',
          completed && 'text-primary-400 line-through',
        )}
      >
        {text}
      </span>
      <button
        onClick={() => {
          deleteTask(id)
        }}
        className="opacity-0 transition-opacity group-hover:opacity-100 hover:opacity-100"
        aria-label="Delete task"
      >
        <svg
          width="20px"
          height="20px"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-primary-400 hover:text-primary-300 transition-colors"
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
    </div>
  )
}

export default Task
