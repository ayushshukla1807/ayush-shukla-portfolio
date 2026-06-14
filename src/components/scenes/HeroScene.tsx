import React from 'react';
import { QuantumCanvas } from '../layout/QuantumCanvas';
import { NSTIsland } from '../3d/NSTIsland';
import { QuantumParticle } from '../3d/QuantumParticle';
import { Stars } from '@react-three/drei';
import { useScene } from '@/context/SceneContext';
import { motion } from 'framer-motion';
import { Typewriter } from '../common/Typewriter';
import { TechGeometries } from '../3d/TechGeometries';

export const HeroScene: React.FC = () => {
  const { scrollProgress } = useScene();

  // Scroll-based camera zoom/tilt for the "Camera Dive"
  const cameraPosition: [number, number, number] = [
    0, 
    5 - scrollProgress * 10, // Dive down
    10 - scrollProgress * 10 // Dive in
  ];

  return (
    <section className="relative h-[200vh] w-full bg-deep-space overflow-hidden">
      <div className="sticky top-0 h-screen w-full">
        <QuantumCanvas camera={{ position: cameraPosition, fov: 45 }}>
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
          
          <NSTIsland />
          <QuantumParticle />
          <TechGeometries count={8} color="#00F2FF" radius={15} />

          {/* Environmental Glow */}
          <color attach="background" args={['#050505']} />
          <fog attach="fog" args={['#050505', 10, 25]} />
        </QuantumCanvas>

        {/* Overlay Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1 - scrollProgress * 2, y: 0 }}
            transition={{ duration: 1 }}
            className="text-center"
          >
            <h1 className="text-6xl md:text-8xl font-bold text-white mb-4 tracking-tighter">
              AYUSH <span className="text-gradient">SHUKLA</span>
            </h1>
            <div className="text-quantum-blue font-mono text-sm md:text-lg tracking-widest uppercase mt-4 h-8 flex items-center justify-center">
              <Typewriter 
                words={[
                  "AI/ML Intern",
                  "Full Stack Developer Intern",
                  "GenAI / LLM Engineer Intern",
                  "Backend / SDE Intern",
                  "Frontend Developer Intern",
                  "Data Analyst Intern",
                  "Product Management Intern"
                ]} 
              />
            </div>
            <p className="text-white/50 font-mono text-xs md:text-sm tracking-widest mt-4">
              SEEKING 6-MONTH SUMMER INTERNSHIP
            </p>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-32 left-1/2 -translate-x-1/2 text-white/30 text-xs font-mono"
        >
          SCROLL_TO_INITIATE_DIVE
        </motion.div>
      </div>
    </section>
  );
};
