import React, {useMemo, useState} from 'react'
import Page from '../components/Page'
import ProductCard from '../components/ProductCard'
import { PRODUCTS } from '../data/products'

export default function Store(){
  const [q, setQ] = useState('')
  const filtered = useMemo(()=>{
    const term = q.trim().toLowerCase()
    if(!term) return PRODUCTS
    return PRODUCTS.filter(p=> p.name.toLowerCase().includes(term) || (p.description||'').toLowerCase().includes(term))
  },[q])

  return (
    <Page>
      <main className="store">
        <h1>Store</h1>
        <div style={{marginBottom:12}}>
          <input placeholder="Search products" value={q} onChange={e=>setQ(e.target.value)} style={{padding:12,borderRadius:10,border:'1px solid var(--line)'}} />
        </div>
        <div className="products">
          {filtered.map(p=> <ProductCard key={p.id} p={p} />)}
        </div>
      </main>
    </Page>
  )
}
