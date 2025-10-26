"use client";

import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, Html, OrbitControls, Text, useTexture } from "@react-three/drei";
import { motion } from "framer-motion";
import { SRGBColorSpace } from "three";

import { PRODUCTS } from "../data/products";

function ProductBillboard({ product, index, total }) {
  const meshRef = useRef();
  const texture = useTexture(`/assets/${product.file}`);

  texture.colorSpace = SRGBColorSpace;

  const radius = 4.5;

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime() * 0.35;
    const angle = (index / total) * Math.PI * 2 + t * 0.35;
    meshRef.current.position.x = Math.cos(angle) * radius;
    meshRef.current.position.z = Math.sin(angle) * radius;
    meshRef.current.position.y = Math.sin(angle * 1.4) * 0.6;
    meshRef.current.rotation.y = -angle + Math.PI;
  });

  return (
    <group ref={meshRef}>
      <Float speed={2.4} rotationIntensity={0.25} floatIntensity={1.4}>
        <mesh>
          <planeGeometry args={[1.9, 2.6, 16, 16]} />
          <meshStandardMaterial map={texture} roughness={0.45} metalness={0.1} />
        </mesh>
        <Text
          position={[0, -1.7, 0]}
          fontSize={0.22}
          color="#f5f1ea"
          anchorX="center"
          anchorY="top"
          letterSpacing={0.02}
        >
          {product.name.toUpperCase()}
        </Text>
      </Float>
    </group>
  );
}

function CarouselScene() {
  const featured = useMemo(() => PRODUCTS.slice(0, 6), []);

  return (
    <>
      <ambientLight intensity={0.8} />
      <directionalLight intensity={1.2} position={[4, 6, 2]} />
      <spotLight intensity={2.8} position={[0, 10, 0]} angle={0.5} penumbra={0.6} distance={20} />
      <group position={[0, 0.2, 0]}>
        {featured.map((product, index) => (
          <ProductBillboard key={product.id} product={product} index={index} total={featured.length} />
        ))}
      </group>
      <Environment preset="city" />
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.6} />
    </>
  );
}

export default function ProductCarousel() {
  return (
    <section className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 sm:px-10">
      <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.17, 0.67, 0.36, 0.99] }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.4em] text-tide/80">
            Immersive Showcase
          </span>
          <h2 className="mt-4 font-display text-4xl tracking-tight text-sand sm:text-5xl">
            Orbiting the must-touch textures of the drop.
          </h2>
        </motion.div>
        <motion.p
          className="max-w-md text-sm leading-relaxed text-clay/80"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.6 }}
        >
          Spin through select pieces rendered in WebGL. Built with React Three Fiber and optimized lighting so every
          fold and ink layer reads even on low light setups.
        </motion.p>
      </div>

      <motion.div
        className="relative overflow-hidden rounded-[36px] border border-white/10 bg-black/40 shadow-[0_30px_60px_rgba(0,0,0,0.55)]"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.8, ease: [0.17, 0.67, 0.36, 0.99] }}
      >
        <Canvas className="h-[540px] w-full">
          <color attach="background" args={["#0b0a0a"]} />
          <Suspense
            fallback={
              <Html center>
                <div className="rounded-full border border-white/10 px-6 py-3 text-xs uppercase tracking-[0.4em] text-clay/70">
                  Loading assets
                </div>
              </Html>
            }
          >
            <CarouselScene />
          </Suspense>
        </Canvas>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-ink via-ink/70 to-transparent" />
      </motion.div>
    </section>
  );
}
