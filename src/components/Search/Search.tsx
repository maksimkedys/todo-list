import cn from 'classnames'
import Icon from '../Icon'
import BaseInput from '../BaseInput'
import { IconName, InputVariant } from '../../types'

interface SearchProps {
  query: string
  onQueryChange: (value: string) => void
}

const Search = ({ query, onQueryChange }: SearchProps) => {
  return (
    <div className={cn('relative', 'flex-1')}>
      <Icon
        name={IconName.Search}
        size={16}
        className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400"
      />

      <BaseInput
        variant={InputVariant.Search}
        value={query}
        onChange={onQueryChange}
        placeholder="Search tasks..."
        className="pl-10"
      />
    </div>
  )
}

export default Search
