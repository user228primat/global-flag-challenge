
import React from 'react';
import { Heart } from 'lucide-react';

interface LivesIndicatorProps {
  lives: number;
  maxLives: number;
}

const LivesIndicator: React.FC<LivesIndicatorProps> = ({ lives, maxLives }) => {
  return (
    <div className="flex items-center space-x-1.5">
      {Array.from({ length: maxLives }).map((_, index) => (
        <Heart
          key={index}
          size={24}
          className={`transition-all duration-300 ${
            index < lives 
              ? 'text-pink-500 fill-pink-500 filter drop-shadow-[0_0_3px_rgba(236,72,153,0.5)] animate-pulse-slow' 
              : 'text-gray-700/70'
          }`}
          style={{ animationDelay: `${index * 0.5}s` }}
        />
      ))}
    </div>
  );
};

export default LivesIndicator;
