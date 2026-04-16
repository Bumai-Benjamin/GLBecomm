'use client'

import Image from 'next/image'
import type { Metadata } from 'next'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { QuantityStepper } from '@/components/ui/QuantityStepper'
import { useCart } from '@/state/CartContext'
import { formatPrice } from '@/lib/pricing'
import { PRODUCTS as LEGACY_PRODUCTS } from '@/data/products'

export default function CartPage() {
  const { cart, change, remove, clear, count } = useCart()

  const lines = cart.map((line) => {
    const product = LEGACY_PRODUCTS.find((p: { id: string }) => p.id === line.id)
    return { ...line, product }
  })

  const subtotal = lines.reduce((s, l) => {
    if (!l.product) return s
    return s + (l.product as { price: number }).price * l.qty
  }, 0)

  return (
    <Container className="pb-24 pt-28">
      <Breadcrumbs items={[{ href: '/', label: 'Home' }, { label: 'Cart' }]} className="mb-6" />

      <div className="grid gap-12 lg:grid-cols-[1fr_380px]">
        <div>
          <div className="flex items-center justify-between">
            <h1 className="font-display text-display-lg uppercase text-sand">Your Cart</h1>
            {cart.length > 0 && (
              <button
                onClick={() => {
                  if (confirm('Clear entire cart?')) clear()
                }}
                className="text-xs text-clay underline hover:text-sand"
              >
                Clear all
              </button>
            )}
          </div>

          {cart.length === 0 && (
            <div className="mt-16 flex flex-col items-center gap-4 text-center">
              <p className="text-lg text-clay">Your cart is empty.</p>
              <Button href="/shop" variant="primary">
                Browse Shop
              </Button>
            </div>
          )}

          {cart.length > 0 && (
            <ul className="mt-8 divide-y divide-white/10">
              {lines.map((line) => {
                if (!line.product) return null
                const p = line.product as { id: string; name: string; price: number; file: string }
                return (
                  <li key={line.id} className="flex gap-5 py-6">
                    <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-white/5">
                      <Image
                        src={`/assets/${p.file}`}
                        alt={p.name}
                        fill
                        sizes="112px"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-1 flex-col justify-between">
                      <div>
                        <h3 className="font-medium text-sand">{p.name}</h3>
                        <p className="mt-1 text-sm tabular-nums text-clay">{formatPrice(p.price)}</p>
                      </div>
                      <div className="flex items-center gap-4">
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
                    <p className="self-start text-base tabular-nums font-medium text-sand">
                      {formatPrice(p.price * line.qty)}
                    </p>
                  </li>
                )
              })}
            </ul>
          )}
        </div>

        {cart.length > 0 && (
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-6">
              <h2 className="text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-tide">
                Order Summary
              </h2>
              <div className="mt-6 space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-clay">Subtotal ({count} items)</span>
                  <span className="tabular-nums text-sand">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-clay">Shipping</span>
                  <span className="text-clay">Calculated at checkout</span>
                </div>
                <div className="border-t border-white/10 pt-3 flex justify-between text-lg font-medium">
                  <span className="text-sand">Total</span>
                  <span className="tabular-nums text-sand">{formatPrice(subtotal)}</span>
                </div>
              </div>
              <div className="mt-6 space-y-2">
                <Button href="/checkout" variant="primary" className="w-full">
                  Proceed to Checkout
                </Button>
                <Button href="/shop" variant="ghost" className="w-full">
                  Continue Shopping
                </Button>
              </div>
            </div>
          </aside>
        )}
      </div>
    </Container>
  )
}
