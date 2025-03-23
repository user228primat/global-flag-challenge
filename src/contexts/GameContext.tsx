
import React, { createContext, useContext, useState, useEffect } from 'react';
import { CategoryId, GameContextType, GameStats } from '../types';

// Initial game stats for all categories
const initialGameStats: Record<CategoryId, GameStats> = {
  level1: { currentScore: 0, highScore: 0, isComplete: false },
  level2: { currentScore: 0, highScore: 0, isComplete: false },
  level3: { currentScore: 0, highScore: 0, isComplete: false },
  allFlags: { currentScore: 0, highScore: 0, isComplete: false },
  europe: { currentScore: 0, highScore: 0, isComplete: false },
  asia: { currentScore: 0, highScore: 0, isComplete: false },
  northAmerica: { currentScore: 0, highScore: 0, isComplete: false },
  southAmerica: { currentScore: 0, highScore: 0, isComplete: false },
  africa: { currentScore: 0, highScore: 0, isComplete: false },
  australiaOceania: { currentScore: 0, highScore: 0, isComplete: false },
};

// Create the context with default values
const GameContext = createContext<GameContextType>({
  currentCategory: null,
  gameStats: initialGameStats,
  lives: 3,
  isPlaying: false,
  isGameOver: false,
  currentScore: 0,
  setCurrentCategory: () => {},
  setLives: () => {},
  setIsPlaying: () => {},
  setIsGameOver: () => {},
  incrementScore: () => {},
  resetGame: () => {},
  startGame: () => {},
  viewReference: () => {},
});

// Custom hook to use the game context
export const useGameContext = () => useContext(GameContext);

// Provider component to wrap the app
export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentCategory, setCurrentCategory] = useState<CategoryId | null>(null);
  const [gameStats, setGameStats] = useState<Record<CategoryId, GameStats>>(() => {
    // Try to load saved game stats from localStorage
    const savedStats = localStorage.getItem('flagGameStats');
    return savedStats ? JSON.parse(savedStats) : initialGameStats;
  });
  const [lives, setLives] = useState(3);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [currentScore, setCurrentScore] = useState(0);

  // Save game stats to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('flagGameStats', JSON.stringify(gameStats));
  }, [gameStats]);

  // Increment the score for a category
  const incrementScore = (category: CategoryId) => {
    setCurrentScore(prev => prev + 1);
    
    setGameStats(prev => {
      const newStats = { ...prev };
      const categoryStats = { ...newStats[category] };
      
      // Update current score
      categoryStats.currentScore = currentScore + 1;
      
      // Update high score if current score is higher
      if (categoryStats.currentScore > categoryStats.highScore) {
        categoryStats.highScore = categoryStats.currentScore;
      }
      
      // Check if all flags in the category have been successfully identified
      // This would need to be compared with the total count from gameCategories
      // We'll set this in the game logic when appropriate
      
      newStats[category] = categoryStats;
      return newStats;
    });
  };

  // Reset the game state
  const resetGame = () => {
    setLives(3);
    setIsPlaying(false);
    setIsGameOver(false);
    setCurrentScore(0);
    
    if (currentCategory) {
      setGameStats(prev => {
        const newStats = { ...prev };
        const categoryStats = { ...newStats[currentCategory] };
        categoryStats.currentScore = 0;
        newStats[currentCategory] = categoryStats;
        return newStats;
      });
    }
  };

  // Start a new game in a specific category
  const startGame = (category: CategoryId) => {
    setCurrentCategory(category);
    setLives(3);
    setIsPlaying(true);
    setIsGameOver(false);
    setCurrentScore(0);
    
    setGameStats(prev => {
      const newStats = { ...prev };
      const categoryStats = { ...newStats[category] };
      categoryStats.currentScore = 0;
      newStats[category] = categoryStats;
      return newStats;
    });
  };

  // View reference table for a category
  const viewReference = (category: CategoryId) => {
    setCurrentCategory(category);
    setIsPlaying(false);
  };

  return (
    <GameContext.Provider
      value={{
        currentCategory,
        gameStats,
        lives,
        isPlaying,
        isGameOver,
        currentScore,
        setCurrentCategory,
        setLives,
        setIsPlaying,
        setIsGameOver,
        incrementScore,
        resetGame,
        startGame,
        viewReference,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
