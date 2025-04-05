
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { categoryDisplayNames, categoryGroups, gameCategories } from '../data';
import { useGameContext } from '../contexts/GameContext';
import { CategoryId } from '../types';
import { Globe, Trophy, Award, Star, Map, BookOpen, Sparkles, ChevronRight, Headphones, Layers } from 'lucide-react';
import RegionImages from './RegionImages';

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
    const totalCount = gameCategories[categoryId]?.countries?.length || 0;
    
    return { isCompleted, completedCount, highScore, totalCount };
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
    <div className="w-full max-w-xl mx-auto pb-12">
      <div className="space-y-6">
        {/* Categories Section */}
        <div className="bg-background-card rounded-2xl p-5 backdrop-blur-sm border border-border shadow-elegant overflow-hidden relative">
          {/* Background accents */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          
          <div className="flex items-center mb-4">
            <Layers size={20} className="mr-3 text-accent" />
            <h2 className="text-xl font-medium text-foreground">Категории</h2>
          </div>
          
          {/* Difficulty Section */}
          <div className="mb-5">
            <div className="flex items-center mb-3 px-1">
              <Star size={16} className="mr-2 text-amber-400/90" />
              <h3 className="text-sm font-medium text-foreground-muted">По сложности</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {categoryGroups.levels.map((categoryId) => {
                const { isCompleted, completedCount, highScore, totalCount } = getCompletionData(categoryId as CategoryId);
                
                return (
                  <button
                    key={categoryId}
                    onClick={() => handleCategoryClick(categoryId as CategoryId)}
                    className="relative rounded-xl overflow-hidden transition-all duration-300 
                              border border-border hover:border-border-hover
                              flex flex-col group shadow-elegant"
                    type="button"
                  >
                    <RegionImages region={categoryId as CategoryId} />
                    
                    <div className="p-3 flex items-center gap-3 bg-card hover:bg-card-hover transition-colors">
                      <div className="w-10 h-10 rounded-lg bg-background-dark/50 flex items-center justify-center">
                        <Trophy size={18} className="text-amber-400" />
                      </div>
                      
                      <div className="flex-1 text-left">
                        <h3 className="text-foreground font-medium">
                          {categoryDisplayNames[categoryId as CategoryId]}
                        </h3>
                        
                        <div className="mt-1 text-xs text-foreground-subtle flex items-center">
                          <span>Рекорд: {highScore}/{totalCount}</span>
                        </div>
                      </div>
                      
                      {isCompleted && (
                        <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-green-500/20 flex items-center justify-center">
                          <div className="w-2 h-2 rounded-full bg-green-500"></div>
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
          
          {/* Regions Section */}
          <div>
            <div className="flex items-center mb-3 px-1">
              <Map size={16} className="mr-2 text-blue-400/90" />
              <h3 className="text-sm font-medium text-foreground-muted">По регионам</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {categoryGroups.regions.map((categoryId) => {
                const { isCompleted, completedCount, highScore, totalCount } = getCompletionData(categoryId as CategoryId);
                
                return (
                  <button
                    key={categoryId}
                    onClick={() => handleCategoryClick(categoryId as CategoryId)}
                    className="relative rounded-xl overflow-hidden transition-all duration-300 
                              border border-border hover:border-border-hover
                              flex flex-col group shadow-elegant"
                    type="button"
                  >
                    <RegionImages region={categoryId as CategoryId} />
                    
                    <div className="p-3 flex items-center gap-3 bg-card hover:bg-card-hover transition-colors">
                      <div className="w-10 h-10 rounded-lg bg-background-dark/50 flex items-center justify-center">
                        <Globe size={18} className="text-blue-400" />
                      </div>
                      
                      <div className="flex-1 text-left">
                        <h3 className="text-foreground font-medium">
                          {categoryDisplayNames[categoryId as CategoryId]}
                        </h3>
                        
                        <div className="mt-1 text-xs text-foreground-subtle flex items-center">
                          <span>Рекорд: {highScore}/{totalCount}</span>
                        </div>
                      </div>
                      
                      {isCompleted && (
                        <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-green-500/20 flex items-center justify-center">
                          <div className="w-2 h-2 rounded-full bg-green-500"></div>
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
        
        {/* Capitals Feature Card */}
        <div className="bg-background-card rounded-2xl p-5 backdrop-blur-sm border border-border shadow-elegant relative overflow-hidden">
          {/* Background effects */}
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-500/5 rounded-full blur-3xl"></div>
          
          <div className="flex items-center mb-4">
            <Award size={20} className="mr-3 text-accent" />
            <h2 className="text-xl font-medium text-foreground">Столицы</h2>
          </div>
          
          <button
            onClick={() => handleCategoryClick('capitals')}
            className="relative w-full rounded-xl overflow-hidden transition-all duration-300 
                      border border-border hover:border-border-hover
                      flex flex-col group shadow-elegant"
            type="button"
          >
            <RegionImages region="capitals" />
            
            <div className="p-4 flex items-center gap-4 bg-card hover:bg-card-hover transition-colors">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500/20 to-blue-900/10 flex items-center justify-center">
                <Map size={24} className="text-blue-400" />
              </div>
              
              <div className="flex-1 text-left">
                <h3 className="text-lg font-medium text-foreground group-hover:text-white transition-colors">
                  Столицы стран
                </h3>
                <p className="text-sm text-foreground-subtle mt-1">
                  Выберите регион для игры со столицами
                </p>
              </div>
              
              <ChevronRight size={20} className="text-foreground-subtle group-hover:text-white transition-colors" />
              
              {isCapitalsComplete() && (
                <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-green-500/20 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                </div>
              )}
            </div>
          </button>
        </div>
      </div>
      
      {/* Decoration */}
      <div className="w-full mt-8 flex justify-center">
        <div className="text-center text-foreground-subtle/40 text-xs flex items-center">
          <Sparkles size={12} className="mr-2 text-accent/50" />
          <span>Учитесь и играйте</span>
        </div>
      </div>
    </div>
  );
};

export default MainMenu;
