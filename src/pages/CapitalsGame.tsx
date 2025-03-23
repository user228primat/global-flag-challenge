
import React from 'react';
import Header from '../components/Header';
import GameScreen from '../components/GameScreen';

const CapitalsGame = () => {
  return (
    <div className="min-h-screen bg-background pb-16">
      <Header />
      <GameScreen />
    </div>
  );
};

export default CapitalsGame;
