import React from 'react';
import { useBox } from '@react-three/cannon';
import { QuantumCanvas } from '../layout/QuantumCanvas';
import { PhysicsWorld } from '../3d/PhysicsWorld';
import { GlitchShader } from '../effects/GlitchShader';
import { useScene } from '../../context/SceneContext';
import { useGame } from '../../context/GameContext';
import { motion, AnimatePresence } from 'framer-motion';
import { TechGeometries } from '../3d/TechGeometries';
import { SceneLock } from '../common/SceneLock';
import { NodeCollector } from '../games/NodeCollector';
import { QuestionBlock } from '../mario/QuestionBlock';

const projects = [
  { 
    id: 'interviewos', 
    title: 'InterviewOS', 
    tags: ['React', 'Web Audio API', 'Node.js'], 
    color: '#7000FF',
    github: 'https://github.com/ayushshukla1807/InterviewOS',
    demo: 'https://interviewos-ytph.onrender.com',
    secret: 'InterviewOS features real-time voice synthesis and interactive technical coding practice!'
  },
  { 
    id: 'datatrace', 
    title: 'DataTrace Pro', 
    tags: ['Python', 'Streamlit', 'Pandas'], 
    color: '#00F2FF',
    github: 'https://github.com/ayushshukla1807/datatrace-pro-app',
    demo: 'https://datatrace-pro.streamlit.app/',
    secret: 'DataTrace Pro provides automated data cleaning and insightful ML metric dashboards!'
  },
  { 
    id: 'openveda', 
    title: 'OpenVeda', 
    tags: ['Next.js', 'Supabase', 'TypeScript'], 
    color: '#ffffff',
    github: 'https://github.com/ayushshukla1807/openveda-launch',
    demo: 'https://www.openveda.in/',
    secret: 'OpenVeda is an open educational tech ecosystem for collaborative research!'
  },
  { 
    id: 'wiki', 
    title: 'Wikimedia Smart Linker', 
    tags: ['React', 'MediaWiki', 'PHP'], 
    color: '#00F2FF',
    github: 'https://github.com/wikimedia',
    demo: 'https://www.mediawiki.org/',
    secret: 'Delivered AI smart linking tool & bugfixes impacting 1M+ Wikimedia users!'
  },
];

const PhysicalCard = ({ project, position }: { project: any, position: [number, number, number] }) => {
  const [ref] = useBox(() => ({ mass: 1, position, args: [3, 2, 0.5] }));

  return (
    <mesh ref={ref as any}>
      <boxGeometry args={[3, 2, 0.2]} />
      <meshStandardMaterial color={project.color} metalness={0.5} roughness={0.2} transparent opacity={0.8} />
      {project.id === 'evox' && <GlitchShader />}
    </mesh>
  );
};

export const ProjectMatrix: React.FC = () => {
  const { isPhysicsEnabled } = useScene();
  const { marioMode } = useGame();

  return (
    <section id="projects-scene" className="relative min-h-screen bg-deep-space flex flex-col items-center justify-center p-10 overflow-hidden">
      <SceneLock level={3} title="PROJECTS.MATRIX" minigame={<NodeCollector />}>
      <div className="z-10 mb-8 text-center">
        {marioMode && (
          <div className="inline-block bg-[#F8B800] text-black font-arcade text-xs px-3 py-1 mb-2 border-2 border-black shadow-[2px_2px_0px_#000]">
            WORLD 1-3 ★ ATHLETIC PROJECT CASTLE STAGE
          </div>
        )}

        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 italic">
          PROJECTS.<span className="text-yellow-400 font-arcade text-3xl md:text-4xl">MATRIX</span>
        </h2>
        <div className="flex gap-2 justify-center">
          <span className="btn-quantum text-[10px] py-1">SCALABLE</span>
          <span className="btn-quantum text-[10px] py-1 border-evox-purple text-evox-purple">DISRUPTIVE</span>
        </div>
      </div>

      <div className="w-full max-w-6xl relative">
        {/* 2D Grid Representation */}
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
                  className={cn(
                    "p-6 h-72 flex flex-col justify-between group transition-transform hover:-translate-y-1 rounded-lg",
                    marioMode 
                      ? "bg-[#111] border-4 border-[#F8B800] shadow-[4px_4px_0px_#000]"
                      : "glass hover:border-quantum-blue"
                  )}
                >
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <span className={marioMode ? "text-[9px] font-arcade text-yellow-300" : "text-xs font-mono text-white/40"}>
                        {p.tags.join(' / ')}
                      </span>
                      <QuestionBlock label="INFO" secretInfo={p.secret} />
                    </div>

                    <h3 className={marioMode ? "text-xl font-arcade text-white group-hover:text-yellow-400 transition-colors drop-shadow-[2px_2px_0_#000]" : "text-2xl font-bold text-white group-hover:text-quantum-blue transition-colors"}>
                      {p.title}
                    </h3>
                  </div>

                  <div className="flex gap-3 mt-4">
                    {p.github && (
                      <a 
                        href={p.github} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className={marioMode 
                          ? "text-[9px] font-arcade text-black bg-[#F8B800] hover:bg-yellow-300 border-2 border-black px-2 py-1 shadow-[2px_2px_0_#000]" 
                          : "text-[10px] font-mono text-quantum-blue hover:text-white transition-colors border border-quantum-blue/20 hover:border-white/50 px-2 py-1 rounded bg-white/5"}
                        onClick={(e) => e.stopPropagation()}
                      >
                        GitHub ↗
                      </a>
                    )}
                    {p.demo && (
                      <a 
                        href={p.demo} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className={marioMode
                          ? "text-[9px] font-arcade text-white bg-[#E52521] hover:bg-red-600 border-2 border-black px-2 py-1 shadow-[2px_2px_0_#000]"
                          : "text-[10px] font-mono text-evox-purple hover:text-white transition-colors border border-evox-purple/20 hover:border-white/50 px-2 py-1 rounded bg-white/5"}
                        onClick={(e) => e.stopPropagation()}
                      >
                        Live Demo ↗
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* 3D Physics World */}
        {isPhysicsEnabled && (
          <div className="absolute inset-0 z-20">
            <QuantumCanvas camera={{ position: [0, 0, 15], fov: 45 }}>
              <TechGeometries count={8} color="#7000FF" radius={20} />
              <PhysicsWorld>
                {projects.map((p, i) => (
                  <PhysicalCard 
                    key={p.id} 
                    project={p} 
                    position={[(i - 1.5) * 4, 5, 0]} 
                  />
                ))}
                
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
      </SceneLock>
    </section>
  );
};

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
