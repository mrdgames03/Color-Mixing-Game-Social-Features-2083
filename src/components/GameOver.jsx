import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import SocialShare from './SocialShare';
import { getTopScores } from '../utils/localStorage';

const { FiRefreshCw, FiTarget } = FiIcons;

const GameOver = ({ score, playerName, onRestart, difficulty = 'easy' }) => {
  const topScores = getTopScores();
  const playerRank = topScores.findIndex(s => s.name === playerName && s.score === score) + 1;
  const isNewRecord = score > 0 && topScores.length > 0 && score >= topScores[0].score;

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
    <div className="flex items-center justify-center min-h-[60vh]">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 max-w-md w-full mx-4 text-center"
      >
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-white mb-2">
            {isNewRecord ? 'New Record!' : 'Game Over'}
          </h2>
          
          <p className="text-white/80">
            {isNewRecord ? 'Congratulations on the new high score!' : 'Great job playing Color Master!'}
          </p>
        </div>
        
        <div className="bg-white/20 rounded-xl p-6 mb-6">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-white/60 text-sm">Final Score</p>
              <p className="text-2xl font-bold text-white">{score}</p>
            </div>
            <div>
              <p className="text-white/60 text-sm">Difficulty</p>
              <p className={`text-lg font-bold ${getDifficultyColor()}`}>
                {getDifficultyName()}
              </p>
            </div>
            {playerRank > 0 && (
              <div>
                <p className="text-white/60 text-sm">Your Rank</p>
                <p className="text-2xl font-bold text-yellow-400">#{playerRank}</p>
              </div>
            )}
          </div>
        </div>
        
        <SocialShare score={score} playerName={playerName} difficulty={difficulty} />
        
        <div className="space-y-3 mt-6">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onRestart}
            className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold flex items-center justify-center space-x-2 hover:from-purple-700 hover:to-pink-700 transition-all"
          >
            <SafeIcon icon={FiRefreshCw} />
            <span>Play Again</span>
          </motion.button>
          
          <Link to="/leaderboard" className="block">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3 bg-white/20 text-white rounded-xl font-semibold transition-all hover:bg-white/30"
            >
              View Leaderboard
            </motion.button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default GameOver;