import React from 'react'
import { useCart } from '../state/CartContext'
import Link from 'next/link'

export default function ProductCard({p}){
  const {add} = useCart()
  return (
    <div className="product">
      <Link href={`/store/${p.id}`}><img src={`/assets/${p.file}`} alt={p.name} /></Link>
      <h4>{p.name}</h4>
      <div className="price">${p.price.toFixed(2)}</div>
      <div style={{display:'flex',gap:8}}>
        <button className="btn primary" onClick={()=>add(p.id)}>Add to cart</button>
        <Link className="btn" href={`/store/${p.id}`}>Details</Link>
      </div>
    </div>
  )
}
