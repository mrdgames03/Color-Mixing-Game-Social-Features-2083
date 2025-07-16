import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import GameScreen from './components/GameScreen';
import Leaderboard from './components/Leaderboard';
import Navigation from './components/Navigation';
import GameOver from './components/GameOver';
import { motion } from 'framer-motion';
import './App.css';

function App() {
  const [currentScore, setCurrentScore] = useState(0);
  const [gameState, setGameState] = useState('playing'); // 'playing', 'gameOver'
  const [playerName, setPlayerName] = useState('');
  const [difficulty, setDifficulty] = useState('easy');

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
        <Navigation />
        
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route
              path="/"
              element={
                gameState === 'gameOver' ? (
                  <GameOver 
                    score={currentScore} 
                    playerName={playerName} 
                    difficulty={difficulty}
                    onRestart={() => {
                      setGameState('playing');
                      setCurrentScore(0);
                    }}
                  />
                ) : (
                  <GameScreen
                    score={currentScore}
                    setScore={setCurrentScore}
                    playerName={playerName}
                    setPlayerName={setPlayerName}
                    onGameOver={() => {
                      setGameState('gameOver');
                      // Update localStorage here if needed
                    }}
                    setDifficulty={setDifficulty}
                  />
                )
              }
            />
            <Route path="/leaderboard" element={<Leaderboard />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;