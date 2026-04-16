import React, { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { useScene } from '@/context/SceneContext';

export const LenisProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { setScrollProgress } = useScene();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
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
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    lenis.on('scroll', (e: any) => {
      // Calculate normalized scroll progress (0 to 1)
      const progress = e.progress;
      setScrollProgress(progress);
    });

    return () => {
      lenis.destroy();
    };
  }, [setScrollProgress]);

  return <>{children}</>;
};
