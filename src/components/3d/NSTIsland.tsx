import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Float, MeshDistortMaterial } from '@react-three/drei';

export const NSTIsland: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  // Generate procedural terrain
  const terrainGeometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(10, 10, 32, 32);
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      // Simple noise function (Math.sin/cos) for elevation
      const z = Math.sin(x * 0.5) * Math.cos(y * 0.5) * 0.5;
      pos.setZ(i, z);
    }
    geo.computeVertexNormals();
    return geo;
  }, []);

  return (
    <group position={[0, -1, 0]}>
      {/* Base Island */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} geometry={terrainGeometry}>
        <meshStandardMaterial 
          color="#1a1a1a" 
          roughness={0.8} 
          metalness={0.2}
          wireframe={false}
        />
      </mesh>

      {/* Dynamic Wireframe overlay for "Quantum" look */}
      <mesh rotation={[-Math.PI / 2, 0, 0.01]} geometry={terrainGeometry}>
        <meshBasicMaterial 
          color="#00F2FF" 
          wireframe 
          transparent 
          opacity={0.1}
        />
      </mesh>

      {/* Floating Monoliths (The Campus) */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <mesh position={[-2, 1, -2]}>
          <boxGeometry args={[1, 3, 1]} />
          <MeshDistortMaterial 
            color="#7000FF" 
            speed={2} 
            distort={0.3} 
            roughness={0.1}
            metalness={0.8}
          />
        </mesh>
      </Float>

      <Float speed={1.5} rotationIntensity={1} floatIntensity={0.5}>
        <mesh position={[2, 2, -3]}>
          <boxGeometry args={[0.5, 4, 0.5]} />
          <meshStandardMaterial color="#00F2FF" emissive="#00F2FF" emissiveIntensity={0.5} />
        </mesh>
      </Float>

      <Float speed={3} rotationIntensity={0.2} floatIntensity={2}>
        <mesh position={[0, 0.5, 2]}>
          <octahedronGeometry args={[1]} />
          <meshStandardMaterial color="#ffffff" metalness={1} roughness={0} />
        </mesh>
      </Float>
    </group>
  );
};
