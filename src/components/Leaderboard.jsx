import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { getTopScores, clearScores } from '../utils/localStorage';

const { FiTrophy, FiAward, FiMedal, FiTrash2, FiPlay, FiFilter, FiLock } = FiIcons;

const Leaderboard = () => {
  const [scores, setScores] = useState([]);
  const [difficultyFilter, setDifficultyFilter] = useState('all');
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  
  useEffect(() => {
    loadScores();
  }, [difficultyFilter]);
  
  const loadScores = () => {
    const allScores = getTopScores();
    
    if (difficultyFilter === 'all') {
      setScores(allScores);
    } else {
      setScores(allScores.filter(score => score.difficulty === difficultyFilter));
    }
  };

  const handleClearScoresClick = () => {
    setShowPasswordModal(true);
    setPassword('');
    setPasswordError(false);
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    
    // Check if password is correct (admin password: 12345)
    if (password === '12345') {
      clearScores();
      setScores([]);
      setShowPasswordModal(false);
      setPasswordError(false);
    } else {
      setPasswordError(true);
    }
  };

  const handleCancelPasswordModal = () => {
    setShowPasswordModal(false);
    setPasswordError(false);
  };

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1: return <SafeIcon icon={FiTrophy} className="text-yellow-400" />;
      case 2: return <SafeIcon icon={FiAward} className="text-gray-400" />;
      case 3: return <SafeIcon icon={FiMedal} className="text-amber-600" />;
      default: return <span className="text-white/60">#{rank}</span>;
    }
  };

  const getRankColor = (rank) => {
    switch (rank) {
      case 1: return 'bg-gradient-to-r from-yellow-400/20 to-yellow-600/20 border-yellow-400/30';
      case 2: return 'bg-gradient-to-r from-gray-400/20 to-gray-600/20 border-gray-400/30';
      case 3: return 'bg-gradient-to-r from-amber-400/20 to-amber-600/20 border-amber-400/30';
      default: return 'bg-white/5 border-white/10';
    }
  };
  
  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'easy': return 'text-green-400';
      case 'medium': return 'text-yellow-400';
      case 'hard': return 'text-red-400';
      default: return 'text-blue-400';
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl font-bold text-white mb-4">Leaderboard</h1>
        <p className="text-white/80">Top Color Master players</p>
      </motion.div>

      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-white">Top Scores</h2>
          <div className="flex space-x-2">
            <Link to="/">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2"
              >
                <SafeIcon icon={FiPlay} />
                <span>Play Game</span>
              </motion.button>
            </Link>
            
            {scores.length > 0 && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleClearScoresClick}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2"
              >
                <SafeIcon icon={FiTrash2} />
                <span>Clear</span>
              </motion.button>
            )}
          </div>
        </div>
        
        <div className="mb-4 flex items-center space-x-2">
          <SafeIcon icon={FiFilter} className="text-white/60" />
          <span className="text-white/60 text-sm">Filter by difficulty:</span>
          <select
            value={difficultyFilter}
            onChange={(e) => setDifficultyFilter(e.target.value)}
            className="bg-white/20 text-white border border-white/30 rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="all">All Difficulties</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>

        {scores.length === 0 ? (
          <div className="text-center py-12">
            <SafeIcon icon={FiTrophy} className="text-6xl text-white/30 mx-auto mb-4" />
            <p className="text-white/60 text-lg">No scores yet</p>
            <p className="text-white/40">Be the first to set a high score!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {scores.map((score, index) => (
              <motion.div
                key={`${score.name}-${score.score}-${index}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`flex items-center justify-between p-4 rounded-xl border ${getRankColor(index + 1)}`}
              >
                <div className="flex items-center space-x-4">
                  <div className="flex items-center justify-center w-8 h-8">
                    {getRankIcon(index + 1)}
                  </div>
                  <div>
                    <p className="text-white font-semibold">{score.name}</p>
                    <p className="text-white/60 text-sm">
                      {new Date(score.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className={`text-sm font-medium ${getDifficultyColor(score.difficulty)}`}>
                      {score.difficulty || 'easy'}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-white">{score.score}</p>
                    <p className="text-white/60 text-sm">points</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4">How to Play</h3>
        <div className="space-y-2 text-white/80">
          <p>• Look at the displayed color</p>
          <p>• Select the primary colors that combine to make it</p>
          <p>• Difficulty levels determine number of colors to mix (2, 3, or 4)</p>
          <p>• You have 15 seconds per question</p>
          <p>• Consecutive correct answers build your streak for bonus points</p>
          <p>• You have 3 lives - lose one for each wrong answer</p>
        </div>
      </div>

      {/* Admin Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white/10 backdrop-blur-md rounded-2xl p-6 max-w-md w-full"
          >
            <div className="text-center mb-4">
              <div className="bg-red-600/20 rounded-full p-3 inline-block mb-2">
                <SafeIcon icon={FiLock} className="text-2xl text-red-500" />
              </div>
              <h3 className="text-xl font-bold text-white">Admin Access Required</h3>
              <p className="text-white/70 text-sm mt-1">
                Enter the admin password to clear all scores
              </p>
            </div>

            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  className={`w-full px-4 py-3 bg-white/20 border rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                    passwordError ? 'border-red-500' : 'border-white/30'
                  }`}
                  autoFocus
                />
                {passwordError && (
                  <p className="text-red-400 text-sm mt-1">
                    Incorrect password. Please try again.
                  </p>
                )}
              </div>

              <div className="flex space-x-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={handleCancelPasswordModal}
                  className="flex-1 py-3 bg-white/20 text-white rounded-xl font-semibold transition-all hover:bg-white/30"
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="flex-1 py-3 bg-red-600 text-white rounded-xl font-semibold transition-all hover:bg-red-700 flex items-center justify-center space-x-2"
                >
                  <SafeIcon icon={FiTrash2} className="text-sm" />
                  <span>Clear All</span>
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Leaderboard;