import React, { createContext, useContext, useState } from 'react';

interface GameContextType {
  unlockedLevel: number;
  setUnlockedLevel: (level: number) => void;
  fastTrack: boolean;
  setFastTrack: (enabled: boolean) => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [unlockedLevel, setUnlockedLevel] = useState(1);
  const [fastTrack, setFastTrack] = useState(false);

  return (
    <GameContext.Provider
      value={{
        unlockedLevel,
        setUnlockedLevel,
        fastTrack,
        setFastTrack,
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
