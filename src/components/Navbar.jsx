import React from 'react'
import { Link } from 'react-router-dom'
import CartWidget from './CartWidget'

export default function Navbar(){
  return (
    <header className="site-header navbar">
      <div className="nav-left">
        <Link className="logo" to="/">Give Love Back</Link>
      </div>
      <nav className="nav-center">
        <Link to="/store">Store</Link>
        <Link to="/contact">Contact</Link>
      </nav>
      <div className="nav-right">
        <CartWidget />
      </div>
    </header>
  )
}
