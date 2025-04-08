
import React, { useEffect } from 'react';
import MainMenu from '../components/MainMenu';

const Index = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="min-h-screen bg-background pb-16 relative overflow-hidden">
      {/* Enhanced background texture and effects */}
      <div className="absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMjIiIGZpbGwtb3BhY2l0eT0iMC4wOCI+PHBhdGggZD0iTTM2IDM0djJoLTJ2LTJoMnptMC00aDJ2MmgtMnYtMnptLTQgMHYySDF0djJoMnYyaC0ydjJoMnYyaDJ2LTRoNHYtMmgtNHYtMmg0di0yaC02em04IDB2Mmg0djJoLTJ2MmgydjJoMnYtNmgtNnptNCA0aDJ2MmgtMnYtMnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-5"></div>
      </div>

      {/* Enhanced glowing elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-40 -left-20 w-96 h-96 rounded-full bg-blue-600/10 blur-[120px] opacity-70 animate-float"></div>
        <div className="absolute bottom-40 -right-20 w-108 h-108 rounded-full bg-indigo-500/10 blur-[130px] opacity-60 animate-float" style={{ animationDelay: '-4s' }}></div>
        <div className="absolute top-1/4 right-1/4 w-72 h-72 rounded-full bg-purple-500/5 blur-[80px] opacity-40 animate-float" style={{ animationDelay: '-2s' }}></div>
      </div>
      
      {/* Dynamic particles effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-40">
        <div className="absolute top-1/4 left-1/4 w-1 h-1 rounded-full bg-white/40 animate-pulse-slow"></div>
        <div className="absolute top-1/3 left-2/3 w-1.5 h-1.5 rounded-full bg-white/40 animate-pulse-slow" style={{ animationDelay: '-1s' }}></div>
        <div className="absolute top-2/3 left-1/5 w-1 h-1 rounded-full bg-white/40 animate-pulse-slow" style={{ animationDelay: '-2s' }}></div>
        <div className="absolute top-1/2 right-1/4 w-1 h-1 rounded-full bg-white/40 animate-pulse-slow" style={{ animationDelay: '-3s' }}></div>
        <div className="absolute bottom-1/4 right-1/2 w-1.5 h-1.5 rounded-full bg-white/40 animate-pulse-slow" style={{ animationDelay: '-4s' }}></div>
      </div>
      
      {/* Main Content */}
      <div className="relative z-10 max-w-xl mx-auto px-4 pt-10">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-2 text-shadow bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-indigo-100">
            Флаги Мира
          </h1>
          <p className="text-blue-400/80 max-w-md mx-auto">
            Увлекательная викторина о флагах и столицах всех стран мира
          </p>
        </div>
        
        <MainMenu />
      </div>
      
      {/* Enhanced subtle footer */}
      <footer className="absolute bottom-6 left-0 right-0 text-center text-foreground-subtle/30 text-xs">
        <div className="flex flex-col items-center">
          <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-white/10 to-transparent mb-2"></div>
          <p>© 2025 Флаги Мира</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
