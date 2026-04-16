'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Container } from '@/components/ui/Container'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Skeleton } from '@/components/ui/Skeleton'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { ProductCard, type ProductCardData } from '@/components/commerce/ProductCard'
import { useDebounce } from '@/hooks/useDebounce'
import { useMediaQuery } from '@/hooks/useMediaQuery'

import type { Metadata } from 'next'

type Facets = {
  sizes: string[]
  colors: string[]
  collections: string[]
  priceRange: { min: number; max: number }
}

const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'new', label: 'Newest' },
  { value: 'price-asc', label: 'Price: Low → High' },
  { value: 'price-desc', label: 'Price: High → Low' },
  { value: 'best-selling', label: 'Best Selling' },
]

export default function ShopPage() {
  const router = useRouter()
  const sp = useSearchParams()

  const [products, setProducts] = useState<ProductCardData[]>([])
  const [total, setTotal] = useState(0)
  const [facets, setFacets] = useState<Facets | null>(null)
  const [loading, setLoading] = useState(true)

  const [q, setQ] = useState(sp.get('q') ?? '')
  const [sort, setSort] = useState(sp.get('sort') ?? 'featured')
  const [collection, setCollection] = useState(sp.get('collection') ?? '')
  const [selectedSizes, setSelectedSizes] = useState<Set<string>>(
    new Set(sp.get('sizes')?.split(',').filter(Boolean) ?? []),
  )
  const [selectedColors, setSelectedColors] = useState<Set<string>>(
    new Set(sp.get('colors')?.split(',').filter(Boolean) ?? []),
  )
  const [inStockOnly, setInStockOnly] = useState(sp.get('inStock') === '1')
  const [filtersOpen, setFiltersOpen] = useState(false)

  const debouncedQ = useDebounce(q, 300)
  const isDesktop = useMediaQuery('(min-width: 1024px)')

  useEffect(() => {
    fetch('/api/products/facets')
      .then((r) => r.json())
      .then((j) => setFacets(j.data))
      .catch(() => {})
  }, [])

  const fetchProducts = useCallback(async () => {
    setLoading(true)
    const url = new URL('/api/products', window.location.origin)
    if (debouncedQ) url.searchParams.set('q', debouncedQ)
    if (sort !== 'featured') url.searchParams.set('sort', sort)
    if (collection) url.searchParams.set('collection', collection)
    if (selectedSizes.size) url.searchParams.set('sizes', [...selectedSizes].join(','))
    if (selectedColors.size) url.searchParams.set('colors', [...selectedColors].join(','))
    if (inStockOnly) url.searchParams.set('inStock', '1')

    try {
      const res = await fetch(url.toString())
      const json = await res.json()
      setProducts(json.items ?? [])
      setTotal(json.total ?? 0)
    } catch {
      setProducts([])
    } finally {
      setLoading(false)
    }
  }, [debouncedQ, sort, collection, selectedSizes, selectedColors, inStockOnly])

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  const toggleSize = (s: string) => {
    setSelectedSizes((prev) => {
      const next = new Set(prev)
      next.has(s) ? next.delete(s) : next.add(s)
      return next
    })
  }
  const toggleColor = (c: string) => {
    setSelectedColors((prev) => {
      const next = new Set(prev)
      next.has(c) ? next.delete(c) : next.add(c)
      return next
    })
  }
  const clearFilters = () => {
    setQ('')
    setSort('featured')
    setCollection('')
    setSelectedSizes(new Set())
    setSelectedColors(new Set())
    setInStockOnly(false)
  }
  const activeFilterCount = useMemo(() => {
    let n = 0
    if (collection) n++
    n += selectedSizes.size
    n += selectedColors.size
    if (inStockOnly) n++
    return n
  }, [collection, selectedSizes, selectedColors, inStockOnly])

  const filterPanel = (
    <div className="space-y-6">
      <Input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search products…"
        label="Search"
      />

      {facets && facets.collections.length > 0 && (
        <div>
          <p className="mb-2 text-[0.6rem] font-semibold uppercase tracking-[0.28em] text-tide">Collections</p>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setCollection('')}
              className={`rounded-full border px-3 py-1 text-[0.65rem] uppercase tracking-[0.2em] transition ${
                !collection ? 'border-ivory bg-ivory text-ink' : 'border-white/15 text-clay hover:text-sand'
              }`}
            >
              All
            </button>
            {facets.collections.map((c) => (
              <button
                key={c}
                onClick={() => setCollection(collection === c ? '' : c)}
                className={`rounded-full border px-3 py-1 text-[0.65rem] uppercase tracking-[0.2em] transition ${
                  collection === c ? 'border-ivory bg-ivory text-ink' : 'border-white/15 text-clay hover:text-sand'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      )}

      {facets && facets.sizes.length > 0 && (
        <div>
          <p className="mb-2 text-[0.6rem] font-semibold uppercase tracking-[0.28em] text-tide">Sizes</p>
          <div className="flex flex-wrap gap-2">
            {facets.sizes.map((s) => (
              <button
                key={s}
                onClick={() => toggleSize(s)}
                className={`flex h-9 min-w-9 items-center justify-center rounded-full border text-[0.65rem] font-medium uppercase transition ${
                  selectedSizes.has(s) ? 'border-ivory bg-ivory text-ink' : 'border-white/15 text-clay hover:text-sand'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {facets && facets.colors.length > 0 && (
        <div>
          <p className="mb-2 text-[0.6rem] font-semibold uppercase tracking-[0.28em] text-tide">Colors</p>
          <div className="flex flex-wrap gap-2">
            {facets.colors.map((c) => (
              <button
                key={c}
                onClick={() => toggleColor(c)}
                className={`rounded-full border px-3 py-1 text-[0.65rem] uppercase tracking-[0.2em] transition ${
                  selectedColors.has(c) ? 'border-ivory bg-ivory text-ink' : 'border-white/15 text-clay hover:text-sand'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      )}

      <label className="flex items-center gap-2 text-sm text-clay">
        <input
          type="checkbox"
          checked={inStockOnly}
          onChange={(e) => setInStockOnly(e.target.checked)}
          className="h-4 w-4 accent-ivory"
        />
        In stock only
      </label>

      {activeFilterCount > 0 && (
        <button onClick={clearFilters} className="text-xs text-clay underline hover:text-sand">
          Clear all filters ({activeFilterCount})
        </button>
      )}
    </div>
  )

  return (
    <Container className="pb-24 pt-32">
      <Breadcrumbs items={[{ href: '/', label: 'Home' }, { label: 'Shop' }]} className="mb-6" />

      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-display-lg uppercase text-sand">Shop</h1>
          <p className="mt-1 text-sm text-clay">
            {loading ? '…' : `${total} product${total === 1 ? '' : 's'}`}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            options={SORT_OPTIONS}
            className="min-w-[180px]"
          />
          {!isDesktop && (
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setFiltersOpen(!filtersOpen)}
            >
              Filters{activeFilterCount > 0 ? ` (${activeFilterCount})` : ''}
            </Button>
          )}
        </div>
      </div>

      <div className="flex gap-10">
        {isDesktop && (
          <aside className="sticky top-28 w-64 shrink-0 self-start">
            {filterPanel}
          </aside>
        )}

        {!isDesktop && filtersOpen && (
          <div className="mb-6 w-full rounded-2xl border border-white/10 bg-white/[0.02] p-5">
            {filterPanel}
          </div>
        )}

        <div className="flex-1">
          {loading && (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i}>
                  <Skeleton className="aspect-[4/5] w-full rounded-2xl" />
                  <Skeleton className="mt-3 h-4 w-3/4" />
                  <Skeleton className="mt-2 h-4 w-1/2" />
                </div>
              ))}
            </div>
          )}

          {!loading && products.length === 0 && (
            <div className="py-24 text-center">
              <p className="text-lg text-clay">No products match your filters.</p>
              <button onClick={clearFilters} className="mt-4 text-sm text-ivory underline">
                Clear filters
              </button>
            </div>
          )}

          {!loading && products.length > 0 && (
            <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-2 md:grid-cols-3">
              {products.map((p, i) => (
                <ProductCard key={p.id} product={p} priority={i < 4} />
              ))}
            </div>
          )}
        </div>
      </div>
    </Container>
  )
}
