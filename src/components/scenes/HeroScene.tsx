import React from 'react';
import { QuantumCanvas } from '../layout/QuantumCanvas';
import { NSTIsland } from '../3d/NSTIsland';
import { QuantumParticle } from '../3d/QuantumParticle';
import { Stars } from '@react-three/drei';
import { useScene } from '../../context/SceneContext';
import { useGame } from '../../context/GameContext';
import { motion } from 'framer-motion';
import { Typewriter } from '../common/Typewriter';
import { TechGeometries } from '../3d/TechGeometries';
import { QuestionBlock } from '../mario/QuestionBlock';
import { WarpPipeNav } from '../mario/WarpPipeNav';

export const HeroScene: React.FC = () => {
  const { scrollProgress } = useScene();
  const { marioMode } = useGame();

  // Scroll-based camera zoom/tilt for the "Camera Dive"
  const cameraPosition: [number, number, number] = [
    0, 
    5 - scrollProgress * 10, // Dive down
    10 - scrollProgress * 10 // Dive in
  ];

  return (
    <section id="hero-scene" className="relative h-[200vh] w-full bg-deep-space overflow-hidden">
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
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10 px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1 - scrollProgress * 2, y: 0 }}
            transition={{ duration: 1 }}
            className="text-center max-w-4xl"
          >
            {marioMode && (
              <div className="inline-block bg-[#E52521] border-2 border-black px-4 py-1 text-white font-arcade text-xs mb-4 shadow-[2px_2px_0px_#000]">
                WORLD 1-1 ★ OVERWORLD STAGE
              </div>
            )}

            <h1 className="text-5xl md:text-8xl font-bold text-white mb-4 tracking-tighter">
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

            <p className="text-white/70 font-mono text-xs md:text-sm tracking-widest mt-4">
              SEEKING 6-MONTH SUMMER INTERNSHIP
            </p>

            {/* Interactive Question Blocks Row */}
            <div className="mt-8 pointer-events-auto flex items-center justify-center gap-4 md:gap-6 flex-wrap">
              <QuestionBlock 
                label="ABOUT ME" 
                secretInfo="Ayush Shukla is a 2nd year CS student at NST, passionate about AI/ML, Full-Stack Engineering, and building autonomous agent workflows!" 
              />
              <QuestionBlock 
                label="RESUME" 
                secretInfo="Available for 6-month Summer Internships (AI/ML, Full-Stack, Backend, SDE). Tap pipes below to explore stages!" 
              />
              <QuestionBlock 
                label="TECH STACK" 
                secretInfo="React, TypeScript, Python, PyTorch, Node.js, Next.js, Three.js, Docker, GCP, BigQuery, Tailwind CSS." 
              />
            </div>

            {/* Warp Pipe Quick Navigation */}
            <div className="pointer-events-auto">
              <WarpPipeNav />
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-24 left-1/2 -translate-x-1/2 text-yellow-400 text-xs font-arcade drop-shadow-[1px_1px_0_#000]"
        >
          {marioMode ? 'RUN FORWARD TO EXPLORE ▶' : 'SCROLL_TO_INITIATE_DIVE'}
        </motion.div>
      </div>
    </section>
  );
};
