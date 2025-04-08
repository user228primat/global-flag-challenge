
import React, { useEffect } from 'react';
import MainMenu from '../components/MainMenu';

const Index = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="min-h-screen bg-background pb-16 relative overflow-hidden">
      {/* Background texture and effects - All pointer-events-none */}
      <div className="absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMjIiIGZpbGwtb3BhY2l0eT0iMC4wOCI+PHBhdGggZD0iTTM2IDM0djJoLTJ2LTJoMnptMC00aDJ2MmgtMnYtMnptLTQgMHYySDF0djJoMnYyaC0ydjJoMnYyaDJ2LTRoNHYtMmgtNHYtMmg0di0yaC02em04IDB2Mmg0djJoLTJ2MmgydjJoMnYtNmgtNnptNCA0aDJ2MmgtMnYtMnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-5"></div>
      </div>

      {/* Glowing elements - All pointer-events-none */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-40 -left-20 w-80 h-80 rounded-full bg-accent/5 blur-[100px] opacity-60"></div>
        <div className="absolute bottom-40 -right-20 w-96 h-96 rounded-full bg-[#FF5252]/5 blur-[100px] opacity-50"></div>
      </div>
      
      {/* Main Content - with z-index to stay above backgrounds */}
      <div className="relative z-10 max-w-xl mx-auto px-4 pt-10">
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
