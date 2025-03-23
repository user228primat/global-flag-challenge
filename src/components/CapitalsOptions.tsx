
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGameContext } from '../contexts/GameContext';
import { categoryDisplayNames } from '../data';
import { CategoryId } from '../types';
import { Play, Book, ArrowLeft } from 'lucide-react';

const CapitalsOptions: React.FC = () => {
  const navigate = useNavigate();
  const { regionId } = useParams<{ regionId: string }>();
  const { startGame, viewReference } = useGameContext();
  
  if (!regionId) {
    navigate('/capitals');
    return null;
  }
  
  const handlePlayClick = () => {
    startGame(regionId as CategoryId);
    navigate('/capitals/game');
  };
  
  const handleReferenceClick = () => {
    viewReference(regionId as CategoryId);
    navigate('/reference');
  };
  
  const displayName = categoryDisplayNames[regionId as CategoryId] || 'Регион';
  
  return (
    <div className="w-full max-w-xl mx-auto px-4">
      <div className="flex items-center mb-8">
        <button 
          onClick={() => navigate('/capitals')}
          className="flex items-center text-white/70 hover:text-white transition-colors"
        >
          <ArrowLeft size={20} className="mr-1" />
          <span>Назад</span>
        </button>
      </div>
      
      <div className="mb-12 text-center">
        <h1 className="text-3xl font-bold mb-2 text-white text-shadow animate-fade-in">
          Столицы: {displayName}
        </h1>
        <p className="text-white/60 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          Выберите режим
        </p>
      </div>
      
      <div className="space-y-4 animate-fade-in" style={{ animationDelay: '0.2s' }}>
        <button
          onClick={handlePlayClick}
          className="glass w-full p-6 rounded-xl transition-all duration-300 hover:bg-white/10 flex items-center"
        >
          <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/20 mr-4">
            <Play size={24} className="text-primary ml-1" />
          </div>
          <div className="text-left">
            <div className="text-xl font-medium text-white">Играть</div>
            <div className="text-sm text-white/60">Тест по столицам</div>
          </div>
        </button>
        
        <button
          onClick={handleReferenceClick}
          className="glass w-full p-6 rounded-xl transition-all duration-300 hover:bg-white/10 flex items-center"
          style={{ 
            opacity: 0,
            animation: 'fade-in 0.5s ease-out forwards',
            animationDelay: '0.3s' 
          }}
        >
          <div className="w-12 h-12 flex items-center justify-center rounded-full bg-white/10 mr-4">
            <Book size={24} className="text-white" />
          </div>
          <div className="text-left">
            <div className="text-xl font-medium text-white">Таблица</div>
            <div className="text-sm text-white/60">Изучить справочник со странами</div>
          </div>
        </button>
      </div>
    </div>
  );
};

export default CapitalsOptions;
