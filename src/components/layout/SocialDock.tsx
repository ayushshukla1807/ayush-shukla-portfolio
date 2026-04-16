import React from 'react';
import { Linkedin, Github, Code2, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

const TABS = [
  { id: 'linkedin', icon: <Linkedin size={16} />, url: 'https://www.linkedin.com/in/ayush-s-08716533', label: 'LinkedIn', color: 'hover:text-[#0a66c2]' },
  { id: 'github', icon: <Github size={16} />, url: 'https://github.com/ayushshukla1807', label: 'GitHub', color: 'hover:text-white' },
  { id: 'codechef', icon: <Code2 size={16} />, url: 'https://www.codechef.com/users/cool_cast_84', label: 'CodeChef', color: 'hover:text-[#5B4638]' },
  { id: 'codeforces', icon: <Globe size={16} />, url: 'https://codeforces.com/profile/ayush_shukla_18', label: 'Codeforces', color: 'hover:text-[#1f8ac0]' },
];

export const SocialDock: React.FC = () => {
  return (
    <div className="fixed top-8 right-8 z-50 hidden md:flex items-center gap-3">
      {TABS.map((tab, i) => (
        <motion.a
          key={tab.id}
          href={tab.url}
          target="_blank"
          rel="noreferrer"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1, duration: 0.5 }}
          className={`glass p-2 text-white/50 border-quantum-blue/20 transition-all duration-300 ${tab.color} hover:border-quantum-blue hover:scale-110`}
          title={tab.label}
        >
          {tab.icon}
        </motion.a>
      ))}
    </div>
  );
};
