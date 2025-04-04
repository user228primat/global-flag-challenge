
import React from 'react';
import { useNavigate } from 'react-router-dom';
import CategoryButton from './CategoryButton';
import { categoryDisplayNames, categoryGroups, gameCategories } from '../data';
import { useGameContext } from '../contexts/GameContext';
import { CategoryId } from '../types';
import { Globe, Trophy, Award, Star, Map, BookOpen } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const MainMenu: React.FC = () => {
  const navigate = useNavigate();
  const { gameStats, startGame, viewReference } = useGameContext();
  
  const handleCategoryClick = (categoryId: CategoryId) => {
    if (categoryId === 'capitals') {
      // Для capitals, navigate to region selection
      navigate('/capitals');
      // Сбрасываем скролл при навигации
      window.scrollTo(0, 0);
    } else {
      // Для других категорий, navigate to game mode selection
      navigate(`/category/${categoryId}`);
      // Сбрасываем скролл при навигации
      window.scrollTo(0, 0);
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
    <div className="w-full max-w-xl mx-auto px-4 py-8 min-h-screen">
      {/* Enhanced category cards with better visual hierarchy */}
      <div className="grid grid-cols-1 gap-8">
        <Card className="rounded-2xl p-6 border-none bg-gradient-to-br from-blue-900/80 to-indigo-900/80 backdrop-blur-lg shadow-xl overflow-hidden relative">
          <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <h2 className="text-2xl font-bold mb-5 text-blue-50 flex items-center relative z-10">
            <Trophy size={24} className="mr-3 text-amber-400" />
            По сложности
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {categoryGroups.levels.map((categoryId, index) => {
              const { isCompleted, completedCount, highScore } = getCompletionData(categoryId as CategoryId);
              
              return (
                <div key={categoryId}>
                  <CategoryButton
                    categoryId={categoryId as CategoryId}
                    onClick={() => handleCategoryClick(categoryId as CategoryId)}
                    isCompleted={isCompleted}
                    completedCount={completedCount}
                    highScore={highScore}
                    showCompletionCount={false}
                    showImage={false}
                  />
                </div>
              );
            })}
          </div>
          <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-blue-900/30 to-transparent pointer-events-none"></div>
        </Card>
        
        <Card className="rounded-2xl p-6 border-none bg-gradient-to-br from-indigo-900/80 to-purple-900/80 backdrop-blur-lg shadow-xl overflow-hidden relative">
          <div className="absolute top-0 left-0 w-40 h-40 bg-indigo-500/20 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2"></div>
          <h2 className="text-2xl font-bold mb-5 text-blue-50 flex items-center relative z-10">
            <Map size={24} className="mr-3 text-blue-300" />
            По регионам
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {categoryGroups.regions.map((categoryId, index) => {
              const { isCompleted, completedCount, highScore } = getCompletionData(categoryId as CategoryId);
              
              return (
                <div key={categoryId}>
                  <CategoryButton
                    categoryId={categoryId as CategoryId}
                    onClick={() => handleCategoryClick(categoryId as CategoryId)}
                    isCompleted={isCompleted}
                    completedCount={completedCount}
                    highScore={highScore}
                    showCompletionCount={false}
                  />
                </div>
              );
            })}
          </div>
          <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-purple-900/30 to-transparent pointer-events-none"></div>
        </Card>
        
        <Card className="rounded-2xl p-6 border-none bg-gradient-to-br from-purple-900/80 to-blue-900/80 backdrop-blur-lg shadow-xl overflow-hidden relative">
          <div className="absolute bottom-0 right-0 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl translate-y-1/2 translate-x-1/2"></div>
          <h2 className="text-2xl font-bold mb-5 text-blue-50 flex items-center relative z-10">
            <Award size={24} className="mr-3 text-blue-300" />
            Столицы
          </h2>
          <button
            onClick={() => handleCategoryClick('capitals')}
            className="relative w-full p-5 rounded-xl transition-all duration-300 
                      border border-white/10 bg-gradient-to-br from-blue-800/40 to-indigo-900/40
                      hover:from-blue-700/50 hover:to-indigo-800/50 hover:border-white/20
                      flex items-center gap-4 group overflow-hidden"
          >
            <div className="w-16 h-16 flex items-center justify-center rounded-full 
                          bg-gradient-to-br from-blue-600/40 to-indigo-700/40 
                          group-hover:from-blue-500/50 group-hover:to-indigo-600/50
                          shadow-lg z-10">
              <Globe size={32} className="text-blue-200 group-hover:text-blue-100" />
            </div>
            
            <div className="flex-1 text-left z-10">
              <h3 className="text-xl font-medium text-blue-100 group-hover:text-blue-50 transition-colors">
                Столицы стран
              </h3>
              <p className="text-sm text-blue-300/90 group-hover:text-blue-200 mt-1">
                Выберите регион для игры со столицами
              </p>
              
              {getCapitalsHighScore() > 0 && (
                <div className="mt-2 text-sm text-blue-300/80 flex items-center">
                  <Trophy size={14} className="mr-2 text-amber-400" />
                  <span>Лучший результат: {getCapitalsHighScore()}</span>
                </div>
              )}
            </div>
            
            <div className="text-blue-300 group-hover:text-blue-200 transition-colors z-10">
              <Map size={28} />
            </div>
            
            {isCapitalsComplete() && (
              <Badge variant="default" className="absolute top-3 right-3 bg-green-600/80 hover:bg-green-600/80 px-3 py-1 text-xs font-medium">
                ✓ Завершено
              </Badge>
            )}
            
            {/* Enhanced hover effects */}
            <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-transparent to-indigo-600/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="absolute inset-x-0 h-px bottom-0 bg-gradient-to-r from-transparent via-blue-400/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="absolute inset-x-0 h-px top-0 bg-gradient-to-r from-transparent via-blue-400/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="absolute -inset-1 rounded-xl bg-blue-500/20 blur-xl opacity-0 group-hover:opacity-30 transition-opacity z-0"></div>
          </button>
        </Card>
      </div>
    </div>
  );
};

export default MainMenu;
