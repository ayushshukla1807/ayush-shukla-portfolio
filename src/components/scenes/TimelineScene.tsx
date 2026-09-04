import React from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { SceneLock } from '../common/SceneLock';
import { TerminalHack } from '../games/TerminalHack';
import { useGame } from '../../context/GameContext';
import { QuestionBlock } from '../mario/QuestionBlock';

const milestones = [
  { 
    year: 'Oct 2024 - Present', 
    title: 'Wikimedia Foundation', 
    role: 'Participant, Developer Skill Development',
    description: 'Engineered an AI-powered React Smart Linking Assistant and resolved CORS/memory leaks in Montage across 15+ PRs. Delivered Vector 2022 patches to fix core bugs for 1M+ users.',
    tags: ['MediaWiki', 'Open Source', 'React', 'PHP', 'Gerrit']
  },
  { 
    year: 'May 2025 - Aug 2025', 
    title: 'HYRTE Pvt. Ltd', 
    role: 'AI/ML Developer Intern',
    description: 'Architected a 16-point real-time AI candidate assessment pipeline and built a Hinglish-speaking AI interviewer using Python and state management.',
    tags: ['Python', 'AI Voice', 'Agile', 'Speech Analysis'],
    image: './assets/nst.jpg'
  },
  { 
    year: 'Aug 2024 - Present', 
    title: 'NST-SDC Mentor', 
    role: 'Core Member & Mentor',
    description: 'Mentored 15 junior developers in technical architecture and open-source practices. Organized NIRMAAN Hackathon and SKILLFEST recruitment drives.',
    tags: ['Mentorship', 'Leadership', 'System Design'],
    image: './assets/ayush-youtube.png'
  },
  { 
    year: 'Event Leadership', 
    title: 'Go for Gold - Elite Camp', 
    role: 'Head Organiser',
    description: 'Directed a 25-person team to host a 9-day residential camp for 80+ programmers; secured ICPC World Finalists and managed logistics lifecycle.',
    tags: ['Leadership', 'Logistics', 'Networking'],
    image: './assets/ayush-speaking.png'
  },
];

export const TimelineScene: React.FC = () => {
  const { marioMode } = useGame();
  const containerRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  const pathLength = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <section id="timeline-scene" ref={containerRef} className="relative min-h-[350vh] bg-deep-space py-20 pb-40">
      <SceneLock level={2} title="TIMELINE.LOG" minigame={<TerminalHack />}>
      <div className="sticky top-0 h-screen flex flex-col items-center pt-24 overflow-hidden">
        
        <div className="z-20 text-center mb-6">
          {marioMode ? (
            <div className="inline-block bg-[#00F000] text-black font-arcade text-xs px-3 py-1 mb-2 border-2 border-black shadow-[2px_2px_0px_#000]">
              WORLD 1-2 ★ UNDERGROUND PIPE STAGE
            </div>
          ) : null}

          <h2 className="text-4xl md:text-5xl font-bold text-white uppercase tracking-widest">
            THE.<span className="text-quantum-blue italic">JOURNEY</span>
          </h2>
          <p className="text-white/60 font-mono text-sm mt-2">Open Source / Leadership / Mentorship</p>

          <div className="mt-2">
            <QuestionBlock 
              label="SECRET COIN" 
              secretInfo="Wikimedia PR contributor & HYRTE AI/ML developer. Tap coins along the stage for bonus points!" 
            />
          </div>
        </div>

        {/* SVG Path Background */}
        <svg
          viewBox="0 0 100 800"
          className="absolute h-full w-auto opacity-20 pointer-events-none"
          preserveAspectRatio="xMidYMin slice"
        >
          <motion.path
            d="M50,0 Q70,100 30,200 T50,400 T70,600 T50,800"
            fill="none"
            stroke={marioMode ? "#F8B800" : "#00F2FF"}
            strokeWidth="3"
            style={{ pathLength }}
          />
        </svg>

        <div className="relative z-10 w-full max-w-5xl px-8 flex flex-col justify-around h-[70vh]">
          {milestones.map((m, i) => {
            const opacity = useTransform(
              scrollYProgress, 
              [i / milestones.length, (i + 0.3) / milestones.length, (i + 0.8) / milestones.length], 
              [0, 1, 0]
            );
            const x = useTransform(
              scrollYProgress, 
              [i / milestones.length, (i + 0.5) / milestones.length], 
              [i % 2 === 0 ? -100 : 100, 0]
            );

            return (
              <motion.div
                key={i}
                style={{ opacity, x }}
                className={cn(
                  "flex flex-col gap-3 max-w-lg p-6 transition-colors rounded-lg",
                  marioMode
                    ? "bg-black/90 border-4 border-[#00F000] shadow-[4px_4px_0px_#000]"
                    : "glass border-quantum-blue/10 hover:border-quantum-blue/40",
                  i % 2 === 0 ? "self-start text-left" : "self-end text-right items-end"
                )}
              >
                <div className="flex flex-col gap-1">
                  <span className={marioMode ? "text-yellow-400 font-arcade text-xs font-bold" : "text-evox-purple font-mono text-xs font-bold"}>
                    {m.year}
                  </span>
                  <h3 className={marioMode ? "text-2xl font-arcade text-white drop-shadow-[2px_2px_0_#000]" : "text-2xl font-bold text-white"}>
                    {m.title}
                  </h3>
                  <span className={marioMode ? "text-[#00F000] font-arcade text-xs tracking-wide" : "text-quantum-blue text-sm uppercase tracking-wide"}>
                    {m.role}
                  </span>
                </div>
                
                <p className="text-white/80 text-sm leading-relaxed">{m.description}</p>
                
                {m.image && (
                  <div className="mt-2 rounded-md overflow-hidden border border-white/10 w-full max-w-xs relative isolate">
                     <div className="absolute inset-0 bg-gradient-to-t from-deep-space to-transparent z-10"></div>
                     <img src={m.image} alt={m.title} className="w-full h-auto object-cover opacity-80 hover:opacity-100 transition-opacity grayscale hover:grayscale-0 mix-blend-luminosity hover:mix-blend-normal" />
                  </div>
                )}

                <div className="flex gap-2 flex-wrap mt-2">
                  {m.tags.map(t => (
                    <span 
                      key={t} 
                      className={marioMode ? "text-[9px] font-arcade px-2 py-1 bg-yellow-500/20 border border-yellow-500/50 text-yellow-300 rounded" : "text-[10px] font-mono px-2 py-1 bg-white/5 border border-white/10 rounded"}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
      
      {/* Visual background elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-evox-purple/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-quantum-blue/10 blur-[120px] rounded-full" />
      </div>
      </SceneLock>
    </section>
  );
};

// Simple utility function for class names
function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
