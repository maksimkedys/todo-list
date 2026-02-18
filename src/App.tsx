import Board from './components/Board'
import Toolbar from './components/Toolbar'

const App = () => {
  return (
    <div className="bg-primary-900 mx-auto flex w-full max-w-7xl flex-col rounded-xl">
      <Toolbar />
      <Board />
    </div>
  )
}

export default App
