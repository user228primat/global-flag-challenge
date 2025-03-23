
import React from 'react';
import { useNavigate } from 'react-router-dom';
import CategoryButton from './CategoryButton';
import { categoryDisplayNames, categoryGroups } from '../data';
import { useGameContext } from '../contexts/GameContext';
import { CategoryId } from '../types';
import { Globe } from 'lucide-react';

const MainMenu: React.FC = () => {
  const navigate = useNavigate();
  const { gameStats, startGame, viewReference } = useGameContext();
  
  const handleCategoryClick = (categoryId: CategoryId) => {
    if (categoryId === 'capitals') {
      // For capitals, navigate to region selection
      navigate('/capitals');
    } else {
      // For other categories, navigate to game mode selection
      navigate(`/category/${categoryId}`);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto px-4">
      <div className="mb-12 text-center">
        <Globe size={80} className="mx-auto mb-6 text-primary animate-pulse-slow" />
        <h1 className="text-4xl font-bold mb-2 text-white text-shadow animate-fade-in">
          Флаги Мира
        </h1>
        <p className="text-white/60 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          Проверьте свои знания флагов стран мира
        </p>
      </div>
      
      <div className="space-y-6">
        <section>
          <h2 className="text-xl font-medium mb-3 text-white/80">По сложности</h2>
          <div className="space-y-2">
            {categoryGroups.levels.map((categoryId, index) => (
              <CategoryButton
                key={categoryId}
                categoryId={categoryId as CategoryId}
                stats={gameStats[categoryId as CategoryId]}
                onClick={() => handleCategoryClick(categoryId as CategoryId)}
                index={index}
              />
            ))}
          </div>
        </section>
        
        <section>
          <h2 className="text-xl font-medium mb-3 text-white/80">По регионам</h2>
          <div className="space-y-2">
            {categoryGroups.regions.map((categoryId, index) => (
              <CategoryButton
                key={categoryId}
                categoryId={categoryId as CategoryId}
                stats={gameStats[categoryId as CategoryId]}
                onClick={() => handleCategoryClick(categoryId as CategoryId)}
                index={index}
              />
            ))}
          </div>
        </section>
        
        <section style={{ opacity: 0, animation: 'fade-in 0.5s ease-out forwards', animationDelay: '0.5s' }}>
          <h2 className="text-xl font-medium mb-3 text-white/80">Столицы</h2>
          <button
            onClick={() => navigate('/capitals')}
            className="glass w-full text-left p-4 rounded-xl transition-all duration-300 hover:bg-white/10 group"
          >
            <div className="flex items-center justify-between">
              <span className="text-lg font-medium text-white">Столицы стран</span>
              <Globe size={20} className="text-white/60" />
            </div>
          </button>
        </section>
      </div>
    </div>
  );
};

export default MainMenu;
