import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiCheck } = FiIcons;

const ColorOptions = ({ challenge, onAnswer, disabled }) => {
  const [selectedColors, setSelectedColors] = useState([]);

  if (!challenge) return null;

  const toggleColor = (color) => {
    if (disabled) return;
    setSelectedColors(prev => 
      prev.includes(color) 
        ? prev.filter(c => c !== color) 
        : [...prev, color]
    );
  };

  const submitAnswer = () => {
    if (selectedColors.length === 0 || disabled) return;
    onAnswer(selectedColors);
    setSelectedColors([]);
  };

  const colors = [
    { name: 'Red', color: '#FF0000' },
    { name: 'Green', color: '#00FF00' },
    { name: 'Blue', color: '#0000FF' },
    { name: 'Yellow', color: '#FFFF00' },
    { name: 'Cyan', color: '#00FFFF' },
    { name: 'Magenta', color: '#FF00FF' },
    { name: 'Orange', color: '#FFA500' },
    { name: 'Purple', color: '#800080' }
  ];

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
      <h3 className="text-xl font-bold text-white mb-6 text-center">
        Select Colors ({selectedColors.length} selected)
      </h3>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        {colors.map((colorOption) => (
          <motion.button
            key={colorOption.name}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => toggleColor(colorOption.name)}
            disabled={disabled}
            className={`relative p-4 rounded-xl border-2 transition-all ${
              selectedColors.includes(colorOption.name)
                ? 'border-white shadow-lg'
                : 'border-white/30 hover:border-white/60'
            } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            style={{ backgroundColor: colorOption.color }}
          >
            <span className="text-white font-semibold text-shadow">
              {colorOption.name}
            </span>
            
            {selectedColors.includes(colorOption.name) && (
              <div className="absolute top-2 right-2 bg-white rounded-full p-1">
                <SafeIcon icon={FiCheck} className="text-green-600 text-sm" />
              </div>
            )}
          </motion.button>
        ))}
      </div>
      
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={submitAnswer}
        disabled={selectedColors.length === 0 || disabled}
        className={`w-full py-4 rounded-xl font-semibold text-lg transition-all ${
          selectedColors.length === 0 || disabled
            ? 'bg-gray-500 text-gray-300 cursor-not-allowed'
            : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700'
        }`}
      >
        Submit Answer
      </motion.button>
    </div>
  );
};

export default ColorOptions;