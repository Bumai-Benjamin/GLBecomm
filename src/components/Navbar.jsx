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
        <Link className="logo" href="/">Give Love Back</Link>
      </div>
      <nav className="nav-center">
        <Link href="/store" className={pathname === '/store' ? 'active' : undefined}>Store</Link>
        <Link href="/contact" className={pathname === '/contact' ? 'active' : undefined}>Contact</Link>
      </nav>
      <div className="nav-right">
        <CartWidget />
      </div>
    </header>
  )
}
