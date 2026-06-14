import React from 'react';
import { useGame } from '../../context/GameContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock } from 'lucide-react';

interface SceneLockProps {
  level: number;
  title: string;
  children: React.ReactNode;
  minigame: React.ReactNode;
}

export const SceneLock: React.FC<SceneLockProps> = ({ level, title, children, minigame }) => {
  const { unlockedLevel, fastTrack } = useGame();
  const isLocked = unlockedLevel < level && !fastTrack;

  return (
    <div className="relative w-full h-full">
      {/* Content, blurred if locked */}
      <div className={isLocked ? "filter blur-md pointer-events-none opacity-50 transition-all duration-1000" : "transition-all duration-1000"}>
        {children}
      </div>

      {/* Lock Overlay */}
      <AnimatePresence>
        {isLocked && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 flex items-center justify-center bg-deep-space/80 backdrop-blur-sm"
          >
            <div className="glass p-8 max-w-lg w-full flex flex-col items-center border-evox-purple/50">
              <Lock className="text-evox-purple mb-4" size={48} />
              <h2 className="text-2xl font-bold text-white mb-2 text-center uppercase tracking-widest">
                {title} [LOCKED]
              </h2>
              <p className="text-quantum-blue font-mono text-xs text-center mb-6">
                SYSTEM SECURITY TRIGGERED. COMPLETE CHALLENGE TO PROCEED.
              </p>
              
              <div className="w-full bg-black/50 p-4 rounded border border-white/10">
                {minigame}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
