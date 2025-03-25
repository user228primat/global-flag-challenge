
import React, { useEffect } from 'react';
import CapitalsOptions from '../components/CapitalsOptions';

const CapitalsOptionsPage = () => {
  // Сбрасываем позицию прокрутки при загрузке страницы
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="min-h-screen bg-background pb-16">
      <CapitalsOptions />
    </div>
  );
};

export default CapitalsOptionsPage;
