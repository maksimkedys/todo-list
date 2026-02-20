import { memo } from 'react'
import Button from '../Button'
import BaseInput from '../BaseInput'
import { ButtonVariant, InputVariant } from '../../types'

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
}: InlineFormProps) => {
  return (
    <div className="border-primary-700 bg-primary-900 shadow-soft rounded-lg border p-3">
      <BaseInput
        variant={InputVariant.Default}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        autoFocus
      />

      <div className="mt-2 flex gap-2">
        <Button variant={ButtonVariant.Primary} onClick={onSubmit} disabled={submitDisabled}>
          {submitLabel}
        </Button>
        <Button variant={ButtonVariant.Secondary} onClick={onCancel}>
          {cancelLabel}
        </Button>
      </div>
    </div>
  )
}

export default memo(InlineForm)
