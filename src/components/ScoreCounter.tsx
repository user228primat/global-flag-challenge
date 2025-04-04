
import React from 'react';
import { Trophy, Star, Award } from 'lucide-react';

interface ScoreCounterProps {
  score: number;
  highScore: number;
  totalFlags: number;
}

const ScoreCounter: React.FC<ScoreCounterProps> = ({ 
  score, 
  highScore, 
  totalFlags 
}) => {
  // Определить, является ли текущий результат рекордом
  const isNewHighScore = score > highScore;
  
  // Вычислить процент прогресса
  const progressPercentage = Math.min(100, Math.round((score / totalFlags) * 100));
  
  return (
    <div className="glass-dark px-4 py-3 rounded-xl border border-gray-700/30 bg-gradient-to-r from-gray-800/80 to-gray-900/90 relative overflow-hidden">
      {/* Индикатор прогресса */}
      <div 
        className="absolute left-0 bottom-0 h-1 bg-gradient-to-r from-indigo-600/90 to-indigo-400/80 transition-all duration-500 ease-out"
        style={{ width: `${progressPercentage}%` }}
      />
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Award size={18} className="text-indigo-400" />
          <div className="text-sm font-medium text-white">
            {score} / {totalFlags}
          </div>
        </div>
        
        <div className="flex items-center gap-1.5 text-xs">
          <Trophy size={14} className="text-amber-400" />
          <div className={`${isNewHighScore ? "text-amber-300 font-bold" : "text-gray-400"}`}>
            Рекорд: {isNewHighScore ? score : highScore}
            {isNewHighScore && <Star size={12} className="inline-block ml-1" fill="currentColor" />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScoreCounter;
