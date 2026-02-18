import { useAppContext } from '../../hooks/useAppContext'
import Column from '../Column'

const Board = () => {
  const { state } = useAppContext()

  return <div className="flex flex-1 gap-4 overflow-x-auto p-4"></div>
}

export default Board
