import React, {useEffect, useRef} from 'react'
import * as THREE from 'three'

export default function Hero({onShop}){
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
    const count = 800
    const positions = new Float32Array(count*3)
    for(let i=0;i<count;i++){
      positions[i*3+0] = (Math.random()-0.5)*20
      positions[i*3+1] = (Math.random()-0.5)*10
      positions[i*3+2] = (Math.random()-0.5)*20
    }
    geom.setAttribute('position', new THREE.BufferAttribute(positions,3))
    const material = new THREE.PointsMaterial({size:0.08, color:0xff6bcb, transparent:true, opacity:0.9})
    const points = new THREE.Points(geom, material)
    scene.add(points)
    let t=0
    function resize(){const w=window.innerWidth,h=window.innerHeight;renderer.setSize(w,h);camera.aspect=w/h;camera.updateProjectionMatrix()}
    window.addEventListener('resize', resize)
    function animate(){t+=0.005;points.rotation.y=t*0.6;points.rotation.x=Math.sin(t*0.3)*0.1;material.color.setHSL((Math.sin(t*0.2)+1)/4+0.2,0.9,0.6);renderer.render(scene,camera);requestAnimationFrame(animate)}
    animate()
    return ()=>{window.removeEventListener('resize', resize);renderer.dispose()}
  },[])

  return (
    <main className="hero">
      <canvas ref={canvasRef} className="bg-canvas" />
      <div className="hero-content">
        <h1>Good vibes. Great merch.</h1>
        <p>Limited edition tees and accessories in BestiePink and BestiePurple.</p>
        <div className="hero-ctas">
          <button className="btn primary" onClick={onShop}>Shop Now</button>
        </div>
      </div>
    </main>
  )
}
