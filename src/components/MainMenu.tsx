
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
      <div className="mb-8 text-center p-8 rounded-2xl bg-gradient-to-br from-slate-900/80 to-slate-950/70 backdrop-blur-md border border-slate-800/50 shadow-xl animate-fade-in">
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-blue-700/10 blur-xl"></div>
          <Globe size={70} className="mx-auto mb-6 text-blue-500 animate-float relative z-10" />
        </div>
        <h1 className="text-4xl font-bold mb-2 text-blue-50 text-shadow">
          Флаги Мира
        </h1>
        <p className="text-blue-300/90">
          Проверьте свои знания флагов стран мира
        </p>
      </div>
      
      <div className="grid grid-cols-1 gap-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
        <Card className="rounded-xl p-6 border-slate-800/50 bg-gradient-to-br from-slate-900/90 to-slate-950/80 backdrop-blur-sm shadow-xl">
          <h2 className="text-xl font-semibold mb-4 text-blue-100 flex items-center">
            <Trophy size={20} className="mr-2 text-amber-400" />
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
        
        <Card className="rounded-xl p-6 border-slate-800/50 bg-gradient-to-br from-slate-900/90 to-slate-950/80 backdrop-blur-sm shadow-xl animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <h2 className="text-xl font-semibold mb-4 text-blue-100 flex items-center">
            <Map size={20} className="mr-2 text-blue-500" />
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
        
        <Card className="rounded-xl p-6 border-slate-800/50 bg-gradient-to-br from-slate-900/90 to-slate-950/80 backdrop-blur-sm shadow-xl animate-fade-in" style={{ animationDelay: '0.5s' }}>
          <h2 className="text-xl font-semibold mb-4 text-blue-100 flex items-center">
            <Award size={20} className="mr-2 text-blue-500" />
            Столицы
          </h2>
          <Button
            onClick={() => navigate('/capitals')}
            variant="ghost"
            className="w-full text-left p-4 rounded-xl transition-all duration-300 
                    hover:border-blue-900 hover:bg-slate-800/50 group relative 
                    border border-slate-800/50 bg-gradient-to-br from-slate-900/90 to-slate-950/80
                    backdrop-blur-sm shadow-lg"
          >
            <div className="flex items-center justify-between">
              <span className="text-lg font-medium text-blue-100 group-hover:text-white transition-colors">Столицы стран</span>
              <Star size={20} className="text-amber-400" />
            </div>
            <div className="flex items-center mt-2 text-sm text-blue-300/90 z-10 relative">
              <div className="flex items-center">
                <span>Выберите регион для игры со столицами</span>
              </div>
            </div>
            {getCapitalsHighScore() > 0 && (
              <div className="mt-2 text-xs text-blue-400/80">
                <span className="flex items-center">
                  <Trophy size={12} className="mr-1 text-amber-400" />
                  Лучший результат: {getCapitalsHighScore()}
                </span>
              </div>
            )}
            {isCapitalsComplete() && (
              <Badge variant="default" className="absolute top-2 right-2 bg-green-600/80 hover:bg-green-600/80 px-2 py-1 text-xs">
                ✓ Завершено
              </Badge>
            )}
            
            {/* Highlight effect on edges */}
            <div className="absolute inset-x-0 h-px top-0 bg-gradient-to-r from-transparent via-blue-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="absolute inset-x-0 h-px bottom-0 bg-gradient-to-r from-transparent via-blue-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            
            {/* Hover effect */}
            <div className="absolute inset-0 bg-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default MainMenu;
