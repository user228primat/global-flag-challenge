
import React, { createContext, useContext, useState, useEffect } from 'react';
import { CategoryId, GameContextType, GameStats } from '../types';
import { gameCategories } from '../data';
import YandexGamesSDK from '../services/YandexGamesSDK';

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
  capitals: { currentScore: 0, highScore: 0, isComplete: false },
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
  markCategoryComplete: () => {},
  showRewardedAd: () => Promise.resolve(false),
});

// Custom hook to use the game context
export const useGameContext = () => useContext(GameContext);

// Provider component to wrap the app
export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentCategory, setCurrentCategory] = useState<CategoryId | null>(null);
  const [gameStats, setGameStats] = useState<Record<CategoryId, GameStats>>(() => {
    // Try to load saved game stats from localStorage
    const savedStats = localStorage.getItem('flagGameStats');
    if (savedStats) {
      try {
        const parsedStats = JSON.parse(savedStats);
        // Ensure all categories exist in the loaded stats
        const completeStats = { ...initialGameStats };
        
        // Only copy keys that exist in initialGameStats to avoid invalid categories
        Object.keys(initialGameStats).forEach(key => {
          if (parsedStats[key]) {
            completeStats[key as CategoryId] = parsedStats[key];
          }
        });
        
        return completeStats;
      } catch (error) {
        console.error("Error parsing saved game stats:", error);
        return initialGameStats;
      }
    }
    return initialGameStats;
  });
  
  const [lives, setLives] = useState(3);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [currentScore, setCurrentScore] = useState(0);
  const [isSDKInitialized, setIsSDKInitialized] = useState(false);
  
  // Initialize Yandex Games SDK
  useEffect(() => {
    const yaSdk = YandexGamesSDK.getInstance();
    yaSdk.init().then(initialized => {
      setIsSDKInitialized(initialized);
      
      // If SDK initialized, try to load progress from Yandex cloud
      if (initialized) {
        yaSdk.loadProgress().then(progress => {
          if (progress && progress.gameStats) {
            // Load game stats from Yandex cloud storage
            setGameStats(prev => {
              const newStats = { ...prev };
              // Only copy valid categories
              Object.keys(initialGameStats).forEach(key => {
                if (progress.gameStats[key]) {
                  newStats[key as CategoryId] = progress.gameStats[key];
                }
              });
              return newStats;
            });
          }
        });
      }
    });
  }, []);

  // Save game stats to localStorage and Yandex cloud whenever they change
  useEffect(() => {
    localStorage.setItem('flagGameStats', JSON.stringify(gameStats));
    
    // Save to Yandex cloud if SDK is initialized
    if (isSDKInitialized) {
      const yaSdk = YandexGamesSDK.getInstance();
      yaSdk.saveProgress({
        gameStats: gameStats,
        highScores: Object.entries(gameStats).reduce((acc, [key, value]) => {
          acc[key] = value.highScore;
          return acc;
        }, {} as Record<string, number>)
      });
    }
  }, [gameStats, isSDKInitialized]);

  // Show rewarded ad and restore one life if ad is watched
  const showRewardedAd = async (): Promise<boolean> => {
    if (!isSDKInitialized) {
      console.warn('SDK not initialized, cannot show rewarded ad');
      return false;
    }
    
    const yaSdk = YandexGamesSDK.getInstance();
    return await yaSdk.showRewardedAd(() => {
      // Player got the reward - restore one life
      setLives(prev => prev + 1);
      // Resume game
      setIsGameOver(false);
    });
  };

  // Mark a category as complete
  const markCategoryComplete = (category: CategoryId) => {
    setGameStats(prev => {
      const newStats = { ...prev };
      const categoryStats = { ...newStats[category] };
      
      categoryStats.isComplete = true;
      
      // Ensure high score is updated
      if (currentScore > categoryStats.highScore) {
        categoryStats.highScore = currentScore;
      }
      
      newStats[category] = categoryStats;
      return newStats;
    });
  };

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
      
      // Check if category completion needs to be updated
      if (categoryStats.currentScore >= gameCategories[category].countries.length) {
        categoryStats.isComplete = true;
      }
      
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
        markCategoryComplete,
        showRewardedAd,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
