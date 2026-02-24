import cn from 'classnames'
import type { TaskType } from '../../types'
import { useAppContext } from '../../hooks/useAppContext'
import { useInlineEdit } from '../../hooks/useInlineEdit'
import Button from '../Button'
import Icon from '../Icon'
import BaseInput from '../BaseInput'
import { InputVariant } from '../../types'
import { ButtonVariant, IconName } from '../../types'
import { getHighlightParts } from '../../utils/highlight'

interface TaskProps {
  task: TaskType
  highlightQuery?: string
  isSelected?: boolean
}

const Task = ({ task, highlightQuery, isSelected }: TaskProps) => {
  const { deleteTask, toggleTaskCompletion, toggleTaskSelection, editTask } = useAppContext()
  const { id, text, completed } = task
  const parts = getHighlightParts(text, highlightQuery ?? '')

  const {
    isEditing,
    value: editValue,
    setValue: setEditValue,
    inputRef,
    startEditing,
    save,
    handleKeyDown,
  } = useInlineEdit({
    currentValue: text,
    onSave: (value) => {
      const trimmed = value.trim()
      if (trimmed) editTask(id, trimmed)
    },
  })

  return (
    <div
      className={cn(
        'group border-surface-600 bg-surface-700 flex items-center gap-2 rounded-lg border p-3 sm:gap-3 sm:p-4',
        'shadow-soft transition-all duration-200',
        'hover:border-surface-500 hover:shadow-soft-lg hover:-translate-y-0.5',
        completed && 'opacity-60',
        isSelected && 'ring-primary-500 ring-offset-surface-900 ring-2 ring-offset-2',
      )}
    >
      <input
        type="checkbox"
        checked={isSelected}
        onChange={() => toggleTaskSelection(id)}
        title="Select for bulk actions"
        aria-label="Select task"
        className={cn(
          'h-4 w-4 shrink-0 cursor-pointer transition-colors sm:h-5 sm:w-5',
          'border-primary-500/50 bg-surface-800 appearance-none rounded border-2',
          'focus:ring-primary-500 focus:ring-offset-surface-900 focus:ring-2 focus:ring-offset-2',
          'checked:border-primary-500 checked:bg-primary-500',
          'checked:bg-size-[12px] checked:bg-center checked:bg-no-repeat',
          "checked:bg-[url('data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M5 13l4 4L19 7'/%3E%3C/svg%3E')]",
        )}
      />
      <input
        type="checkbox"
        checked={completed}
        onChange={() => toggleTaskCompletion(id)}
        title="Mark complete"
        aria-label="Mark task complete"
        className={cn(
          'h-4 w-4 shrink-0 cursor-pointer transition-colors sm:h-5 sm:w-5',
          'bg-surface-800 appearance-none rounded-full border-2 border-green-500/50',
          'focus:ring-offset-surface-900 focus:ring-2 focus:ring-green-500 focus:ring-offset-2',
          'checked:border-green-500 checked:bg-green-500',
          'checked:bg-size-[12px] checked:bg-center checked:bg-no-repeat',
          "checked:bg-[url('data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M5 13l4 4L19 7'/%3E%3C/svg%3E')]",
        )}
      />
      {isEditing ? (
        <BaseInput
          ref={inputRef}
          variant={InputVariant.Default}
          value={editValue}
          onChange={setEditValue}
          onBlur={save}
          onKeyDown={handleKeyDown}
          className={cn(
            'min-w-0 flex-1 text-xs font-medium sm:text-sm',
            completed && 'text-primary-400 line-through',
          )}
        />
      ) : (
        <span
          className={cn(
            'text-primary-100 flex-1 text-xs font-medium sm:text-sm',
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
      )}
      {!isEditing && (
        <>
          <Button
            variant={ButtonVariant.GhostIcon}
            onClick={startEditing}
            className="opacity-100 transition-opacity sm:opacity-0 sm:group-hover:opacity-100 sm:hover:opacity-100"
            aria-label="Edit task"
          >
            <Icon
              name={IconName.Edit}
              size={20}
              className="text-primary-400 hover:text-primary-300 transition-colors"
            />
          </Button>
          <Button
            variant={ButtonVariant.GhostIcon}
            onClick={() => deleteTask(id)}
            className="opacity-100 transition-opacity sm:opacity-0 sm:group-hover:opacity-100 sm:hover:opacity-100"
            aria-label="Delete task"
          >
            <Icon
              name={IconName.Trash}
              size={20}
              className="text-primary-400 hover:text-primary-300 transition-colors"
            />
          </Button>
        </>
      )}
    </div>
  )
}

export default Task
