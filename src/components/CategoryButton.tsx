
import React from 'react';
import { Category, CategoryId } from '../types';
import { gameCategories, categoryDisplayNames } from '../data';
import { Award, BookOpen, GraduationCap, MousePointer, Trophy } from 'lucide-react';
import RegionImages from './RegionImages';

interface CategoryButtonProps {
  categoryId: CategoryId;
  onClick: () => void;
  completedCount?: number;
  isCompleted?: boolean;
  highScore?: number;
  showCompletionStatus?: boolean;
  showCompletionCount?: boolean;
  showImage?: boolean;
}

const CategoryButton: React.FC<CategoryButtonProps> = ({
  categoryId,
  onClick,
  completedCount = 0,
  isCompleted = false,
  highScore = 0,
  showCompletionStatus = true,
  showCompletionCount = true,
  showImage = true,
}) => {
  const category = gameCategories[categoryId];
  const displayName = categoryDisplayNames[categoryId];
  
  // Определяем иконку в зависимости от категории
  const getIcon = () => {
    if (categoryId.startsWith('level')) {
      return <GraduationCap size={28} className="text-yellow-400" />;
    } else if (categoryId === 'allFlags') {
      return <Trophy size={28} className="text-yellow-400" />;
    } else if (categoryId === 'capitals') {
      return <Award size={28} className="text-blue-300" />;
    } else {
      return <GraduationCap size={28} className="text-blue-300" />;
    }
  };

  const completionPercentage = category ? Math.round((completedCount / category.count) * 100) : 0;

  return (
    <button
      onClick={onClick}
      className="relative w-full p-0 rounded-xl overflow-hidden 
                 transition-all duration-300 hover:bg-blue-800/30
                 flex flex-col items-center text-left 
                 group hover:scale-[1.01] hover:shadow-lg
                 border border-blue-800/50 bg-gradient-to-r from-blue-900/40 to-blue-900/20
                 backdrop-blur-sm shadow-md"
    >
      {showImage && <RegionImages region={categoryId} />}
      
      <div className="w-full p-4">
        <div className="flex justify-between items-center mb-1">
          <h3 className="text-lg font-medium text-blue-100 group-hover:text-blue-200 transition-colors">
            {displayName}
          </h3>
          {getIcon()}
        </div>
        
        {showCompletionStatus && (
          <div className="flex items-center justify-between text-sm text-blue-200/80">
            <div className="flex items-center">
              <BookOpen size={14} className="mr-1" />
              <span>
                {isCompleted ? (
                  <span className="text-green-400">Завершено</span>
                ) : (
                  <span>{showCompletionCount ? `${completedCount}/${category.count}` : `${category.count}`}</span>
                )}
              </span>
            </div>
            <div className="flex items-center">
              <Trophy size={14} className="mr-1 text-yellow-400" />
              <span>Рекорд: {highScore}</span>
            </div>
          </div>
        )}
      </div>
      
      {/* Progress bar */}
      {!isCompleted && category && completedCount > 0 && (
        <div className="absolute bottom-0 left-0 h-1 bg-blue-500" style={{ width: `${completionPercentage}%` }} />
      )}
      
      {/* Completed badge */}
      {isCompleted && (
        <div className="absolute top-2 right-2 bg-green-500/70 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm">
          ✓ Завершено
        </div>
      )}
      
      {/* Overlay effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-blue-950/80 via-transparent to-transparent opacity-70" />
    </button>
  );
};

export default CategoryButton;
