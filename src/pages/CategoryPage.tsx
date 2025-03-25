
import React, { useEffect } from 'react';
import CategoryOptions from '../components/CategoryOptions';

const CategoryPage = () => {
  // Reset scroll position when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1A202C] to-[#2D3748] pb-16">
      <CategoryOptions />
    </div>
  );
};

export default CategoryPage;
