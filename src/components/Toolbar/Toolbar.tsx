import Search from '../Search'
import InlineForm from '../InlineForm'
import Button from '../Button'
import Icon from '../Icon'
import { useAppContext } from '../../hooks/useAppContext'
import { ButtonVariant, IconName, TaskFilter } from '../../types'
import useInlineForm from '../../hooks/useInlineForm'
import { useState } from 'react'

const Toolbar = () => {
  const {
    columns,
    searchQuery,
    setSearchQuery,
    taskFilter,
    setTaskFilter,
    selectedTaskIds,
    deleteSelectedTasks,
    updateSelectedTasksCompletion,
    moveSelectedTasksToColumn,
    addColumn,
  } = useAppContext()

  const [moveTargetColumnId, setMoveTargetColumnId] = useState('')

  const selectedCount = selectedTaskIds.size

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

  const handleMoveSelectedChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const targetId = event.target.value
    if (!targetId) return
    moveSelectedTasksToColumn(targetId)
    setMoveTargetColumnId('')
  }

  return (
    <>
      <div className="flex min-w-0 flex-col gap-3 p-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:p-4">
        <Search query={searchQuery} onQueryChange={setSearchQuery} />
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-primary-300 text-xs font-medium">Filter:</span>
            <Button
              type="button"
              variant={
                taskFilter === TaskFilter.All ? ButtonVariant.Primary : ButtonVariant.Secondary
              }
              className="px-2 py-1 text-xs sm:text-sm"
              onClick={() => setTaskFilter(TaskFilter.All)}
            >
              All
            </Button>
            <Button
              type="button"
              variant={
                taskFilter === TaskFilter.Incomplete
                  ? ButtonVariant.Primary
                  : ButtonVariant.Secondary
              }
              className="px-2 py-1 text-xs sm:text-sm"
              onClick={() => setTaskFilter(TaskFilter.Incomplete)}
            >
              Incomplete
            </Button>
            <Button
              type="button"
              variant={
                taskFilter === TaskFilter.Completed
                  ? ButtonVariant.Primary
                  : ButtonVariant.Secondary
              }
              className="px-2 py-1 text-xs sm:text-sm"
              onClick={() => setTaskFilter(TaskFilter.Completed)}
            >
              Completed
            </Button>
          </div>
          <Button
            variant={ButtonVariant.OutlineDashed}
            onClick={setIsAddingColumn}
            className="w-full shrink-0 sm:w-auto"
          >
            <Icon name={IconName.Plus} size={20} className="text-primary-400" />
            Add column
          </Button>
        </div>
      </div>
      {selectedCount > 0 && (
        <div className="flex flex-col gap-2 px-3 pb-2 text-xs sm:flex-row sm:items-center sm:justify-between sm:px-4 sm:text-sm">
          <div className="text-primary-200 flex flex-wrap items-center gap-2">
            <span className="font-medium">{selectedCount} selected</span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Button
              type="button"
              variant={ButtonVariant.Secondary}
              className="px-3 py-1"
              onClick={() => updateSelectedTasksCompletion(true)}
            >
              Mark complete
            </Button>
            <Button
              type="button"
              variant={ButtonVariant.Secondary}
              className="px-3 py-1"
              onClick={() => updateSelectedTasksCompletion(false)}
            >
              Mark incomplete
            </Button>
            <Button
              type="button"
              variant={ButtonVariant.Secondary}
              className="px-3 py-1"
              onClick={deleteSelectedTasks}
            >
              <Icon name={IconName.Trash} size={18} className="text-primary-400" />
              Delete
            </Button>
            {columns.length > 0 && (
              <select
                className="border-surface-600 bg-surface-900 text-primary-100 h-8 rounded px-2 text-xs sm:text-sm"
                value={moveTargetColumnId}
                onChange={handleMoveSelectedChange}
              >
                <option value="">Move to column...</option>
                {columns.map((column) => (
                  <option key={column.id} value={column.id}>
                    {column.title || 'Untitled'}
                  </option>
                ))}
              </select>
            )}
          </div>
        </div>
      )}
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
