
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { categoryGroups, categoryDisplayNames, gameCategories } from '../data';
import { CategoryId } from '../types';
import { ArrowLeft, Globe, Trophy, Award, BookOpen, Map } from 'lucide-react';
import RegionImages from './RegionImages';
import { useGameContext } from '../contexts/GameContext';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const RegionSelection: React.FC = () => {
  const navigate = useNavigate();
  const { gameStats } = useGameContext();
  
  const handleRegionSelect = (region: CategoryId) => {
    navigate(`/capitals/${region}`);
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
    <div className="w-full max-w-xl mx-auto px-4">
      <div className="flex items-center mb-8">
        <Button 
          onClick={() => navigate('/')}
          variant="ghost" 
          className="text-blue-300 hover:text-blue-100 hover:bg-blue-900/30"
        >
          <ArrowLeft size={20} className="mr-1" />
          <span>Назад</span>
        </Button>
      </div>
      
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2 text-blue-100 text-shadow animate-fade-in">
          Выберите регион
        </h1>
        <p className="text-blue-300/80 animate-fade-in" style={{ animationDelay: '0.2s' }}>
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
                        hover:bg-blue-900/30 flex flex-col items-center overflow-hidden
                        hover:scale-[1.02] hover:shadow-lg relative
                        border border-blue-900/30 bg-gradient-to-br from-blue-950/70 to-indigo-950/50 backdrop-blur-sm shadow-md"
              style={{ 
                opacity: 0,
                animation: 'fade-in 0.5s ease-out forwards',
                animationDelay: `${index * 0.1}s` 
              }}
            >
              <RegionImages region={regionId as CategoryId} className="w-full h-32" />
              
              <div className="w-full p-4 z-10 relative">
                <div className="flex flex-col items-center justify-center">
                  <Globe size={32} className="mb-2 text-blue-400" />
                  <span className="text-xl font-medium text-blue-100">
                    {categoryDisplayNames[regionId as CategoryId]}
                  </span>
                </div>
                
                <div className="flex items-center justify-between mt-2 text-sm text-blue-200/90">
                  <div className="flex items-center mr-2">
                    <BookOpen size={12} className="mr-1 text-blue-300" />
                    <span>{countryCount} стран</span>
                  </div>
                  
                  {highScore > 0 && (
                    <div className="flex items-center">
                      <Trophy size={12} className="mr-1 text-amber-400" />
                      <span>Рекорд: {highScore}</span>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Completed badge */}
              {isComplete && (
                <Badge variant="default" className="absolute top-2 right-2 bg-green-500/80 hover:bg-green-500/80 px-2 py-1 text-xs">
                  ✓ Завершено
                </Badge>
              )}
              
              {/* Overlay effect */}
              <div className="absolute inset-0 bg-gradient-to-t from-blue-950 via-indigo-950/50 to-transparent opacity-70" />
              
              {/* Hover effect */}
              <div className="absolute inset-0 bg-blue-500/10 opacity-0 hover:opacity-100 transition-opacity duration-300" />
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default RegionSelection;
