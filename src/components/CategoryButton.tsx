
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
      return <GraduationCap size={24} className="text-blue-400" />;
    } else if (categoryId === 'allFlags') {
      return <Trophy size={24} className="text-amber-400" />;
    } else if (categoryId === 'capitals') {
      return <Award size={24} className="text-sky-400" />;
    } else {
      return <GraduationCap size={24} className="text-blue-400" />;
    }
  };

  const completionPercentage = category ? Math.round((completedCount / category.count) * 100) : 0;

  return (
    <button
      onClick={onClick}
      className={cn(
        "relative w-full overflow-hidden rounded-xl border transition-all duration-300",
        "flex flex-col items-center text-left",
        "group hover:scale-[1.02] hover:shadow-xl",
        "border-slate-800/80 shadow-lg",
        "bg-gradient-to-br from-slate-900/90 to-slate-950",
        "backdrop-blur-sm",
        isCompleted ? "border-green-600/30 shadow-green-900/10" : "hover:border-blue-900"
      )}
    >
      {showImage && <RegionImages region={categoryId} />}
      
      <div className="w-full p-4 z-10 relative">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-medium text-blue-100 group-hover:text-white transition-colors">
            {displayName}
          </h3>
          {getIcon()}
        </div>
        
        {showCompletionStatus && (
          <div className="flex items-center justify-between text-sm text-blue-300/80">
            <div className="flex items-center">
              <BookOpen size={14} className="mr-1 text-blue-400" />
              <span>
                {isCompleted ? (
                  <span className="text-green-400">Завершено</span>
                ) : (
                  <span>{showCompletionCount ? `${completedCount}/${category.count}` : `${category.count}`}</span>
                )}
              </span>
            </div>
            <div className="flex items-center">
              <Trophy size={14} className="mr-1 text-amber-400" />
              <span>Рекорд: {highScore}</span>
            </div>
          </div>
        )}
      </div>
      
      {/* Progress bar */}
      {!isCompleted && category && completedCount > 0 && (
        <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-blue-600 to-indigo-600" 
            style={{ width: `${completionPercentage}%` }} />
      )}
      
      {/* Completed badge */}
      {isCompleted && (
        <Badge variant="default" className="absolute top-2 right-2 bg-green-600/80 hover:bg-green-600/80 px-2 py-1 text-xs">
          ✓ Завершено
        </Badge>
      )}
      
      {/* Overlay effect for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/40 to-transparent opacity-70" />
      
      {/* Hover effect with subtle glow */}
      <div className="absolute inset-0 bg-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Highlight effect on edges */}
      <div className="absolute inset-x-0 h-px top-0 bg-gradient-to-r from-transparent via-blue-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
      <div className="absolute inset-x-0 h-px bottom-0 bg-gradient-to-r from-transparent via-blue-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
    </button>
  );
};

export default CategoryButton;
