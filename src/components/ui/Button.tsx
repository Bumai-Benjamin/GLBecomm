'use client'

import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/cn'

type Variant = 'primary' | 'secondary' | 'ghost' | 'outline' | 'danger'
type Size = 'sm' | 'md' | 'lg' | 'icon'

const base =
  'inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium uppercase tracking-[0.22em] transition-all duration-200 ease-emphasized focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ivory/50 focus-visible:ring-offset-2 focus-visible:ring-offset-ink disabled:pointer-events-none disabled:opacity-50'

const variants: Record<Variant, string> = {
  primary:
    'bg-ivory text-ink shadow-[0_14px_28px_rgba(255,255,255,0.12)] hover:-translate-y-px hover:shadow-[0_18px_32px_rgba(255,255,255,0.18)]',
  secondary: 'border border-white/10 bg-white/5 text-sand hover:border-white/40 hover:bg-white/10',
  ghost: 'text-sand hover:bg-white/5',
  outline: 'border border-white/20 text-sand hover:border-ivory hover:text-ivory',
  danger: 'bg-red-500/90 text-white hover:bg-red-500',
}

const sizes: Record<Size, string> = {
  sm: 'h-9 rounded-full px-4 text-[0.68rem]',
  md: 'h-11 rounded-full px-6 text-xs',
  lg: 'h-12 rounded-full px-8 text-sm',
  icon: 'h-10 w-10 rounded-full',
}

type CommonProps = {
  variant?: Variant
  size?: Size
  loading?: boolean
  leading?: ReactNode
  trailing?: ReactNode
  className?: string
  children?: ReactNode
}

type ButtonAsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined }

type ButtonAsLink = CommonProps & {
  href: string
  target?: string
  rel?: string
  prefetch?: boolean
}

export type ButtonProps = ButtonAsButton | ButtonAsLink

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  function Button(props, ref) {
    const {
      variant = 'primary',
      size = 'md',
      loading,
      leading,
      trailing,
      className,
      children,
      ...rest
    } = props as CommonProps & Record<string, unknown>

    const classes = cn(base, variants[variant], sizes[size], className)
    const content = (
      <>
        {loading ? <Spinner /> : leading}
        {children}
        {!loading && trailing}
      </>
    )

    if ('href' in props && typeof props.href === 'string') {
      const { href, target, rel, prefetch } = props
      return (
        <Link
          href={href}
          target={target}
          rel={rel}
          prefetch={prefetch}
          ref={ref as React.Ref<HTMLAnchorElement>}
          className={classes}
        >
          {content}
        </Link>
      )
    }

    const btnRest = rest as ButtonHTMLAttributes<HTMLButtonElement>
    return (
      <button
        {...btnRest}
        ref={ref as React.Ref<HTMLButtonElement>}
        className={classes}
        disabled={btnRest.disabled ?? loading}
      >
        {content}
      </button>
    )
  },
)

function Spinner() {
  return (
    <svg
      className="h-4 w-4 animate-spin"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeOpacity=".25" strokeWidth="3" />
      <path
        d="M22 12a10 10 0 0 1-10 10"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  )
}
