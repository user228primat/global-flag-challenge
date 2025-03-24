
import React from 'react';
import { useNavigate } from 'react-router-dom';
import CategoryButton from './CategoryButton';
import { categoryDisplayNames, categoryGroups, gameCategories } from '../data';
import { useGameContext } from '../contexts/GameContext';
import { CategoryId } from '../types';
import { Globe, Trophy, Award, Star } from 'lucide-react';

const MainMenu: React.FC = () => {
  const navigate = useNavigate();
  const { gameStats, startGame, viewReference } = useGameContext();
  
  const handleCategoryClick = (categoryId: CategoryId) => {
    if (categoryId === 'capitals') {
      // For capitals, navigate to region selection
      navigate('/capitals');
    } else {
      // For other categories, navigate to game mode selection
      navigate(`/category/${categoryId}`);
    }
  };

  // Function to calculate completion status and count for a category
  const getCompletionData = (categoryId: CategoryId) => {
    // Check if category stats exist, if not return defaults
    const stats = gameStats[categoryId] || { currentScore: 0, highScore: 0, isComplete: false };
    const isCompleted = stats.isComplete;
    const completedCount = stats.currentScore;
    const highScore = stats.highScore;
    
    return { isCompleted, completedCount, highScore };
  };

  // Safe way to get capitals highScore with fallback
  const getCapitalsHighScore = () => {
    if (gameStats && gameStats.capitals) {
      return gameStats.capitals.highScore;
    }
    return 0;
  };

  // Safe way to check if capitals is completed
  const isCapitalsComplete = () => {
    if (gameStats && gameStats.capitals) {
      return gameStats.capitals.isComplete;
    }
    return false;
  };

  return (
    <div className="w-full max-w-xl mx-auto px-4 py-8 min-h-screen bg-gradient-to-b from-blue-950 to-indigo-950">
      <div className="mb-8 text-center p-8 rounded-2xl bg-blue-900/20 backdrop-blur-md border border-blue-800/30">
        <Globe size={70} className="mx-auto mb-6 text-blue-400 animate-float" />
        <h1 className="text-4xl font-bold mb-2 text-blue-100 text-shadow">
          Флаги Мира
        </h1>
        <p className="text-blue-200/80">
          Проверьте свои знания флагов стран мира
        </p>
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        <section className="rounded-xl p-6 border border-blue-800/30 bg-blue-900/10 backdrop-blur-sm">
          <h2 className="text-xl font-bold mb-3 text-blue-100 flex items-center">
            <Trophy size={20} className="mr-2 text-yellow-400" />
            По сложности
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {categoryGroups.levels.map((categoryId) => {
              const { isCompleted, completedCount, highScore } = getCompletionData(categoryId as CategoryId);
              const totalCount = gameCategories[categoryId as CategoryId].count;
              
              return (
                <CategoryButton
                  key={categoryId}
                  categoryId={categoryId as CategoryId}
                  onClick={() => handleCategoryClick(categoryId as CategoryId)}
                  isCompleted={isCompleted}
                  completedCount={completedCount}
                  highScore={highScore}
                  showCompletionCount={false}
                  showImage={false}
                />
              );
            })}
          </div>
        </section>
        
        <section className="rounded-xl p-6 border border-blue-800/30 bg-blue-900/10 backdrop-blur-sm">
          <h2 className="text-xl font-bold mb-3 text-blue-100 flex items-center">
            <Globe size={20} className="mr-2 text-blue-400" />
            По регионам
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {categoryGroups.regions.map((categoryId) => {
              const { isCompleted, completedCount, highScore } = getCompletionData(categoryId as CategoryId);
              const totalCount = gameCategories[categoryId as CategoryId].count;
              
              return (
                <CategoryButton
                  key={categoryId}
                  categoryId={categoryId as CategoryId}
                  onClick={() => handleCategoryClick(categoryId as CategoryId)}
                  isCompleted={isCompleted}
                  completedCount={completedCount}
                  highScore={highScore}
                  showCompletionCount={false}
                />
              );
            })}
          </div>
        </section>
        
        <section className="rounded-xl p-6 border border-blue-800/30 bg-blue-900/10 backdrop-blur-sm">
          <h2 className="text-xl font-bold mb-3 text-blue-100 flex items-center">
            <Award size={20} className="mr-2 text-blue-400" />
            Столицы
          </h2>
          <button
            onClick={() => navigate('/capitals')}
            className="w-full text-left p-4 rounded-xl transition-all duration-300 
                      hover:bg-blue-800/20 group border border-blue-700/30 
                      bg-gradient-to-r from-blue-900/30 to-blue-900/10 backdrop-blur-sm"
          >
            <div className="flex items-center justify-between">
              <span className="text-lg font-medium text-blue-100">Столицы стран</span>
              <Star size={20} className="text-yellow-400" />
            </div>
            <div className="flex items-center mt-2 text-sm text-blue-200/80">
              <div className="flex items-center">
                <span>Выберите регион для игры со столицами</span>
              </div>
            </div>
            {getCapitalsHighScore() > 0 && (
              <div className="mt-2 text-xs text-blue-300/60">
                <span className="flex items-center">
                  <Trophy size={12} className="mr-1 text-yellow-400" />
                  Лучший результат: {getCapitalsHighScore()}
                </span>
              </div>
            )}
            {isCapitalsComplete() && (
              <div className="absolute top-2 right-2 bg-green-500/70 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm">
                ✓ Завершено
              </div>
            )}
          </button>
        </section>
      </div>
    </div>
  );
};

export default MainMenu;
