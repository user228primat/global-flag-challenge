
import React from 'react';
import MainMenu from '../components/MainMenu';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-deep pb-16 relative overflow-hidden">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/5 via-slate-900/0 to-transparent pointer-events-none"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-blue-700/5 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-20 right-10 w-72 h-72 rounded-full bg-indigo-800/5 blur-3xl pointer-events-none"></div>
      
      {/* Content container */}
      <div className="relative z-10">
        <MainMenu />
      </div>
    </div>
  );
};

export default Index;
