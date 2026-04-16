import React from 'react';
import { SceneProvider } from './context/SceneContext';
import { LenisProvider } from './components/common/LenisProvider';
import { InteractiveTerminal } from './components/layout/InteractiveTerminal';

import { HeroScene } from './components/scenes/HeroScene';
import { TimelineScene } from './components/scenes/TimelineScene';
import { ProjectMatrix } from './components/scenes/ProjectMatrix';
import { FutureScene } from './components/scenes/FutureScene';

const App: React.FC = () => {
  React.useEffect(() => {
    console.log("[React] App Component Mounting Successfully");
    console.log("[Environment] Base:", import.meta.env.BASE_URL);
  }, []);

  return (
    <SceneProvider>
      <div id="react-fallback" style={{ position: 'fixed', top: '50px', left: '10px', zIndex: 9998, color: '#00F2FF', background: 'rgba(0,0,0,0.8)', padding: '5px', fontSize: '10px' }}>
        [REACT_EXECUTING]
      </div>
      <LenisProvider>
        <main className="relative bg-deep-space">
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

          <HeroScene />
          <TimelineScene />
          <ProjectMatrix />
          <FutureScene />

          <InteractiveTerminal />
        </main>
      </LenisProvider>
    </SceneProvider>
  );
};

export default App;
