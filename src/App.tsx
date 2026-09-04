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

import { MarioHUD } from './components/mario/MarioHUD';
import { MarioRunnerOverlay } from './components/mario/MarioRunnerOverlay';

const FastTrackButton = () => {
  const { fastTrack, setFastTrack, setUnlockedLevel, marioMode } = useGame();
  
  if (fastTrack) return null;

  return (
    <button 
      onClick={() => {
        setFastTrack(true);
        setUnlockedLevel(4);
      }}
      className={`fixed top-14 right-4 md:right-8 z-40 px-3 py-1.5 text-xs transition-colors ${
        marioMode 
          ? 'font-arcade bg-[#F8B800] text-black border-2 border-black shadow-[2px_2px_0px_#000] hover:bg-yellow-300' 
          : 'glass font-mono text-white hover:text-quantum-blue border-evox-purple/30'
      }`}
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
          <main className="relative bg-deep-space selection:bg-yellow-400 selection:text-black min-h-screen pt-12">
            {/* Top Super Mario HUD */}
            <MarioHUD />

            <SocialDock />
            <FastTrackButton />

            {/* Stages / Worlds */}
            <HeroScene />
            <TimelineScene />
            <ProjectMatrix />
            <FutureScene />

            <InteractiveTerminal />

            {/* Bottom Mario Auto-Runner Overlay */}
            <MarioRunnerOverlay />
          </main>
        </LenisProvider>
      </SceneProvider>
    </GameProvider>
  );
};

export default App;
