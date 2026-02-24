import { useEffect, useRef, useState } from 'react'
import { combine } from '@atlaskit/pragmatic-drag-and-drop/combine'
import { draggable, dropTargetForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter'
import cn from 'classnames'
import type { ColumnType, TaskType } from '../../types'
import Column from '../Column'

const COLUMN_TYPE = 'column'

interface DraggableColumnProps {
  column: ColumnType
  index: number
  tasks?: TaskType[]
  searchQuery?: string
  onAddTask?: (columnId: string, taskText: string) => void
  onDeleteColumn?: (columnId: string) => void
  onReorder: (fromIndex: number, toIndex: number) => void
}

const DraggableColumn = ({
  column,
  index,
  tasks,
  searchQuery,
  onAddTask,
  onDeleteColumn,
  onReorder,
}: DraggableColumnProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const [isOver, setIsOver] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    return combine(
      draggable({
        element: el,
        getInitialData: () => ({ type: COLUMN_TYPE, columnId: column.id, index }),
      }),
      dropTargetForElements({
        element: el,
        getData: () => ({ type: COLUMN_TYPE, columnId: column.id, index }),
        onDropTargetChange: ({ location, self, source }) => {
          const dragData = source.data as { type?: string }
          if (dragData.type !== COLUMN_TYPE) {
            setIsOver(false)
            return
          }
          const isCurrentlyOver = location.current.dropTargets.some(
            (record) => record.element === self.element,
          )
          setIsOver(isCurrentlyOver)
        },
        onDrop: ({ source, self }) => {
          setIsOver(false)
          const src = source.data as { type: string; index: number }
          const dst = self.data as { type: string; index: number }
          if (src.type === COLUMN_TYPE && dst.type === COLUMN_TYPE && src.index !== dst.index) {
            onReorder(src.index, dst.index)
          }
        },
      }),
    )
  }, [column.id, index, onReorder])

  return (
    <div
      ref={ref}
      className={cn(
        'relative cursor-grab overflow-hidden rounded-xl active:cursor-grabbing',
        isOver && 'border-primary-500 bg-primary-900/80 border',
      )}
    >
      <Column
        isDropTarget={isOver}
        column={column}
        tasks={tasks}
        searchQuery={searchQuery}
        onAddTask={onAddTask}
        onDeleteColumn={onDeleteColumn}
      />
    </div>
  )
}

export default DraggableColumn
