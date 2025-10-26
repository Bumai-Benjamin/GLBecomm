'use client'

import React from 'react'
import Page from '../../../src/components/Page'
import { PRODUCTS } from '../../../src/data/products'
import { useCart } from '../../../src/state/CartContext'
import Link from 'next/link'

export default function ProductDetails({ params }){
  const { id } = params
  const p = PRODUCTS.find(x=>x.id===id)
  const { add } = useCart()
  if(!p) return <main style={{padding:20}}><h2>Product not found</h2></main>
  return (
    <Page>
      <main style={{padding:'40px 24px'}}>
        <div style={{display:'grid',gridTemplateColumns:'minmax(260px,420px) 1fr',gap:32, alignItems:'start'}}>
          <img src={`/assets/${p.file}`} alt={p.name} style={{width:'100%',borderRadius:12,border:'1px solid var(--line)'}} />
          <div>
            <h1 style={{margin:'0 0 12px'}}>{p.name}</h1>
            <div style={{display:'flex',alignItems:'baseline',gap:12, marginBottom:16}}>
              <span className="price" style={{fontSize:22}}>${p.price.toFixed(2)}</span>
              <span style={{color:'var(--muted)'}}>Tax included</span>
            </div>
            <p style={{color:'var(--muted)', marginBottom:16}}>{p.description}</p>
            <div style={{display:'flex', gap:12, marginBottom:24}}>
              <button className="btn primary" onClick={()=>add(p.id)}>Add to cart</button>
              <Link className="btn" href="/store">Back to store</Link>
            </div>

            {Array.isArray(p.specs) && p.specs.length>0 && (
              <section>
                <h3 style={{margin:'24px 0 12px'}}>Specifications</h3>
                <div className="specs">
                  {p.specs.map((s,i)=> (
                    <div className="spec" key={i}>
                      <div className="spec-label">{s.label}</div>
                      <div className="spec-value">{s.value}</div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            <section style={{marginTop:24, color:'var(--muted)'}}>
              <div style={{borderTop:'1px solid var(--line)', paddingTop:16}}>
                Ships in 2–4 business days. Free exchanges within 30 days.
              </div>
            </section>
          </div>
        </div>
      </main>
    </Page>
  )
}