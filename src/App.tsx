import React from 'react';
import { SceneProvider } from './context/SceneContext';
import { GameProvider, useGame } from './context/GameContext';
import { LenisProvider } from './components/common/LenisProvider';
import { InteractiveTerminal } from './components/layout/InteractiveTerminal';
import { SocialDock } from './components/layout/SocialDock';

import { HeroScene } from './components/scenes/HeroScene';
import { TimelineScene } from './components/scenes/TimelineScene';
import { ProjectMatrix } from './components/scenes/ProjectMatrix';
import { FutureScene } from './components/scenes/FutureScene';

const FastTrackButton = () => {
  const { fastTrack, setFastTrack, setUnlockedLevel } = useGame();
  
  if (fastTrack) return null;

  return (
    <button 
      onClick={() => {
        setFastTrack(true);
        setUnlockedLevel(4);
      }}
      className="fixed top-8 right-8 z-50 glass px-4 py-2 text-xs font-mono text-white hover:text-quantum-blue border-evox-purple/30 hover:border-quantum-blue/50 transition-colors"
    >
      RECRUITER_FAST_TRACK
    </button>
  );
};

const App: React.FC = () => {
  return (
    <GameProvider>
      <SceneProvider>
      <LenisProvider>
        <main className="relative bg-deep-space selection:bg-quantum-blue/30 selection:text-quantum-blue">
          {/* Header Progress Overlay */}
          <div className="fixed top-0 left-0 w-full h-1 z-40 bg-white/5">
            <div className="h-full bg-quantum-blue transition-all duration-300 pointer-events-none" />
          </div>

          <div className="fixed top-8 left-8 z-40 space-x-4 flex">
            <div className="glass px-4 py-2 text-xs font-mono text-white/50 border-quantum-blue/30">
              AYUSH_SHUKLA.SYS
            </div>
            <div className="glass px-4 py-2 text-xs font-mono text-quantum-blue border-evox-purple/30">
              EST.2024
            </div>
          </div>
          
          <SocialDock />
          <FastTrackButton />

          <HeroScene />
          <TimelineScene />
          <ProjectMatrix />
          <FutureScene />

          <InteractiveTerminal />
        </main>
      </LenisProvider>
    </SceneProvider>
    </GameProvider>
  );
};

export default App;
