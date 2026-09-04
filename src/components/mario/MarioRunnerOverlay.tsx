import React, { useState, useEffect } from 'react';
import { useGame } from '../../context/GameContext';
import { marioAudio } from '../../utils/marioAudio';
import { motion, AnimatePresence } from 'framer-motion';

export const MarioRunnerOverlay: React.FC = () => {
  const { marioMode, addCoins } = useGame();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isJumping, setIsJumping] = useState(false);
  const [coinsFloats, setCoinsFloats] = useState<{ id: number; x: number }[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress(window.scrollY / totalScroll);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const triggerJump = () => {
    if (isJumping) return;
    setIsJumping(true);
    marioAudio.playJump();

    // Spawn floating coin on jump
    const marioPos = scrollProgress * 85 + 5;
    const newId = Date.now();
    setCoinsFloats((prev) => [...prev, { id: newId, x: marioPos }]);
    addCoins(1);

    setTimeout(() => {
      setIsJumping(false);
    }, 400);

    setTimeout(() => {
      setCoinsFloats((prev) => prev.filter((c) => c.id !== newId));
    }, 1000);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' && marioMode) {
        // Prevent default spacebar scrolling when jumping
        if (document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
          e.preventDefault();
          triggerJump();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [marioMode, isJumping, scrollProgress]);

  if (!marioMode) return null;

  const marioLeftPercent = Math.min(Math.max(scrollProgress * 85 + 5, 5), 90);

  return (
    <div 
      className="fixed bottom-0 left-0 w-full z-40 pointer-events-none select-none"
      style={{ height: '64px' }}
    >
      {/* Brick & Turf Ground Platform */}
      <div 
        onClick={triggerJump}
        className="w-full h-8 bg-[#C84C0C] border-t-4 border-[#00A800] relative cursor-pointer pointer-events-auto flex items-center justify-between px-4"
        style={{
          backgroundImage: 'linear-gradient(90deg, #C84C0C 50%, #A03800 50%)',
          backgroundSize: '20px 100%'
        }}
      >
        <span className="text-[10px] font-arcade text-yellow-300 opacity-75 hidden md:inline">
          TAP GROUND OR PRESS [SPACEBAR] TO JUMP!
        </span>
        <span className="text-[10px] font-arcade text-white opacity-75">
          SUPER MARIO RUN STAGE
        </span>
      </div>

      {/* Floating Coins spawned from jumping */}
      <AnimatePresence>
        {coinsFloats.map((coin) => (
          <motion.div
            key={coin.id}
            initial={{ opacity: 1, y: -40 }}
            animate={{ opacity: 0, y: -90 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute bottom-12 font-arcade text-yellow-400 text-sm font-bold flex items-center gap-1 drop-shadow-[0_2px_2px_rgba(0,0,0,1)]"
            style={{ left: `${coin.x}%` }}
          >
            🪙 +100
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Running Mario Sprite */}
      <motion.div
        className="absolute bottom-6 w-10 h-10 flex items-center justify-center cursor-pointer pointer-events-auto"
        style={{ left: `${marioLeftPercent}%` }}
        animate={{ y: isJumping ? -45 : 0 }}
        transition={{ type: 'spring', stiffness: 400, damping: 15 }}
        onClick={triggerJump}
      >
        {/* Pixel Mario Character Vector SVG */}
        <svg 
          viewBox="0 0 16 16" 
          className="w-10 h-10 drop-shadow-[2px_2px_0px_#000]"
          style={{ imageRendering: 'pixelated' }}
        >
          {/* Hat / Hair */}
          <rect x="5" y="1" width="6" height="2" fill="#E52521" />
          <rect x="4" y="3" width="9" height="1" fill="#E52521" />
          <rect x="4" y="4" width="3" height="2" fill="#6B4423" />
          <rect x="7" y="4" width="2" fill="#FFCC99" />
          <rect x="9" y="4" width="1" fill="#000000" />
          <rect x="10" y="4" width="2" fill="#FFCC99" />
          
          {/* Face */}
          <rect x="3" y="5" width="1" fill="#6B4423" />
          <rect x="4" y="5" width="1" fill="#FFCC99" />
          <rect x="5" y="5" width="1" fill="#6B4423" />
          <rect x="6" y="5" width="3" fill="#FFCC99" />
          <rect x="9" y="5" width="1" fill="#000000" />
          <rect x="10" y="5" width="3" fill="#FFCC99" />

          {/* Mustache / Shirt */}
          <rect x="4" y="6" width="1" fill="#6B4423" />
          <rect x="5" y="6" width="4" fill="#FFCC99" />
          <rect x="9" y="6" width="4" fill="#000000" />
          
          {/* Overalls */}
          <rect x="3" y="7" width="10" fill="#FFCC99" />
          <rect x="4" y="8" width="8" fill="#E52521" />
          <rect x="3" y="9" width="3" fill="#0000D8" />
          <rect x="6" y="9" width="1" fill="#F8B800" />
          <rect x="7" y="9" width="2" fill="#0000D8" />
          <rect x="9" y="9" width="1" fill="#F8B800" />
          <rect x="10" y="9" width="3" fill="#0000D8" />
          
          {/* Pants */}
          <rect x="3" y="10" width="10" fill="#0000D8" />
          <rect x="4" y="11" width="8" fill="#0000D8" />
          
          {/* Shoes */}
          <rect x="3" y="12" width="3" fill="#6B4423" />
          <rect x="10" y="12" width="3" fill="#6B4423" />
          <rect x="2" y="13" width="4" fill="#6B4423" />
          <rect x="10" y="13" width="4" fill="#6B4423" />
        </svg>
      </motion.div>
    </div>
  );
};
