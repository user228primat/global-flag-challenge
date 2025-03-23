
import React from 'react';
import { Trophy, ArrowLeft, RefreshCw, Award, Star } from 'lucide-react';
import { useGameContext } from '../contexts/GameContext';

interface GameOverScreenProps {
  score: number;
  onExit: () => void;
  onRestart: () => void;
}

const GameOverScreen: React.FC<GameOverScreenProps> = ({ 
  score, 
  onExit, 
  onRestart 
}) => {
  const { currentCategory, gameStats } = useGameContext();
  const isHighScore = currentCategory ? score > gameStats[currentCategory].highScore : false;
  const isCategoryCompleted = currentCategory ? gameStats[currentCategory].isComplete : false;

  return (
    <div className="w-full max-w-xl mx-auto px-4 flex flex-col items-center justify-center min-h-[70vh]">
      <div className="glass p-8 rounded-2xl w-full max-w-md text-center bg-gradient-to-br from-primary/10 to-transparent border border-white/10">
        <div className="relative inline-block">
          <Trophy size={80} className="mx-auto mb-4 text-warning" />
          {isHighScore && (
            <div className="absolute -top-2 -right-2 text-warning">
              <Star size={24} fill="currentColor" />
            </div>
          )}
        </div>
        
        <h2 className="text-3xl font-bold mb-2 text-white">Игра окончена</h2>
        
        <div className="mb-6 space-y-2">
          <p className="text-white/80 text-xl">Вы отгадали <span className="text-primary font-bold">{score}</span> флагов</p>
          
          {isHighScore && (
            <p className="text-warning font-medium">Новый рекорд!</p>
          )}
          
          {isCategoryCompleted && (
            <div className="flex items-center justify-center space-x-2 text-success">
              <Award size={20} />
              <span className="font-medium">Категория завершена!</span>
            </div>
          )}
        </div>
        
        <div className="flex flex-col gap-4">
          <button
            onClick={onRestart}
            className="glass-dark px-6 py-3 rounded-xl flex items-center justify-center transition-all duration-300 hover:bg-white/10 bg-gradient-to-r from-primary/20 to-transparent"
          >
            <RefreshCw size={20} className="mr-2" />
            <span>Начать заново</span>
          </button>
          
          <button
            onClick={onExit}
            className="px-6 py-3 rounded-xl flex items-center justify-center transition-all duration-300 hover:bg-white/5"
          >
            <ArrowLeft size={20} className="mr-2" />
            <span>Вернуться в меню</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameOverScreen;
