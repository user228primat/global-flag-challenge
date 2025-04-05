
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
    const capitalsCategory = `capitals${regionId.charAt(0).toUpperCase() + regionId.slice(1)}` as CategoryId;
    startGame(capitalsCategory);
    navigate('/game');
  };
  
  const handleReferenceClick = () => {
    const capitalsCategory = `capitals${regionId.charAt(0).toUpperCase() + regionId.slice(1)}` as CategoryId;
    viewReference(capitalsCategory);
    navigate('/reference');
  };
  
  const handleBackClick = () => {
    navigate('/capitals');
  };
  
  const displayName = categoryDisplayNames[regionId as CategoryId] || 'Регион';
  
  return (
    <div className="w-full max-w-xl mx-auto px-4">
      <div className="flex items-center mb-8 pt-6">
        <button 
          onClick={handleBackClick}
          className="flex items-center gap-1.5 text-foreground-subtle hover:text-foreground transition-colors"
        >
          <ArrowLeft size={18} />
          <span>Назад</span>
        </button>
      </div>
      
      <div className="mb-12 text-center">
        <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-white to-foreground-subtle bg-clip-text text-transparent">
          Столицы: {displayName}
        </h1>
        <p className="text-accent-muted">
          Выберите режим
        </p>
      </div>
      
      <div className="space-y-4">
        <button
          onClick={handlePlayClick}
          className="bg-card-dark border border-border hover:border-border-hover w-full p-6 rounded-xl transition-all duration-300 hover:bg-card-hover flex items-center group relative shadow-elegant"
        >
          <div className="w-12 h-12 flex items-center justify-center rounded-full bg-accent/10 mr-4 group-hover:bg-accent/15 transition-colors">
            <Play size={24} className="text-accent ml-1" />
          </div>
          <div className="text-left">
            <div className="text-xl font-medium text-foreground">Играть</div>
            <div className="text-sm text-foreground-subtle">Тест по столицам</div>
          </div>
          
          {/* Highlight effect on hover */}
          <div className="absolute inset-0 rounded-xl border border-accent/0 group-hover:border-accent/10 transition-all duration-300 pointer-events-none"></div>
        </button>
        
        <button
          onClick={handleReferenceClick}
          className="bg-card-dark border border-border hover:border-border-hover w-full p-6 rounded-xl transition-all duration-300 hover:bg-card-hover flex items-center group relative shadow-elegant"
        >
          <div className="w-12 h-12 flex items-center justify-center rounded-full bg-foreground/5 mr-4 group-hover:bg-foreground/10 transition-colors">
            <Book size={24} className="text-foreground" />
          </div>
          <div className="text-left">
            <div className="text-xl font-medium text-foreground">Таблица</div>
            <div className="text-sm text-foreground-subtle">Изучить справочник со странами</div>
          </div>
          
          {/* Highlight effect on hover */}
          <div className="absolute inset-0 rounded-xl border border-foreground/0 group-hover:border-foreground/5 transition-all duration-300 pointer-events-none"></div>
        </button>
      </div>
    </div>
  );
};

export default CapitalsOptions;
