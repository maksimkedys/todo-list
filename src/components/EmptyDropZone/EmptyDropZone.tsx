import { useEffect, useRef, useState } from 'react'
import { dropTargetForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter'
import cn from 'classnames'

const TASK_TYPE = 'task'

interface EmptyDropZoneProps {
  columnId: string
  onMoveTask: (
    taskId: string,
    sourceColumnId: string,
    targetColumnId: string,
    targetIndex: number,
  ) => void
}

const EmptyDropZone = ({ columnId, onMoveTask }: EmptyDropZoneProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const [isOver, setIsOver] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    return dropTargetForElements({
      element: el,
      getData: () => ({
        type: TASK_TYPE,
        targetColumnId: columnId,
        targetIndex: 0,
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
          onMoveTask(src.taskId, src.sourceColumnId, dst.targetColumnId, dst.targetIndex)
        }
      },
    })
  }, [columnId, onMoveTask])

  return (
    <div
      ref={ref}
      className={cn(
        'border-surface-600/80 text-surface-300/70 flex-1 rounded-lg border border-dashed p-3 text-center text-sm',
        isOver && 'border-primary-500 bg-surface-700/80 text-primary-100',
      )}
    >
      Drop task here
    </div>
  )
}

export default EmptyDropZone
