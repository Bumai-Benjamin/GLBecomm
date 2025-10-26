'use client'

import React from 'react'
import Page from '../../../src/components/Page'
import { PRODUCTS } from '../../../src/data/products'
import { useCart } from '../../../src/state/CartContext'
import Link from 'next/link'

export default function ProductDetails({ params }){
  const { id } = params
  const p = PRODUCTS.find(x=>x.id===id)
  const { add } = useCart()
  if(!p) return <main style={{padding:'120px 40px',textAlign:'center'}}><h2 style={{fontFamily:'Anton',fontSize:'40px',color:'var(--accent)'}}>PRODUCT NOT FOUND</h2></main>
  return (
    <Page>
      <main style={{padding:'120px 40px 60px',minHeight:'100vh'}}>
        <div style={{display:'grid',gridTemplateColumns:'minmax(300px,500px) 1fr',gap:60, alignItems:'start',maxWidth:1400,margin:'0 auto'}}>
          <div style={{position:'sticky',top:120}}>
            <img 
              src={`/assets/${p.file}`} 
              alt={p.name} 
              style={{
                width:'100%',
                border:'3px solid var(--accent)',
                clipPath:'polygon(0 0, 95% 0, 100% 5%, 100% 100%, 5% 100%, 0 95%)',
                boxShadow:'var(--shadow-glow), var(--shadow-hard)',
                filter:'grayscale(20%) contrast(1.1)'
              }} 
            />
          </div>
          <div>
            <h1 style={{
              fontFamily:'Anton',
              fontSize:'clamp(36px, 6vw, 64px)',
              textTransform:'uppercase',
              letterSpacing:'4px',
              margin:'0 0 20px',
              background:'linear-gradient(135deg, var(--accent) 0%, var(--accent-secondary) 100%)',
              WebkitBackgroundClip:'text',
              WebkitTextFillColor:'transparent',
              backgroundClip:'text'
            }}>{p.name}</h1>
            <div style={{display:'flex',alignItems:'baseline',gap:20, marginBottom:30,flexWrap:'wrap'}}>
              <span style={{
                fontFamily:'Anton',
                fontSize:'48px',
                color:'var(--accent)',
                textShadow:'0 0 10px rgba(255,51,102,0.3)'
              }}>${p.price.toFixed(2)}</span>
              <span style={{
                fontFamily:'Oswald',
                fontSize:'14px',
                color:'var(--muted)',
                textTransform:'uppercase',
                letterSpacing:'2px'
              }}>Tax included</span>
            </div>
            <p style={{
              fontFamily:'Oswald',
              fontSize:'18px',
              color:'var(--muted)', 
              marginBottom:40,
              lineHeight:1.6,
              letterSpacing:'1px'
            }}>{p.description}</p>
            <div style={{display:'flex', gap:20, marginBottom:50,flexWrap:'wrap'}}>
              <button className="btn primary" onClick={()=>add(p.id)}>Add to Cart</button>
              <Link className="btn ghost" href="/store">Back to Collection</Link>
            </div>

            {Array.isArray(p.specs) && p.specs.length>0 && (
              <section>
                <h3 style={{
                  fontFamily:'Anton',
                  fontSize:'32px',
                  textTransform:'uppercase',
                  letterSpacing:'3px',
                  margin:'0 0 30px',
                  color:'var(--accent-secondary)'
                }}>Specifications</h3>
                <div className="specs">
                  {p.specs.map((s,i)=> (
                    <div className="spec" key={i}>
                      <div className="spec-label">{s.label}</div>
                      <div className="spec-value">{s.value}</div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            <section style={{
              marginTop:50, 
              padding:30,
              border:'2px solid var(--line)',
              clipPath:'polygon(0 0, 98% 0, 100% 2%, 100% 100%, 2% 100%, 0 98%)',
              background:'var(--bg-secondary)'
            }}>
              <div style={{
                fontFamily:'Oswald',
                fontSize:'16px',
                color:'var(--muted)',
                letterSpacing:'1px',
                lineHeight:1.8
              }}>
                Ships in 2–4 business days. Free exchanges within 30 days.
                <br/>100% authentic streetwear. Limited edition pieces.
              </div>
            </section>
          </div>
        </div>
      </main>
    </Page>
  )
}