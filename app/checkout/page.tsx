'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { Input, Textarea } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { useCart } from '@/state/CartContext'
import { formatPrice } from '@/lib/pricing'
import { PRODUCTS as LEGACY_PRODUCTS } from '@/data/products'

const SHIPPING_METHODS = [
  { value: 'standard', label: 'Standard Shipping — Free' },
  { value: 'express', label: 'Express Shipping — N$ 150.00' },
]

const COUNTRY_OPTIONS = [
  { value: 'NA', label: 'Namibia' },
  { value: 'ZA', label: 'South Africa' },
]

type FormErrors = Record<string, string>

export default function CheckoutPage() {
  const router = useRouter()
  const { cart, clear } = useCart()
  const [submitting, setSubmitting] = useState(false)
  const [errors, setErrors] = useState<FormErrors>({})
  const [serverError, setServerError] = useState('')

  const [form, setForm] = useState({
    email: '',
    name: '',
    phone: '',
    line1: '',
    line2: '',
    city: '',
    region: '',
    postalCode: '',
    country: 'NA',
    shippingMethod: 'standard' as 'standard' | 'express',
    notes: '',
  })

  const lines = cart.map((line) => {
    const product = LEGACY_PRODUCTS.find((p: { id: string }) => p.id === line.id)
    return { ...line, product }
  })

  const subtotal = lines.reduce((s, l) => {
    if (!l.product) return s
    return s + (l.product as { price: number }).price * l.qty
  }, 0)

  const shippingCost = form.shippingMethod === 'express' ? 150 : 0
  const total = subtotal + shippingCost

  function set(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => {
      const next = { ...prev }
      delete next[field]
      return next
    })
  }

  function validate(): FormErrors {
    const e: FormErrors = {}
    if (!form.email.includes('@')) e.email = 'Valid email is required'
    if (!form.name.trim()) e.name = 'Full name is required'
    if (!form.phone.trim() || form.phone.length < 6) e.phone = 'Phone number is required'
    if (!form.line1.trim()) e.line1 = 'Address is required'
    if (!form.city.trim()) e.city = 'City is required'
    if (!form.region.trim()) e.region = 'Region is required'
    if (!form.postalCode.trim()) e.postalCode = 'Postal code is required'
    return e
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setServerError('')

    const validationErrors = validate()
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors)
      return
    }

    setSubmitting(true)

    try {
      const items = cart.map((line) => {
        const product = LEGACY_PRODUCTS.find((p: { id: string }) => p.id === line.id)
        return {
          productId: line.id,
          variantSku: line.variantSku ?? `${line.id}-default`,
          qty: line.qty,
          ...(product ? {} : {}),
        }
      })

      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items,
          checkout: {
            email: form.email,
            shippingAddress: {
              name: form.name,
              line1: form.line1,
              line2: form.line2 || undefined,
              city: form.city,
              region: form.region,
              postalCode: form.postalCode,
              country: form.country,
              phone: form.phone,
            },
            shippingMethod: form.shippingMethod,
            notes: form.notes || undefined,
          },
        }),
      })

      const data = await res.json()

      if (!res.ok || !data.success) {
        setServerError(data.error || 'Checkout failed. Please try again.')
        setSubmitting(false)
        return
      }

      clear()
      window.location.href = data.data.authorizationUrl
    } catch {
      setServerError('Something went wrong. Please try again.')
      setSubmitting(false)
    }
  }

  if (cart.length === 0 && !submitting) {
    return (
      <Container className="pb-24 pt-28">
        <div className="flex flex-col items-center gap-4 text-center">
          <p className="text-lg text-clay">Your cart is empty.</p>
          <Button href="/shop" variant="primary">
            Browse Shop
          </Button>
        </div>
      </Container>
    )
  }

  return (
    <Container className="pb-24 pt-28">
      <Breadcrumbs
        items={[
          { href: '/', label: 'Home' },
          { href: '/cart', label: 'Cart' },
          { label: 'Checkout' },
        ]}
        className="mb-6"
      />

      <h1 className="font-display text-display-lg uppercase text-sand">Checkout</h1>

      <form onSubmit={handleSubmit} className="mt-8 grid gap-12 lg:grid-cols-[1fr_400px]">
        <div className="space-y-8">
          <section>
            <h2 className="text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-tide mb-4">
              Contact
            </h2>
            <Input
              label="Email"
              type="email"
              required
              value={form.email}
              onChange={(e) => set('email', e.target.value)}
              error={errors.email}
              placeholder="you@example.com"
            />
          </section>

          <section>
            <h2 className="text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-tide mb-4">
              Shipping Address
            </h2>
            <div className="grid gap-4">
              <Input
                label="Full Name"
                required
                value={form.name}
                onChange={(e) => set('name', e.target.value)}
                error={errors.name}
              />
              <Input
                label="Phone"
                type="tel"
                required
                value={form.phone}
                onChange={(e) => set('phone', e.target.value)}
                error={errors.phone}
              />
              <Input
                label="Address Line 1"
                required
                value={form.line1}
                onChange={(e) => set('line1', e.target.value)}
                error={errors.line1}
              />
              <Input
                label="Address Line 2"
                value={form.line2}
                onChange={(e) => set('line2', e.target.value)}
                placeholder="Apartment, unit, etc. (optional)"
              />
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="City"
                  required
                  value={form.city}
                  onChange={(e) => set('city', e.target.value)}
                  error={errors.city}
                />
                <Input
                  label="Region / State"
                  required
                  value={form.region}
                  onChange={(e) => set('region', e.target.value)}
                  error={errors.region}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Postal Code"
                  required
                  value={form.postalCode}
                  onChange={(e) => set('postalCode', e.target.value)}
                  error={errors.postalCode}
                />
                <Select
                  label="Country"
                  required
                  options={COUNTRY_OPTIONS}
                  value={form.country}
                  onChange={(e) => set('country', e.target.value)}
                />
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-tide mb-4">
              Shipping Method
            </h2>
            <div className="space-y-2">
              {SHIPPING_METHODS.map((m) => (
                <label
                  key={m.value}
                  className={`flex cursor-pointer items-center gap-3 rounded-2xl border p-4 transition ${
                    form.shippingMethod === m.value
                      ? 'border-ivory bg-white/5'
                      : 'border-white/10 hover:border-white/20'
                  }`}
                >
                  <input
                    type="radio"
                    name="shippingMethod"
                    value={m.value}
                    checked={form.shippingMethod === m.value}
                    onChange={() => set('shippingMethod', m.value)}
                    className="accent-ivory"
                  />
                  <span className="text-sm text-sand">{m.label}</span>
                </label>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-tide mb-4">
              Order Notes
            </h2>
            <Textarea
              value={form.notes}
              onChange={(e) => set('notes', e.target.value)}
              placeholder="Special instructions (optional)"
              className="min-h-[80px]"
            />
          </section>
        </div>

        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-6">
            <h2 className="text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-tide">
              Order Summary
            </h2>

            <ul className="mt-4 divide-y divide-white/10">
              {lines.map((line) => {
                if (!line.product) return null
                const p = line.product as {
                  id: string
                  name: string
                  price: number
                  file: string
                }
                return (
                  <li key={line.id} className="flex gap-3 py-3">
                    <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl border border-white/10">
                      <Image
                        src={`/assets/${p.file}`}
                        alt={p.name}
                        fill
                        sizes="56px"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-sand">{p.name}</p>
                      <p className="text-xs text-clay">Qty: {line.qty}</p>
                    </div>
                    <p className="text-sm tabular-nums text-sand">
                      {formatPrice(p.price * line.qty)}
                    </p>
                  </li>
                )
              })}
            </ul>

            <div className="mt-4 space-y-2 border-t border-white/10 pt-4 text-sm">
              <div className="flex justify-between">
                <span className="text-clay">Subtotal</span>
                <span className="tabular-nums text-sand">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-clay">Shipping</span>
                <span className="tabular-nums text-sand">
                  {shippingCost === 0 ? 'Free' : formatPrice(shippingCost)}
                </span>
              </div>
              <div className="flex justify-between border-t border-white/10 pt-2 text-lg font-medium">
                <span className="text-sand">Total</span>
                <span className="tabular-nums text-sand">{formatPrice(total)}</span>
              </div>
            </div>

            {serverError && (
              <p className="mt-4 rounded-xl bg-red-500/10 p-3 text-sm text-red-400">
                {serverError}
              </p>
            )}

            <Button
              type="submit"
              variant="primary"
              className="mt-6 w-full"
              loading={submitting}
              disabled={submitting}
            >
              {submitting ? 'Processing...' : `Pay ${formatPrice(total)}`}
            </Button>

            <p className="mt-3 text-center text-[0.6rem] text-tide">
              You will be redirected to Paystack to complete payment securely.
            </p>
          </div>
        </aside>
      </form>
    </Container>
  )
}
