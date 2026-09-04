import React, { useState, useEffect } from 'react';
import { useGame } from '../../context/GameContext';
import { Volume2, VolumeX, Gamepad2, Briefcase } from 'lucide-react';

export const MarioHUD: React.FC = () => {
  const { coins, score, marioMode, toggleMarioMode, soundMuted, toggleSound, activeWorld } = useGame();
  const [timeLeft, setTimeLeft] = useState(300);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 300));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedScore = String(score).padStart(6, '0');
  const formattedCoins = String(coins).padStart(2, '0');
  const formattedTime = String(timeLeft).padStart(3, '0');

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-black/90 border-b-4 border-[#F8B800] px-4 py-2 text-white font-arcade select-none shadow-lg">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs md:text-sm">
        
        {/* Left Side: Score & Coins */}
        <div className="flex items-center gap-4 md:gap-8">
          <div>
            <div className="text-[#E52521] text-[10px] md:text-xs">MARIO</div>
            <div className="tracking-widest font-bold">{formattedScore}</div>
          </div>

          <div className="flex items-center gap-1.5 text-[#F8B800]">
            <span className="text-base animate-bounce">🪙</span>
            <span>x{formattedCoins}</span>
          </div>
        </div>

        {/* Center: World & Time */}
        <div className="hidden sm:flex items-center gap-6">
          <div>
            <div className="text-[#00F000] text-[10px] md:text-xs text-center">WORLD</div>
            <div className="tracking-wider">{activeWorld}</div>
          </div>

          <div>
            <div className="text-[#E52521] text-[10px] md:text-xs text-center">TIME</div>
            <div className="tracking-wider text-[#F8B800]">{formattedTime}</div>
          </div>
        </div>

        {/* Right Side: Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            className="flex items-center gap-1 bg-[#1a1a1a] hover:bg-[#333] border-2 border-white/40 px-2 py-1 rounded text-[10px] transition-colors"
            title="Toggle Sound Effects"
          >
            {soundMuted ? <VolumeX className="w-3.5 h-3.5 text-red-400" /> : <Volume2 className="w-3.5 h-3.5 text-green-400" />}
            <span className="hidden md:inline">{soundMuted ? 'MUTED' : 'SFX'}</span>
          </button>

          {/* Mario / Recruiter Mode Toggle */}
          <button
            onClick={toggleMarioMode}
            className={`flex items-center gap-1.5 px-3 py-1 border-2 border-black font-arcade text-[10px] md:text-xs shadow-[2px_2px_0px_#000] transition-transform active:translate-y-0.5 ${
              marioMode 
                ? 'bg-[#E52521] text-white hover:bg-[#c41e1b]' 
                : 'bg-[#00F000] text-black hover:bg-[#00c800]'
            }`}
          >
            {marioMode ? <Gamepad2 className="w-3.5 h-3.5" /> : <Briefcase className="w-3.5 h-3.5" />}
            <span>{marioMode ? 'MARIO RUN' : 'CLEAN MODE'}</span>
          </button>
        </div>

      </div>
    </header>
  );
};
