'use client'

import { forwardRef, type SelectHTMLAttributes, useId } from 'react'
import { cn } from '@/lib/cn'

export type SelectOption = { value: string; label: string; disabled?: boolean }

export type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string
  hint?: string
  error?: string
  options: SelectOption[]
  placeholder?: string
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { label, hint, error, options, placeholder, required, id, className, ...rest },
  ref,
) {
  const autoId = useId()
  const fieldId = id ?? autoId
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label
          htmlFor={fieldId}
          className="text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-clay"
        >
          {label}
          {required && <span className="ml-1 text-ivory">*</span>}
        </label>
      )}
      <div className="relative">
        <select
          ref={ref}
          id={fieldId}
          required={required}
          aria-invalid={!!error || undefined}
          className={cn(
            'w-full appearance-none rounded-2xl border border-white/15 bg-black/40 px-4 py-3 pr-10 text-sm text-sand transition focus:border-ivory focus:outline-none focus:ring-2 focus:ring-ivory/20 disabled:opacity-60',
            error && 'border-red-400/60 focus:border-red-400',
            className,
          )}
          {...rest}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((o) => (
            <option key={o.value} value={o.value} disabled={o.disabled}>
              {o.label}
            </option>
          ))}
        </select>
        <svg
          aria-hidden
          className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-clay"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="m6 9 6 6 6-6"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      {hint && !error && <p className="text-xs text-tide">{hint}</p>}
      {error && (
        <p role="alert" className="text-xs text-red-400">
          {error}
        </p>
      )}
    </div>
  )
})
