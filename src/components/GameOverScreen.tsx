
import React, { useEffect } from 'react';
import { Trophy, ArrowLeft, RefreshCw, Award, Star, Play } from 'lucide-react';
import { useGameContext } from '../contexts/GameContext';
import YandexGamesSDK from '../services/YandexGamesSDK';

interface GameOverScreenProps {
  score: number;
  onExit: () => void;
  onRestart: () => void;
  isVictory?: boolean;
}

const GameOverScreen: React.FC<GameOverScreenProps> = ({ 
  score, 
  onExit, 
  onRestart,
  isVictory = false
}) => {
  const { currentCategory, gameStats, showRewardedAd } = useGameContext();
  const isHighScore = currentCategory ? score > gameStats[currentCategory].highScore : false;
  const isCategoryCompleted = currentCategory ? gameStats[currentCategory].isComplete : false;

  // Show fullscreen ad when game over screen appears
  useEffect(() => {
    const yaSdk = YandexGamesSDK.getInstance();
    yaSdk.showFullscreenAd();
  }, []);

  // Handle continue with rewarded ad
  const handleContinueWithAd = async () => {
    await showRewardedAd();
  };

  return (
    <div className="w-full max-w-xl mx-auto px-4 flex flex-col items-center justify-center min-h-[70vh]">
      <div className="glass-dark p-8 rounded-2xl w-full max-w-md text-center bg-gradient-to-br from-slate-900/90 to-slate-950/80 border border-slate-800/50 shadow-xl">
        <div className="relative inline-block">
          <div className={`absolute inset-0 rounded-full ${isVictory ? 'bg-green-500/10' : 'bg-amber-500/10'} blur-xl`}></div>
          {isVictory ? (
            <Award size={80} className="mx-auto mb-4 text-green-400 relative z-10" />
          ) : (
            <Trophy size={80} className="mx-auto mb-4 text-warning relative z-10" />
          )}
          {isHighScore && (
            <div className="absolute -top-2 -right-2 text-warning z-20">
              <Star size={24} fill="currentColor" />
            </div>
          )}
        </div>
        
        <h2 className="text-3xl font-bold mb-2 text-white">
          {isVictory ? 'Победа!' : 'Игра окончена'}
        </h2>
        
        <div className="mb-6 space-y-2">
          <p className="text-white/90 text-xl">Вы отгадали <span className="text-primary font-bold">{score}</span> флагов</p>
          
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
            className="glass-dark px-6 py-3 rounded-xl flex items-center justify-center transition-all duration-300 hover:bg-slate-800/70 relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent opacity-50 rounded-xl"></div>
            <RefreshCw size={20} className="mr-2" />
            <span className="relative z-10">Начать заново</span>
            
            {/* Highlight effect on edges */}
            <div className="absolute inset-x-0 h-px top-0 bg-gradient-to-r from-transparent via-blue-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="absolute inset-x-0 h-px bottom-0 bg-gradient-to-r from-transparent via-blue-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </button>
          
          {/* Continue with Ad button - only show for loss, not victory */}
          {!isVictory && (
            <button
              onClick={handleContinueWithAd}
              className="glass-dark px-6 py-3 rounded-xl flex items-center justify-center transition-all duration-300 hover:bg-green-800/50 relative group bg-green-900/30 border border-green-800/40"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-transparent opacity-50 rounded-xl"></div>
              <Play size={20} className="mr-2 text-green-400" />
              <span className="relative z-10">Продолжить за рекламу</span>
              
              {/* Highlight effect on edges */}
              <div className="absolute inset-x-0 h-px top-0 bg-gradient-to-r from-transparent via-green-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="absolute inset-x-0 h-px bottom-0 bg-gradient-to-r from-transparent via-green-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </button>
          )}
          
          <button
            onClick={onExit}
            className="px-6 py-3 rounded-xl flex items-center justify-center transition-all duration-300 hover:bg-slate-800/40 bg-slate-900/40 border border-slate-800/30 group"
          >
            <ArrowLeft size={20} className="mr-2" />
            <span>Вернуться в меню</span>
            
            {/* Highlight effect on edges */}
            <div className="absolute inset-x-0 h-px top-0 bg-gradient-to-r from-transparent via-blue-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="absolute inset-x-0 h-px bottom-0 bg-gradient-to-r from-transparent via-blue-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameOverScreen;
