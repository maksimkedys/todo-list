import cn from 'classnames'
import { memo, type ButtonHTMLAttributes, type PropsWithChildren } from 'react'
import { ButtonVariant, type ButtonVariant as ButtonVariantType } from '../../types'

interface ButtonProps extends PropsWithChildren, ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariantType
}

const baseClasses =
  'inline-flex items-center justify-center gap-2 rounded text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-primary-950 disabled:cursor-not-allowed disabled:opacity-50'

const variantClasses: Record<ButtonVariantType, string> = {
  [ButtonVariant.Primary]:
    'bg-primary-600 hover:bg-primary-500 active:bg-primary-700 text-white px-3 py-1.5',
  [ButtonVariant.Secondary]:
    'border border-primary-700 bg-primary-800 text-primary-300 hover:bg-primary-700 active:bg-primary-600 px-3 py-1.5',
  [ButtonVariant.OutlineDashed]:
    'border-2 border-dashed border-primary-700 bg-transparent text-primary-400 hover:border-primary-600 hover:bg-primary-900 hover:text-primary-300 active:border-primary-500 active:bg-primary-800 active:text-primary-200 px-4 py-2.5',
  [ButtonVariant.GhostIcon]: 'text-primary-400 p-1 rounded-full bg-transparent',
}

const Button = ({
  variant = ButtonVariant.Primary,
  className,
  children,
  ...props
}: ButtonProps) => {
  return (
    <button className={cn(baseClasses, variantClasses[variant], className)} {...props}>
      {children}
    </button>
  )
}

export default memo(Button)
