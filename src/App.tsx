import React from 'react';

const App: React.FC = () => {
  return (
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
      <p style={{ opacity: 0.5, marginTop: '1rem' }}>AYUSH_SHUKLA.SYS_V2.0</p>
      
      <div style={{ marginTop: '2rem', border: '1px solid #00F2FF', padding: '1rem' }}>
        <p>[OK] REACT_KERNEL_LOADED</p>
        <p>[OK] VITE_ENVIRONMENT_VERIFIED</p>
        <p>[OK] GITHUB_PAGES_DIST_ACTIVE</p>
      </div>

      <div style={{ position: 'fixed', top: '10px', right: '10px', color: 'red' }}>
        DEBUG_MODE: NUCLEAR_BASELINE
      </div>
    </div>
  );
};

export default App;
