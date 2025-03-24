
import React from 'react';
import { useNavigate } from 'react-router-dom';
import CategoryButton from './CategoryButton';
import { categoryDisplayNames, categoryGroups, gameCategories } from '../data';
import { useGameContext } from '../contexts/GameContext';
import { CategoryId } from '../types';
import { Globe, Trophy, Award, Star, Map } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

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
    <div className="w-full max-w-xl mx-auto px-4 py-6 min-h-screen">
      <div className="mb-8 text-center p-8 rounded-2xl bg-gradient-to-br from-indigo-900/30 to-blue-900/20 backdrop-blur-md border border-indigo-700/20 shadow-lg animate-fade-in">
        <Globe size={70} className="mx-auto mb-6 text-blue-300 animate-float" />
        <h1 className="text-4xl font-bold mb-2 text-indigo-100 text-shadow">
          Флаги Мира
        </h1>
        <p className="text-indigo-300/90">
          Проверьте свои знания флагов стран мира
        </p>
      </div>
      
      <div className="grid grid-cols-1 gap-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
        <Card className="rounded-xl p-6 border-indigo-800/30 bg-gradient-to-br from-indigo-950/70 to-blue-950/50 backdrop-blur-sm shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-indigo-100 flex items-center">
            <Trophy size={20} className="mr-2 text-amber-300" />
            По сложности
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {categoryGroups.levels.map((categoryId, index) => {
              const { isCompleted, completedCount, highScore } = getCompletionData(categoryId as CategoryId);
              const totalCount = gameCategories[categoryId as CategoryId].count;
              
              return (
                <div key={categoryId} className="animate-fade-in" style={{ animationDelay: `${0.2 + index * 0.1}s` }}>
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
        </Card>
        
        <Card className="rounded-xl p-6 border-indigo-800/30 bg-gradient-to-br from-indigo-950/70 to-blue-950/50 backdrop-blur-sm shadow-md animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <h2 className="text-xl font-semibold mb-4 text-indigo-100 flex items-center">
            <Map size={20} className="mr-2 text-sky-300" />
            По регионам
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {categoryGroups.regions.map((categoryId, index) => {
              const { isCompleted, completedCount, highScore } = getCompletionData(categoryId as CategoryId);
              const totalCount = gameCategories[categoryId as CategoryId].count;
              
              return (
                <div key={categoryId} className="animate-fade-in" style={{ animationDelay: `${0.4 + index * 0.1}s` }}>
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
        </Card>
        
        <Card className="rounded-xl p-6 border-indigo-800/30 bg-gradient-to-br from-indigo-950/70 to-blue-950/50 backdrop-blur-sm shadow-md animate-fade-in" style={{ animationDelay: '0.5s' }}>
          <h2 className="text-xl font-semibold mb-4 text-indigo-100 flex items-center">
            <Award size={20} className="mr-2 text-sky-300" />
            Столицы
          </h2>
          <button
            onClick={() => navigate('/capitals')}
            className="w-full text-left p-4 rounded-xl transition-all duration-300 
                      hover:border-indigo-700/60 hover:bg-indigo-900/30 group relative 
                      border border-indigo-800/30 bg-gradient-to-br from-indigo-950/70 to-blue-950/50 
                      backdrop-blur-sm shadow-md"
          >
            <div className="flex items-center justify-between">
              <span className="text-lg font-medium text-indigo-100 group-hover:text-white transition-colors">Столицы стран</span>
              <Star size={20} className="text-amber-300" />
            </div>
            <div className="flex items-center mt-2 text-sm text-indigo-200/90 z-10 relative">
              <div className="flex items-center">
                <span>Выберите регион для игры со столицами</span>
              </div>
            </div>
            {getCapitalsHighScore() > 0 && (
              <div className="mt-2 text-xs text-indigo-300/70">
                <span className="flex items-center">
                  <Trophy size={12} className="mr-1 text-amber-300" />
                  Лучший результат: {getCapitalsHighScore()}
                </span>
              </div>
            )}
            {isCapitalsComplete() && (
              <Badge variant="default" className="absolute top-2 right-2 bg-green-500/80 hover:bg-green-500/80 px-2 py-1 text-xs">
                ✓ Завершено
              </Badge>
            )}
            
            {/* Hover effect */}
            <div className="absolute inset-0 bg-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
          </button>
        </Card>
      </div>
    </div>
  );
};

export default MainMenu;
