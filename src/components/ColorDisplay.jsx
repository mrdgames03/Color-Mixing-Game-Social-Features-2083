import React from 'react';
import { motion } from 'framer-motion';

const ColorDisplay = ({ challenge, feedback }) => {
  if (!challenge) return null;

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center">
      <h2 className="text-2xl font-bold text-white mb-6">
        What colors make this?
      </h2>
      
      <motion.div
        key={challenge.targetColor}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-48 h-48 mx-auto rounded-2xl shadow-2xl mb-6"
        style={{ backgroundColor: challenge.targetColor }}
      />
      
      <div className="text-white/80 text-lg">
        <p className="mb-2">RGB: {challenge.rgb.join(', ')}</p>
        <p>Hex: {challenge.targetColor}</p>
      </div>
      
      <div className="mt-6 text-white/60">
        <p className="text-sm">
          Select the primary colors that combine to create this color
        </p>
      </div>
    </div>
  );
};

export default ColorDisplay;