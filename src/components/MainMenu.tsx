
import React from 'react';
import { useNavigate } from 'react-router-dom';
import CategoryButton from './CategoryButton';
import { categoryDisplayNames, categoryGroups, gameCategories } from '../data';
import { useGameContext } from '../contexts/GameContext';
import { CategoryId } from '../types';
import { Globe, Trophy, Award, Star, Map, BookOpen, Sparkles } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const MainMenu: React.FC = () => {
  const navigate = useNavigate();
  const { gameStats, startGame, viewReference } = useGameContext();
  
  const handleCategoryClick = (categoryId: CategoryId) => {
    if (categoryId === 'capitals') {
      navigate('/capitals');
      window.scrollTo(0, 0);
    } else {
      navigate(`/category/${categoryId}`);
      window.scrollTo(0, 0);
    }
  };

  const getCompletionData = (categoryId: CategoryId) => {
    const stats = gameStats[categoryId] || { currentScore: 0, highScore: 0, isComplete: false };
    const isCompleted = stats.isComplete;
    const completedCount = stats.currentScore;
    const highScore = stats.highScore;
    
    return { isCompleted, completedCount, highScore };
  };

  const getCapitalsHighScore = () => {
    if (gameStats && gameStats.capitals) {
      return gameStats.capitals.highScore;
    }
    return 0;
  };

  const isCapitalsComplete = () => {
    if (gameStats && gameStats.capitals) {
      return gameStats.capitals.isComplete;
    }
    return false;
  };

  return (
    <div className="w-full max-w-xl mx-auto px-4 py-4">
      <div className="grid grid-cols-1 gap-6">
        {/* Карточка сложности */}
        <Card className="rounded-xl p-6 border-none bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-lg shadow-[0_8px_30px_rgba(0,0,0,0.12)] overflow-hidden relative">
          <div className="absolute top-0 right-0 w-40 h-40 bg-indigo-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <h2 className="text-2xl font-bold mb-5 text-gray-100 flex items-center relative z-10">
            <Trophy size={24} className="mr-3 text-amber-400" />
            По сложности
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {categoryGroups.levels.map((categoryId) => {
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
          <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-gray-900/20 to-transparent pointer-events-none"></div>
        </Card>
        
        {/* Карточка регионов */}
        <Card className="rounded-xl p-6 border-none bg-gradient-to-br from-gray-800/90 to-gray-950/90 backdrop-blur-lg shadow-[0_8px_30px_rgba(0,0,0,0.12)] overflow-hidden relative">
          <div className="absolute top-0 left-0 w-40 h-40 bg-blue-500/5 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2"></div>
          <h2 className="text-2xl font-bold mb-5 text-gray-100 flex items-center relative z-10">
            <Map size={24} className="mr-3 text-blue-400" />
            По регионам
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {categoryGroups.regions.map((categoryId) => {
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
          <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-gray-900/20 to-transparent pointer-events-none"></div>
        </Card>
        
        {/* Карточка столицы */}
        <Card className="rounded-xl p-6 border-none bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-lg shadow-[0_8px_30px_rgba(0,0,0,0.12)] overflow-hidden relative">
          <div className="absolute bottom-0 right-0 w-40 h-40 bg-blue-500/5 rounded-full blur-3xl translate-y-1/2 translate-x-1/2"></div>
          <h2 className="text-2xl font-bold mb-5 text-gray-100 flex items-center relative z-10">
            <Award size={24} className="mr-3 text-blue-400" />
            Столицы
          </h2>
          <button
            onClick={() => handleCategoryClick('capitals')}
            className="relative w-full p-5 rounded-xl transition-all duration-300 
                      border border-gray-700/30 bg-gradient-to-br from-gray-800/40 to-gray-900/40
                      hover:from-gray-700/50 hover:to-gray-800/50 hover:border-gray-600/40
                      flex items-center gap-4 group overflow-hidden"
          >
            <div className="w-16 h-16 flex items-center justify-center rounded-full 
                          bg-gradient-to-br from-indigo-600/30 to-indigo-800/30 
                          group-hover:from-indigo-500/40 group-hover:to-indigo-700/40
                          shadow-xl z-10">
              <Globe size={32} className="text-indigo-300 group-hover:text-indigo-200" />
            </div>
            
            <div className="flex-1 text-left z-10">
              <h3 className="text-xl font-medium text-gray-200 group-hover:text-white transition-colors">
                Столицы стран
              </h3>
              <p className="text-sm text-gray-400 group-hover:text-gray-300 mt-1">
                Выберите регион для игры со столицами
              </p>
              
              {getCapitalsHighScore() > 0 && (
                <div className="mt-2 text-sm text-gray-400 flex items-center">
                  <Trophy size={14} className="mr-2 text-amber-400" />
                  <span>Лучший результат: {getCapitalsHighScore()}</span>
                </div>
              )}
            </div>
            
            <div className="text-indigo-400 group-hover:text-indigo-300 transition-colors z-10">
              <Map size={28} />
            </div>
            
            {isCapitalsComplete() && (
              <Badge variant="default" className="absolute top-3 right-3 bg-emerald-700/80 hover:bg-emerald-700/80 px-3 py-1 text-xs font-medium">
                ✓ Завершено
              </Badge>
            )}
            
            {/* Эффекты при наведении */}
            <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/10 via-transparent to-indigo-600/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="absolute inset-x-0 h-px bottom-0 bg-gradient-to-r from-transparent via-indigo-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="absolute inset-x-0 h-px top-0 bg-gradient-to-r from-transparent via-indigo-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="absolute -inset-1 rounded-xl bg-indigo-500/10 blur-xl opacity-0 group-hover:opacity-20 transition-opacity z-0"></div>
          </button>
        </Card>
      </div>
      
      {/* Декоративные элементы */}
      <div className="w-full max-w-xl mx-auto mt-8 flex justify-center">
        <div className="text-center text-gray-500 text-sm flex items-center">
          <Sparkles size={14} className="mr-2 text-indigo-400/70" />
          <span>Учитесь и играйте</span>
        </div>
      </div>
    </div>
  );
};

export default MainMenu;
