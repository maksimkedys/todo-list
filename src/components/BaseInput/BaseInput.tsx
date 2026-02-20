import cn from 'classnames'
import { memo, type InputHTMLAttributes } from 'react'
import { InputVariant } from '../../types'

interface BaseInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  variant?: InputVariant
  onChange: (value: string) => void
}

const baseClasses =
  'w-full rounded border px-3 py-2 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2'

const variantClasses: Record<InputVariant, string> = {
  [InputVariant.Default]:
    'border-primary-700 bg-primary-800 text-primary-100 placeholder-primary-500 focus:border-primary-500 focus:ring-primary-500 focus:ring-offset-primary-900',
  [InputVariant.Search]:
    'border-gray-300 bg-white text-gray-800 placeholder-gray-400 focus:border-primary-500 focus:ring-primary-500/30 focus:ring-offset-white',
}

const BaseInput = ({
  variant = InputVariant.Default,
  className,
  onChange,
  value,
  ...props
}: BaseInputProps) => {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={cn(baseClasses, variantClasses[variant], className)}
      {...props}
    />
  )
}

export default memo(BaseInput)
