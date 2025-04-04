
import React, { useEffect } from 'react';
import MainMenu from '../components/MainMenu';
import { Globe, Music, Heart, Flame } from 'lucide-react';

const Index = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="min-h-screen bg-background pb-16 relative overflow-hidden">
      {/* Background texture and effects */}
      <div className="absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMjIiIGZpbGwtb3BhY2l0eT0iMC4wOCI+PHBhdGggZD0iTTM2IDM0djJoLTJ2LTJoMnptMC00aDJ2MmgtMnYtMnptLTQgMHYySDF0djJoMnYyaC0ydjJoMnYyaDJ2LTRoNHYtMmgtNHYtMmg0di0yaC02em04IDB2Mmg0djJoLTJ2MmgydjJoMnYtNmgtNnptNCA0aDJ2MmgtMnYtMnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-5"></div>
      </div>

      {/* Glowing elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-40 -left-20 w-80 h-80 rounded-full bg-accent/5 blur-[100px] opacity-60"></div>
        <div className="absolute bottom-40 -right-20 w-96 h-96 rounded-full bg-[#FF5252]/5 blur-[100px] opacity-50"></div>
      </div>
      
      {/* Header with logo */}
      <header className="pt-8 px-4 relative z-10">
        <div className="max-w-md mx-auto flex items-center justify-center mb-12">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-gradient-radial from-accent/20 to-transparent blur-xl opacity-70"></div>
            <div className="w-16 h-16 flex items-center justify-center relative">
              <Globe size={48} className="text-accent animate-float" />
            </div>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <div className="relative z-10 max-w-xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-6 tracking-tight">
            <span className="bg-gradient-to-r from-white to-foreground-subtle bg-clip-text text-transparent">
              Флаги Мира
            </span>
          </h1>
          
          <p className="text-foreground-subtle max-w-md mx-auto text-lg">
            Проверьте свои знания флагов стран мира в элегантной и захватывающей игре
          </p>
        </div>
        
        {/* Feature highlights */}
        <div className="grid grid-cols-3 gap-4 mb-10 max-w-md mx-auto">
          <div className="flex flex-col items-center text-center p-3">
            <div className="w-12 h-12 rounded-full bg-card-light flex items-center justify-center mb-3 shadow-inner-highlight">
              <Globe size={22} className="text-accent-muted" />
            </div>
            <span className="text-foreground-subtle text-sm">Более 200 стран</span>
          </div>
          
          <div className="flex flex-col items-center text-center p-3">
            <div className="w-12 h-12 rounded-full bg-card-light flex items-center justify-center mb-3 shadow-inner-highlight">
              <Flame size={22} className="text-[#FF5252]" />
            </div>
            <span className="text-foreground-subtle text-sm">Сложные уровни</span>
          </div>
          
          <div className="flex flex-col items-center text-center p-3">
            <div className="w-12 h-12 rounded-full bg-card-light flex items-center justify-center mb-3 shadow-inner-highlight">
              <Heart size={22} className="text-[#FF9FB1]" />
            </div>
            <span className="text-foreground-subtle text-sm">Интересная игра</span>
          </div>
        </div>
        
        <MainMenu />
      </div>
      
      {/* Subtle footer */}
      <footer className="absolute bottom-6 left-0 right-0 text-center text-foreground-subtle/30 text-xs">
        © 2025 Флаги Мира
      </footer>
    </div>
  );
};

export default Index;
