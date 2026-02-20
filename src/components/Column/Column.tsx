import type { ColumnType, TaskType } from '../../types'
import Task from '../Task'
import InlineForm from '../InlineForm'
import Button from '../Button'
import Icon from '../Icon'
import { ButtonVariant, IconName } from '../../types'
import useInlineForm from '../InlineForm/useInlineForm'

interface ColumnProps {
  column: ColumnType
  tasks?: TaskType[]
  onAddTask?: (columnId: string, taskText: string) => void
  onDeleteColumn?: (columnId: string) => void
}

const Column = ({ column, tasks, onAddTask, onDeleteColumn }: ColumnProps) => {
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

  if (!tasks) return null

  return (
    <div className="bg-primary-950 flex w-320 flex-col gap-2 rounded-xl p-4">
      <div className="text-primary-100 mb-1 flex items-start justify-between gap-2">
        <h2 className="text-lg font-bold">{column.title}</h2>
        {onDeleteColumn && (
          <Button
            variant={ButtonVariant.GhostIcon}
            onClick={() => onDeleteColumn(column.id)}
            className="shrink-0"
            aria-label="Delete column"
          >
            <Icon name={IconName.Trash} size={18} className="text-primary-400" />
          </Button>
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
            onCancel={handleCancel}
            onKeyDown={handleKeyDown}
            submitDisabled={!newTaskText.trim()}
          />
        ) : (
          <Button variant={ButtonVariant.OutlineDashed} onClick={startAddingTask} className="mt-1">
            <Icon name={IconName.Plus} size={20} className="text-primary-400" />
            Add task
          </Button>
        )}
      </div>
    </div>
  )
}

export default Column
