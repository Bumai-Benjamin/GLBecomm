"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 2200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.2 }}
          transition={{ duration: 1.3, ease: [0.17, 0.67, 0.36, 0.99] }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-lg"
        >
          <Image
            src="/assets/hero.jpg"
            alt="GLB Hero Background"
            fill
            className="object-cover absolute inset-0 w-full h-full blur-md opacity-60"
            priority
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative z-10 flex flex-col items-center"
          >
            <div className="mb-4">
              <span className="relative block" style={{ width: 64, height: 64 }}>
                <Image src="/assets/logo.png" alt="GLB logo" fill className="object-contain drop-shadow" />
              </span>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl text-white drop-shadow-lg mb-4 text-center">
              Welcome to the GLB Experience
            </h1>
            <div className="w-16 h-16 border-4 border-flare border-t-transparent rounded-full animate-spin mb-2" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
