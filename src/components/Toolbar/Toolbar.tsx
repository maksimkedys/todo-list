import { useState } from 'react'
import Search from '../Search'
import InlineForm from '../InlineForm'
import Modal from '../Modal'
import { useAppContext } from '../../hooks/useAppContext'

const Toolbar = () => {
  const { searchQuery, setSearchQuery, addColumn } = useAppContext()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [newColumnTitle, setNewColumnTitle] = useState('')

  const handleAddColumn = () => {
    addColumn(newColumnTitle.trim() || 'Untitled')
    setNewColumnTitle('')
    setIsModalOpen(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleAddColumn()
    if (e.key === 'Escape') {
      setIsModalOpen(false)
      setNewColumnTitle('')
    }
  }

  return (
    <div className="flex items-center justify-between gap-4 p-4">
      <Search query={searchQuery} onQueryChange={setSearchQuery} />
      <button
        type="button"
        onClick={() => setIsModalOpen(true)}
        className="border-primary-700 text-primary-400 hover:border-primary-600 hover:bg-primary-900 hover:text-primary-300 flex shrink-0 items-center justify-center gap-2 rounded-lg border-2 border-dashed bg-transparent px-4 py-2.5 text-sm font-medium transition-all"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-primary-400"
        >
          <path
            d="M12 5V19M5 12H19"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Add column
      </button>

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setNewColumnTitle('')
        }}
        title="New column"
      >
        <InlineForm
          value={newColumnTitle}
          onChange={setNewColumnTitle}
          placeholder="Column title..."
          onSubmit={handleAddColumn}
          onCancel={() => {
            setIsModalOpen(false)
            setNewColumnTitle('')
          }}
          onKeyDown={handleKeyDown}
          variant="default"
        />
      </Modal>
    </div>
  )
}

export default Toolbar
