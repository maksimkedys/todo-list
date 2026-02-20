import cn from 'classnames'
import { IconName } from '../../types'

interface IconProps {
  name: IconName
  size?: number | string
  className?: string
}

const Icon = ({ name, size = 20, className }: IconProps) => {
  return (
    <svg width={size} height={size} className={cn('inline-block', className)} aria-hidden="true">
      <use href={`#icon-${name}`} />
    </svg>
  )
}

export default Icon
