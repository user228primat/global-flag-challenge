
import React, { useEffect } from 'react';
import MainMenu from '../components/MainMenu';
import { Globe } from 'lucide-react';

const Index = () => {
  // Reset scroll position when page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-950 pb-16 relative overflow-hidden">
      {/* Фоновые элементы */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-800/5 via-gray-900/5 to-transparent pointer-events-none"></div>
      
      {/* Светящиеся элементы */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 left-1/4 w-72 h-72 rounded-full bg-indigo-700/5 blur-3xl animate-float opacity-60"></div>
        <div className="absolute bottom-20 right-1/4 w-96 h-96 rounded-full bg-blue-800/5 blur-3xl animate-float opacity-60" style={{animationDelay: '3s'}}></div>
        <div className="absolute top-60 right-1/3 w-64 h-64 rounded-full bg-purple-800/5 blur-3xl animate-float opacity-60" style={{animationDelay: '2s'}}></div>
        
        {/* Тонкая текстура шума */}
        <div className="absolute inset-0 opacity-20 mix-blend-soft-light bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIj4KICA8ZmlsdGVyIGlkPSJub2lzZSIgeD0iMCIgeT0iMCIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSI+CiAgICA8ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iMC42NSIgbnVtT2N0YXZlcz0iMyIgc3RpdGNoVGlsZXM9InN0aXRjaCIvPgogICAgPGZlQmxlbmQgbW9kZT0ic2NyZWVuIi8+CiAgPC9maWx0ZXI+CiAgPHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsdGVyPSJ1cmwoI25vaXNlKSIgb3BhY2l0eT0iMC4wNSIvPgo8L3N2Zz4=')]"></div>
      </div>
      
      {/* Основной контент */}
      <div className="relative z-10 pt-12">
        <div className="w-full max-w-xl mx-auto px-4 mb-8">
          <div className="text-center mb-8">
            <div className="relative inline-block">
              <div className="absolute inset-0 rounded-full bg-indigo-500/20 blur-xl animate-pulse-slow"></div>
              <Globe size={80} className="mx-auto text-indigo-400 relative z-10" />
            </div>
            <h1 className="mt-6 text-4xl font-bold bg-gradient-to-r from-gray-200 to-indigo-200 bg-clip-text text-transparent">
              Флаги Мира
            </h1>
            <p className="mt-3 text-gray-400 max-w-md mx-auto">
              Проверьте свои знания флагов и столиц стран мира в увлекательной игре
            </p>
          </div>
        </div>
        
        <MainMenu />
      </div>
    </div>
  );
};

export default Index;
