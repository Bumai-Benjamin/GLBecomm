import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'

const CartContext = createContext(null)
const CART_KEY = 'glbecom_cart_v1'

function readCart() {
  if (typeof window === 'undefined') return []
  try {
    return JSON.parse(window.localStorage.getItem(CART_KEY) || '[]')
  } catch (error) {
    console.error('Failed to read cart from storage', error)
    return []
  }
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => readCart())

  useEffect(() => {
    setCart(readCart())
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return
    window.localStorage.setItem(CART_KEY, JSON.stringify(cart))
  }, [cart])

  const api = useMemo(
    () => ({
      cart,
      add: (id) => {
        setCart((prev) => {
          const found = prev.find((p) => p.id === id)
          if (found) {
            return prev.map((p) => (p.id === id ? { ...p, qty: p.qty + 1 } : p))
          }
          return [...prev, { id, qty: 1 }]
        })
      },
      remove: (id) => setCart((prev) => prev.filter((p) => p.id !== id)),
      change: (id, delta) => {
        setCart((prev) =>
          prev
            .map((p) =>
              p.id === id
                ? { ...p, qty: Math.max(0, p.qty + delta) }
                : p,
            )
            .filter((p) => p.qty > 0),
        )
      },
      clear: () => setCart([]),
    }),
    [cart],
  )

  return <CartContext.Provider value={api}>{children}</CartContext.Provider>
}

export function useCart() {
  return useContext(CartContext)
}
