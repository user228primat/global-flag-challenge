
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { categoryGroups, categoryDisplayNames, gameCategories } from '../data';
import { CategoryId } from '../types';
import { ArrowLeft, Globe, Trophy, Award, BookOpen, Map } from 'lucide-react';
import RegionImages from './RegionImages';
import { useGameContext } from '../contexts/GameContext';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const RegionSelection: React.FC = () => {
  const navigate = useNavigate();
  const { gameStats } = useGameContext();
  
  // Сбрасываем позицию скролла при загрузке компонента
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const handleRegionSelect = (region: CategoryId) => {
    navigate(`/capitals/${region}`);
  };
  
  const handleGoBack = () => {
    navigate(-1); // Исправлено для возврата на предыдущую страницу
  };
  
  const getRegionStats = (regionId: CategoryId) => {
    const stats = gameStats[regionId] || { highScore: 0, isComplete: false };
    const regionCountryCount = gameCategories[regionId].countries.length;
    return { 
      highScore: stats.highScore, 
      isComplete: stats.isComplete,
      countryCount: regionCountryCount
    };
  };
  
  return (
    <div className="w-full max-w-xl mx-auto px-4 pt-6">
      <div className="flex items-center mb-8">
        <Button 
          onClick={handleGoBack}
          variant="ghost" 
          className="text-blue-400 hover:text-blue-300 hover:bg-slate-800/50"
        >
          <ArrowLeft size={20} className="mr-1" />
          <span>Назад</span>
        </Button>
      </div>
      
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2 text-blue-100 text-shadow">
          Выберите регион
        </h1>
        <p className="text-blue-400/90">
          Для изучения столиц
        </p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {categoryGroups.regions.map((regionId, index) => {
          const { highScore, isComplete, countryCount } = getRegionStats(regionId as CategoryId);
          
          return (
            <button
              key={regionId}
              onClick={() => handleRegionSelect(regionId as CategoryId)}
              className="p-0 rounded-xl text-center transition-all duration-300 
                        hover:bg-slate-800/50 flex flex-col items-center overflow-hidden
                        hover:scale-[1.02] hover:shadow-xl relative
                        border border-slate-800/50 bg-gradient-to-br from-slate-900/90 to-slate-950/80 
                        backdrop-blur-sm shadow-lg"
            >
              <RegionImages region={regionId as CategoryId} className="w-full h-32" />
              
              <div className="w-full p-4 z-10 relative">
                <div className="flex flex-col items-center justify-center">
                  <Globe size={32} className="mb-2 text-blue-500" />
                  <span className="text-xl font-medium text-blue-100">
                    {categoryDisplayNames[regionId as CategoryId]}
                  </span>
                </div>
                
                <div className="flex items-center justify-between mt-2 text-sm text-blue-300/90">
                  <div className="flex items-center mr-2">
                    <BookOpen size={12} className="mr-1 text-blue-400" />
                    <span>{countryCount} стран</span>
                  </div>
                  
                  <div className="flex items-center">
                    <Trophy size={12} className="mr-1 text-amber-400" />
                    <span>Рекорд: {highScore}</span>
                  </div>
                </div>
              </div>
              
              {isComplete && (
                <Badge variant="default" className="absolute top-2 right-2 bg-green-600/80 hover:bg-green-600/80 px-2 py-1 text-xs">
                  ✓ Завершено
                </Badge>
              )}
              
              {/* Overlay effect */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent opacity-70" />
              
              {/* Highlight effect on edges */}
              <div className="absolute inset-x-0 h-px top-0 bg-gradient-to-r from-transparent via-blue-900/30 to-transparent opacity-0 hover:opacity-100 transition-opacity"></div>
              <div className="absolute inset-x-0 h-px bottom-0 bg-gradient-to-r from-transparent via-blue-900/20 to-transparent opacity-0 hover:opacity-100 transition-opacity"></div>
              
              {/* Hover effect */}
              <div className="absolute inset-0 bg-blue-600/5 opacity-0 hover:opacity-100 transition-opacity duration-300" />
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default RegionSelection;
