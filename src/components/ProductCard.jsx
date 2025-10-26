import React from 'react'
import { useCart } from '../state/CartContext'
import Link from 'next/link'

export default function ProductCard({p}){
  const {add} = useCart()
  return (
    <div className="product">
      <Link href={`/store/${p.id}`}>
        <img src={`/assets/${p.file}`} alt={p.name} />
      </Link>
      <h4>{p.name}</h4>
      <div className="price">${p.price.toFixed(2)}</div>
      <div style={{display:'flex',gap:12,flexWrap:'wrap'}}>
        <button className="btn primary" onClick={()=>add(p.id)} style={{flex:1,minWidth:'120px'}}>Add to Cart</button>
        <Link className="btn" href={`/store/${p.id}`} style={{flex:1,minWidth:'100px',textAlign:'center'}}>Details</Link>
      </div>
    </div>
  )
}
