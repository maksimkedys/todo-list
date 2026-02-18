import Board from './components/Board'
import Toolbar from './components/Toolbar'

const App = () => {
  return (
    <div className="bg-primary-950 flex h-screen flex-col">
      <Toolbar />
      <Board />
    </div>
  )
}

export default App
