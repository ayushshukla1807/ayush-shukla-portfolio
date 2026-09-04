import React, { useState } from 'react';
import { useGame } from '../../context/GameContext';
import { marioAudio } from '../../utils/marioAudio';
import { motion, AnimatePresence } from 'framer-motion';

interface QuestionBlockProps {
  label?: string;
  onHit?: () => void;
  secretInfo?: string;
}

export const QuestionBlock: React.FC<QuestionBlockProps> = ({ label, onHit, secretInfo }) => {
  const { marioMode, addCoins } = useGame();
  const [hitCount, setHitCount] = useState(0);
  const [isBouncing, setIsBouncing] = useState(false);
  const [showSecret, setShowSecret] = useState(false);
  const [popups, setPopups] = useState<{ id: number }[]>([]);

  const handleHit = () => {
    if (isBouncing) return;
    setIsBouncing(true);
    marioAudio.playBlockHit();
    addCoins(1);
    setHitCount((prev) => prev + 1);

    const newId = Date.now();
    setPopups((prev) => [...prev, { id: newId }]);

    if (onHit) onHit();
    if (secretInfo) setShowSecret(true);

    setTimeout(() => {
      setIsBouncing(false);
    }, 200);

    setTimeout(() => {
      setPopups((prev) => prev.filter((p) => p.id !== newId));
    }, 900);
  };

  if (!marioMode) {
    return (
      <div className="glass p-3 text-xs font-mono text-quantum-blue">
        {label || 'Interactive Secret'}
      </div>
    );
  }

  return (
    <div className="relative inline-block select-none my-2">
      {/* Floating score / coin popups */}
      <AnimatePresence>
        {popups.map((popup) => (
          <motion.div
            key={popup.id}
            initial={{ opacity: 1, y: 0, scale: 0.8 }}
            animate={{ opacity: 0, y: -50, scale: 1.2 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
            className="absolute -top-10 left-1/2 -translate-x-1/2 font-arcade text-yellow-300 text-xs font-bold pointer-events-none z-30 drop-shadow-[0_2px_2px_rgba(0,0,0,1)] flex items-center gap-1 whitespace-nowrap"
          >
            🪙 +100
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Block Container */}
      <motion.button
        type="button"
        onClick={handleHit}
        animate={{ y: isBouncing ? -12 : 0 }}
        transition={{ type: 'spring', stiffness: 500, damping: 15 }}
        className={`relative w-12 h-12 md:w-14 md:h-14 flex flex-col items-center justify-center cursor-pointer mario-question transition-all rounded-sm ${
          hitCount > 5 ? 'opacity-90 bg-amber-800 border-amber-950' : ''
        }`}
      >
        <span className="font-arcade text-lg md:text-xl text-black font-extrabold drop-shadow-[1px_1px_0px_#FFF]">
          {hitCount > 5 ? 'M' : '?'}
        </span>
        {label && (
          <span className="absolute -bottom-5 text-[8px] font-arcade text-yellow-300 whitespace-nowrap drop-shadow-[1px_1px_0px_#000]">
            {label}
          </span>
        )}
      </motion.button>

      {/* Secret Information Modal / Tooltip */}
      <AnimatePresence>
        {showSecret && secretInfo && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            className="absolute top-16 left-1/2 -translate-x-1/2 z-50 w-64 p-3 bg-black/95 border-4 border-[#F8B800] rounded text-white text-xs font-arcade shadow-2xl"
          >
            <div className="flex justify-between items-center mb-1 border-b border-yellow-500/40 pb-1">
              <span className="text-[#00F000]">SUPER BONUS!</span>
              <button 
                onClick={() => setShowSecret(false)}
                className="text-red-400 hover:text-white px-1"
              >
                ✕
              </button>
            </div>
            <p className="text-gray-200 text-[10px] leading-relaxed mt-1">{secretInfo}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
