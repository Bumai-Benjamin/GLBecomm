'use client'

import Image from 'next/image'
import { useMemo, useState } from 'react'
import { toast } from 'sonner'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { Price } from '@/components/ui/Price'
import { Badge } from '@/components/ui/Badge'
import { QuantityStepper } from '@/components/ui/QuantityStepper'
import { useCart } from '@/state/CartContext'
import { cn } from '@/lib/cn'
import type { PublicProduct } from '@/server/products'

type Props = { product: PublicProduct }

export function ProductDetail({ product: p }: Props) {
  const { add } = useCart()
  const [selectedImage, setSelectedImage] = useState(0)
  const [qty, setQty] = useState(1)

  const availableSizes = useMemo(
    () => [...new Set(p.variants.filter((v) => v.isActive).map((v) => v.size))],
    [p.variants],
  )
  const availableColors = useMemo(
    () => [...new Set(p.variants.filter((v) => v.isActive).map((v) => v.color))],
    [p.variants],
  )

  const [selectedSize, setSelectedSize] = useState(availableSizes[0] ?? '')
  const [selectedColor, setSelectedColor] = useState(availableColors[0] ?? '')

  const selectedVariant = useMemo(
    () =>
      p.variants.find(
        (v) => v.isActive && v.size === selectedSize && v.color === selectedColor,
      ) ?? p.variants.find((v) => v.isActive),
    [p.variants, selectedSize, selectedColor],
  )

  const handleAddToCart = () => {
    add(p.id)
    toast.success('Added to cart', { description: `${p.title} — ${selectedSize}, ${selectedColor}` })
  }

  return (
    <Container className="pb-24 pt-28">
      <Breadcrumbs
        items={[
          { href: '/', label: 'Home' },
          { href: '/shop', label: 'Shop' },
          { label: p.title },
        ]}
        className="mb-8"
      />

      <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:gap-14">
        <div className="space-y-3">
          <div className="relative aspect-square overflow-hidden rounded-3xl border border-white/10 bg-white/5">
            {p.images[selectedImage] ? (
              <Image
                src={p.images[selectedImage]!.url}
                alt={p.images[selectedImage]!.alt || p.title}
                fill
                sizes="(max-width: 1024px) 100vw, 55vw"
                priority
                className="object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-clay">No image</div>
            )}
          </div>

          {p.images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-1">
              {p.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={cn(
                    'relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border transition',
                    i === selectedImage
                      ? 'border-ivory ring-2 ring-ivory/30'
                      : 'border-white/10 hover:border-white/30',
                  )}
                >
                  <Image src={img.url} alt={img.alt} fill sizes="80px" className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col gap-6 lg:sticky lg:top-28 lg:self-start">
          <div>
            <p className="text-[0.6rem] uppercase tracking-[0.28em] text-tide">
              {p.collection}
            </p>
            <h1 className="mt-2 font-display text-display-lg uppercase text-sand">{p.title}</h1>
          </div>

          <div className="flex items-baseline gap-3">
            {selectedVariant && (
              <Price
                amount={selectedVariant.priceNAD}
                compareAt={selectedVariant.compareAtPriceNAD}
                size="lg"
              />
            )}
            {!p.inStock && <Badge variant="danger">Sold out</Badge>}
          </div>

          {availableSizes.length > 1 && (
            <div>
              <p className="mb-2 text-[0.6rem] font-semibold uppercase tracking-[0.28em] text-tide">
                Size
              </p>
              <div className="flex flex-wrap gap-2">
                {availableSizes.map((s) => {
                  const variantForSize = p.variants.find(
                    (v) => v.isActive && v.size === s && v.color === selectedColor,
                  )
                  const oos = !variantForSize || variantForSize.stock <= 0
                  return (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      disabled={oos}
                      className={cn(
                        'flex h-11 min-w-11 items-center justify-center rounded-full border px-4 text-sm font-medium uppercase transition',
                        selectedSize === s
                          ? 'border-ivory bg-ivory text-ink'
                          : 'border-white/15 text-clay hover:border-white/40 hover:text-sand',
                        oos && 'cursor-not-allowed opacity-40 line-through',
                      )}
                    >
                      {s}
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          {availableColors.length > 1 && (
            <div>
              <p className="mb-2 text-[0.6rem] font-semibold uppercase tracking-[0.28em] text-tide">
                Color
              </p>
              <div className="flex flex-wrap gap-2">
                {availableColors.map((c) => (
                  <button
                    key={c}
                    onClick={() => setSelectedColor(c)}
                    className={cn(
                      'rounded-full border px-4 py-2 text-[0.68rem] uppercase tracking-[0.2em] transition',
                      selectedColor === c
                        ? 'border-ivory bg-ivory text-ink'
                        : 'border-white/15 text-clay hover:border-white/40 hover:text-sand',
                    )}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center gap-4">
            <QuantityStepper
              value={qty}
              onChange={setQty}
              min={1}
              max={selectedVariant ? selectedVariant.stock : 10}
            />
            <Button
              variant="primary"
              size="lg"
              className="flex-1"
              disabled={!p.inStock || !selectedVariant}
              onClick={handleAddToCart}
            >
              {p.inStock ? 'Add to Cart' : 'Sold Out'}
            </Button>
          </div>

          {p.description && (
            <div className="border-t border-white/10 pt-6">
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-tide mb-2">
                Description
              </p>
              <p className="text-sm leading-relaxed text-clay">{p.description}</p>
            </div>
          )}

          <div className="space-y-3 border-t border-white/10 pt-6 text-sm text-clay">
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-tide">
              Shipping & Returns
            </p>
            <p>Free shipping on orders over N$500. Standard delivery 3–5 business days within Namibia.</p>
            <p>Returns accepted within 14 days of delivery. Items must be unworn with original tags.</p>
          </div>
        </div>
      </div>
    </Container>
  )
}
