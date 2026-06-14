import React, { useState, useEffect } from 'react';
import { useGame } from '../../context/GameContext';
import { motion } from 'framer-motion';

export const NodeCollector: React.FC = () => {
  const { setUnlockedLevel } = useGame();
  const [nodes, setNodes] = useState<{ id: number, top: string, left: string }[]>([]);
  const [collected, setCollected] = useState(0);

  useEffect(() => {
    // Generate 5 random nodes
    setNodes(Array.from({ length: 5 }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 80 + 10}%`,
      left: `${Math.random() * 80 + 10}%`,
    })));
  }, []);

  const handleCollect = (id: number) => {
    setNodes(nodes.filter(n => n.id !== id));
    setCollected(c => {
      const newC = c + 1;
      if (newC === 5) {
        setTimeout(() => setUnlockedLevel(3), 500);
      }
      return newC;
    });
  };

  return (
    <div className="relative w-full h-64 border border-quantum-blue/20 bg-black/40 overflow-hidden">
      <div className="absolute top-2 left-2 font-mono text-xs text-white">
        NODES COLLECTED: {collected}/5
      </div>
      
      {nodes.map(node => (
        <motion.button
          key={node.id}
          initial={{ scale: 0 }}
          animate={{ scale: 1, top: node.top, left: node.left }}
          transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
          onClick={() => handleCollect(node.id)}
          className="absolute w-8 h-8 bg-evox-purple rounded-full flex items-center justify-center border-2 border-white cursor-pointer hover:bg-quantum-blue transition-colors"
        >
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-evox-purple opacity-75"></span>
        </motion.button>
      ))}

      {collected === 5 && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/80 font-mono text-quantum-blue text-lg">
          MATRIX DECODED.
        </div>
      )}
    </div>
  );
};
