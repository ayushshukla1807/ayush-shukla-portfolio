import React from 'react';
import { SceneProvider } from './context/SceneContext';
import { LenisProvider } from './components/common/LenisProvider';

const App: React.FC = () => {
  return (
    <SceneProvider>
      <LenisProvider>
        <div style={{ 
          backgroundColor: '#0a0a0a', 
          color: '#00F2FF', 
          minHeight: '100vh', 
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'center', 
          justifyContent: 'center',
          fontFamily: 'monospace'
        }}>
          <h1 style={{ fontSize: '3rem', margin: '0' }}>SYSTEM_READY</h1>
          <p style={{ opacity: 0.5, marginTop: '1rem' }}>AYUSH_SHUKLA.SYS_V2.1_RESURRECTION</p>
          
          <div style={{ marginTop: '2rem', border: '1px solid #00F2FF', padding: '1rem' }}>
            <p>[OK] REACT_KERNEL_LOADED</p>
            <p>[OK] VITE_ENVIRONMENT_VERIFIED</p>
            <p>[OK] GITHUB_PAGES_DIST_ACTIVE</p>
            <p>[WAIT] INFRASTRUCTURE_READY (LENIS + CONTEXT)</p>
          </div>

          <div style={{ position: 'fixed', bottom: '10px', left: '10px', color: '#7000FF', fontSize: '10px' }}>
            STATUS: RESURRECTING_STEP_1
          </div>
        </div>
      </LenisProvider>
    </SceneProvider>
  );
};

export default App;
