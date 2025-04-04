
import React, { useEffect } from 'react';
import MainMenu from '../components/MainMenu';
import { Globe } from 'lucide-react';

const Index = () => {
  // Reset scroll position when page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-blue-950 pb-16 relative overflow-hidden">
      {/* Enhanced backdrop elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/10 via-slate-900/5 to-transparent pointer-events-none"></div>
      
      {/* Dynamic animated background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div className="absolute top-20 left-1/4 w-72 h-72 rounded-full bg-blue-700/5 blur-3xl animate-float opacity-70"></div>
        <div className="absolute bottom-40 right-1/4 w-80 h-80 rounded-full bg-indigo-800/5 blur-3xl animate-float opacity-70" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-60 right-1/3 w-64 h-64 rounded-full bg-purple-700/5 blur-3xl animate-float opacity-70" style={{animationDelay: '1s'}}></div>
        <div className="absolute -bottom-20 left-1/3 w-96 h-96 rounded-full bg-blue-600/5 blur-3xl animate-float opacity-70" style={{animationDelay: '3s'}}></div>
        
        {/* Light grain texture */}
        <div className="absolute inset-0 opacity-20 mix-blend-soft-light bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIj4KICA8ZmlsdGVyIGlkPSJub2lzZSIgeD0iMCIgeT0iMCIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSI+CiAgICA8ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iMC42NSIgbnVtT2N0YXZlcz0iMyIgc3RpdGNoVGlsZXM9InN0aXRjaCIvPgogICAgPGZlQmxlbmQgbW9kZT0ic2NyZWVuIi8+CiAgPC9maWx0ZXI+CiAgPHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsdGVyPSJ1cmwoI25vaXNlKSIgb3BhY2l0eT0iMC4wNSIvPgo8L3N2Zz4=')]"></div>
      </div>
      
      {/* Content container with enhanced styling */}
      <div className="relative z-10 pt-12">
        <div className="w-full max-w-xl mx-auto px-4 mb-10">
          <div className="text-center mb-8">
            <div className="relative inline-block">
              <div className="absolute inset-0 rounded-full bg-blue-500/20 blur-xl animate-pulse-slow"></div>
              <Globe size={80} className="mx-auto text-blue-400 relative z-10" />
            </div>
          </div>
        </div>
        
        <MainMenu />
      </div>
    </div>
  );
};

export default Index;
