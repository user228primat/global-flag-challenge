
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
  showCompletionStatus?: boolean;
}

const CategoryButton: React.FC<CategoryButtonProps> = ({
  categoryId,
  onClick,
  completedCount = 0,
  isCompleted = false,
  showCompletionStatus = true,
}) => {
  const category = gameCategories[categoryId];
  const displayName = categoryDisplayNames[categoryId];
  
  // Определяем иконку в зависимости от категории
  const getIcon = () => {
    if (categoryId.startsWith('level')) {
      return <GraduationCap size={28} className="text-warning" />;
    } else if (categoryId === 'allFlags') {
      return <Trophy size={28} className="text-warning" />;
    } else if (categoryId === 'capitals') {
      return <Award size={28} className="text-info" />;
    } else {
      return <GraduationCap size={28} className="text-primary" />;
    }
  };

  return (
    <button
      onClick={onClick}
      className="relative w-full glass p-0 rounded-xl overflow-hidden transition-all duration-300 
                 hover:bg-white/10 flex flex-col items-center text-left 
                 group hover:scale-[1.02] hover:shadow-lg"
    >
      <RegionImages region={categoryId} />
      
      <div className="w-full p-4">
        <div className="flex justify-between items-center mb-1">
          <h3 className="text-lg font-medium text-white group-hover:text-primary transition-colors">
            {displayName}
          </h3>
          {getIcon()}
        </div>
        
        {showCompletionStatus && (
          <div className="flex items-center justify-between text-sm text-white/60">
            <div className="flex items-center">
              <BookOpen size={14} className="mr-1" />
              <span>
                {isCompleted ? (
                  <span className="text-success">Завершено</span>
                ) : (
                  <span>{completedCount}/{category.count}</span>
                )}
              </span>
            </div>
            <div className="flex items-center">
              <MousePointer size={14} className="mr-1" />
              <span>Изучить</span>
            </div>
          </div>
        )}
      </div>
      
      {/* Overlay effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-70" />
    </button>
  );
};

export default CategoryButton;
