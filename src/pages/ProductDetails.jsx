import React from 'react'
import Page from '../components/Page'
import { useParams } from 'react-router-dom'
import { PRODUCTS } from '../data/products'
import { useCart } from '../state/CartContext'

export default function ProductDetails(){
  const { id } = useParams()
  const p = PRODUCTS.find(x=>x.id===id)
  const { add } = useCart()
  if(!p) return <main style={{padding:20}}><h2>Product not found</h2></main>
  return (
    <Page>
      <main style={{padding:'40px 24px'}}>
        <div style={{display:'grid',gridTemplateColumns:'minmax(260px,400px) 1fr',gap:24, alignItems:'start'}}>
          <img src={`/assets/${p.file}`} alt={p.name} style={{width:'100%',borderRadius:12,border:'1px solid var(--line)'}} />
          <div>
            <h2 style={{margin:'0 0 8px'}}>{p.name}</h2>
            <p className="price" style={{fontSize:18, margin:'0 0 16px'}}>${p.price.toFixed(2)}</p>
            <p style={{color:'var(--muted)'}}>{p.description}</p>
            <div style={{marginTop:16}}>
              <button className="btn primary" onClick={()=>add(p.id)}>Add to cart</button>
            </div>
          </div>
        </div>
      </main>
    </Page>
  )
}
