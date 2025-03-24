
import React from 'react';
import Header from '../components/Header';
import RegionSelection from '../components/RegionSelection';

const Capitals = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-950 to-indigo-950 pb-16">
      <Header />
      <RegionSelection />
    </div>
  );
};

export default Capitals;
