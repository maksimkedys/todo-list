import cn from 'classnames'
import type { TaskType } from '../../types'
import { useAppContext } from '../../hooks/useAppContext'
import Button from '../Button'
import Icon from '../Icon'
import { ButtonVariant, IconName } from '../../types'
import { getHighlightParts } from '../../utils/highlight'

interface TaskProps {
  task: TaskType
  highlightQuery?: string
}

const Task = ({ task, highlightQuery }: TaskProps) => {
  const { deleteTask, toggleTaskCompletion } = useAppContext()

  const { id, text, completed } = task
  const parts = getHighlightParts(text, highlightQuery ?? '')

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
        {parts.map((part) =>
          part.type === 'match' ? (
            <mark
              key={part.key}
              className="bg-primary-600 text-primary-100 rounded px-0.5 font-medium"
            >
              {part.value}
            </mark>
          ) : (
            part.value
          ),
        )}
      </span>
      <Button
        variant={ButtonVariant.GhostIcon}
        onClick={() => {
          deleteTask(id)
        }}
        className="opacity-0 transition-opacity group-hover:opacity-100 hover:opacity-100"
        aria-label="Delete task"
      >
        <Icon
          name={IconName.Trash}
          size={20}
          className="text-primary-400 hover:text-primary-300 transition-colors"
        />
      </Button>
    </div>
  )
}

export default Task
