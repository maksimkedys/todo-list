import { useState, useRef, useEffect, useCallback } from 'react'

interface UseInlineEditOptions {
  currentValue: string
  onSave: (value: string) => void
}

export function useInlineEdit({ currentValue, onSave }: UseInlineEditOptions) {
  const [isEditing, setIsEditing] = useState(false)
  const [value, setValue] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isEditing) inputRef.current?.focus()
  }, [isEditing])

  const startEditing = useCallback(() => {
    setValue(currentValue)
    setIsEditing(true)
  }, [currentValue])

  const save = useCallback(() => {
    onSave(value)
    setIsEditing(false)
  }, [value, onSave])

  const cancel = useCallback(() => {
    setValue(currentValue)
    setIsEditing(false)
  }, [currentValue])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') save()
      else if (e.key === 'Escape') cancel()
    },
    [save, cancel],
  )

  return {
    isEditing,
    value,
    setValue,
    inputRef,
    startEditing,
    save,
    cancel,
    handleKeyDown,
  }
}
