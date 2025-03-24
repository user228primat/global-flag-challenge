
import React from 'react';
import MainMenu from '../components/MainMenu';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 to-indigo-950 pb-16">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-blue-950/10 to-transparent pointer-events-none"></div>
      <div className="relative z-10">
        <MainMenu />
      </div>
    </div>
  );
};

export default Index;
