
import React from 'react';
import { Category, CategoryId } from '../types';
import { gameCategories, categoryDisplayNames } from '../data';
import { Award, BookOpen, GraduationCap, MousePointer, Trophy } from 'lucide-react';
import RegionImages from './RegionImages';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

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
      return <GraduationCap size={24} className="text-indigo-300" />;
    } else if (categoryId === 'allFlags') {
      return <Trophy size={24} className="text-amber-300" />;
    } else if (categoryId === 'capitals') {
      return <Award size={24} className="text-sky-300" />;
    } else {
      return <GraduationCap size={24} className="text-sky-300" />;
    }
  };

  const completionPercentage = category ? Math.round((completedCount / category.count) * 100) : 0;

  return (
    <button
      onClick={onClick}
      className={cn(
        "relative w-full overflow-hidden rounded-xl border transition-all duration-300",
        "flex flex-col items-center text-left",
        "group hover:scale-[1.02] hover:shadow-lg",
        "border-indigo-900/40 bg-gradient-to-br from-indigo-950/80 to-blue-950/60",
        "backdrop-blur-sm shadow-md",
        isCompleted ? "border-green-500/30" : "hover:border-indigo-700/60"
      )}
    >
      {showImage && <RegionImages region={categoryId} />}
      
      <div className="w-full p-4 z-10 relative">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-medium text-indigo-100 group-hover:text-white transition-colors">
            {displayName}
          </h3>
          {getIcon()}
        </div>
        
        {showCompletionStatus && (
          <div className="flex items-center justify-between text-sm text-indigo-200/90">
            <div className="flex items-center">
              <BookOpen size={14} className="mr-1 text-indigo-300" />
              <span>
                {isCompleted ? (
                  <span className="text-green-400">Завершено</span>
                ) : (
                  <span>{showCompletionCount ? `${completedCount}/${category.count}` : `${category.count}`}</span>
                )}
              </span>
            </div>
            <div className="flex items-center">
              <Trophy size={14} className="mr-1 text-amber-300" />
              <span>Рекорд: {highScore}</span>
            </div>
          </div>
        )}
      </div>
      
      {/* Progress bar */}
      {!isCompleted && category && completedCount > 0 && (
        <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-indigo-500 to-blue-400" 
            style={{ width: `${completionPercentage}%` }} />
      )}
      
      {/* Completed badge */}
      {isCompleted && (
        <Badge variant="default" className="absolute top-2 right-2 bg-green-500/80 hover:bg-green-500/80 px-2 py-1 text-xs">
          ✓ Завершено
        </Badge>
      )}
      
      {/* Overlay effect for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-indigo-950/90 via-blue-950/40 to-transparent opacity-60" />
      
      {/* Hover effect */}
      <div className="absolute inset-0 bg-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </button>
  );
};

export default CategoryButton;
