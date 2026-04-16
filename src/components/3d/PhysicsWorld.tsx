import React from 'react';
import { Physics } from '@react-three/cannon';
import { useScene } from '@/context/SceneContext';

export const PhysicsWorld: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isPhysicsEnabled } = useScene();

  return (
    <Physics
      gravity={[0, isPhysicsEnabled ? -9.81 : 0, 0]}
      iterations={10}
      tolerance={1e-3}
      allowSleep={false}
    >
      {children}
    </Physics>
  );
};
