import React from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useScene } from '@/context/SceneContext';

const milestones = [
  { year: '2024-2025', title: 'NST Entry', description: 'Entry into Newton School of Technology (NST). Foundation of the journey.' },
  { year: '2025', title: 'Wikimedia AI', description: 'Development of the AI-powered smart linking assistant.' },
  { year: '2025', title: 'OpenVeda', description: 'Launch of the open-source platform for global contributions.' },
  { year: '2025', title: 'EvoX Ventures', description: 'Transition from student to Founder. Building the future of ventures.' },
  { year: '2025', title: 'NIRMAAN', description: 'Leading the Student Developer Club and organizing NCR\'s biggest hackathon.' },
  { year: 'Current', title: 'Quantum Focus', description: 'AWS Cloud Specialization & Quantum Computing research.' },
];

export const TimelineScene: React.FC = () => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  const pathLength = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <section ref={containerRef} className="relative min-h-[300vh] bg-deep-space py-20">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
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

        <div className="relative z-10 w-full max-w-4xl px-8 flex flex-col justify-around h-[80vh]">
          {milestones.map((m, i) => {
            const opacity = useTransform(
              scrollYProgress, 
              [i / milestones.length, (i + 0.5) / milestones.length, (i + 1) / milestones.length], 
              [0, 1, 0]
            );
            const x = useTransform(
              scrollYProgress, 
              [i / milestones.length, (i + 0.5) / milestones.length], 
              [i % 2 === 0 ? -50 : 50, 0]
            );

            return (
              <motion.div
                key={i}
                style={{ opacity, x }}
                className={cn(
                  "flex flex-col gap-2 max-w-md",
                  i % 2 === 0 ? "self-start text-left" : "self-end text-right"
                )}
              >
                <span className="text-evox-purple font-mono text-sm">{m.year}</span>
                <h3 className="text-3xl font-bold text-white">{m.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{m.description}</p>
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
