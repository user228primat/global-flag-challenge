
import React, { useEffect } from 'react';
import GameScreen from '../components/GameScreen';

const Game = () => {
  // Сбрасываем позицию прокрутки при загрузке страницы
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-blue-950 pb-16 relative overflow-hidden">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/5 via-slate-900/0 to-transparent pointer-events-none"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-48 h-48 rounded-full bg-blue-700/5 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-56 h-56 rounded-full bg-indigo-800/5 blur-3xl pointer-events-none"></div>
      
      <GameScreen />
    </div>
  );
};

export default Game;
