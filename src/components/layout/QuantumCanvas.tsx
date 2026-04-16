import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Preload, AdaptiveDpr, AdaptiveEvents } from '@react-three/drei';

interface QuantumCanvasProps {
  children: React.ReactNode;
  shadows?: boolean;
  camera?: any;
}

const CanvasErrorFallback = () => (
  <mesh>
    <boxGeometry args={[1, 1, 1]} />
    <meshNormalMaterial />
  </mesh>
);

export const QuantumCanvas: React.FC<QuantumCanvasProps> = ({ 
  children, 
  shadows = false, 
  camera = { position: [0, 5, 10], fov: 45 } 
}) => {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none">
      <Canvas
        shadows={shadows}
        camera={camera}
        dpr={[1, 2]}
        gl={{ 
          antialias: true,
          alpha: true,
          powerPreference: "high-performance"
        }}
        className="pointer-events-auto"
      >
        <Suspense fallback={<CanvasErrorFallback />}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow={shadows} />
          
          {children}
          
          <Preload all />
          <AdaptiveDpr pixelated />
          <AdaptiveEvents />
        </Suspense>
      </Canvas>
    </div>
  );
};
