'use client'

import React, {useEffect, useRef} from 'react'
import * as THREE from 'three'
import { useRouter } from 'next/navigation'

export default function Hero(){
  const router = useRouter()
  const canvasRef = useRef(null)
  useEffect(()=>{
    const canvas = canvasRef.current
    if(!canvas) return
    const renderer = new THREE.WebGLRenderer({canvas, antialias:true, alpha:true})
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(50, window.innerWidth/window.innerHeight, 0.1, 1000)
    camera.position.z = 5
    renderer.setSize(window.innerWidth, window.innerHeight)
    
    const geom = new THREE.BufferGeometry()
    const count = 1200
    const positions = new Float32Array(count*3)
    const colors = new Float32Array(count*3)
    
    for(let i=0;i<count;i++){
      positions[i*3+0] = (Math.random()-0.5)*25
      positions[i*3+1] = (Math.random()-0.5)*15
      positions[i*3+2] = (Math.random()-0.5)*25
      
      // Random colors between pink, cyan, and yellow
      const colorChoice = Math.random()
      if(colorChoice < 0.33){
        colors[i*3+0] = 1.0  // R
        colors[i*3+1] = 0.2  // G
        colors[i*3+2] = 0.4  // B (pink)
      } else if(colorChoice < 0.66){
        colors[i*3+0] = 0.0  // R
        colors[i*3+1] = 1.0  // G
        colors[i*3+2] = 1.0  // B (cyan)
      } else {
        colors[i*3+0] = 1.0  // R
        colors[i*3+1] = 1.0  // G
        colors[i*3+2] = 0.0  // B (yellow)
      }
    }
    
    geom.setAttribute('position', new THREE.BufferAttribute(positions,3))
    geom.setAttribute('color', new THREE.BufferAttribute(colors,3))
    
    const material = new THREE.PointsMaterial({
      size:0.08, 
      vertexColors:true,
      transparent:true, 
      opacity:0.4,
      blending: THREE.AdditiveBlending
    })
    
    const points = new THREE.Points(geom, material)
    scene.add(points)
    
    let t=0
    function resize(){
      const w=window.innerWidth,h=window.innerHeight
      renderer.setSize(w,h)
      camera.aspect=w/h
      camera.updateProjectionMatrix()
    }
    window.addEventListener('resize', resize)
    
    function animate(){
      t+=0.005
      points.rotation.y=t*0.3
      points.rotation.x=Math.sin(t*0.2)*0.1
      points.rotation.z=Math.cos(t*0.15)*0.05
      renderer.render(scene,camera)
      requestAnimationFrame(animate)
    }
    animate()
    
    return ()=>{
      window.removeEventListener('resize', resize)
      renderer.dispose()
    }
  },[])

  return (
    <section className="hero dark">
      <canvas ref={canvasRef} className="bg-canvas" />
      <div className="hero-content">
        <h1 data-text="Give Love Back">Give Love Back</h1>
        <p>Streetwear that speaks volumes. Bold designs. Raw attitude. Pure authenticity.</p>
        <div className="hero-ctas">
          <button className="btn primary" onClick={()=>router.push('/store')}>Explore Collection</button>
          <button className="btn ghost" onClick={()=>router.push('/contact')}>Get in Touch</button>
        </div>
      </div>
    </section>
  )
}
