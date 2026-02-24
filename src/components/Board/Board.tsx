import DraggableColumn from '../DraggableColumn'
import { useAppContext } from '../../hooks/useAppContext'

const Board = () => {
  const { columns, searchQuery, addTask, deleteColumn, reorderColumns } = useAppContext()

  return (
    <div className="grid grid-cols-1 gap-3 overflow-y-auto p-3 sm:grid-cols-2 sm:gap-4 sm:p-4 lg:grid-cols-3">
      {columns.map((column, index) => (
        <DraggableColumn
          key={column.id}
          column={column}
          index={index}
          tasks={column.tasks}
          searchQuery={searchQuery}
          onAddTask={addTask}
          onDeleteColumn={deleteColumn}
          onReorder={reorderColumns}
        />
      ))}
    </div>
  )
}

export default Board
