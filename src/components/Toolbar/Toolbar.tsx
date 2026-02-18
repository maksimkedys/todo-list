import Search from '../Search'
import { useAppContext } from '../../hooks/useAppContext'

const Toolbar = () => {
  const { searchQuery, setSearchQuery } = useAppContext()

  return (
    <div className="flex items-center justify-between p-4">
      <Search query={searchQuery} onQueryChange={setSearchQuery} />
    </div>
  )
}

export default Toolbar
