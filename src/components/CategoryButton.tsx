
import React from 'react';
import { categoryDisplayNames, gameCategories } from '../data';
import { CategoryId, GameStats } from '../types';
import { ChevronRight, Check } from 'lucide-react';

interface CategoryButtonProps {
  categoryId: CategoryId;
  onClick: () => void;
  stats: GameStats;
  index: number;
}

const CategoryButton: React.FC<CategoryButtonProps> = ({ 
  categoryId, 
  onClick, 
  stats,
  index 
}) => {
  const category = gameCategories[categoryId];
  const displayName = categoryDisplayNames[categoryId];
  const isComplete = stats.highScore >= category.countries.length;
  
  // Calculate animation delay based on index
  const animationDelay = `${index * 0.1}s`;

  return (
    <button
      onClick={onClick}
      className="glass w-full text-left p-4 rounded-xl transition-all duration-300 hover:bg-white/10 group"
      style={{ 
        opacity: 0,
        animation: 'fade-in 0.5s ease-out forwards',
        animationDelay 
      }}
    >
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="text-lg font-medium text-white">{displayName}</span>
            <span className="text-xs font-medium text-white/60">({category.count})</span>
          </div>
          <div className="mt-1">
            {isComplete ? (
              <span className="inline-flex items-center text-xs font-medium px-2 py-1 rounded-full bg-success/20 text-success">
                <Check size={12} className="mr-1" />
                Завершено
              </span>
            ) : (
              <span className="text-xs text-white/60">
                Рекорд: {stats.highScore} / {category.count}
              </span>
            )}
          </div>
        </div>
        <ChevronRight size={20} className="text-white/60 transition-transform duration-300 group-hover:translate-x-1" />
      </div>
    </button>
  );
};

export default CategoryButton;
