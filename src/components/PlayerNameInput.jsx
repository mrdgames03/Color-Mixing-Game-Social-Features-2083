import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import DifficultySelector from './DifficultySelector';

const { FiPlay, FiPalette } = FiIcons;

const PlayerNameInput = ({ playerName, setPlayerName, onStart }) => {
  const [difficulty, setDifficulty] = useState('easy');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (playerName.trim()) {
      onStart(difficulty);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 max-w-md w-full mx-4"
      >
        <div className="text-center mb-8">
          <SafeIcon icon={FiPalette} className="text-6xl text-purple-400 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-white mb-2">Color Master</h1>
          <p className="text-white/80">
            Test your color theory knowledge! Guess which colors combine to create the displayed color.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-white/80 text-sm font-medium mb-2">
              Enter your name to start playing
            </label>
            <input
              type="text"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              placeholder="Your name"
              className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              maxLength={20}
            />
          </div>

          <DifficultySelector onSelectDifficulty={setDifficulty} />

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={!playerName.trim()}
            className={`w-full py-4 rounded-xl font-semibold text-lg flex items-center justify-center space-x-2 transition-all ${
              playerName.trim()
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700'
                : 'bg-gray-500 text-gray-300 cursor-not-allowed'
            }`}
          >
            <SafeIcon icon={FiPlay} />
            <span>Start Game</span>
          </motion.button>
        </form>

        <div className="mt-6 text-center text-white/60 text-sm">
          <p>• 3 lives per game</p>
          <p>• 15 seconds per question</p>
          <p>• Streak bonus for consecutive correct answers</p>
        </div>
      </motion.div>
    </div>
  );
};

export default PlayerNameInput;