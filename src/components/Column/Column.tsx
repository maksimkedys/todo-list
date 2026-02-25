import cn from 'classnames'
import type { ColumnType } from '../../types'
import DraggableTask from '../DraggableTask'
import InlineForm from '../InlineForm'
import Button from '../Button'
import Icon from '../Icon'
import BaseInput from '../BaseInput'
import { useAppContext } from '../../hooks/useAppContext'
import { useInlineEdit } from '../../hooks/useInlineEdit'
import { ButtonVariant, IconName, TaskFilter } from '../../types'
import { InputVariant } from '../../types'
import useInlineForm from '../../hooks/useInlineForm'
import { fuzzyMatch } from '../../utils/fuzzySearch'
import EmptyDropZone from '../EmptyDropZone'

interface ColumnProps {
  column: ColumnType
  searchQuery?: string
  onAddTask?: (columnId: string, taskText: string) => void
  onDeleteColumn?: (columnId: string) => void
  isDropTarget?: boolean
}

const Column = ({
  column,
  searchQuery = '',
  onAddTask,
  onDeleteColumn,
  isDropTarget,
}: ColumnProps) => {
  const {
    taskFilter,
    selectedTaskIds,
    selectAllTasksInColumn,
    deselectAllTasksInColumn,
    isColumnFullySelected,
    updateColumnTitle,
    moveTask,
  } = useAppContext()

  const query = searchQuery.trim()
  const tasksMatchingQuery =
    query === '' ? column.tasks : column.tasks.filter((task) => fuzzyMatch(task.text, query))

  const displayedTasks =
    taskFilter === TaskFilter.Completed
      ? tasksMatchingQuery.filter((task) => task.completed)
      : taskFilter === TaskFilter.Incomplete
        ? tasksMatchingQuery.filter((task) => !task.completed)
        : tasksMatchingQuery

  const handleSubmitTask = (taskText: string) => {
    if (onAddTask) {
      onAddTask(column.id, taskText)
    }
  }

  const {
    isOpen: isAddingTask,
    value: newTaskText,
    setValue: setNewTaskText,
    handleSubmit: handleAddTask,
    handleKeyDown,
    handleCancel,
    startAdding: startAddingTask,
  } = useInlineForm({
    onSubmit: handleSubmitTask,
    validate: (val) => !!val.trim(),
  })

  const {
    isEditing: isEditingTitle,
    value: titleValue,
    setValue: setTitleValue,
    inputRef: titleInputRef,
    startEditing: startEditingTitle,
    save: saveTitle,
    handleKeyDown: handleTitleKeyDown,
  } = useInlineEdit({
    currentValue: column.title,
    onSave: (value) => updateColumnTitle(column.id, value.trim() || 'Untitled'),
  })

  const allSelected = isColumnFullySelected(column.id)
  const hasTasks = column.tasks.length > 0
  const handleSelectAllClick = () => {
    if (allSelected) deselectAllTasksInColumn(column.id)
    else selectAllTasksInColumn(column.id)
  }

  return (
    <div
      className={cn(
        'bg-surface-800 border-surface-700/70 flex flex-col gap-2 overflow-hidden rounded-xl border p-3 sm:p-4',
        isDropTarget && 'ring-primary-500 ring-1',
      )}
    >
      <div className="group text-primary-100 mb-1 flex items-start justify-between gap-2">
        <div className="flex min-w-0 flex-1 items-center gap-2">
          {hasTasks && (
            <input
              type="checkbox"
              checked={allSelected}
              onChange={handleSelectAllClick}
              title="Select all tasks in column"
              className={cn(
                'h-4 w-4 shrink-0 cursor-pointer transition-colors sm:h-5 sm:w-5',
                'border-primary-500/50 bg-surface-800 appearance-none rounded border-2',
                'focus:ring-primary-500 focus:ring-offset-surface-900 focus:ring-2 focus:ring-offset-2',
                'checked:border-primary-500 checked:bg-primary-500',
                'checked:bg-size-[12px] checked:bg-center checked:bg-no-repeat',
                "checked:bg-[url('data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M5 13l4 4L19 7'/%3E%3C/svg%3E')]",
              )}
            />
          )}
          {isEditingTitle ? (
            <BaseInput
              ref={titleInputRef}
              variant={InputVariant.Default}
              value={titleValue}
              onChange={setTitleValue}
              onBlur={saveTitle}
              onKeyDown={handleTitleKeyDown}
              placeholder="Column title..."
              className="min-w-0 flex-1 text-base font-bold sm:text-lg"
            />
          ) : (
            <>
              <h2 className="truncate text-base font-bold sm:text-lg">{column.title}</h2>
              <Button
                variant={ButtonVariant.GhostIcon}
                onClick={startEditingTitle}
                className="shrink-0 opacity-0 group-hover:opacity-100 hover:opacity-100"
                aria-label="Edit column title"
              >
                <Icon
                  name={IconName.Edit}
                  size={20}
                  className="text-primary-400 hover:text-primary-300 transition-all active:opacity-80"
                />
              </Button>
            </>
          )}
        </div>
        {!isEditingTitle && onDeleteColumn && (
          <Button
            variant={ButtonVariant.GhostIcon}
            onClick={() => onDeleteColumn(column.id)}
            className="shrink-0"
            aria-label="Delete column"
          >
            <Icon
              name={IconName.Trash}
              size={20}
              className="text-primary-400 hover:text-primary-300 transition-all active:opacity-80"
              aria-label="Delete column"
            />
          </Button>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2">
        {displayedTasks.map((task) => {
          const taskIndex = column.tasks.findIndex((t) => t.id === task.id)
          return (
            <DraggableTask
              key={task.id}
              task={task}
              columnId={column.id}
              taskIndex={taskIndex}
              highlightQuery={searchQuery}
              isSelected={selectedTaskIds.has(task.id)}
              onMove={moveTask}
            />
          )
        })}

        {displayedTasks.length === 0 && (
          <EmptyDropZone columnId={column.id} onMoveTask={moveTask} />
        )}

        {isAddingTask ? (
          <InlineForm
            value={newTaskText}
            onChange={setNewTaskText}
            placeholder="Enter task name..."
            onSubmit={handleAddTask}
            onCancel={handleCancel}
            onKeyDown={handleKeyDown}
            submitDisabled={!newTaskText.trim()}
          />
        ) : (
          <Button
            variant={ButtonVariant.OutlineDashed}
            onClick={startAddingTask}
            className="mt-1 w-full sm:w-auto"
          >
            <Icon name={IconName.Plus} size={20} className="text-primary-400" />
            Add task
          </Button>
        )}
      </div>
    </div>
  )
}

export default Column
