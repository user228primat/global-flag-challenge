
import React from 'react';
import { CategoryId } from '../types';

type RegionImageProps = {
  region: CategoryId;
  className?: string;
};

const RegionImages: React.FC<RegionImageProps> = ({ region, className = "" }) => {
  // Объект с путями к изображениям регионов
  const regionImages: Record<string, string> = {
    europe: "https://cdn.pixabay.com/photo/2016/07/14/13/35/europe-1516733_1280.jpg",
    asia: "https://cdn.pixabay.com/photo/2014/05/05/17/36/asia-338447_1280.jpg", 
    northAmerica: "https://cdn.pixabay.com/photo/2023/10/17/04/32/north-america-8320768_1280.jpg",
    southAmerica: "https://cdn.pixabay.com/photo/2014/05/26/09/25/south-america-354563_1280.jpg",
    africa: "https://cdn.pixabay.com/photo/2018/09/18/11/19/morocco-3685773_1280.jpg",
    australiaOceania: "https://cdn.pixabay.com/photo/2017/01/19/17/28/map-1992972_1280.jpg",
    capitals: "https://cdn.pixabay.com/photo/2018/09/18/11/19/morocco-3685773_1280.jpg"
  };

  const fallbackImage = "/images/regions/fallback.jpg";
  const imagePath = regionImages[region] || fallbackImage;
  
  return (
    <div 
      className={`w-full h-24 rounded-t-lg overflow-hidden ${className}`}
      style={{ 
        backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.7)), url(${imagePath})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    />
  );
};

export default RegionImages;
