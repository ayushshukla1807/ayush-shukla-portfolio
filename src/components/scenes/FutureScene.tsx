import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { QuantumCanvas } from '../layout/QuantumCanvas';
import { Float, Text, Center } from '@react-three/drei';

const ParticleField = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 2000;

  const [positions] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3 + 0] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return [pos];
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      const time = state.clock.elapsedTime;
      pointsRef.current.rotation.y = time * 0.05;
      pointsRef.current.rotation.x = time * 0.02;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#00F2FF"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
};

export const FutureScene: React.FC = () => {
  return (
    <section className="relative h-screen w-full bg-deep-space overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 z-0">
        <QuantumCanvas camera={{ position: [0, 0, 10], fov: 45 }}>
          <ParticleField />
          <color attach="background" args={['#050505']} />
        </QuantumCanvas>
      </div>

      <div className="relative z-10 text-center">
        <Float speed={5} rotationIntensity={0.5} floatIntensity={1}>
          <div className="glass p-12 max-w-2xl border-quantum-blue/20">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 uppercase tracking-widest italic">
              THE.FUTURE
            </h2>
            <p className="text-quantum-blue font-mono text-sm md:text-base leading-relaxed mb-8">
              Focusing on the convergence of <span className="text-white">AWS Cloud infrastructure</span> and <span className="text-evox-purple">Quantum Computing</span>. Building scalable, intelligent systems for the next era of tech.
            </p>
            <div className="flex gap-4 justify-center">
              <button className="btn-quantum">VIEW_RESEARCH</button>
              <button className="btn-quantum border-evox-purple text-evox-purple">CONNECT_SECURELY</button>
            </div>
          </div>
        </Float>
      </div>

      {/* Footer minimal info */}
      <div className="absolute bottom-8 left-8 text-[10px] font-mono text-white/20">
        © 2026 AYUSH_SHUKLA.ALL_RIGHTS_RESERVED // BUILT_ON_QUANTUM_STACK
      </div>
    </section>
  );
};
