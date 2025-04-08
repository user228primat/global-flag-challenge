
import React, { useEffect } from 'react';
import GameScreen from '../components/GameScreen';

const Game = () => {
  // Сбрасываем позицию прокрутки при загрузке страницы
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="min-h-screen bg-background pb-16 relative overflow-hidden">
      {/* Enhanced background texture and effects */}
      <div className="absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMjIiIGZpbGwtb3BhY2l0eT0iMC4wOCI+PHBhdGggZD0iTTM2IDM0djJoLTJ2LTJoMnptMC00aDJ2MmgtMnYtMnptLTQgMHYySDF0djJoMnYyaC0ydjJoMnYyaDJ2LTRoNHYtMmgtNHYtMmg0di0yaC02em04IDB2Mmg0djJoLTJ2MmgydjJoMnYtNmgtNnptNCA0aDJ2MmgtMnYtMnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-5"></div>
      </div>

      {/* Enhanced subtle gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-slate-900/5 to-transparent pointer-events-none"></div>
      
      {/* Enhanced glowing elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-blue-700/10 blur-[80px] animate-float"></div>
        <div className="absolute bottom-10 right-10 w-72 h-72 rounded-full bg-indigo-800/10 blur-[90px] animate-float" style={{ animationDelay: '-4s' }}></div>
        <div className="absolute top-1/3 right-1/4 w-56 h-56 rounded-full bg-purple-700/5 blur-[60px] animate-float" style={{ animationDelay: '-2s' }}></div>
      </div>
      
      {/* Dynamic moving particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
        <div className="absolute top-1/4 left-1/4 w-1 h-1 rounded-full bg-white/30 animate-pulse-slow"></div>
        <div className="absolute top-1/3 left-2/3 w-1 h-1 rounded-full bg-white/30 animate-pulse-slow" style={{ animationDelay: '-1s' }}></div>
        <div className="absolute top-2/3 left-1/5 w-1 h-1 rounded-full bg-white/30 animate-pulse-slow" style={{ animationDelay: '-2s' }}></div>
        <div className="absolute top-1/2 right-1/4 w-1 h-1 rounded-full bg-white/30 animate-pulse-slow" style={{ animationDelay: '-3s' }}></div>
        <div className="absolute bottom-1/4 right-1/2 w-1 h-1 rounded-full bg-white/30 animate-pulse-slow" style={{ animationDelay: '-4s' }}></div>
      </div>
      
      <div className="relative z-20">
        <GameScreen />
      </div>
    </div>
  );
};

export default Game;
