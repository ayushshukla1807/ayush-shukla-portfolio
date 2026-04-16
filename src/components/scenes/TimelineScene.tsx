import React from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useScene } from '@/context/SceneContext';

const milestones = [
  { 
    year: 'Oct 2024 - Present', 
    title: 'Wikimedia Foundation', 
    role: 'Participant, Developer Skill Development',
    description: 'Authored and merged production-level code, including a critical bug fix (T384754) for the Vector 2022 skin, directly improving platform reliability for millions of Wikipedia users.',
    tags: ['MediaWiki', 'Open Source', 'Bug Fix']
  },
  { 
    year: 'Feb 2025 - Apr 2025', 
    title: 'FOSSASIA', 
    role: 'Developer (Part Time)',
    description: 'Contributed to the Eventyay platform by refactoring backend modules (Python/Flask) and enhancing frontend user flows (Vue.js).',
    tags: ['Python', 'Flask', 'Vue.js']
  },
  { 
    year: '2024 - Present', 
    title: 'NST-SDC Mentor', 
    role: 'Core Member',
    description: 'Led mentorship for 15 junior developers, guiding architectural best practices. Spearheaded key club activities including NIRMAAN Hackathon and SKILLFEST recruitment drive.',
    tags: ['Mentorship', 'Community Building']
  },
  { 
    year: 'Event Leadership', 
    title: 'Go for Gold - Elite Camp', 
    role: 'Head Organiser',
    description: 'Conceptualised and executed a 9-day national-level residential camp for ~80 programmers. Led outreach securing ICPC World Finalists and managed a 25+ volunteer logistics team.',
    tags: ['Leadership', 'Logistics', 'Public Speaking'],
    image: './assets/ayush-speaking.png'
  },
];

export const TimelineScene: React.FC = () => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  const pathLength = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <section ref={containerRef} className="relative min-h-[350vh] bg-deep-space py-20 pb-40">
      <div className="sticky top-0 h-screen flex flex-col items-center pt-24 overflow-hidden">
        
        <div className="z-20 text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-bold text-white uppercase tracking-widest">
            THE.<span className="text-quantum-blue italic">JOURNEY</span>
          </h2>
          <p className="text-white/40 font-mono text-sm mt-2">Open Source / Leadership / Mentorship</p>
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
            stroke="#00F2FF"
            strokeWidth="2"
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
                  "flex flex-col gap-3 max-w-lg glass p-6 border-quantum-blue/10 hover:border-quantum-blue/40 transition-colors",
                  i % 2 === 0 ? "self-start text-left" : "self-end text-right items-end"
                )}
              >
                <div className="flex flex-col gap-1">
                  <span className="text-evox-purple font-mono text-xs font-bold">{m.year}</span>
                  <h3 className="text-2xl font-bold text-white">{m.title}</h3>
                  <span className="text-quantum-blue text-sm uppercase tracking-wide">{m.role}</span>
                </div>
                
                <p className="text-white/60 text-sm leading-relaxed">{m.description}</p>
                
                {m.image && (
                  <div className="mt-2 rounded-md overflow-hidden border border-white/10 w-full max-w-xs relative isolate">
                     <div className="absolute inset-0 bg-gradient-to-t from-deep-space to-transparent z-10"></div>
                     <img src={m.image} alt={m.title} className="w-full h-auto object-cover opacity-80 hover:opacity-100 transition-opacity grayscale hover:grayscale-0 mix-blend-luminosity hover:mix-blend-normal" />
                  </div>
                )}

                <div className="flex gap-2 flex-wrap mt-2">
                  {m.tags.map(t => (
                    <span key={t} className="text-[10px] font-mono px-2 py-1 bg-white/5 border border-white/10 rounded">{t}</span>
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
    </section>
  );
};

// Simple utility function for class names
function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
