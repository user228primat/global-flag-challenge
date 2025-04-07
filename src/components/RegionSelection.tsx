
import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { categoryGroups, categoryDisplayNames, gameCategories } from '../data';
import { CategoryId } from '../types';
import { ArrowLeft, Globe, Trophy, Award, Star, Map, BookOpen, Sparkles, ChevronRight, Headphones, Layers, CheckCircle } from 'lucide-react';
import RegionImages from './RegionImages';
import { useGameContext, getCapitalsCategory } from '../contexts/GameContext';
import { Button } from '@/components/ui/button';

const RegionSelection: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { gameStats } = useGameContext();
  const isCapitalsMode = location.pathname.includes('/capitals');
  
  console.log('RegionSelection rendered, isCapitalsMode:', isCapitalsMode);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const handleRegionSelect = (region: CategoryId) => {
    console.log(`Region selected: ${region}, isCapitalsMode: ${isCapitalsMode}`);
    if (isCapitalsMode) {
      console.log(`Navigating to capitals/${region}`);
      navigate(`/capitals/${region}`);
    } else {
      navigate(`/category/${region}`);
    }
  };
  
  const handleBackClick = () => {
    console.log("Back button clicked in RegionSelection");
    navigate('/');
  };
  
  const getRegionStats = (regionId: CategoryId) => {
    const categoryId = isCapitalsMode ? getCapitalsCategory(regionId) : regionId;
    
    const stats = gameStats[categoryId] || { highScore: 0, isComplete: false };
    const regionCountryCount = gameCategories[regionId]?.countries?.length || 0;
    return { 
      highScore: stats.highScore, 
      isComplete: stats.isComplete,
      countryCount: regionCountryCount
    };
  };
  
  return (
    <div className="w-full max-w-xl mx-auto px-4 py-8">
      <div className="mb-8">
        <Button 
          onClick={handleBackClick}
          variant="ghost" 
          className="text-foreground-subtle hover:text-foreground hover:bg-card-hover rounded-full mb-6 -ml-2 px-4"
        >
          <ArrowLeft size={18} className="mr-2" />
          <span>Назад</span>
        </Button>
        
        <h1 className="text-3xl font-bold mb-3 text-foreground text-center">
          Выберите регион
        </h1>
        <p className="text-foreground-subtle text-center">
          {isCapitalsMode ? 'Для изучения столиц' : 'Для изучения флагов'}
        </p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {categoryGroups.regions.map((regionId) => {
          const { highScore, isComplete, countryCount } = getRegionStats(regionId as CategoryId);
          
          return (
            <button
              key={regionId}
              onClick={() => handleRegionSelect(regionId as CategoryId)}
              className="group relative h-[170px] rounded-xl overflow-hidden border border-border hover:border-border-hover
                        transition-all duration-300 shadow-elegant hover:shadow-glow"
              type="button"
            >
              <div className="absolute inset-0 z-0">
                <RegionImages region={regionId as CategoryId} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/90 to-background-dark/40 opacity-90"></div>
              </div>
              
              <div className="relative z-10 h-full flex flex-col justify-between p-4">
                <div className="flex items-start justify-between">
                  <div className="w-10 h-10 rounded-lg bg-background-dark/70 backdrop-blur-sm flex items-center justify-center">
                    {isCapitalsMode ? (
                      <Award size={20} className="text-blue-400" />
                    ) : (
                      <Globe size={20} className="text-blue-400" />
                    )}
                  </div>
                  
                  {isComplete && (
                    <div className="flex items-center px-2 py-1 rounded-full bg-green-500/10 backdrop-blur-sm">
                      <CheckCircle size={12} className="text-green-500 mr-1" />
                      <span className="text-green-400 text-xs font-medium">Завершено</span>
                    </div>
                  )}
                </div>
                
                <div className="mt-auto">
                  <h3 className="text-lg font-medium text-foreground mb-2 group-hover:text-white transition-colors">
                    {categoryDisplayNames[regionId as CategoryId]}
                  </h3>
                  
                  <div className="flex items-center justify-between text-xs text-foreground-subtle">
                    <div className="flex items-center">
                      <Map size={12} className="mr-1 text-foreground-subtle" />
                      <span>{countryCount} стран</span>
                    </div>
                    
                    <div className="flex items-center">
                      <Trophy size={12} className="mr-1 text-amber-400" />
                      <span>Рекорд: {highScore}/{countryCount}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-t from-accent/5 via-transparent to-transparent transition-opacity duration-300"></div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default RegionSelection;
