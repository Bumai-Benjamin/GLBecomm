'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { Drawer } from '@/components/ui/Drawer'
import { Button } from '@/components/ui/Button'
import { QuantityStepper } from '@/components/ui/QuantityStepper'
import { useCart } from '@/state/CartContext'
import { formatPrice } from '@/lib/pricing'
import { PRODUCTS as LEGACY_PRODUCTS } from '@/data/products'

type CartDrawerProps = {
  open: boolean
  onClose: () => void
}

export function CartDrawer({ open, onClose }: CartDrawerProps) {
  const { cart, change, remove, count } = useCart()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const lines = cart.map((line) => {
    const product = LEGACY_PRODUCTS.find((p: { id: string }) => p.id === line.id)
    return { ...line, product }
  })

  const subtotal = lines.reduce((s, l) => {
    if (!l.product) return s
    return s + (l.product as { price: number }).price * l.qty
  }, 0)

  if (!mounted) return null

  return (
    <Drawer open={open} onClose={onClose} title="Your Cart" side="right">
      <div className="flex h-full flex-col">
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {cart.length === 0 && (
            <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" className="text-tide">
                <path
                  d="M6 2 3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <p className="text-sm text-clay">Your cart is empty.</p>
              <Button href="/shop" variant="primary" size="sm" onClick={onClose}>
                Browse Shop
              </Button>
            </div>
          )}

          <ul className="divide-y divide-white/10">
            {lines.map((line) => {
              if (!line.product) return null
              const p = line.product as { id: string; name: string; price: number; file: string }
              return (
                <li key={line.id} className="flex gap-4 py-4">
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-white/10 bg-white/5">
                    <Image
                      src={`/assets/${p.file}`}
                      alt={p.name}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <p className="text-sm font-medium text-sand">{p.name}</p>
                      <p className="text-xs tabular-nums text-clay">{formatPrice(p.price)}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <QuantityStepper
                        value={line.qty}
                        onChange={(v) => change(line.id, v - line.qty)}
                        min={1}
                        max={10}
                      />
                      <button
                        onClick={() => remove(line.id)}
                        className="text-xs text-red-400 hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  <p className="self-start text-sm tabular-nums text-sand">
                    {formatPrice(p.price * line.qty)}
                  </p>
                </li>
              )
            })}
          </ul>
        </div>

        {cart.length > 0 && (
          <div className="border-t border-white/10 px-6 py-5">
            <div className="flex items-center justify-between text-sm">
              <span className="text-clay">{count} {count === 1 ? 'item' : 'items'}</span>
              <span className="text-lg font-medium tabular-nums text-sand">
                {formatPrice(subtotal)}
              </span>
            </div>
            <p className="mt-1 text-[0.65rem] text-tide">Shipping calculated at checkout</p>
            <div className="mt-4 flex flex-col gap-2">
              <Button href="/cart" variant="secondary" onClick={onClose}>
                View Cart
              </Button>
              <Button href="/checkout" variant="primary" onClick={onClose}>
                Checkout
              </Button>
            </div>
          </div>
        )}
      </div>
    </Drawer>
  )
}
