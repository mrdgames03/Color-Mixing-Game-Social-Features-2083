// Color theory utilities for generating challenges

// Helper function to get challenges based on difficulty
export const getChallengesByDifficulty = (difficulty) => {
  // Basic RGB combinations (Easy - 2 colors)
  const easyLevelChallenges = [
    {
      targetColor: '#FF00FF', // Magenta
      rgb: [255, 0, 255],
      correctAnswer: ['Red', 'Blue'],
      explanation: 'Magenta is created by combining red and blue light'
    },
    {
      targetColor: '#FFFF00', // Yellow
      rgb: [255, 255, 0],
      correctAnswer: ['Red', 'Green'],
      explanation: 'Yellow is created by combining red and green light'
    },
    {
      targetColor: '#00FFFF', // Cyan
      rgb: [0, 255, 255],
      correctAnswer: ['Green', 'Blue'],
      explanation: 'Cyan is created by combining green and blue light'
    },
    {
      targetColor: '#FF8000', // Orange
      rgb: [255, 128, 0],
      correctAnswer: ['Red', 'Yellow'],
      explanation: 'Orange is created by combining red and yellow'
    },
    {
      targetColor: '#8000FF', // Purple
      rgb: [128, 0, 255],
      correctAnswer: ['Red', 'Blue'],
      explanation: 'Purple is created by combining red and blue'
    },
    {
      targetColor: '#00FF80', // Spring Green
      rgb: [0, 255, 128],
      correctAnswer: ['Green', 'Cyan'],
      explanation: 'Spring green is created by combining green and cyan'
    },
    {
      targetColor: '#FF0080', // Rose
      rgb: [255, 0, 128],
      correctAnswer: ['Red', 'Magenta'],
      explanation: 'Rose is created by combining red and magenta'
    },
    {
      targetColor: '#80FF00', // Lime
      rgb: [128, 255, 0],
      correctAnswer: ['Green', 'Yellow'],
      explanation: 'Lime is created by combining green and yellow'
    }
  ];

  // Medium level challenges (3 colors)
  const mediumLevelChallenges = [
    {
      targetColor: '#FFA500', // Orange
      rgb: [255, 165, 0],
      correctAnswer: ['Red', 'Yellow', 'Green'],
      explanation: 'This shade of orange combines red, yellow and a bit of green'
    },
    {
      targetColor: '#800080', // Purple
      rgb: [128, 0, 128],
      correctAnswer: ['Red', 'Blue', 'Magenta'],
      explanation: 'This purple shade mixes red, blue and magenta'
    },
    {
      targetColor: '#008080', // Teal
      rgb: [0, 128, 128],
      correctAnswer: ['Green', 'Blue', 'Cyan'],
      explanation: 'Teal is created by mixing green, blue and cyan'
    },
    {
      targetColor: '#A52A2A', // Brown
      rgb: [165, 42, 42],
      correctAnswer: ['Red', 'Green', 'Yellow'],
      explanation: 'Brown combines red, green and yellow'
    },
    {
      targetColor: '#C0C0C0', // Silver
      rgb: [192, 192, 192],
      correctAnswer: ['Red', 'Green', 'Blue'],
      explanation: 'Silver/gray is created by combining all three primary colors equally'
    },
    {
      targetColor: '#808000', // Olive
      rgb: [128, 128, 0],
      correctAnswer: ['Red', 'Green', 'Yellow'],
      explanation: 'Olive green combines red, green, and yellow'
    }
  ];

  // Hard level challenges (4 colors)
  const hardLevelChallenges = [
    {
      targetColor: '#8A2BE2', // BlueViolet
      rgb: [138, 43, 226],
      correctAnswer: ['Red', 'Blue', 'Magenta', 'Cyan'],
      explanation: 'BlueViolet combines red, blue, magenta and cyan'
    },
    {
      targetColor: '#FFD700', // Gold
      rgb: [255, 215, 0],
      correctAnswer: ['Red', 'Green', 'Yellow', 'Cyan'],
      explanation: 'Gold combines red, green, yellow and a bit of cyan'
    },
    {
      targetColor: '#4B0082', // Indigo
      rgb: [75, 0, 130],
      correctAnswer: ['Red', 'Blue', 'Purple', 'Magenta'],
      explanation: 'Indigo is a mix of red, blue, purple and magenta'
    },
    {
      targetColor: '#2E8B57', // SeaGreen
      rgb: [46, 139, 87],
      correctAnswer: ['Green', 'Blue', 'Cyan', 'Yellow'],
      explanation: 'SeaGreen combines green, blue, cyan and yellow'
    },
    {
      targetColor: '#D2691E', // Chocolate
      rgb: [210, 105, 30],
      correctAnswer: ['Red', 'Green', 'Yellow', 'Orange'],
      explanation: 'Chocolate brown combines red, green, yellow and orange'
    }
  ];

  switch (difficulty) {
    case 'easy':
      return easyLevelChallenges;
    case 'medium':
      return mediumLevelChallenges;
    case 'hard':
      return hardLevelChallenges;
    default:
      return easyLevelChallenges;
  }
};

export const generateColorChallenge = (difficulty) => {
  const challenges = getChallengesByDifficulty(difficulty);
  return challenges[Math.floor(Math.random() * challenges.length)];
};

// Helper function to convert RGB to hex
export const rgbToHex = (r, g, b) => {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
};

// Helper function to convert hex to RGB
export const hexToRgb = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
};