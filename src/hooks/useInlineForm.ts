import { useCallback, useState } from 'react'

interface UseInlineFormOptions {
  onSubmit: (value: string) => void
  defaultValue?: string
  validate?: (value: string) => boolean
  transform?: (value: string) => string
}

interface UseInlineFormReturn {
  isOpen: boolean
  value: string
  setValue: (value: string) => void
  handleSubmit: () => void
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void
  handleCancel: () => void
  startAdding: () => void
}

const useInlineForm = ({
  onSubmit,
  defaultValue = '',
  validate = (val) => !!val.trim(),
  transform = (val) => val.trim(),
}: UseInlineFormOptions): UseInlineFormReturn => {
  const [isOpen, setIsOpen] = useState(false)
  const [value, setValue] = useState(defaultValue)

  const handleSubmit = useCallback(() => {
    if (validate(value)) {
      onSubmit(transform(value))
      setValue(defaultValue)
      setIsOpen(false)
    }
  }, [value, onSubmit, validate, transform, defaultValue])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        handleSubmit()
      } else if (e.key === 'Escape') {
        setIsOpen(false)
        setValue(defaultValue)
      }
    },
    [handleSubmit, defaultValue],
  )

  const handleCancel = useCallback(() => {
    setIsOpen(false)
    setValue(defaultValue)
  }, [defaultValue])

  const startAdding = useCallback(() => {
    setIsOpen(true)
  }, [])

  return {
    isOpen,
    value,
    setValue,
    handleSubmit,
    handleKeyDown,
    handleCancel,
    startAdding,
  }
}

export default useInlineForm
