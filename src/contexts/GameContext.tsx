
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
  capitalsEurope: { currentScore: 0, highScore: 0, isComplete: false },
  capitalsAsia: { currentScore: 0, highScore: 0, isComplete: false },
  capitalsNorthAmerica: { currentScore: 0, highScore: 0, isComplete: false },
  capitalsSouthAmerica: { currentScore: 0, highScore: 0, isComplete: false },
  capitalsAfrica: { currentScore: 0, highScore: 0, isComplete: false },
  capitalsAustraliaOceania: { currentScore: 0, highScore: 0, isComplete: false },
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

// Helper to convert region to capitals region
export const getCapitalsCategory = (regionCategory: CategoryId): CategoryId => {
  console.log('Converting region category to capitals category:', regionCategory);
  
  if (regionCategory === 'europe') return 'capitalsEurope';
  if (regionCategory === 'asia') return 'capitalsAsia';
  if (regionCategory === 'northAmerica') return 'capitalsNorthAmerica';
  if (regionCategory === 'southAmerica') return 'capitalsSouthAmerica';
  if (regionCategory === 'africa') return 'capitalsAfrica';
  if (regionCategory === 'australiaOceania') return 'capitalsAustraliaOceania';
  return 'capitals'; // Default if no match
};

// Provider component to wrap the app
export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentCategory, setCurrentCategory] = useState<CategoryId | null>(null);
  const [gameStats, setGameStats] = useState<Record<CategoryId, GameStats>>(() => {
    const savedStats = localStorage.getItem('flagGameStats');
    if (savedStats) {
      try {
        const parsedStats = JSON.parse(savedStats);
        const completeStats = { ...initialGameStats };
        
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
  // Флаг для отслеживания незасохраненных изменений
  const [pendingChanges, setPendingChanges] = useState(false);
  // Время последнего сохранения
  const [lastSaveTime, setLastSaveTime] = useState(0);
  
  useEffect(() => {
    const yaSdk = YandexGamesSDK.getInstance();
    yaSdk.init().then(initialized => {
      setIsSDKInitialized(initialized);
      
      if (initialized) {
        yaSdk.loadUserData().then(progress => {
          if (progress && progress.gameStats) {
            setGameStats(prev => {
              const newStats = { ...prev };
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

  // Сохраняем в localStorage при каждом изменении
  useEffect(() => {
    localStorage.setItem('flagGameStats', JSON.stringify(gameStats));
    // Отмечаем, что есть несохраненные изменения
    setPendingChanges(true);
  }, [gameStats]);
  
  // Отложенное сохранение в Яндекс - только при важных событиях или периодически
  useEffect(() => {
    // Условия для запуска сохранения:
    // 1. Есть несохраненные изменения
    // 2. SDK инициализирован
    // 3. Прошло достаточно времени с последнего сохранения ИЛИ игра окончена
    const shouldSave = pendingChanges && 
                       isSDKInitialized && 
                       (isGameOver || Date.now() - lastSaveTime > 30000); // 30 секунд
    
    if (shouldSave) {
      console.log('Saving game stats to Yandex Games storage...');
      const yaSdk = YandexGamesSDK.getInstance();
      yaSdk.saveUserData({
        gameStats: gameStats,
        highScores: Object.entries(gameStats).reduce((acc, [key, value]) => {
          acc[key] = value.highScore;
          return acc;
        }, {} as Record<string, number>)
      }).then(() => {
        setPendingChanges(false);
        setLastSaveTime(Date.now());
        console.log('Game stats saved successfully');
      }).catch(error => {
        console.error('Error saving game stats:', error);
      });
    }
  }, [gameStats, isSDKInitialized, pendingChanges, lastSaveTime, isGameOver]);

  const showRewardedAd = async (): Promise<boolean> => {
    if (!isSDKInitialized) {
      console.warn('SDK not initialized, cannot show rewarded ad');
      return false;
    }
    
    const yaSdk = YandexGamesSDK.getInstance();
    const wasAdShown = await yaSdk.showRewardedVideo();
    
    if (wasAdShown) {
      setLives(prev => prev + 1);
      setIsGameOver(false);
      
      // После просмотра рекламы сохраняем состояние
      setPendingChanges(true);
    }
    
    return wasAdShown;
  };

  const markCategoryComplete = (category: CategoryId) => {
    setGameStats(prev => {
      const newStats = { ...prev };
      const categoryStats = { ...newStats[category] };
      
      categoryStats.isComplete = true;
      
      if (currentScore > categoryStats.highScore) {
        categoryStats.highScore = currentScore;
      }
      
      newStats[category] = categoryStats;
      return newStats;
    });
    
    // Форсируем сохранение при завершении категории
    setPendingChanges(true);
  };

  const incrementScore = (category: CategoryId) => {
    setCurrentScore(prev => prev + 1);
    
    setGameStats(prev => {
      const newStats = { ...prev };
      const categoryStats = { ...newStats[category] };
      
      categoryStats.currentScore = currentScore + 1;
      
      if (categoryStats.currentScore > categoryStats.highScore) {
        categoryStats.highScore = categoryStats.currentScore;
      }
      
      if (category in gameCategories && categoryStats.currentScore >= gameCategories[category].countries.length) {
        categoryStats.isComplete = true;
        
        // Форсируем сохранение при завершении категории
        setPendingChanges(true);
      }
      
      newStats[category] = categoryStats;
      return newStats;
    });
  };

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
    
    // Сохраняем при сбросе игры
    setPendingChanges(true);
  };

  const startGame = (category: CategoryId) => {
    console.log('Starting game with category:', category);
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

  const viewReference = (category: CategoryId) => {
    console.log('Viewing reference for category:', category);
    setCurrentCategory(category);
    setIsPlaying(false);
  };
  
  // Функция для явного сохранения данных
  const saveGameData = () => {
    if (isSDKInitialized && pendingChanges) {
      console.log('Manually saving game stats...');
      const yaSdk = YandexGamesSDK.getInstance();
      yaSdk.saveUserData({
        gameStats: gameStats,
        highScores: Object.entries(gameStats).reduce((acc, [key, value]) => {
          acc[key] = value.highScore;
          return acc;
        }, {} as Record<string, number>)
      }).then(() => {
        setPendingChanges(false);
        setLastSaveTime(Date.now());
        console.log('Game stats saved successfully');
      });
    }
  };
  
  // Сохраняем данные при завершении игры
  useEffect(() => {
    if (isGameOver) {
      saveGameData();
    }
  }, [isGameOver]);

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
