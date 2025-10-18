import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Hero from './components/Hero'
import Store from './pages/Store'
import Contact from './pages/Contact'
import ProductDetails from './pages/ProductDetails'
import { CartProvider } from './state/CartContext'
import CartWidget from './components/CartWidget'
import Navbar from './components/Navbar'

export default function App(){
  return (
    <CartProvider>
      <div>
        <Navbar />

        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/store" element={<Store />} />
          <Route path="/store/:id" element={<ProductDetails />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </CartProvider>
  )
}
