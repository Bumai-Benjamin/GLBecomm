import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Hero from './components/Hero'
import Store from './pages/Store'
import Contact from './pages/Contact'
import ProductDetails from './pages/ProductDetails'
import { CartProvider } from './state/CartContext'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import { AnimatePresence } from 'framer-motion'

export default function App(){
  const location = useLocation()
  return (
    <CartProvider>
      <div>
        <Navbar />

        <AnimatePresence mode="wait" initial={false}>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/store" element={<Store />} />
            <Route path="/store/:id" element={<ProductDetails />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </AnimatePresence>
      </div>
    </CartProvider>
  )
}
