import Board from './components/Board'
import Toolbar from './components/Toolbar'
import SpriteLoader from './components/Icon/SpriteLoader'

const App = () => {
  return (
    <div className="flex w-full flex-col items-center justify-center">
      <SpriteLoader />
      <div className="bg-primary-900 flex w-full max-w-7xl flex-1 flex-col rounded-lg sm:rounded-xl">
        <Toolbar />
        <Board />
      </div>
    </div>
  )
}

export default App
