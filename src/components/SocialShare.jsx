import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiShare2, FiTwitter, FiFacebook, FiCopy } = FiIcons;

const SocialShare = ({ score, playerName, difficulty = 'easy' }) => {
  const difficultyText = difficulty === 'easy' ? 'Easy' : difficulty === 'medium' ? 'Medium' : 'Hard';
  
  const shareText = `I just scored ${score} points in Color Master on ${difficultyText} difficulty! 🎨 Can you beat my score? Test your color theory knowledge!`;
  const gameUrl = window.location.origin;

  const shareOnTwitter = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(gameUrl)}`;
    window.open(url, '_blank');
  };

  const shareOnFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(gameUrl)}&quote=${encodeURIComponent(shareText)}`;
    window.open(url, '_blank');
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`${shareText} ${gameUrl}`);
    // You could add a toast notification here
  };

  const shareNative = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Color Master',
        text: shareText,
        url: gameUrl
      });
    }
  };

  return (
    <div className="bg-white/10 rounded-xl p-4">
      <div className="flex items-center justify-center space-x-2 mb-3">
        <SafeIcon icon={FiShare2} className="text-white/80" />
        <span className="text-white/80 text-sm">Share your score</span>
      </div>
      
      <div className="flex justify-center space-x-2">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={shareOnTwitter}
          className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          <SafeIcon icon={FiTwitter} />
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={shareOnFacebook}
          className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <SafeIcon icon={FiFacebook} />
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={copyToClipboard}
          className="p-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
        >
          <SafeIcon icon={FiCopy} />
        </motion.button>
        
        {navigator.share && (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={shareNative}
            className="p-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <SafeIcon icon={FiShare2} />
          </motion.button>
        )}
      </div>
    </div>
  );
};

export default SocialShare;