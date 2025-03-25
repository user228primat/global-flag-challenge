
import React, { useEffect } from 'react';
import CategoryOptions from '../components/CategoryOptions';

const CategoryPage = () => {
  // Сбрасываем позицию прокрутки при загрузке страницы
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="min-h-screen bg-background pb-16">
      <CategoryOptions />
    </div>
  );
};

export default CategoryPage;
