import React, { createContext, useContext, useState, useEffect } from 'react';

interface SceneContextType {
  activeScene: number;
  setActiveScene: (scene: number) => void;
  scrollProgress: number;
  setScrollProgress: (progress: number) => void;
  isPhysicsEnabled: boolean;
  setIsPhysicsEnabled: (enabled: boolean) => void;
}

const SceneContext = createContext<SceneContextType | undefined>(undefined);

export const SceneProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeScene, setActiveScene] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isPhysicsEnabled, setIsPhysicsEnabled] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Update active scene based on progress logic or manual triggers
  useEffect(() => {
    if (!isMounted) return;

    // Safety for NaN or invalid progress
    const safeProgress = isNaN(scrollProgress) ? 0 : Math.min(1, Math.max(0, scrollProgress));
    
    const sceneHeight = 0.25; // 4 scenes
    const currentScene = Math.floor(safeProgress / sceneHeight);
    
    if (currentScene !== activeScene && currentScene >= 0 && currentScene < 4) {
      setActiveScene(currentScene);
      console.log(`[SceneMatrix] Transition to Scene ${currentScene}`);
    }
  }, [scrollProgress, activeScene, isMounted]);

  return (
    <SceneContext.Provider
      value={{
        activeScene,
        setActiveScene,
        scrollProgress,
        setScrollProgress,
        isPhysicsEnabled,
        setIsPhysicsEnabled,
      }}
    >
      {children}
    </SceneContext.Provider>
  );
};

export const useScene = () => {
  const context = useContext(SceneContext);
  if (!context) {
    throw new Error('useScene must be used within a SceneProvider');
  }
  return context;
};
