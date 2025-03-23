
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { categoryGroups, categoryDisplayNames } from '../data';
import { CategoryId } from '../types';
import { ArrowLeft, Globe } from 'lucide-react';
import RegionImages from './RegionImages';

const RegionSelection: React.FC = () => {
  const navigate = useNavigate();
  
  const handleRegionSelect = (region: CategoryId) => {
    navigate(`/capitals/${region}`);
  };
  
  return (
    <div className="w-full max-w-xl mx-auto px-4">
      <div className="flex items-center mb-8">
        <button 
          onClick={() => navigate('/')}
          className="flex items-center text-white/70 hover:text-white transition-colors"
        >
          <ArrowLeft size={20} className="mr-1" />
          <span>Назад</span>
        </button>
      </div>
      
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2 text-white text-shadow animate-fade-in">
          Выберите регион
        </h1>
        <p className="text-white/60 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          Для изучения столиц
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {categoryGroups.regions.map((regionId, index) => (
          <button
            key={regionId}
            onClick={() => handleRegionSelect(regionId as CategoryId)}
            className="glass p-0 rounded-xl text-center transition-all duration-300 
                      hover:bg-white/10 flex flex-col items-center overflow-hidden
                      hover:scale-[1.02] hover:shadow-lg relative"
            style={{ 
              opacity: 0,
              animation: 'fade-in 0.5s ease-out forwards',
              animationDelay: `${index * 0.1}s` 
            }}
          >
            <RegionImages region={regionId as CategoryId} className="w-full h-32" />
            
            <div className="w-full p-4 z-10">
              <div className="flex flex-col items-center justify-center">
                <Globe size={32} className="mb-2 text-primary" />
                <span className="text-xl font-medium text-white">
                  {categoryDisplayNames[regionId as CategoryId]}
                </span>
              </div>
            </div>
            
            {/* Overlay effect */}
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-70" />
          </button>
        ))}
      </div>
    </div>
  );
};

export default RegionSelection;
