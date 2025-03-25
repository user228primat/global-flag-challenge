
import React, { useEffect } from 'react';
import RegionSelection from '../components/RegionSelection';

const Capitals = () => {
  // Сбрасываем позицию прокрутки при загрузке страницы
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-950 to-indigo-950 pb-16">
      <RegionSelection />
    </div>
  );
};

export default Capitals;
