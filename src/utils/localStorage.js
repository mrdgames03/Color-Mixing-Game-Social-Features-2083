const SCORES_KEY = 'colorMasterScores';

export const saveScore = (name, score, difficulty = 'easy') => {
  const scores = getTopScores();
  
  const newScore = {
    name,
    score,
    difficulty,
    date: new Date().toISOString()
  };
  
  scores.push(newScore);
  scores.sort((a, b) => b.score - a.score);
  
  // Keep only top 10 scores 
  const topScores = scores.slice(0, 10);
  localStorage.setItem(SCORES_KEY, JSON.stringify(topScores));
};

export const getTopScores = () => {
  try {
    const scores = localStorage.getItem(SCORES_KEY);
    return scores ? JSON.parse(scores) : [];
  } catch (error) {
    console.error('Error loading scores:', error);
    return [];
  }
};

export const clearScores = () => {
  localStorage.removeItem(SCORES_KEY);
};

export const getPlayerBestScore = (playerName) => {
  const scores = getTopScores();
  const playerScores = scores.filter(score => score.name === playerName);
  return playerScores.length > 0 ? Math.max(...playerScores.map(s => s.score)) : 0;
};