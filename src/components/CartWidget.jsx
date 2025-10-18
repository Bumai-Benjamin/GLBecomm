import React, {useState} from 'react'
import { useCart } from '../state/CartContext'
import { PRODUCTS } from '../data/products'

function CartIcon({count, onToggle}){
  return (
    <div className="cart-icon" onClick={onToggle} style={{cursor:'pointer'}}>
      <svg viewBox="0 0 24 24"><path d="M7 4h-2l-1 2h2l3 9h7l3-9h2l-1-2h-2l-1-2h-8z"/></svg>
      <span className="cart-badge">{count}</span>
    </div>
  )
}

export default function CartWidget(){
  const {cart, change, remove} = useCart()
  const [open, setOpen] = useState(false)
  const items = cart.reduce((s,c)=>s+c.qty,0)
  const subtotal = cart.reduce((s,it)=>{const p=PRODUCTS.find(pp=>pp.id===it.id); return s + (p? p.price*it.qty:0)},0)

  return (
    <div style={{display:'flex',alignItems:'center',gap:8}}>
      <CartIcon count={items} onToggle={()=>setOpen(v=>!v)} />
      <div className={`mini-cart ${open? '':'hidden'}`} aria-hidden={!open}>
        <h3>Your Cart</h3>
        <div className="mini-cart-items">
          {cart.map(it=>{
            const p = PRODUCTS.find(pp=>pp.id===it.id)
            if(!p) return null
            return (
              <div className="mini-cart-item" key={it.id}>
                <img src={`/assets/${p.file}`} alt={p.name} />
                <div style={{flex:1}}>
                  <div>{p.name}</div>
                  <div className="price">${(p.price*it.qty).toFixed(2)}</div>
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
          <div className="mini-cart-subtotal">Subtotal: ${subtotal.toFixed(2)}</div>
          <div>
            <a className="btn" href="/store">View Cart</a>
            <button className="btn primary" onClick={()=>alert('Checkout not implemented')}>Checkout</button>
          </div>
        </div>
      </div>
    </div>
  )
}
