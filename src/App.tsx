import Board from './components/Board'
import Toolbar from './components/Toolbar'
import SpriteLoader from './components/Icon/SpriteLoader'

const App = () => {
  return (
    <>
      <SpriteLoader />
      <div className="bg-primary-900 mx-auto flex w-full max-w-7xl flex-col rounded-xl">
        <Toolbar />
        <Board />
      </div>
    </>
  )
}

export default App
