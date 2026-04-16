'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { toast } from 'sonner'
import { Price } from '@/components/ui/Price'
import { Badge } from '@/components/ui/Badge'
import { useCart } from '@/state/CartContext'
import { cn } from '@/lib/cn'

export type ProductCardData = {
  id: string
  handle: string
  title: string
  collection: string
  images: { url: string; alt: string }[]
  minPriceNAD: number
  maxPriceNAD: number
  inStock: boolean
  defaultVariantSku: string
  variants: { sku: string; compareAtPriceNAD: number | null; isActive: boolean }[]
}

type Props = {
  product: ProductCardData
  priority?: boolean
  className?: string
}

export function ProductCard({ product, priority = false, className }: Props) {
  const { add } = useCart()
  const img = product.images[0]
  const onSale = product.variants.some(
    (v) => v.isActive && typeof v.compareAtPriceNAD === 'number' && v.compareAtPriceNAD > product.minPriceNAD,
  )
  const compareAt = onSale
    ? Math.max(
        ...product.variants
          .filter((v) => v.isActive && typeof v.compareAtPriceNAD === 'number')
          .map((v) => v.compareAtPriceNAD!),
      )
    : undefined

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    add(product.id)
    toast.success(`Added to cart`, { description: product.title })
  }

  return (
    <motion.article
      className={cn('group relative', className)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, ease: [0.17, 0.67, 0.36, 0.99] }}
    >
      <Link href={`/shop/${product.handle}`} className="block">
        <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/10 bg-white/5">
          {img ? (
            <Image
              src={img.url}
              alt={img.alt || product.title}
              fill
              sizes="(max-width:640px) 50vw, (max-width:1024px) 33vw, 25vw"
              priority={priority}
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-clay">No image</div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />

          <div className="absolute left-3 top-3 flex flex-col gap-1.5">
            {!product.inStock && <Badge variant="danger">Sold out</Badge>}
            {onSale && product.inStock && <Badge variant="warning">Sale</Badge>}
          </div>

          {product.inStock && (
            <button
              onClick={handleQuickAdd}
              className="absolute bottom-3 right-3 flex h-10 w-10 items-center justify-center rounded-full bg-ivory text-ink opacity-0 shadow-glow transition duration-300 hover:scale-110 group-hover:opacity-100"
              aria-label={`Add ${product.title} to cart`}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          )}
        </div>

        <div className="mt-3 space-y-1 px-1">
          <p className="text-[0.6rem] uppercase tracking-[0.28em] text-tide">
            {product.collection}
          </p>
          <h3 className="text-sm font-medium leading-snug text-sand group-hover:text-ivory transition">
            {product.title}
          </h3>
          <Price
            amount={product.minPriceNAD}
            compareAt={compareAt}
            size="sm"
          />
        </div>
      </Link>
    </motion.article>
  )
}
