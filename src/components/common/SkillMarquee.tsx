import React from 'react';
import { motion } from 'framer-motion';

const SKILLS = [
  "Generative AI", "TypeScript", "React", "Next JS", "Java", "Python",
  "HTML", "CSS", "Tailwind", "JavaScript", "MySQL", ".Net", "PHP", "Vue.js",
  "Decision-making", "Entrepreneurship", "Leadership", "People skills", 
  "Presentation Skills", "Public speaking", "Social Media", "Team Building"
];

// Double the array to ensure smooth infinite looping
const MARQUEE_ITEMS = [...SKILLS, ...SKILLS];

export const SkillMarquee: React.FC = () => {
  return (
    <div className="w-full max-w-full overflow-hidden py-4 border-y border-quantum-blue/10 bg-white/5 backdrop-blur-md mt-12 mb-4 pointer-events-none">
      <motion.div
        className="flex gap-6 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 30, // 30 seconds for a full loop
        }}
      >
        {MARQUEE_ITEMS.map((skill, index) => (
          <span 
            key={`${skill}-${index}`} 
            className="text-sm md:text-base font-mono text-quantum-blue uppercase tracking-widest px-4 border-l border-white/20 first:border-none"
          >
            {skill}
          </span>
        ))}
      </motion.div>
    </div>
  );
};
