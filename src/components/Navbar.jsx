'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import CartWidget from './CartWidget'

export default function Navbar(){
  const pathname = usePathname()
  return (
    <header className="site-header navbar">
      <div className="nav-left">
        <Link className="logo" href="/">GLB</Link>
      </div>
      <nav className="nav-center">
        <Link href="/store" className={pathname?.startsWith('/store') ? 'active' : ''}>Store</Link>
        <Link href="/contact" className={pathname === '/contact' ? 'active' : ''}>Contact</Link>
      </nav>
      <div className="nav-right">
        <CartWidget />
      </div>
    </header>
  )
}
