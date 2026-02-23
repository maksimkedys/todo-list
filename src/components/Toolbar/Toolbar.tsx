import Search from '../Search'
import InlineForm from '../InlineForm'
import Button from '../Button'
import Icon from '../Icon'
import { useAppContext } from '../../hooks/useAppContext'
import { ButtonVariant, IconName } from '../../types'
import useInlineForm from '../InlineForm/useInlineForm'

const Toolbar = () => {
  const { searchQuery, setSearchQuery, addColumn } = useAppContext()
  const {
    isOpen: isAddingColumn,
    value: newColumnTitle,
    setValue: setNewColumnTitle,
    handleSubmit: handleAddColumn,
    handleKeyDown,
    handleCancel,
    startAdding: setIsAddingColumn,
  } = useInlineForm({
    onSubmit: addColumn,
    transform: (val) => val.trim() || 'Untitled',
  })

  return (
    <>
      <div className="flex items-center justify-between gap-4 p-4">
        <Search query={searchQuery} onQueryChange={setSearchQuery} />
        <Button
          variant={ButtonVariant.OutlineDashed}
          onClick={setIsAddingColumn}
          className="shrink-0"
        >
          <Icon name={IconName.Plus} size={20} className="text-primary-400" />
          Add column
        </Button>
      </div>
      <div className="px-4">
        {isAddingColumn && (
          <InlineForm
            value={newColumnTitle}
            onChange={setNewColumnTitle}
            placeholder="Column title..."
            onSubmit={handleAddColumn}
            onCancel={handleCancel}
            onKeyDown={handleKeyDown}
          />
        )}
      </div>
    </>
  )
}

export default Toolbar
