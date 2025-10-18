import React from 'react'
import { useParams } from 'react-router-dom'
import { PRODUCTS } from '../data/products'
import { useCart } from '../state/CartContext'

export default function ProductDetails(){
  const { id } = useParams()
  const p = PRODUCTS.find(x=>x.id===id)
  const { add } = useCart()
  if(!p) return <main style={{padding:20}}><h2>Product not found</h2></main>
  return (
    <main style={{padding:20}}>
      <div style={{display:'grid',gridTemplateColumns:'320px 1fr',gap:20}}>
        <img src={`/assets/${p.file}`} alt={p.name} style={{width:320,borderRadius:8}} />
        <div>
          <h2>{p.name}</h2>
          <p className="price">${p.price.toFixed(2)}</p>
          <p>{p.description}</p>
          <button className="btn primary" onClick={()=>add(p.id)}>Add to cart</button>
        </div>
      </div>
    </main>
  )
}
