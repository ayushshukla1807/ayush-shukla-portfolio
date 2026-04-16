import React from 'react';
import { useBox } from '@react-three/cannon';
import { QuantumCanvas } from '../layout/QuantumCanvas';
import { PhysicsWorld } from '../3d/PhysicsWorld';
import { GlitchShader } from '../effects/GlitchShader';
import { useScene } from '@/context/SceneContext';
import { motion, AnimatePresence } from 'framer-motion';

const projects = [
  { id: 'evox', title: 'EvoX Ventures', tags: ['Founder', 'Venture Capital'], color: '#7000FF' },
  { id: 'nirmaan', title: 'NIRMAAN Hackathon', tags: ['Organizer', '1.5k+ Participants'], color: '#00F2FF' },
  { id: 'openveda', title: 'OpenVeda', tags: ['Open Source', 'Contributor'], color: '#ffffff' },
  { id: 'wiki', title: 'Wikimedia AI', tags: ['AI', 'Linking'], color: '#00F2FF' },
];

const PhysicalCard = ({ project, position }: { project: any, position: [number, number, number] }) => {
  const [ref, api] = useBox(() => ({ mass: 1, position, args: [3, 2, 0.5] }));
  const { isPhysicsEnabled } = useScene();

  return (
    <mesh ref={ref as any}>
      <boxGeometry args={[3, 2, 0.2]} />
      <meshStandardMaterial color={project.color} metalness={0.5} roughness={0.2} transparent opacity={0.8} />
      {project.id === 'evox' && <GlitchShader />}
      
      {/* Content overlay in 3D (simplified) */}
      <group position={[0, 0, 0.11]}>
        {/* We can't easily put HTML here, so we use a texture or just the color + glitch */}
      </group>
    </mesh>
  );
};

export const ProjectMatrix: React.FC = () => {
  const { isPhysicsEnabled } = useScene();

  return (
    <section className="relative min-h-screen bg-deep-space flex flex-col items-center justify-center p-10 overflow-hidden">
      <div className="z-10 mb-12 text-center">
        <h2 className="text-5xl font-bold text-white mb-4 italic">PROJECTS.MATRIX</h2>
        <div className="flex gap-2 justify-center">
          <span className="btn-quantum text-[10px] py-1">SCALABLE</span>
          <span className="btn-quantum text-[10px] py-1 border-evox-purple text-evox-purple">DISRUPTIVE</span>
        </div>
      </div>

      <div className="w-full max-w-6xl h-[60vh] relative">
        {/* 2D Grid Representation (Visible when physics is off) */}
        <AnimatePresence>
          {!isPhysicsEnabled && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full"
            >
              {projects.map((p) => (
                <div 
                  key={p.id}
                  className="glass p-6 h-64 flex flex-col justify-between group hover:border-quantum-blue transition-colors cursor-pointer"
                >
                  <div>
                    <span className="text-xs font-mono text-white/40 mb-2 block">{p.tags.join(' / ')}</span>
                    <h3 className="text-2xl font-bold text-white group-hover:text-quantum-blue transition-colors">{p.title}</h3>
                  </div>
                  <div className="flex justify-end">
                    <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-quantum-blue transition-all">
                      <span className="text-white group-hover:text-deep-space">→</span>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* 3D Physics World (Visible when physics is on) */}
        {isPhysicsEnabled && (
          <div className="absolute inset-0 z-20">
            <QuantumCanvas camera={{ position: [0, 0, 15], fov: 45 }}>
              <PhysicsWorld>
                {projects.map((p, i) => (
                  <PhysicalCard 
                    key={p.id} 
                    project={p} 
                    position={[(i - 1.5) * 4, 5, 0]} 
                  />
                ))}
                
                {/* Floor */}
                <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -5, 0]}>
                  <planeGeometry args={[100, 100]} />
                  <meshStandardMaterial transparent opacity={0} />
                </mesh>
              </PhysicsWorld>
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} />
            </QuantumCanvas>
          </div>
        )}
      </div>

      {isPhysicsEnabled && (
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 font-mono text-xs text-quantum-blue">
          SYSTEM_STATE: EXPERIMENTAL_PHYSICS_ACTIVE
        </div>
      )}
    </section>
  );
};
