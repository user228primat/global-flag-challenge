
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { categoryGroups, categoryDisplayNames, gameCategories } from '../data';
import { CategoryId } from '../types';
import { ArrowLeft, Globe, Trophy, Award, BookOpen } from 'lucide-react';
import RegionImages from './RegionImages';
import { useGameContext } from '../contexts/GameContext';

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
        <button 
          onClick={() => navigate('/')}
          className="flex items-center text-blue-300 hover:text-blue-100 transition-colors"
        >
          <ArrowLeft size={20} className="mr-1" />
          <span>Назад</span>
        </button>
      </div>
      
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2 text-blue-100 text-shadow animate-fade-in">
          Выберите регион
        </h1>
        <p className="text-blue-300/80 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          Для изучения столиц
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {categoryGroups.regions.map((regionId, index) => {
          const { highScore, isComplete, countryCount } = getRegionStats(regionId as CategoryId);
          
          return (
            <button
              key={regionId}
              onClick={() => handleRegionSelect(regionId as CategoryId)}
              className="p-0 rounded-xl text-center transition-all duration-300 
                        hover:bg-blue-800/20 flex flex-col items-center overflow-hidden
                        hover:scale-[1.02] hover:shadow-lg relative
                        border border-blue-700/30 bg-blue-900/10 backdrop-blur-sm"
              style={{ 
                opacity: 0,
                animation: 'fade-in 0.5s ease-out forwards',
                animationDelay: `${index * 0.1}s` 
              }}
            >
              <RegionImages region={regionId as CategoryId} className="w-full h-32" />
              
              <div className="w-full p-4 z-10">
                <div className="flex flex-col items-center justify-center">
                  <Globe size={32} className="mb-2 text-blue-400" />
                  <span className="text-xl font-medium text-blue-100">
                    {categoryDisplayNames[regionId as CategoryId]}
                  </span>
                </div>
                
                <div className="flex items-center justify-between mt-2 text-sm text-blue-200/70">
                  <div className="flex items-center mr-2">
                    <BookOpen size={12} className="mr-1" />
                    <span>{countryCount} стран</span>
                  </div>
                  
                  {highScore > 0 && (
                    <div className="flex items-center">
                      <Trophy size={12} className="mr-1 text-yellow-400" />
                      <span>Рекорд: {highScore}</span>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Completed badge */}
              {isComplete && (
                <div className="absolute top-2 right-2 bg-green-500/70 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm">
                  ✓ Завершено
                </div>
              )}
              
              {/* Overlay effect */}
              <div className="absolute inset-0 bg-gradient-to-t from-blue-950 via-transparent to-transparent opacity-70" />
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default RegionSelection;
