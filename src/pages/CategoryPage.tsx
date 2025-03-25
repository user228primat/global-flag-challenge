
import React from 'react';
import Header from '../components/Header';
import CategoryOptions from '../components/CategoryOptions';

const CategoryPage = () => {
  return (
    <div className="min-h-screen bg-background pb-16">
      <Header />
      <CategoryOptions />
    </div>
  );
};

export default CategoryPage;
