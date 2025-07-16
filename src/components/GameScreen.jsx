import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ColorDisplay from './ColorDisplay';
import ColorOptions from './ColorOptions';
import ScoreBoard from './ScoreBoard';
import PlayerNameInput from './PlayerNameInput';
import { generateColorChallenge } from '../utils/colorUtils';
import { saveScore } from '../utils/localStorage';

const GameScreen = ({ score, setScore, playerName, setPlayerName, onGameOver }) => {
  const [currentChallenge, setCurrentChallenge] = useState(null);
  const [lives, setLives] = useState(3);
  const [streak, setStreak] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [showNameInput, setShowNameInput] = useState(true);
  const [timeLeft, setTimeLeft] = useState(15);
  const [gameStarted, setGameStarted] = useState(false);
  const [difficulty, setDifficulty] = useState('easy');
  
  useEffect(() => {
    if (gameStarted && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && gameStarted) {
      handleWrongAnswer();
    }
  }, [timeLeft, gameStarted]);

  useEffect(() => {
    if (gameStarted) {
      generateNewChallenge();
    }
  }, [gameStarted, difficulty]);

  const generateNewChallenge = () => {
    const challenge = generateColorChallenge(difficulty);
    setCurrentChallenge(challenge);
    setTimeLeft(15);
    setFeedback('');
  };

  const handleAnswer = (selectedColors) => {
    if (!currentChallenge) return;

    const isCorrect =
      selectedColors.length === currentChallenge.correctAnswer.length &&
      selectedColors.every(color => currentChallenge.correctAnswer.includes(color));

    if (isCorrect) {
      // Calculate points based on difficulty
      let difficultyMultiplier;
      switch(difficulty) {
        case 'easy': difficultyMultiplier = 1; break;
        case 'medium': difficultyMultiplier = 2; break;
        case 'hard': difficultyMultiplier = 3; break;
        default: difficultyMultiplier = 1;
      }
      
      const points = ((streak + 1) * 10 + Math.floor(timeLeft / 2)) * difficultyMultiplier;
      setScore(score + points);
      setStreak(streak + 1);
      setFeedback(`Correct! +${points} points`);
      
      setTimeout(() => {
        generateNewChallenge();
      }, 1500);
    } else {
      handleWrongAnswer();
    }
  };

  const handleWrongAnswer = () => {
    const newLives = lives - 1;
    setLives(newLives);
    setStreak(0);
    setFeedback(`Wrong! The answer was: ${currentChallenge.correctAnswer.join(' + ')}`);

    if (newLives === 0) {
      if (playerName) {
        saveScore(playerName, score);
      }
      setTimeout(() => {
        onGameOver();
      }, 2000);
    } else {
      setTimeout(() => {
        generateNewChallenge();
      }, 2000);
    }
  };

  const startGame = (selectedDifficulty) => {
    if (playerName.trim()) {
      setDifficulty(selectedDifficulty);
      setShowNameInput(false);
      setGameStarted(true);
    }
  };

  if (showNameInput) {
    return (
      <PlayerNameInput playerName={playerName} setPlayerName={setPlayerName} onStart={startGame} />
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <ScoreBoard 
        score={score} 
        lives={lives} 
        streak={streak} 
        timeLeft={timeLeft} 
        playerName={playerName} 
        difficulty={difficulty}
      />

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <ColorDisplay challenge={currentChallenge} feedback={feedback} />
        </div>
        <div>
          <ColorOptions challenge={currentChallenge} onAnswer={handleAnswer} disabled={!!feedback} />
        </div>
      </div>

      <AnimatePresence>
        {feedback && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-sm px-6 py-4 rounded-xl shadow-lg"
          >
            <p className={`text-lg font-semibold ${feedback.includes('Correct') ? 'text-green-600' : 'text-red-600'}`}>
              {feedback}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GameScreen;