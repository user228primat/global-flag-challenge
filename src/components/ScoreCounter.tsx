
import React from 'react';
import { Trophy } from 'lucide-react';

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
  return (
    <div className="glass px-4 py-3 rounded-xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Trophy size={18} className="text-warning" />
          <div className="text-sm font-medium text-white">
            {score} / {totalFlags}
          </div>
        </div>
        <div className="text-xs text-white/60">
          Рекорд: {highScore}
        </div>
      </div>
    </div>
  );
};

export default ScoreCounter;
