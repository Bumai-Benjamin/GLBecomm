"use client";

import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";
import Logo from "../../src/components/Logo";

export default function GalleryPage() {
  const [images, setImages] = useState([]);
  const animatedRef = useRef(false);

  // Scatter position grid for gallery images (slightly adapted for wider viewport)
  const positions = [
    { top: "5%", left: "2%" },
    { top: "5%", left: "12%" },
    { top: "5%", left: "70%" },
    { top: "18%", left: "18%" },
    { top: "18%", left: "45%" },
    { top: "18%", left: "88%" },
    { top: "35%", left: "55%" },
    { top: "35%", left: "78%" },
    { top: "52%", left: "5%" },
    { top: "68%", left: "32%" },
    { top: "68%", left: "55%" },
    { top: "68%", left: "85%" },
    { top: "84%", left: "22%" },
    { top: "84%", left: "72%" },
  ];

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/api/gallery/events");
        const json = await res.json();
        if (json.success) {
          const events = json.data.events || [];
          const allImages = events
            .flatMap((e) =>
              e.images.map((img) => ({
                url: img.url,
                title: img.title,
                event: e.name,
              }))
            )
            .slice(0, 14); // Limit to positions array length
          setImages(allImages);
        }
      } catch (err) {
        console.error("Error fetching event gallery:", err);
      }
    };
    load();
  }, []);

  // Animate images on load
  useEffect(() => {
    if (images.length > 0 && !animatedRef.current) {
      animatedRef.current = true;
      animateGallery();
    }
  }, [images]);

  const animateGallery = () => {
    // Initial state: all images start centered and scaled down
    gsap.set(".gallery-img", {
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%) scale(0)",
    });

    // Animate header text in
    gsap.from(".gallery-header p", {
      y: 40,
      opacity: 0,
      ease: "power4.inOut",
      duration: 1,
      stagger: 0.15,
      delay: 0.3,
    });

    // Scale/grow all images together
    gsap.to(".gallery-img", {
      scale: 1,
      width: "240px",
      height: "320px",
      stagger: 0.08,
      duration: 0.6,
      ease: "power2.out",
      delay: 1,
      onComplete: () => {
        // After growing, scatter to positions
        scatterImages();
      },
    });
  };

  const scatterImages = () => {
    gsap.to(".gallery-img", {
      top: (i) => positions[i % positions.length].top,
      left: (i) => positions[i % positions.length].left,
      transform: "none",
      width: "160px",
      height: "220px",
      stagger: 0.06,
      duration: 0.7,
      ease: "power2.out",
    });

    // Fade in nav/header after scatter
    gsap.from(".gallery-nav, .gallery-logo", {
      y: 20,
      opacity: 0,
      ease: "power2.out",
      duration: 0.8,
      stagger: 0.1,
      delay: 2,
    });
  };

  return (
    <main className="glb-gallery relative min-h-screen w-full overflow-hidden bg-black">
      {/* Navigation */}
      <nav className="gallery-nav absolute top-0 z-20 flex w-full items-center justify-between border-b border-white/10 bg-black/80 px-6 py-4 backdrop-blur sm:px-10">
        <div className="gallery-logo">
          <Logo size={20} isLight={false} />
        </div>
        <div className="flex items-center gap-8">
          <a href="#" className="text-xs uppercase tracking-[0.35em] text-sand transition hover:text-flare">
            About
          </a>
          <a href="#" className="text-xs uppercase tracking-[0.35em] text-sand transition hover:text-flare">
            Events
          </a>
        </div>
      </nav>

      {/* Header Text (animated revealer style) */}
      <header className="gallery-header absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 text-center">
        <div className="mb-4 flex items-center justify-center gap-6">
          <div className="relative">
            <p className="font-display text-4xl tracking-tight text-sand sm:text-5xl">Captured</p>
          </div>
          <div className="relative">
            <p className="font-display text-4xl tracking-tight text-sand sm:text-5xl">Moments</p>
          </div>
        </div>
      </header>

      {/* Gallery Container */}
      <div className="gallery-container relative w-full" style={{ height: "100vh" }}>
        {images.map((img, index) => (
          <div
            key={index}
            className="gallery-img absolute overflow-hidden rounded-lg border border-white/20 bg-black/80"
            style={{
              aspectRatio: "4/5",
            }}
          >
            <Image
              src={img.url}
              alt={img.title}
              fill
              className="object-cover"
              sizes="240px"
              priority={index < 3}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 transition hover:opacity-100">
              <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                <p className="font-display text-sm text-sand">{img.title}</p>
                <p className="text-[0.6rem] uppercase tracking-[0.25em] text-sand/70">
                  {img.event}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <footer className="gallery-nav absolute bottom-0 left-0 right-0 z-20 flex items-center justify-between border-t border-white/10 bg-black/80 px-6 py-4 backdrop-blur sm:px-10">
      
        <a href="#" className="text-xs uppercase tracking-[0.35em] text-sand transition hover:text-flare">
          Instagram
        </a>
      </footer>

      {/* Image Count */}
      <div className="absolute bottom-6 left-1/2 z-20 -translate-x-1/2 text-[0.7rem] uppercase tracking-[0.3em] text-sand/60">
        {images.length} captured moments
      </div>
    </main>
  );
}
