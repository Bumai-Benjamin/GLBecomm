import { cn } from '@/lib/cn'
import { formatPrice } from '@/lib/pricing'

type Props = {
  amount: number
  compareAt?: number | null
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

const sizes = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-xl',
} as const

export function Price({ amount, compareAt, className, size = 'md' }: Props) {
  const onSale = typeof compareAt === 'number' && compareAt > amount
  return (
    <span className={cn('inline-flex items-baseline gap-2', sizes[size], className)}>
      <span className="font-medium text-sand">{formatPrice(amount)}</span>
      {onSale && (
        <span className="text-xs text-tide line-through">{formatPrice(compareAt)}</span>
      )}
    </span>
  )
}
