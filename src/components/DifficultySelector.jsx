import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiZap, FiTarget, FiAward } = FiIcons;

const DifficultySelector = ({ onSelectDifficulty }) => {
  const difficulties = [
    {
      id: 'easy',
      name: 'Easy',
      description: 'Mix of 2 colors',
      icon: FiZap,
      color: 'from-green-500 to-green-700'
    },
    {
      id: 'medium',
      name: 'Medium',
      description: 'Mix of 3 colors',
      icon: FiTarget,
      color: 'from-yellow-500 to-yellow-700'
    },
    {
      id: 'hard',
      name: 'Hard',
      description: 'Mix of 4 colors',
      icon: FiAward,
      color: 'from-red-500 to-red-700'
    }
  ];

  return (
    <div className="mt-6">
      <h3 className="text-lg font-medium text-white mb-4 text-center">Select Difficulty</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {difficulties.map((difficulty) => (
          <motion.button
            key={difficulty.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onSelectDifficulty(difficulty.id)}
            className={`p-4 rounded-xl bg-gradient-to-r ${difficulty.color} text-white hover:shadow-lg transition-all`}
          >
            <div className="flex flex-col items-center justify-center">
              <SafeIcon icon={difficulty.icon} className="text-2xl mb-2" />
              <h4 className="font-bold">{difficulty.name}</h4>
              <p className="text-sm text-white/80">{difficulty.description}</p>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default DifficultySelector;