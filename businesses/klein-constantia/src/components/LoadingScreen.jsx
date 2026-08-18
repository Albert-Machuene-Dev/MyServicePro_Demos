import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import restaurant from '../data/restaurant.json';

function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 2800;
    const interval = 30;
    const steps = duration / interval;
    let current = 0;

    const timer = setInterval(() => {
      current += 1;
      setProgress(Math.min((current / steps) * 100, 100));
      if (current >= steps) {
        clearInterval(timer);
        setTimeout(onComplete, 400);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: '-100%' }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 45%, rgba(255,255,255,0.03) 0%, transparent 60%)`
        }}
      />

      <motion.div
        className="relative z-10 flex flex-col items-center text-center px-6"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        {/* Business Name as Logo */}
        <motion.h1
          className="font-display text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          {restaurant.name}
        </motion.h1>

        {/* Tagline */}
        <motion.p
          className="text-lg md:text-2xl text-white/80 font-light tracking-[0.2em] uppercase"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          {restaurant.tagline}
        </motion.p>
      </motion.div>

      {/* Progress bar */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 w-48 h-[2px] bg-white/10 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-white"
          initial={{ width: '0%' }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>

      {/* Subtle pulse at bottom */}
      <motion.div
        className="absolute bottom-8 text-white/30 text-xs tracking-[0.3em] uppercase"
        animate={{ opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        Loading Experience
      </motion.div>
    </motion.div>
  );
}

export default function SplashWrapper({ children }) {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <AnimatePresence mode="wait">
      {showSplash ? (
        <LoadingScreen key="splash" onComplete={() => setShowSplash(false)} />
      ) : (
        <motion.div
          key="content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
