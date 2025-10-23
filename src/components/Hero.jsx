import React, {useEffect, useRef} from 'react'
import * as THREE from 'three'
import { useNavigate } from 'react-router-dom'

export default function Hero(){
  const navigate = useNavigate()
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
    const material = new THREE.PointsMaterial({size:0.06, color:0xffffff, transparent:true, opacity:0.25})
    const points = new THREE.Points(geom, material)
    scene.add(points)
    let t=0
    function resize(){const w=window.innerWidth,h=window.innerHeight;renderer.setSize(w,h);camera.aspect=w/h;camera.updateProjectionMatrix()}
    window.addEventListener('resize', resize)
    function animate(){t+=0.004;points.rotation.y=t*0.5;points.rotation.x=Math.sin(t*0.25)*0.08;renderer.render(scene,camera);requestAnimationFrame(animate)}
    animate()
    return ()=>{window.removeEventListener('resize', resize);renderer.dispose()}
  },[])

  return (
    <section className="hero dark">
      <canvas ref={canvasRef} className="bg-canvas" />
      <div className="hero-content">
        <h1>Give Love Back</h1>
        <p>Purposeful goods made to spark everyday generosity. Minimal by design. Maximum in impact.</p>
        <div className="hero-ctas">
          <button className="btn primary" onClick={()=>navigate('/store')}>Explore Store</button>
        </div>
      </div>
    </section>
  )
}
