import { useEffect, useRef, useState } from 'react'
import { combine } from '@atlaskit/pragmatic-drag-and-drop/combine'
import { draggable, dropTargetForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter'
import cn from 'classnames'
import type { TaskType } from '../../types'
import Task from '../Task/Task'

const TASK_TYPE = 'task'

interface DraggableTaskProps {
  task: TaskType
  columnId: string
  taskIndex: number
  highlightQuery?: string
  isSelected?: boolean
  onMove: (
    taskId: string,
    sourceColumnId: string,
    targetColumnId: string,
    targetIndex: number,
  ) => void
}

const DraggableTask = ({
  task,
  columnId,
  taskIndex,
  highlightQuery,
  isSelected,
  onMove,
}: DraggableTaskProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const [isOver, setIsOver] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    return combine(
      draggable({
        element: el,
        getInitialData: () => ({
          type: TASK_TYPE,
          taskId: task.id,
          sourceColumnId: columnId,
        }),
      }),
      dropTargetForElements({
        element: el,
        getData: () => ({
          type: TASK_TYPE,
          targetColumnId: columnId,
          targetIndex: taskIndex,
        }),
        onDropTargetChange: ({ location, self }) => {
          const isCurrentlyOver = location.current.dropTargets.some(
            (record) => record.element === self.element,
          )
          setIsOver(isCurrentlyOver)
        },
        onDrop: ({ source, self }) => {
          setIsOver(false)
          const src = source.data as { type: string; taskId: string; sourceColumnId: string }
          const dst = self.data as { type: string; targetColumnId: string; targetIndex: number }
          if (src.type === TASK_TYPE && dst.type === TASK_TYPE) {
            onMove(src.taskId, src.sourceColumnId, dst.targetColumnId, dst.targetIndex)
          }
        },
      }),
    )
  }, [task.id, columnId, taskIndex, onMove])

  return (
    <div
      ref={ref}
      className={cn(
        'cursor-grab rounded-lg active:cursor-grabbing',
        isOver && 'border-primary-500 bg-primary-900/80 border',
      )}
    >
      <Task task={task} highlightQuery={highlightQuery} isSelected={isSelected} />
    </div>
  )
}

export default DraggableTask
