import React from 'react';
import { Code2, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

const LinkedinIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const GithubIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
  </svg>
);

const TABS = [
  { id: 'linkedin', icon: <LinkedinIcon />, url: 'https://www.linkedin.com/in/ayush-s-08716533', label: 'LinkedIn', color: 'hover:text-[#0a66c2]' },
  { id: 'github', icon: <GithubIcon />, url: 'https://github.com/ayushshukla1807', label: 'GitHub', color: 'hover:text-white' },
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
