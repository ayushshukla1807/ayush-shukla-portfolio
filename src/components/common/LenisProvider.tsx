import React, { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { useScene } from '@/context/SceneContext';

export const LenisProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { setScrollProgress } = useScene();
  const lenisRef = useRef<Lenis | null>(null);
  const rafIdRef = useRef<number | null>(null);

  useEffect(() => {
    // Safety check for browser environment
    if (typeof window === 'undefined') return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    lenisRef.current = lenis;

    function raf(time: number) {
      if (lenisRef.current) {
        lenisRef.current.raf(time);
        rafIdRef.current = requestAnimationFrame(raf);
      }
    }

    rafIdRef.current = requestAnimationFrame(raf);

    lenis.on('scroll', (e: any) => {
      // Safety check for e.progress
      const progress = typeof e.progress === 'number' ? e.progress : 0;
      setScrollProgress(Math.min(1, Math.max(0, progress)));
    });

    console.log("[Lenis] Initialized");

    return () => {
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
      console.log("[Lenis] Destroyed");
    };
  }, [setScrollProgress]);

  return <>{children}</>;
};
