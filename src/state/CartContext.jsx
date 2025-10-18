import React, {createContext, useContext, useEffect, useState} from 'react'

const CartContext = createContext(null)
const CART_KEY = 'glbecom_cart_v1'

function readCart(){try{return JSON.parse(localStorage.getItem(CART_KEY)||'[]')}catch(e){return []}}

export function CartProvider({children}){
  const [cart, setCart] = useState(readCart())
  useEffect(()=>{localStorage.setItem(CART_KEY, JSON.stringify(cart))},[cart])

  function add(id){
    setCart(prev=>{
      const found = prev.find(p=>p.id===id)
      if(found) return prev.map(p=>p.id===id?{...p,qty:p.qty+1}:p)
      return [...prev,{id,qty:1}]
    })
  }
  function remove(id){setCart(prev=>prev.filter(p=>p.id!==id))}
  function change(id, delta){
    setCart(prev=>{
      return prev.map(p=>p.id===id?{...p,qty:Math.max(1,p.qty+delta)}:p)
    })
  }
  function clear(){setCart([])}

  return <CartContext.Provider value={{cart,add,remove,change,clear}}>{children}</CartContext.Provider>
}

export function useCart(){return useContext(CartContext)}
