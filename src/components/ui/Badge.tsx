import type { HTMLAttributes } from 'react'
import { cn } from '@/lib/cn'

type Variant = 'default' | 'success' | 'warning' | 'danger' | 'outline'

const variants: Record<Variant, string> = {
  default: 'bg-white/10 text-sand',
  success: 'bg-emerald-500/15 text-emerald-300',
  warning: 'bg-amber-500/15 text-amber-300',
  danger: 'bg-red-500/15 text-red-300',
  outline: 'border border-white/15 text-sand',
}

export function Badge({
  variant = 'default',
  className,
  ...props
}: HTMLAttributes<HTMLSpanElement> & { variant?: Variant }) {
  return (
    <span
      {...props}
      className={cn(
        'inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[0.65rem] font-medium uppercase tracking-[0.2em]',
        variants[variant],
        className,
      )}
    />
  )
}
