
import React from 'react';
import MainMenu from '../components/MainMenu';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 to-blue-950 pb-16">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-indigo-950/5 to-transparent pointer-events-none"></div>
      <div className="relative z-10">
        <MainMenu />
      </div>
    </div>
  );
};

export default Index;
