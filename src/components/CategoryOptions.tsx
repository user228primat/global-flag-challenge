
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGameContext } from '../contexts/GameContext';
import { categoryDisplayNames } from '../data';
import { CategoryId } from '../types';
import { Play, Book, ArrowLeft } from 'lucide-react';

const CategoryOptions: React.FC = () => {
  const navigate = useNavigate();
  const { categoryId } = useParams<{ categoryId: string }>();
  const { startGame, viewReference } = useGameContext();
  
  if (!categoryId) {
    navigate('/');
    return null;
  }
  
  const handlePlayClick = () => {
    startGame(categoryId as CategoryId);
    navigate('/game');
  };
  
  const handleReferenceClick = () => {
    viewReference(categoryId as CategoryId);
    navigate('/reference');
  };
  
  const displayName = categoryDisplayNames[categoryId as CategoryId] || 'Категория';
  
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
      
      <div className="mb-12 text-center">
        <h1 className="text-3xl font-bold mb-4 text-white text-shadow animate-fade-in">
          {displayName}
        </h1>
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
            <div className="text-sm text-white/60">Пройти викторину по флагам</div>
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

export default CategoryOptions;
