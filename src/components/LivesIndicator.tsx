
import React from 'react';
import { Heart } from 'lucide-react';

interface LivesIndicatorProps {
  lives: number;
  maxLives: number;
}

const LivesIndicator: React.FC<LivesIndicatorProps> = ({ lives, maxLives }) => {
  return (
    <div className="flex items-center space-x-1">
      {Array.from({ length: maxLives }).map((_, index) => (
        <Heart
          key={index}
          size={24}
          className={`transition-all duration-300 ${
            index < lives 
              ? 'text-error fill-error animate-pulse-slow' 
              : 'text-white/20'
          }`}
        />
      ))}
    </div>
  );
};

export default LivesIndicator;
