import React, { useState } from 'react';
import { useGame } from '../../context/GameContext';

export const TerminalHack: React.FC = () => {
  const { setUnlockedLevel } = useGame();
  const [sequence, setSequence] = useState<number[]>([]);
  const targetSequence = [1, 3, 2, 4]; // The required sequence

  const handlePress = (num: number) => {
    const newSeq = [...sequence, num];
    if (newSeq.length <= 4) {
      setSequence(newSeq);
      
      if (newSeq.length === 4) {
        if (newSeq.join(',') === targetSequence.join(',')) {
          setTimeout(() => setUnlockedLevel(2), 500);
        } else {
          setTimeout(() => setSequence([]), 500);
        }
      }
    }
  };

  return (
    <div className="flex flex-col items-center">
      <p className="font-mono text-sm text-white mb-4">
        INPUT OVERRIDE SEQUENCE: [1] [3] [2] [4]
      </p>
      <div className="grid grid-cols-2 gap-2 w-full">
        {[1, 2, 3, 4].map(num => (
          <button
            key={num}
            onClick={() => handlePress(num)}
            className={`p-4 font-mono text-xl transition-colors ${
              sequence.includes(num) 
                ? 'bg-quantum-blue text-black' 
                : 'bg-white/5 text-quantum-blue hover:bg-white/10'
            } border border-quantum-blue/30`}
          >
            {num}
          </button>
        ))}
      </div>
      <div className="mt-4 h-4 font-mono text-xs text-evox-purple">
        {sequence.length === 4 && sequence.join(',') !== targetSequence.join(',') && "SEQUENCE INCORRECT. RESETTING..."}
        {sequence.length === 4 && sequence.join(',') === targetSequence.join(',') && "ACCESS GRANTED."}
      </div>
    </div>
  );
};
