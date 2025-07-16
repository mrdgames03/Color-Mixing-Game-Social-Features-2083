import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiHeart, FiZap, FiClock, FiUser, FiTarget } = FiIcons;

const ScoreBoard = ({ score, lives, streak, timeLeft, playerName, difficulty }) => {
  const getDifficultyColor = () => {
    switch (difficulty) {
      case 'easy': return 'text-green-400';
      case 'medium': return 'text-yellow-400';
      case 'hard': return 'text-red-400';
      default: return 'text-green-400';
    }
  };

  const getDifficultyName = () => {
    switch (difficulty) {
      case 'easy': return 'Easy';
      case 'medium': return 'Medium';
      case 'hard': return 'Hard';
      default: return 'Easy';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-8"
    >
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4 text-center">
        <div className="flex items-center justify-center space-x-2">
          <SafeIcon icon={FiUser} className="text-blue-400" />
          <div>
            <p className="text-white/60 text-sm">Player</p>
            <p className="text-white font-bold">{playerName}</p>
          </div>
        </div>
        
        <div className="flex items-center justify-center space-x-2">
          <SafeIcon icon={FiTarget} className={getDifficultyColor()} />
          <div>
            <p className="text-white/60 text-sm">Level</p>
            <p className={`font-bold ${getDifficultyColor()}`}>
              {getDifficultyName()}
            </p>
          </div>
        </div>
        
        <div className="flex items-center justify-center space-x-2">
          <SafeIcon icon={FiZap} className="text-yellow-400" />
          <div>
            <p className="text-white/60 text-sm">Score</p>
            <p className="text-white font-bold text-xl">{score}</p>
          </div>
        </div>
        
        <div className="flex items-center justify-center space-x-2">
          <SafeIcon icon={FiHeart} className="text-red-400" />
          <div>
            <p className="text-white/60 text-sm">Lives</p>
            <div className="flex justify-center space-x-1">
              {[...Array(3)].map((_, i) => (
                <SafeIcon
                  key={i}
                  icon={FiHeart}
                  className={`text-lg ${i < lives ? 'text-red-400' : 'text-gray-600'}`}
                />
              ))}
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-center space-x-2">
          <SafeIcon icon={FiZap} className="text-purple-400" />
          <div>
            <p className="text-white/60 text-sm">Streak</p>
            <p className="text-white font-bold text-xl">{streak}</p>
          </div>
        </div>
        
        <div className="flex items-center justify-center space-x-2">
          <SafeIcon icon={FiClock} className="text-green-400" />
          <div>
            <p className="text-white/60 text-sm">Time</p>
            <p className={`font-bold text-xl ${timeLeft <= 5 ? 'text-red-400' : 'text-white'}`}>
              {timeLeft}s
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ScoreBoard;