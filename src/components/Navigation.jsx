import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiPalette } = FiIcons;

const Navigation = () => {
  const location = useLocation();

  return (
    <nav className="bg-black/20 backdrop-blur-sm border-b border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold text-white">Color Master</span>
          </Link>
          
          <div className="flex space-x-1">
            <Link to="/">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-2 rounded-lg transition-all ${
                  location.pathname === '/' 
                    ? 'bg-purple-600 text-white' 
                    : 'text-purple-200 hover:bg-purple-800/50'
                }`}
              >
                <span>Game</span>
              </motion.button>
            </Link>
            
            <Link to="/leaderboard">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-2 rounded-lg transition-all ${
                  location.pathname === '/leaderboard' 
                    ? 'bg-purple-600 text-white' 
                    : 'text-purple-200 hover:bg-purple-800/50'
                }`}
              >
                <span>Leaderboard</span>
              </motion.button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;