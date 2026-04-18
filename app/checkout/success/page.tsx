'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { Skeleton } from '@/components/ui/Skeleton'

type OrderData = {
  orderNumber: string
  totalNAD: number
  status: string
  guestEmail: string | null
}

export default function CheckoutSuccessPage() {
  const searchParams = useSearchParams()
  const reference = searchParams.get('reference')
  const [order, setOrder] = useState<OrderData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!reference) {
      setError('No payment reference found.')
      setLoading(false)
      return
    }

    let mounted = true

    async function verify() {
      try {
        const res = await fetch(`/api/checkout/verify?reference=${encodeURIComponent(reference!)}`)
        const data = await res.json()
        if (!mounted) return

        if (data.success && data.data) {
          setOrder(data.data)
        } else {
          setError(data.error || 'Could not verify your payment.')
        }
      } catch {
        if (mounted) setError('Failed to verify payment. Please contact support.')
      } finally {
        if (mounted) setLoading(false)
      }
    }

    verify()
    return () => {
      mounted = false
    }
  }, [reference])

  return (
    <Container className="pb-24 pt-28">
      <div className="mx-auto max-w-lg text-center">
        {loading && (
          <div className="space-y-4">
            <Skeleton className="mx-auto h-16 w-16 rounded-full" />
            <Skeleton className="mx-auto h-8 w-64" />
            <Skeleton className="mx-auto h-4 w-48" />
          </div>
        )}

        {!loading && error && (
          <>
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-red-400/30 bg-red-500/10">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-red-400">
                <path
                  d="M18 6 6 18M6 6l12 12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <h1 className="mt-6 font-display text-3xl uppercase text-sand">Payment Issue</h1>
            <p className="mt-3 text-clay">{error}</p>
            <div className="mt-8 flex justify-center gap-3">
              <Button href="/cart" variant="primary">
                Return to Cart
              </Button>
              <Button href="/contact" variant="secondary">
                Contact Support
              </Button>
            </div>
          </>
        )}

        {!loading && order && (
          <>
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-green-400/30 bg-green-500/10">
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                className="text-green-400"
              >
                <path
                  d="M20 6 9 17l-5-5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h1 className="mt-6 font-display text-3xl uppercase text-sand">Order Confirmed</h1>
            <p className="mt-3 text-clay">
              Thank you for your purchase! Your order{' '}
              <span className="font-mono text-sand">{order.orderNumber}</span> has been placed
              successfully.
            </p>
            {order.guestEmail && (
              <p className="mt-2 text-sm text-tide">
                A confirmation email will be sent to{' '}
                <span className="text-clay">{order.guestEmail}</span>.
              </p>
            )}
            <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.02] p-6">
              <dl className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <dt className="text-[0.6rem] uppercase tracking-[0.28em] text-tide">
                    Order Number
                  </dt>
                  <dd className="mt-1 font-mono text-sand">{order.orderNumber}</dd>
                </div>
                <div>
                  <dt className="text-[0.6rem] uppercase tracking-[0.28em] text-tide">Status</dt>
                  <dd className="mt-1 capitalize text-sand">{order.status}</dd>
                </div>
                <div>
                  <dt className="text-[0.6rem] uppercase tracking-[0.28em] text-tide">
                    Reference
                  </dt>
                  <dd className="mt-1 font-mono text-xs text-clay">{reference}</dd>
                </div>
                <div>
                  <dt className="text-[0.6rem] uppercase tracking-[0.28em] text-tide">Total</dt>
                  <dd className="mt-1 text-sand">
                    N$ {order.totalNAD.toFixed(2)}
                  </dd>
                </div>
              </dl>
            </div>
            <div className="mt-8 flex justify-center gap-3">
              <Button href="/shop" variant="primary">
                Continue Shopping
              </Button>
              <Button href="/" variant="secondary">
                Home
              </Button>
            </div>
          </>
        )}
      </div>
    </Container>
  )
}
