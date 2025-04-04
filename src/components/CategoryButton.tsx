
import React from 'react';
import { Category, CategoryId } from '../types';
import { gameCategories, categoryDisplayNames } from '../data';
import { Award, BookOpen, GraduationCap, MousePointer, Trophy, Sparkles } from 'lucide-react';
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
      return <GraduationCap size={22} className="text-indigo-400" />;
    } else if (categoryId === 'allFlags') {
      return <Trophy size={22} className="text-amber-400" />;
    } else if (categoryId === 'capitals') {
      return <Award size={22} className="text-blue-400" />;
    } else {
      return <GraduationCap size={22} className="text-indigo-400" />;
    }
  };

  const completionPercentage = category ? Math.round((completedCount / category.count) * 100) : 0;

  return (
    <button
      onClick={onClick}
      className={cn(
        "relative w-full overflow-hidden rounded-xl transition-all duration-300",
        "flex flex-col items-center text-left",
        "group hover:scale-[1.02] hover:shadow-xl",
        "border-gray-800/50 shadow-lg",
        "bg-gradient-to-br from-gray-800/80 to-gray-900/80",
        "backdrop-blur-sm",
        isCompleted ? "border border-emerald-800/30 shadow-emerald-900/10" : "border border-gray-700/30 hover:border-indigo-900/40"
      )}
    >
      {showImage && <RegionImages region={categoryId} />}
      
      <div className="w-full p-4 z-10 relative">
        <div className="flex justify-between items-center mb-1.5">
          <h3 className="text-lg font-medium text-gray-200 group-hover:text-white transition-colors">
            {displayName}
          </h3>
          {getIcon()}
        </div>
        
        {showCompletionStatus && (
          <div className="flex items-center justify-between text-sm text-gray-400">
            <div className="flex items-center">
              <BookOpen size={14} className="mr-1 text-gray-500" />
              <span>
                {isCompleted ? (
                  <span className="text-emerald-400">Завершено</span>
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
      
      {/* Индикатор прогресса */}
      {!isCompleted && category && completedCount > 0 && (
        <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-indigo-600/80 to-blue-600/80" 
            style={{ width: `${completionPercentage}%` }} />
      )}
      
      {/* Значок завершения */}
      {isCompleted && (
        <Badge variant="default" className="absolute top-2 right-2 bg-emerald-700/80 hover:bg-emerald-700/80 px-2 py-1 text-xs">
          ✓ Завершено
        </Badge>
      )}
      
      {/* Эффект оверлея для глубины */}
      <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-gray-900/30 to-transparent opacity-70" />
      
      {/* Эффект при наведении с легким свечением */}
      <div className="absolute inset-0 bg-indigo-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Эффект подсветки по краям */}
      <div className="absolute inset-x-0 h-px top-0 bg-gradient-to-r from-transparent via-indigo-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
      <div className="absolute inset-x-0 h-px bottom-0 bg-gradient-to-r from-transparent via-indigo-900/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
    </button>
  );
};

export default CategoryButton;
