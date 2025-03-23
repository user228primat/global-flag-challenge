
import React from 'react';
import { useNavigate } from 'react-router-dom';
import CategoryButton from './CategoryButton';
import { categoryDisplayNames, categoryGroups } from '../data';
import { useGameContext } from '../contexts/GameContext';
import { CategoryId } from '../types';
import { Globe, Trophy, Award } from 'lucide-react';

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
    <div className="w-full max-w-xl mx-auto px-4">
      <div className="mb-12 text-center glass p-8 rounded-2xl bg-gradient-to-br from-primary/20 to-white/5">
        <Globe size={80} className="mx-auto mb-6 text-primary" />
        <h1 className="text-4xl font-bold mb-2 text-white text-shadow">
          Флаги Мира
        </h1>
        <p className="text-white/80">
          Проверьте свои знания флагов стран мира
        </p>
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        <section className="glass rounded-xl p-6 border border-white/10 bg-gradient-to-br from-primary/5 to-white/5">
          <h2 className="text-xl font-bold mb-3 text-white/90 flex items-center">
            <Trophy size={20} className="mr-2 text-warning" />
            По сложности
          </h2>
          <div className="space-y-2">
            {categoryGroups.levels.map((categoryId) => {
              const { isCompleted, completedCount, highScore } = getCompletionData(categoryId as CategoryId);
              return (
                <CategoryButton
                  key={categoryId}
                  categoryId={categoryId as CategoryId}
                  onClick={() => handleCategoryClick(categoryId as CategoryId)}
                  isCompleted={isCompleted}
                  completedCount={completedCount}
                  highScore={highScore}
                />
              );
            })}
          </div>
        </section>
        
        <section className="glass rounded-xl p-6 border border-white/10 bg-gradient-to-br from-info/5 to-white/5">
          <h2 className="text-xl font-bold mb-3 text-white/90 flex items-center">
            <Globe size={20} className="mr-2 text-info" />
            По регионам
          </h2>
          <div className="space-y-2">
            {categoryGroups.regions.map((categoryId) => {
              const { isCompleted, completedCount, highScore } = getCompletionData(categoryId as CategoryId);
              return (
                <CategoryButton
                  key={categoryId}
                  categoryId={categoryId as CategoryId}
                  onClick={() => handleCategoryClick(categoryId as CategoryId)}
                  isCompleted={isCompleted}
                  completedCount={completedCount}
                  highScore={highScore}
                />
              );
            })}
          </div>
        </section>
        
        <section className="glass rounded-xl p-6 border border-white/10 bg-gradient-to-br from-warning/5 to-white/5">
          <h2 className="text-xl font-bold mb-3 text-white/90 flex items-center">
            <Award size={20} className="mr-2 text-warning" />
            Столицы
          </h2>
          <button
            onClick={() => navigate('/capitals')}
            className="glass w-full text-left p-4 rounded-xl transition-all duration-300 hover:bg-white/10 group border border-white/10 bg-gradient-to-r from-white/5 to-transparent"
          >
            <div className="flex items-center justify-between">
              <span className="text-lg font-medium text-white">Столицы стран</span>
              <Globe size={20} className="text-white/60" />
            </div>
            <div className="flex items-center justify-between mt-2 text-sm text-white/60">
              <div className="flex items-center">
                <Trophy size={14} className="mr-1" />
                <span>Рекорд: {getCapitalsHighScore()}</span>
              </div>
              {isCapitalsComplete() && (
                <span className="text-success">Завершено</span>
              )}
            </div>
          </button>
        </section>
      </div>
    </div>
  );
};

export default MainMenu;
