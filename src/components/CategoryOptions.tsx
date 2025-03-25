
import React from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useGameContext } from '../contexts/GameContext';
import { categoryDisplayNames } from '../data';
import { CategoryId } from '../types';
import { Play, Book, ArrowLeft } from 'lucide-react';

const CategoryOptions: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
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
  
  const handleBackClick = () => {
    navigate(-1); // Навигация назад в истории
  };
  
  const displayName = categoryDisplayNames[categoryId as CategoryId] || 'Категория';
  
  return (
    <div className="w-full max-w-xl mx-auto px-4">
      <div className="flex items-center mb-8">
        <button 
          onClick={handleBackClick}
          className="flex items-center text-blue-400 hover:text-blue-300 transition-colors"
        >
          <ArrowLeft size={20} className="mr-1" />
          <span>Назад</span>
        </button>
      </div>
      
      <div className="mb-12 text-center">
        <h1 className="text-3xl font-bold mb-4 text-white text-shadow">
          {displayName}
        </h1>
      </div>
      
      <div className="space-y-4">
        <button
          onClick={handlePlayClick}
          className="glass-dark w-full p-6 rounded-xl transition-all duration-300 hover:bg-slate-800/50 flex items-center group"
        >
          <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/20 mr-4 group-hover:bg-primary/30 transition-colors">
            <Play size={24} className="text-primary ml-1" />
          </div>
          <div className="text-left">
            <div className="text-xl font-medium text-white">Играть</div>
            <div className="text-sm text-white/60">Пройти викторину по флагам</div>
          </div>
          
          {/* Highlight effect on edges */}
          <div className="absolute inset-x-0 h-px top-0 bg-gradient-to-r from-transparent via-blue-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="absolute inset-x-0 h-px bottom-0 bg-gradient-to-r from-transparent via-blue-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
        </button>
        
        <button
          onClick={handleReferenceClick}
          className="glass-dark w-full p-6 rounded-xl transition-all duration-300 hover:bg-slate-800/50 flex items-center group"
        >
          <div className="w-12 h-12 flex items-center justify-center rounded-full bg-white/10 mr-4 group-hover:bg-white/15 transition-colors">
            <Book size={24} className="text-white" />
          </div>
          <div className="text-left">
            <div className="text-xl font-medium text-white">Таблица</div>
            <div className="text-sm text-white/60">Изучить справочник со странами</div>
          </div>
          
          {/* Highlight effect on edges */}
          <div className="absolute inset-x-0 h-px top-0 bg-gradient-to-r from-transparent via-blue-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="absolute inset-x-0 h-px bottom-0 bg-gradient-to-r from-transparent via-blue-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
        </button>
      </div>
    </div>
  );
};

export default CategoryOptions;
