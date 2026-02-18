interface InlineFormProps {
  value: string
  onChange: (value: string) => void
  placeholder: string
  onSubmit: () => void
  onCancel: () => void
  submitLabel?: string
  cancelLabel?: string
  submitDisabled?: boolean
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void
  inputClassName?: string
  /** compact = single row (toolbar style), default = with vertical spacing (column card style) */
  variant?: 'compact' | 'default'
}

const InlineForm = ({
  value,
  onChange,
  placeholder,
  onSubmit,
  onCancel,
  submitLabel = 'Add',
  cancelLabel = 'Cancel',
  submitDisabled = false,
  onKeyDown,
  inputClassName = '',
  variant = 'default',
}: InlineFormProps) => {
  const isCompact = variant === 'compact'

  return (
    <div
      className={
        isCompact
          ? 'border-primary-700 bg-primary-900 shadow-soft flex shrink-0 flex-row items-center gap-2 rounded-lg border p-2'
          : 'border-primary-700 bg-primary-900 shadow-soft rounded-lg border p-3'
      }
    >
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        autoFocus
        className={
          inputClassName ||
          'border-primary-700 bg-primary-800 text-primary-100 placeholder-primary-500 focus:border-primary-500 focus:ring-primary-500 focus:ring-offset-primary-900 w-full rounded border px-3 py-2 text-sm focus:ring-2 focus:ring-offset-2 focus:outline-none'
        }
      />
      <div className={isCompact ? 'flex shrink-0 gap-2' : 'mt-2 flex gap-2'}>
        <button
          type="button"
          onClick={onSubmit}
          disabled={submitDisabled}
          className="bg-primary-600 hover:bg-primary-500 rounded px-3 py-1.5 text-sm font-medium text-white transition-colors disabled:cursor-not-allowed disabled:opacity-50"
        >
          {submitLabel}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="border-primary-700 bg-primary-800 text-primary-300 hover:bg-primary-700 rounded border px-3 py-1.5 text-sm font-medium transition-colors"
        >
          {cancelLabel}
        </button>
      </div>
    </div>
  )
}

export default InlineForm
