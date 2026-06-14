import React, { useState, useEffect } from 'react';
import { useGame } from '../../context/GameContext';

export const PatternMatcher: React.FC = () => {
  const { setUnlockedLevel } = useGame();
  const [targetCode, setTargetCode] = useState('');
  const [input, setInput] = useState('');

  useEffect(() => {
    // Generate a random 4-letter hex code
    setTargetCode(Math.floor(Math.random() * 65535).toString(16).toUpperCase().padStart(4, '0'));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.toUpperCase();
    if (val.length <= 4) {
      setInput(val);
      if (val === targetCode) {
        setTimeout(() => setUnlockedLevel(4), 500);
      }
    }
  };

  return (
    <div className="flex flex-col items-center">
      <p className="font-mono text-xs text-white/70 mb-2">
        SYNC FREQUENCY REQUIRED:
      </p>
      <div className="text-3xl font-bold tracking-widest text-evox-purple mb-6 font-mono">
        {targetCode}
      </div>
      
      <input 
        type="text" 
        value={input}
        onChange={handleChange}
        placeholder="ENTER SYNC CODE"
        className="bg-black/50 border border-quantum-blue text-white font-mono text-center p-3 w-full max-w-xs focus:outline-none focus:border-white transition-colors uppercase"
        maxLength={4}
      />
      
      {input.length === 4 && input !== targetCode && (
        <div className="mt-4 font-mono text-xs text-red-500 animate-pulse">
          SYNC FAILED. RETRY.
        </div>
      )}
      {input === targetCode && (
        <div className="mt-4 font-mono text-xs text-quantum-blue">
          SYNC ESTABLISHED.
        </div>
      )}
    </div>
  );
};
