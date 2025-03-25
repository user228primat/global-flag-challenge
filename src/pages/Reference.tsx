
import React, { useEffect } from 'react';
import ReferenceTable from '../components/ReferenceTable';

const Reference = () => {
  // Сбрасываем позицию прокрутки при загрузке страницы
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="min-h-screen bg-background pb-16">
      <ReferenceTable />
    </div>
  );
};

export default Reference;
