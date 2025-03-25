
import React from 'react';
import { useNavigate } from 'react-router-dom';
import CategoryButton from './CategoryButton';
import { categoryDisplayNames, categoryGroups, gameCategories } from '../data';
import { useGameContext } from '../contexts/GameContext';
import { CategoryId } from '../types';
import { Globe, Trophy, Award, Star, Map, BookOpen } from 'lucide-react';
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
      <div className="mb-8 text-center p-8 rounded-2xl bg-gradient-to-br from-[#2D3748]/80 to-[#1A202C]/70 backdrop-blur-md border border-slate-800/50 shadow-xl">
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-blue-700/10 blur-xl"></div>
          <Globe size={70} className="mx-auto mb-6 text-blue-500 relative z-10" />
        </div>
        <h1 className="text-4xl font-bold mb-2 text-blue-50 text-shadow">
          Флаги Мира
        </h1>
        <p className="text-blue-300/90">
          Проверьте свои знания флагов стран мира
        </p>
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        <Card className="rounded-xl p-6 border-slate-800/50 bg-gradient-to-br from-[#2D3748]/90 to-[#1A202C]/80 backdrop-blur-sm shadow-xl">
          <h2 className="text-xl font-semibold mb-4 text-blue-100 flex items-center">
            <Trophy size={20} className="mr-2 text-amber-400" />
            По сложности
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {categoryGroups.levels.map((categoryId, index) => {
              const { isCompleted, completedCount, highScore } = getCompletionData(categoryId as CategoryId);
              const totalCount = gameCategories[categoryId as CategoryId].count;
              
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
        </Card>
        
        <Card className="rounded-xl p-6 border-slate-800/50 bg-gradient-to-br from-[#2D3748]/90 to-[#1A202C]/80 backdrop-blur-sm shadow-xl">
          <h2 className="text-xl font-semibold mb-4 text-blue-100 flex items-center">
            <Map size={20} className="mr-2 text-blue-500" />
            По регионам
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {categoryGroups.regions.map((categoryId, index) => {
              const { isCompleted, completedCount, highScore } = getCompletionData(categoryId as CategoryId);
              const totalCount = gameCategories[categoryId as CategoryId].count;
              
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
        </Card>
        
        <Card className="rounded-xl p-6 border-slate-800/50 bg-gradient-to-br from-[#2D3748]/90 to-[#1A202C]/80 backdrop-blur-sm shadow-xl">
          <h2 className="text-xl font-semibold mb-4 text-blue-100 flex items-center">
            <Award size={20} className="mr-2 text-blue-500" />
            Столицы
          </h2>
          <div 
            onClick={() => navigate('/capitals')}
            className="w-full relative overflow-hidden rounded-xl border transition-all duration-300 hover:scale-[1.02] hover:shadow-xl border-slate-800/50 shadow-lg bg-gradient-to-br from-[#2D3748] to-[#1A202C] backdrop-blur-sm cursor-pointer"
          >
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-600/20 mr-3">
                  <Star size={18} className="text-blue-400" />
                </div>
                <div className="text-left">
                  <div className="text-base font-medium text-blue-100">Столицы стран</div>
                  <div className="text-xs text-blue-300/80">Выберите регион для игры</div>
                </div>
              </div>
              
              <div className="flex flex-col items-end">
                <div className="text-xs text-blue-300/90 flex items-center">
                  <Trophy size={12} className="mr-1 text-amber-400" />
                  <span>Рекорд: {getCapitalsHighScore()}</span>
                </div>
              </div>
            </div>
            
            {isCapitalsComplete() && (
              <Badge variant="default" className="absolute top-2 right-2 bg-green-600/80 hover:bg-green-600/80 px-2 py-1 text-xs">
                ✓ Завершено
              </Badge>
            )}
            
            {/* Subtle hover effects */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-blue-600/5 to-blue-600/0 opacity-0 hover:opacity-100 transition-opacity duration-300" />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default MainMenu;
