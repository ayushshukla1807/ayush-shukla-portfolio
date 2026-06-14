import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface TechNodesProps {
  count?: number;
  color?: string;
  radius?: number;
}

export const TechGeometries: React.FC<TechNodesProps> = ({ count = 8, color = '#00F2FF', radius = 10 }) => {
  const groupRef = useRef<THREE.Group>(null);
  
  // Generate random positions, rotations, and scales for the geometries
  const nodes = useMemo(() => {
    return Array.from({ length: count }).map(() => ({
      position: [
        (Math.random() - 0.5) * radius * 2,
        (Math.random() - 0.5) * radius * 2,
        (Math.random() - 0.5) * radius * 2
      ] as [number, number, number],
      rotation: [
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      ] as [number, number, number],
      scale: Math.random() * 0.5 + 0.2,
      type: Math.floor(Math.random() * 3) // 0: Icosahedron, 1: Torus, 2: Box
    }));
  }, [count, radius]);

  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.elapsedTime;
      groupRef.current.rotation.y = time * 0.05;
      groupRef.current.rotation.x = time * 0.02;
      
      // Gentle floating animation
      groupRef.current.children.forEach((child, i) => {
        child.rotation.x += 0.01 * (i % 2 === 0 ? 1 : -1);
        child.rotation.y += 0.01 * (i % 3 === 0 ? 1 : -1);
      });
    }
  });

  return (
    <group ref={groupRef}>
      {nodes.map((node, i) => (
        <mesh 
          key={i} 
          position={node.position} 
          rotation={node.rotation} 
          scale={node.scale}
        >
          {node.type === 0 && <icosahedronGeometry args={[1, 0]} />}
          {node.type === 1 && <torusGeometry args={[1, 0.2, 16, 100]} />}
          {node.type === 2 && <boxGeometry args={[1, 1, 1]} />}
          
          <meshStandardMaterial 
            color={color} 
            wireframe={true} 
            transparent 
            opacity={0.3} 
            emissive={color}
            emissiveIntensity={0.5}
          />
        </mesh>
      ))}
    </group>
  );
};
