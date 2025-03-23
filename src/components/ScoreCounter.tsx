
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
  // Determine if score is higher than high score
  const isNewHighScore = score > highScore;
  
  // Calculate progress percentage
  const progressPercentage = Math.min(100, Math.round((score / totalFlags) * 100));
  
  return (
    <div className="glass px-4 py-3 rounded-xl border border-white/10 bg-gradient-to-r from-white/5 to-transparent relative overflow-hidden">
      {/* Progress bar */}
      <div 
        className="absolute left-0 bottom-0 h-1 bg-primary transition-all duration-500 ease-out"
        style={{ width: `${progressPercentage}%` }}
      />
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Award size={18} className="text-primary" />
          <div className="text-sm font-medium text-white">
            {score} / {totalFlags}
          </div>
        </div>
        
        <div className="flex items-center gap-1 text-xs">
          <Trophy size={14} className="text-warning" />
          <div className={`${isNewHighScore ? "text-warning font-bold" : "text-white/60"}`}>
            Рекорд: {isNewHighScore ? score : highScore}
            {isNewHighScore && <Star size={12} className="inline-block ml-1" fill="currentColor" />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScoreCounter;
