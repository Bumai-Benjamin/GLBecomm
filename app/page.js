"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Flip from "gsap/Flip";
import CustomEase from "gsap/CustomEase";
import SplitType from "split-type";

gsap.registerPlugin(Flip, CustomEase);

const imageStack = [
  "/assets/hero.jpg",
  "/assets/IMG_8332.jpg",
  "/assets/IMG_8569.jpg",
  "/assets/IMG-20250919-WA0044.jpg",
  "/assets/IMG-20250919-WA0051.jpg",
  "/assets/IMG_8355.jpg",
  "/assets/IMG-20250919-WA0081.jpg",
  "/assets/IMG-20250919-WA0099.jpg",
];

export default function Home() {
  const rootRef = useRef(null);
  const [isReady, setIsReady] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleComplete = () => setIsReady(true);

    if (typeof window !== "undefined") {
      window.addEventListener("glb-loading-complete", handleComplete);
    }

    const fallback = setTimeout(handleComplete, 2600);

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("glb-loading-complete", handleComplete);
      }
      clearTimeout(fallback);
    };
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    document.body.classList.add("landing-page");
    return () => document.body.classList.remove("landing-page");
  }, []);

  useEffect(() => {
    if (!isReady) return;

    const root = rootRef.current;
    if (!root) return;

    CustomEase.create(
      "hop",
      "M0,0 C0.355,0.022 0.448,0.079 0.5,0.5 0.542,0.846 0.615,1 1,1 "
    );

    CustomEase.create(
      "hop2",
      "M0,0 C0.078,0.617 0.114,0.716 0.255,0.828 0.373,0.922 0.561,1 1,1 "
    );

    const splitTarget = root.querySelector(".site-info h2");
    const splitH2 = splitTarget
      ? new SplitType(splitTarget, { types: "lines" })
      : null;

    if (splitH2) {
      splitH2.lines.forEach((line) => {
        const text = line.textContent || "";
        const wrapper = document.createElement("div");
        wrapper.className = "line";
        const span = document.createElement("span");
        span.textContent = text;
        wrapper.appendChild(span);
        line.parentNode?.replaceChild(wrapper, line);
      });
    }

    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(root);
      const mainTl = gsap.timeline();
      const revealerTl = gsap.timeline();
      const scaleTl = gsap.timeline();

      revealerTl
        .to(q(".r-1"), {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
          duration: 1.5,
          ease: "hop",
        })
        .to(
          q(".r-2"),
          {
            clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
            duration: 1.5,
            ease: "hop",
          },
          "<"
        );

      scaleTl.to(q(".img:first-child"), {
        scale: 1,
        duration: 2,
        ease: "power4.inOut",
      });

      const images = q(".img:not(:first-child)");
      images.forEach((img) => {
        scaleTl.to(
          img,
          {
            opacity: 1,
            scale: 1,
            duration: 1.25,
            ease: "power3.out",
          },
          ">-0.95"
        );
      });

      mainTl
        .add(revealerTl)
        .add(scaleTl, "-=1.25")
        .add(() => {
          q(".img:not(.main)").forEach((img) => img.remove());

          const state = Flip.getState(q(".main"));

          const imagesContainer = q(".images")[0];
          if (imagesContainer) {
            imagesContainer.classList.add("stacked-container");
          }

          q(".main").forEach((img, i) => {
            img.classList.add("stacked");
            img.style.order = i;
          });

          gsap.set(q(".img.stacked"), {
            clearProps: "transform,top,left",
          });

          return Flip.from(state, {
            duration: 2,
            ease: "hop",
            absolute: true,
            stagger: { amount: -0.3 },
          });
        })
        .to(q(".word h1, .nav-item p, .line p, .site-info h2 .line span"), {
          y: 0,
          duration: 3,
          ease: "hop2",
          stagger: 0.1,
          delay: 1.25,
        })
        .to(q(".team-img"), {
          clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
          duration: 2,
          ease: "hop",
          delay: -4.75,
        });
    }, root);

    return () => {
      ctx.revert();
      splitH2?.revert();
    };
  }, [isReady]);

  return (
    <div ref={rootRef} className="glb-landing">
      {mobileMenuOpen && (
        <div
          className="mobile-menu-backdrop"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
      <div className="container">
        <div className="revealers">
          <div className="revealer r-1" />
          <div className="revealer r-2" />
        </div>

        <div className="images">
          {isReady &&
            imageStack.map((src, index) => (
              <div
                key={src}
                className={`img ${index >= imageStack.length - 3 ? "main" : ""}`}
              >
                <img src={src} alt="GLB lookbook" />
              </div>
            ))}
        </div>

        <div className="hero-content">
          <div className="site-logo">
            <div className="word">
              <h1>GLB</h1>
            </div>
            <div className="word">
              <h1>
                Give Love Back<sup>©</sup>
              </h1>
            </div>
            <button
              className="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <span className={mobileMenuOpen ? "open" : ""} />
              <span className={mobileMenuOpen ? "open" : ""} />
              <span className={mobileMenuOpen ? "open" : ""} />
            </button>
          </div>

          <div className={`nav ${mobileMenuOpen ? "mobile-open" : ""}`}>
            <div className="nav-item">
              <a href="/about" onClick={() => setMobileMenuOpen(false)}>
                <p>About</p>
              </a>
            </div>
            <div className="nav-item">
              <a href="/store" onClick={() => setMobileMenuOpen(false)}>
                <p>Collections</p>
              </a>
            </div>
            <div className="nav-item">
              <a href="/events" onClick={() => setMobileMenuOpen(false)}>
                <p>Events</p>
              </a>
            </div>
            <div className="nav-item">
              <a href="/contact" onClick={() => setMobileMenuOpen(false)}>
                <p>Contact</p>
              </a>
            </div>
          </div>

          <div className="team-img">
            <img src="/assets/IMG-20260201-WA0324.jpg" alt="GLB team" />
          </div>

          <div className="site-info">
            <div className="row">
              <div className="col">
                <div className="line">
                  <p>Featured Drops</p>
                </div>
              </div>
              <div className="col">
                <h2>
                  GLB is a community-first fashion label creating timeless
                  streetwear with purpose, care, and bold minimalism.
                </h2>
              </div>
            </div>

            <div className="row">
              <div className="col" />
              <div className="col">
                <div className="address">
                  <div className="line">
                    <p>GLB Studio</p>
                  </div>
                  <div className="line">
                    <p>Windhoek, Namibia</p>
                  </div>
                  <div className="line">
                    <p>Creative District</p>
                  </div>
                  <div className="line">
                    <p>+264 81 000 0000</p>
                  </div>
                </div>

                <div className="socials">
                  <div className="line">
                    <p>
                      <a href="mailto:hello@giveloveback.com">
                        hello@giveloveback.com
                      </a>
                    </p>
                  </div>
                  <br />
                  <div className="line">
                    <p>
                      <a
                        href="https://instagram.com/glb"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Instagram
                      </a>
                    </p>
                  </div>
                  <div className="line">
                    <p>
                      <a
                        href="https://tiktok.com/@glb"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        TikTok
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}