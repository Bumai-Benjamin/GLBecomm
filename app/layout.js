'use client'

import { CartProvider } from '../src/state/CartContext'
import Navbar from '../src/components/Navbar'
import './globals.css'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <Navbar />
          {children}
        </CartProvider>
      </body>
    </html>
  )
}