import cn from 'classnames'
import type { Task } from '../../types'

interface TaskItemProps {
  task: Task
}

const TaskItem = ({ task }: TaskItemProps) => {
  return (
    <div className={cn('flex items-center gap-2 rounded-lg border p-3 transition-colors')}>
      {task.text}
    </div>
  )
}

export default TaskItem
