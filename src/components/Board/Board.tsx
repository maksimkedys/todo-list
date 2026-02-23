import Column from '../Column'
import { useAppContext } from '../../hooks/useAppContext'

const Board = () => {
  const { columns, searchQuery, addTask, deleteColumn } = useAppContext()

  return (
    <div className="flex flex-1 gap-4 overflow-x-auto p-4">
      {columns.map((column) => (
        <Column
          key={column.id}
          column={column}
          tasks={column.tasks}
          searchQuery={searchQuery}
          onAddTask={addTask}
          onDeleteColumn={deleteColumn}
        />
      ))}
    </div>
  )
}

export default Board
