import React, { useRef } from 'react';
import { SceneProvider } from './context/SceneContext';
import { LenisProvider } from './components/common/LenisProvider';
import { QuantumCanvas } from './components/layout/QuantumCanvas';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';

const TestCube = () => {
  const meshRef = useRef<Mesh>(null);
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta;
      meshRef.current.rotation.y += delta;
    }
  });
  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color="#00F2FF" wireframe />
    </mesh>
  );
};

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
          fontFamily: 'monospace',
          position: 'relative'
        }}>
          {/* Canvas Probe */}
          <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
            <QuantumCanvas camera={{ position: [0, 0, 5], fov: 45 }}>
              <TestCube />
            </QuantumCanvas>
          </div>

          {/* HUD Overlay */}
          <div style={{ zIndex: 10, textAlign: 'center', pointerEvents: 'none' }}>
            <h1 style={{ fontSize: '3rem', margin: '0' }}>SYSTEM_READY</h1>
            <p style={{ opacity: 0.5, marginTop: '1rem' }}>AYUSH_SHUKLA.SYS_V2.2_CANVAS_PROBE</p>
            
            <div style={{ marginTop: '2rem', border: '1px solid #00F2FF', padding: '1rem', background: 'rgba(10,10,10,0.8)' }}>
              <p>[OK] REACT_KERNEL_LOADED</p>
              <p>[OK] INFRASTRUCTURE_READY (LENIS + CONTEXT)</p>
              <p>[WAIT] PIPELINE_PROBE (THREE_JS_CANVAS)</p>
            </div>

            <div style={{ position: 'fixed', bottom: '10px', right: '10px', color: '#ff00ff', fontSize: '10px' }}>
              STATUS: RESURRECTING_STEP_2_PROBE
            </div>
          </div>
        </div>
      </LenisProvider>
    </SceneProvider>
  );
};

export default App;
