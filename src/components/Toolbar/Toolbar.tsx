import Search from '../Search'
import InlineForm from '../InlineForm'
import Button from '../Button'
import Icon from '../Icon'
import { useAppContext } from '../../hooks/useAppContext'
import { ButtonVariant, IconName } from '../../types'
import useInlineForm from '../../hooks/useInlineForm'

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
      <div className="flex min-w-0 flex-col gap-3 p-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:p-4">
        <Search query={searchQuery} onQueryChange={setSearchQuery} />
        <Button
          variant={ButtonVariant.OutlineDashed}
          onClick={setIsAddingColumn}
          className="w-full shrink-0 sm:w-auto"
        >
          <Icon name={IconName.Plus} size={20} className="text-primary-400" />
          Add column
        </Button>
      </div>
      <div className="px-3 sm:px-4">
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
