import Image from 'next/image'
import React, {useEffect, useState} from 'react'
import { createRoot } from 'react-dom/client'

import { formatPrice } from '../lib/pricing'
import { useCart } from '../state/CartContext'

function CartIcon({onToggle}){
  const {cart} = useCart()
  const items = cart.reduce((s,c)=>s+c.qty,0)
  return (
    <div className="cart-icon" onClick={onToggle} style={{cursor:'pointer'}}>
      <svg viewBox="0 0 24 24"><path d="M7 4h-2l-1 2h2l3 9h7l3-9h2l-1-2h-2l-1-2h-8z"/></svg>
      <span className="cart-badge">{items}</span>
    </div>
  )
}

function MiniCart({visible, onClose}){
  const {cart,change,remove} = useCart()
  const PRODUCTS = window.__PRODUCTS || []
  const subtotal = cart.reduce((s,it)=>{
    const p = PRODUCTS.find(pp=>pp.id===it.id); return s + (p? p.price*it.qty:0)
  },0)
  return (
    <div className={`mini-cart ${visible? '': 'hidden'}`} aria-hidden={!visible}>
      <h3>Your Cart</h3>
      <div className="mini-cart-items">
        {cart.map(it=>{
          const p = PRODUCTS.find(pp=>pp.id===it.id)
          if(!p) return null
          return (
            <div className="mini-cart-item" key={it.id}>
              <div style={{position:'relative', width:64, height:64, overflow:'hidden', borderRadius:12}}>
                <Image src={`/assets/${p.file}`} alt={p.name} fill sizes="64px" style={{objectFit:'cover'}} />
              </div>
              <div style={{flex:1}}>
                <div>{p.name}</div>
                <div className="price">{formatPrice(p.price)}</div>
                <div className="qty">
                  <button onClick={()=>change(it.id,-1)}>-</button>
                  <span style={{padding:'0 8px'}}>{it.qty}</span>
                  <button onClick={()=>change(it.id,1)}>+</button>
                  <button onClick={()=>remove(it.id)}>Remove</button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
      <div className="mini-cart-footer">
  <div className="mini-cart-subtotal">Subtotal: {formatPrice(subtotal)}</div>
        <div>
          <button className="btn" onClick={()=>window.location.href='/store'}>View Cart</button>
          <button className="btn primary" onClick={()=>alert('Checkout not implemented')}>Checkout</button>
        </div>
      </div>
    </div>
  )
}

export default function mountCart(){
  const mount = document.getElementById('cart-root')
  if(!mount) return
  const root = createRoot(mount)
  function Wrapper(){
    const [open,setOpen] = useState(false)
    return (
      <>
        <CartIcon onToggle={()=>setOpen(v=>!v)} />
        <MiniCart visible={open} onClose={()=>setOpen(false)} />
      </>
    )
  }
  root.render(<Wrapper />)
}
