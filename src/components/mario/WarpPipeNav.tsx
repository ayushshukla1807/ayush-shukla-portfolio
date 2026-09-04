import React from 'react';
import { useGame } from '../../context/GameContext';
import { marioAudio } from '../../utils/marioAudio';

interface PipeTarget {
  world: string;
  name: string;
  elementId: string;
}

const PIPES: PipeTarget[] = [
  { world: 'WORLD 1-1', name: 'OVERWORLD', elementId: 'hero-scene' },
  { world: 'WORLD 1-2', name: 'UNDERGROUND', elementId: 'timeline-scene' },
  { world: 'WORLD 1-3', name: 'ATHLETIC', elementId: 'projects-scene' },
  { world: 'WORLD 1-4', name: 'FORTRESS', elementId: 'future-scene' },
];

export const WarpPipeNav: React.FC = () => {
  const { marioMode, setActiveWorld } = useGame();

  const handlePipeWarp = (pipe: PipeTarget) => {
    marioAudio.playPipe();
    setActiveWorld(pipe.world);
    const targetEl = document.getElementById(pipe.elementId);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!marioMode) return null;

  return (
    <div className="w-full py-6 flex flex-wrap justify-center items-end gap-4 md:gap-8 my-8 select-none">
      {PIPES.map((pipe) => (
        <button
          key={pipe.world}
          onClick={() => handlePipeWarp(pipe)}
          className="group relative flex flex-col items-center cursor-pointer transition-transform hover:-translate-y-2 active:translate-y-1"
        >
          {/* Pipe Lip Top */}
          <div className="w-24 h-6 bg-gradient-to-r from-[#00A800] via-[#00F000] to-[#00A800] border-4 border-black rounded-t shadow-[inset_-4px_0_0_rgba(0,0,0,0.3)] flex items-center justify-center">
            <span className="text-[8px] font-arcade text-black font-bold group-hover:animate-pulse">
              WARP
            </span>
          </div>

          {/* Pipe Main Body */}
          <div className="w-20 h-14 bg-gradient-to-r from-[#008800] via-[#00D000] to-[#008800] border-x-4 border-b-4 border-black flex flex-col items-center justify-center gap-1 shadow-[inset_-4px_0_0_rgba(0,0,0,0.3)]">
            <span className="text-[9px] font-arcade text-yellow-300 font-bold">
              {pipe.world}
            </span>
            <span className="text-[7px] font-arcade text-white">
              {pipe.name}
            </span>
          </div>
        </button>
      ))}
    </div>
  );
};
