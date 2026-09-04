import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { QuantumCanvas } from '../layout/QuantumCanvas';
import { motion } from 'framer-motion';
import { SkillMarquee } from '../common/SkillMarquee';
import { TechGeometries } from '../3d/TechGeometries';
import { SceneLock } from '../common/SceneLock';
import { PatternMatcher } from '../games/PatternMatcher';
import { useGame } from '../../context/GameContext';
import { QuestionBlock } from '../mario/QuestionBlock';
import { CourseClearModal } from '../mario/CourseClearModal';

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
  const { marioMode } = useGame();

  return (
    <section id="future-scene" className="relative min-h-screen w-full bg-deep-space overflow-hidden flex flex-col items-center justify-center pt-16 pb-32 px-4">
      <SceneLock level={4} title="THE.FUTURE" minigame={<PatternMatcher />}>
      <div className="absolute inset-0 z-0">
        <QuantumCanvas camera={{ position: [0, 0, 10], fov: 45 }}>
          <ParticleField />
          <TechGeometries count={9} color="#FFFFFF" radius={10} />
          <color attach="background" args={['#050505']} />
        </QuantumCanvas>
      </div>

      <div className="relative z-10 text-center w-full max-w-4xl">
        {marioMode && (
          <div className="inline-block bg-[#E52521] text-white font-arcade text-xs px-4 py-1 mb-4 border-2 border-black shadow-[2px_2px_0px_#000]">
            WORLD 1-4 ★ BOWSER FORTRESS BOSS STAGE
          </div>
        )}

        <motion.div 
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center w-full"
        >
          <div className={marioMode 
            ? "bg-black/95 border-4 border-[#E52521] pt-8 pb-8 px-8 max-w-3xl w-full rounded-lg shadow-[6px_6px_0px_#000]"
            : "glass pt-12 pb-8 px-12 max-w-3xl border-quantum-blue/20 w-full overflow-hidden"
          }>
            <h2 className={marioMode 
              ? "text-3xl md:text-5xl font-arcade text-white mb-6 uppercase tracking-widest text-[#E52521] drop-shadow-[2px_2px_0_#000]" 
              : "text-4xl md:text-6xl font-bold text-white mb-6 uppercase tracking-widest italic"
            }>
              THE.FUTURE
            </h2>

            <p className={marioMode ? "text-yellow-300 font-mono text-sm md:text-base leading-relaxed mb-4 max-w-2xl mx-auto" : "text-quantum-blue font-mono text-sm md:text-base leading-relaxed mb-4 max-w-2xl mx-auto"}>
              Actively seeking a <span className="text-white font-bold">6-month Summer Internship</span>. Versatile across AI/ML, Full Stack Development, GenAI, Data Analytics, and Product Management.
            </p>
            
            <SkillMarquee />

            <div className="my-4 flex items-center justify-center gap-4">
              <QuestionBlock 
                label="CONTACT" 
                secretInfo="Email: ayush.shukla@adypu.edu.in | Phone: Available upon request." 
              />
            </div>

            <div className="flex flex-wrap gap-4 justify-center mt-6">
              <a 
                href="https://drive.google.com/drive/folders/1FdQ255RhZw9f9tafubwUZfQtr08heOSG" 
                target="_blank" 
                rel="noopener noreferrer" 
                className={marioMode 
                  ? "bg-[#F8B800] hover:bg-yellow-300 border-4 border-black text-black font-arcade text-xs px-4 py-3 shadow-[4px_4px_0_#000] active:translate-y-0.5 transition-all"
                  : "btn-quantum"}
              >
                VIEW_RESUME 📄
              </a>
              <a 
                href="mailto:ayush.shukla@adypu.edu.in?subject=6-Month%20Summer%20Internship%20Opportunity" 
                className={marioMode
                  ? "bg-[#00F000] hover:bg-green-400 border-4 border-black text-black font-arcade text-xs px-4 py-3 shadow-[4px_4px_0_#000] active:translate-y-0.5 transition-all"
                  : "btn-quantum border-evox-purple text-evox-purple flex items-center justify-center"}
              >
                HIRE_ME (6_MONTHS) 🚀
              </a>
            </div>
          </div>
        </motion.div>

        {/* Stage Flagpole Finish */}
        <CourseClearModal />
      </div>

      {/* Footer minimal info */}
      <div className="absolute bottom-4 left-8 text-[10px] font-mono text-white/40 z-20">
        © 2026 AYUSH_SHUKLA // SUPER MARIO RUN OVERHAUL
      </div>
      </SceneLock>
    </section>
  );
};
