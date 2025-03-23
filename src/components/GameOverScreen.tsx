
import React from 'react';
import { Trophy, ArrowLeft, RefreshCw } from 'lucide-react';

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
  return (
    <div className="w-full max-w-xl mx-auto px-4 flex flex-col items-center justify-center min-h-[70vh]">
      <div className="glass p-8 rounded-2xl w-full max-w-md text-center animate-scale-in">
        <Trophy size={60} className="mx-auto mb-4 text-warning" />
        
        <h2 className="text-2xl font-bold mb-2 text-white">Игра окончена</h2>
        <p className="text-white/70 mb-6">Вы отгадали {score} флагов</p>
        
        <div className="flex flex-col gap-3">
          <button
            onClick={onRestart}
            className="glass-dark px-6 py-3 rounded-xl flex items-center justify-center transition-all duration-300 hover:bg-white/10"
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
