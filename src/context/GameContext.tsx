import React, { createContext, useContext, useState, useEffect } from 'react';
import { marioAudio } from '../utils/marioAudio';

interface GameContextType {
  unlockedLevel: number;
  setUnlockedLevel: (level: number) => void;
  fastTrack: boolean;
  setFastTrack: (enabled: boolean) => void;
  coins: number;
  score: number;
  addCoins: (amount?: number) => void;
  marioMode: boolean;
  setMarioMode: (enabled: boolean) => void;
  toggleMarioMode: () => void;
  soundMuted: boolean;
  toggleSound: () => void;
  activeWorld: string;
  setActiveWorld: (world: string) => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [unlockedLevel, setUnlockedLevel] = useState(1);
  const [fastTrack, setFastTrack] = useState(false);
  const [coins, setCoins] = useState(0);
  const [score, setScore] = useState(0);
  const [marioMode, setMarioMode] = useState(true);
  const [soundMuted, setSoundMuted] = useState(false);
  const [activeWorld, setActiveWorld] = useState('WORLD 1-1');

  useEffect(() => {
    marioAudio.setMuted(soundMuted);
  }, [soundMuted]);

  const addCoins = (amount = 1) => {
    setCoins((prev) => prev + amount);
    setScore((prev) => prev + amount * 100);
    marioAudio.playCoin();
  };

  const toggleMarioMode = () => {
    setMarioMode((prev) => !prev);
  };

  const toggleSound = () => {
    setSoundMuted((prev) => {
      const next = !prev;
      marioAudio.setMuted(next);
      return next;
    });
  };

  return (
    <GameContext.Provider
      value={{
        unlockedLevel,
        setUnlockedLevel,
        fastTrack,
        setFastTrack,
        coins,
        score,
        addCoins,
        marioMode,
        setMarioMode,
        toggleMarioMode,
        soundMuted,
        toggleSound,
        activeWorld,
        setActiveWorld,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
