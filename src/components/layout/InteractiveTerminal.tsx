import React, { useState, useEffect, useRef } from 'react';
import { useScene } from '@/context/SceneContext';
import { Terminal as TerminalIcon, ChevronRight } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const COMMANDS = {
  GRAVITY_ON: 'gravity --on',
  GRAVITY_OFF: 'gravity --off',
  PROJECTS: 'cd /projects',
  CONTACT: 'contact',
  RESUME: 'sudo get-resume',
  CLEAR: 'clear',
  HELP: 'help',
};

export const InteractiveTerminal: React.FC = () => {
  const { scrollProgress, activeScene, setIsPhysicsEnabled, isPhysicsEnabled } = useScene();
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>(['Welcome to Quantum-CLI v1.0.0', 'Type "help" for a list of commands.']);
  const terminalRef = useRef<HTMLDivElement>(null);

  const addLog = (msg: string) => {
    setHistory((prev) => [...prev, msg].slice(-20));
  };

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const cmd = input.trim().toLowerCase();
    addLog(`> ${input}`);

    switch (cmd) {
      case COMMANDS.GRAVITY_ON:
        setIsPhysicsEnabled(true);
        addLog('Quantum Physics Engine: ACTIVE. Use caution.');
        break;
      case COMMANDS.GRAVITY_OFF:
        setIsPhysicsEnabled(false);
        addLog('Quantum Physics Engine: DISABLED. Reverting to linear state.');
        break;
      case COMMANDS.PROJECTS:
        window.scrollTo({ top: window.innerHeight * 2, behavior: 'smooth' });
        addLog('Navigating to /projects...');
        break;
      case COMMANDS.CONTACT:
        addLog('Initializing secure comms channel...');
        window.open('https://linkedin.com/in/ayushshukla', '_blank');
        break;
      case COMMANDS.RESUME:
        addLog('Access granted. Downloading secure packet [CV_Ayush_Shukla.pdf]...');
        break;
      case COMMANDS.CLEAR:
        setHistory([]);
        break;
      case COMMANDS.HELP:
        addLog('Available commands: ' + Object.values(COMMANDS).join(', '));
        break;
      default:
        addLog(`Command not found: ${cmd}. Type "help" for options.`);
    }

    setInput('');
  };

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const quantumState = [
    'Superposition',
    'Entangled',
    'Coherent',
    'Decoherent',
  ][activeScene] || 'Unknown';

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 pointer-events-none">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-4 items-end">
        {/* Real-time Stats */}
        <div className="glass p-3 font-mono text-xs text-quantum-blue pointer-events-auto flex flex-col gap-1 w-48 mb-2 md:mb-0">
          <div className="flex justify-between">
            <span>SCROLL_DEPTH:</span>
            <span>{(scrollProgress * 100).toFixed(2)}%</span>
          </div>
          <div className="flex justify-between">
            <span>QUANTUM_STATE:</span>
            <span className="text-evox-purple font-bold">{quantumState}</span>
          </div>
          <div className="flex justify-between">
            <span>PHYSICS:</span>
            <span>{isPhysicsEnabled ? 'ON' : 'OFF'}</span>
          </div>
        </div>

        {/* Terminal HUD */}
        <div className="glass w-full h-32 md:h-40 pointer-events-auto flex flex-col overflow-hidden border-quantum-blue/30">
          <div className="bg-white/5 px-3 py-1 flex items-center justify-between border-b border-white/10">
            <div className="flex items-center gap-2 text-xs font-mono text-white/50">
              <TerminalIcon size={12} />
              <span>TERMINAL_SESSION: ayush@quantum</span>
            </div>
            <div className="flex gap-1.5">
              <div className="w-2 h-2 rounded-full bg-red-500/50" />
              <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
              <div className="w-2 h-2 rounded-full bg-green-500/50" />
            </div>
          </div>
          
          <div 
            ref={terminalRef}
            className="flex-1 overflow-y-auto p-3 font-mono text-xs text-white/80 scrollbar-hide"
          >
            {history.map((line, i) => (
              <div key={i} className="mb-0.5">{line}</div>
            ))}
          </div>

          <form onSubmit={handleCommand} className="flex items-center gap-2 px-3 py-2 bg-black/20">
            <ChevronRight size={14} className="text-quantum-blue" />
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="bg-transparent border-none outline-none text-xs font-mono text-quantum-blue w-full"
              placeholder="Enter command..."
              autoFocus
            />
          </form>
        </div>
      </div>
    </div>
  );
};
