'use client'

import { forwardRef, type InputHTMLAttributes, type TextareaHTMLAttributes, useId } from 'react'
import { cn } from '@/lib/cn'

const fieldBase =
  'w-full rounded-2xl border border-white/15 bg-black/40 px-4 py-3 text-sm text-sand placeholder:text-tide transition focus:border-ivory focus:outline-none focus:ring-2 focus:ring-ivory/20 disabled:opacity-60'

type FieldShellProps = {
  label?: string
  hint?: string
  error?: string
  required?: boolean
  id?: string
  children: (id: string) => React.ReactNode
}

function FieldShell({ label, hint, error, required, id, children }: FieldShellProps) {
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
      {children(fieldId)}
      {hint && !error && <p className="text-xs text-tide">{hint}</p>}
      {error && (
        <p role="alert" className="text-xs text-red-400">
          {error}
        </p>
      )}
    </div>
  )
}

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string
  hint?: string
  error?: string
  containerClassName?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, hint, error, required, id, className, containerClassName, ...rest },
  ref,
) {
  return (
    <div className={containerClassName}>
      <FieldShell label={label} hint={hint} error={error} required={required} id={id}>
        {(fieldId) => (
          <input
            ref={ref}
            id={fieldId}
            required={required}
            aria-invalid={!!error || undefined}
            className={cn(fieldBase, error && 'border-red-400/60 focus:border-red-400', className)}
            {...rest}
          />
        )}
      </FieldShell>
    </div>
  )
})

export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string
  hint?: string
  error?: string
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { label, hint, error, required, id, className, ...rest },
  ref,
) {
  return (
    <FieldShell label={label} hint={hint} error={error} required={required} id={id}>
      {(fieldId) => (
        <textarea
          ref={ref}
          id={fieldId}
          required={required}
          aria-invalid={!!error || undefined}
          className={cn(
            fieldBase,
            'min-h-[120px] resize-y',
            error && 'border-red-400/60 focus:border-red-400',
            className,
          )}
          {...rest}
        />
      )}
    </FieldShell>
  )
})
