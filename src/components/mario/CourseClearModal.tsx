import React, { useState } from 'react';
import { useGame } from '../../context/GameContext';
import { marioAudio } from '../../utils/marioAudio';
import { motion } from 'framer-motion';
import { Trophy, RotateCcw } from 'lucide-react';

export const CourseClearModal: React.FC = () => {
  const { marioMode, coins, score } = useGame();
  const [cleared, setCleared] = useState(false);

  const handleFlagpoleHit = () => {
    setCleared(true);
    marioAudio.playCourseClear();
  };

  if (!marioMode) return null;

  return (
    <div className="w-full py-16 flex flex-col items-center justify-center relative select-none">
      {/* Mario Flagpole Target */}
      <div className="flex flex-col items-center gap-0">
        {/* Flag Ball Top */}
        <div 
          onClick={handleFlagpoleHit}
          className="w-10 h-10 rounded-full bg-yellow-400 border-4 border-black cursor-pointer hover:scale-110 transition-transform shadow-[0_0_15px_rgba(250,204,21,0.8)] flex items-center justify-center animate-bounce"
        >
          <span className="text-xs font-arcade text-black font-bold">★</span>
        </div>

        {/* Flagpole Stick */}
        <div className="w-3 h-48 bg-gradient-to-b from-green-500 via-emerald-600 to-green-800 border-x-2 border-black relative flex items-center justify-center">
          {/* Animated Flag Banner */}
          <motion.div 
            className="absolute top-2 left-3 bg-[#E52521] border-2 border-black px-3 py-1 font-arcade text-white text-[10px] shadow-[2px_2px_0_#000] flex items-center gap-1"
            animate={{ y: cleared ? 120 : 0 }}
            transition={{ type: 'spring', stiffness: 100 }}
          >
            AYUSH 🚩
          </motion.div>
        </div>

        {/* Castle / Brick Base */}
        <div className="w-24 h-10 bg-[#C84C0C] border-4 border-black flex items-center justify-center">
          <span className="text-[8px] font-arcade text-white">STAGE FINISH</span>
        </div>
      </div>

      {/* Course Clear Victory Banner */}
      {cleared && (
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="mt-8 bg-black/95 border-4 border-[#F8B800] p-6 rounded-lg max-w-md w-full text-center font-arcade shadow-2xl space-y-4"
        >
          <div className="flex justify-center text-yellow-400">
            <Trophy className="w-12 h-12 animate-pulse" />
          </div>

          <h2 className="text-xl md:text-2xl text-[#00F000] tracking-wider drop-shadow-[2px_2px_0_#000]">
            COURSE CLEAR!
          </h2>

          <p className="text-xs text-white leading-relaxed">
            THANK YOU FOR VISITING AYUSH SHUKLA'S PORTFOLIO STAGE!
          </p>

          <div className="bg-[#111] border-2 border-yellow-500/50 p-3 rounded text-left space-y-2 text-xs">
            <div className="flex justify-between text-yellow-300">
              <span>FINAL SCORE:</span>
              <span>{score} PTS</span>
            </div>
            <div className="flex justify-between text-yellow-300">
              <span>COINS COLLECTED:</span>
              <span>🪙 x {coins}</span>
            </div>
            <div className="flex justify-between text-green-400">
              <span>STATUS:</span>
              <span>AVAILABLE FOR INTERNSHIPS</span>
            </div>
          </div>

          <button
            onClick={() => setCleared(false)}
            className="flex items-center justify-center gap-2 w-full py-2 bg-[#E52521] hover:bg-[#c41e1b] border-2 border-black text-white text-xs font-arcade transition-all active:translate-y-0.5"
          >
            <RotateCcw className="w-4 h-4" />
            <span>PLAY STAGE AGAIN</span>
          </button>
        </motion.div>
      )}
    </div>
  );
};
