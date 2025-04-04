
import React, { useEffect } from 'react';
import MainMenu from '../components/MainMenu';
import { Globe } from 'lucide-react';

const Index = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="min-h-screen bg-[#0D0D0D] pb-16 relative overflow-hidden">
      {/* Background Noise and Subtle Texture */}
      <div className="absolute inset-0 opacity-10 mix-blend-soft-light pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.05)_0%,_transparent_70%)]"></div>
      </div>
      
      {/* Subtle Glowing Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 left-1/4 w-96 h-96 rounded-full bg-white/5 blur-3xl opacity-20"></div>
        <div className="absolute bottom-20 right-1/4 w-96 h-96 rounded-full bg-white/5 blur-3xl opacity-20"></div>
      </div>
      
      {/* Main Content */}
      <div className="relative z-10 pt-16 max-w-xl mx-auto px-4">
        <div className="text-center mb-12">
          <div className="relative inline-block mb-6">
            <div className="absolute inset-0 rounded-full bg-white/10 blur-xl"></div>
            <Globe size={80} className="mx-auto text-white/80 relative z-10" />
          </div>
          
          <h1 className="text-4xl font-bold text-white mb-4 tracking-tight">
            Флаги Мира
          </h1>
          
          <p className="text-white/60 max-w-md mx-auto text-lg">
            Проверьте свои знания флагов стран мира в элегантной и захватывающей игре
          </p>
        </div>
        
        <MainMenu />
      </div>
    </div>
  );
};

export default Index;
