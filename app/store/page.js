'use client'

import React, {useMemo, useState} from 'react'
import Page from '../../src/components/Page'
import ProductCard from '../../src/components/ProductCard'
import { PRODUCTS } from '../../src/data/products'

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
        <h1>STREETWEAR COLLECTION</h1>
        <div style={{marginBottom:40,maxWidth:600,margin:'0 auto 40px'}}>
          <input 
            placeholder="Search the collection..." 
            value={q} 
            onChange={e=>setQ(e.target.value)} 
            style={{
              padding:'16px 20px',
              width:'100%',
              border:'3px solid var(--accent)',
              background:'var(--bg-secondary)',
              color:'var(--fg)',
              fontSize:'16px',
              fontFamily:'Oswald, sans-serif',
              clipPath:'polygon(0 0, 98% 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))',
              textTransform:'uppercase',
              letterSpacing:'1px'
            }} 
          />
        </div>
        <div className="products">
          {filtered.map(p=> <ProductCard key={p.id} p={p} />)}
        </div>
      </main>
    </Page>
  )
}