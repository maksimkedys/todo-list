import cn from 'classnames'

interface SearchProps {
  query: string
  onQueryChange: (value: string) => void
}

const Search = ({ query, onQueryChange }: SearchProps) => {
  return (
    <div className={cn('relative', 'flex-1')}>
      <svg
        className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>

      <input
        type="text"
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        placeholder="Search tasks..."
        className={cn(
          'w-full rounded-lg border border-gray-300 bg-white py-2 pr-4 pl-10 text-sm text-gray-800',
          'placeholder-gray-400 transition-colors',
          'focus:border-primary-500 focus:ring-primary-500/30 focus:ring-2 focus:outline-none',
        )}
      />
    </div>
  )
}

export default Search
