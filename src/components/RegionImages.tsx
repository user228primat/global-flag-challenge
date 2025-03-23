
import React from 'react';
import { CategoryId } from '../types';

type RegionImageProps = {
  region: CategoryId;
  className?: string;
};

const RegionImages: React.FC<RegionImageProps> = ({ region, className = "" }) => {
  // Объект с путями к изображениям регионов
  const regionImages: Record<string, string> = {
    europe: "/images/regions/europe.jpg",
    asia: "/images/regions/asia.jpg",
    northAmerica: "/images/regions/north-america.jpg",
    southAmerica: "/images/regions/south-america.jpg",
    africa: "/images/regions/africa.jpg",
    australiaOceania: "/images/regions/australia.jpg",
    level1: "/images/regions/level1.jpg",
    level2: "/images/regions/level2.jpg",
    level3: "/images/regions/level3.jpg",
    allFlags: "/images/regions/world.jpg",
    capitals: "/images/regions/capitals.jpg"
  };

  const fallbackImage = "/images/regions/fallback.jpg";
  const imagePath = regionImages[region] || fallbackImage;
  
  return (
    <div 
      className={`w-full h-24 rounded-lg overflow-hidden mb-3 ${className}`}
      style={{ 
        backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.8)), url(${imagePath})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    />
  );
};

export default RegionImages;
