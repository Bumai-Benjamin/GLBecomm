import Link from 'next/link'
import { cn } from '@/lib/cn'

export type Crumb = { href?: string; label: string }

export function Breadcrumbs({ items, className }: { items: Crumb[]; className?: string }) {
  return (
    <nav aria-label="Breadcrumb" className={cn('text-[0.65rem] uppercase tracking-[0.25em]', className)}>
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-clay">
        {items.map((item, i) => {
          const isLast = i === items.length - 1
          return (
            <li key={`${item.label}-${i}`} className="flex items-center gap-2">
              {item.href && !isLast ? (
                <Link href={item.href} className="transition hover:text-sand">
                  {item.label}
                </Link>
              ) : (
                <span aria-current={isLast ? 'page' : undefined} className={isLast ? 'text-sand' : ''}>
                  {item.label}
                </span>
              )}
              {!isLast && <span className="text-tide">/</span>}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
