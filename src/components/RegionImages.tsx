
import React, { useState, useEffect } from 'react';
import { CategoryId } from '../types';

type RegionImageProps = {
  region: CategoryId;
  className?: string;
};

const RegionImages: React.FC<RegionImageProps> = ({ region, className = "" }) => {
  const [imagePath, setImagePath] = useState<string>("");
  const [isYandexEnvironment, setIsYandexEnvironment] = useState<boolean>(false);
  const [loaded, setLoaded] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    // Определяем, находимся ли в окружении Яндекс.Игр
    const inYandexGames = window.location.href.includes('yandex') || 
                          window.location.href.includes('games.s3') || 
                          window.location.origin.includes('app-');
    
    setIsYandexEnvironment(inYandexGames);
    
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
    const baseImagePath = regionImages[region] || fallbackImage;
    
    // В окружении Яндекс.Игр используем относительные пути
    setImagePath(inYandexGames ? `.${baseImagePath}` : baseImagePath);
  }, [region]);

  const handleImageLoad = () => {
    setLoaded(true);
    setError(false);
  };

  const handleImageError = () => {
    console.error(`Failed to load image for region: ${region}`);
    setError(true);
    setLoaded(true); // Consider it "loaded" even though it errored
  };

  const getBackgroundStyles = () => {
    if (!loaded || error) {
      return {
        background: 'linear-gradient(to bottom, #1e3a8a, #0f172a)',
      };
    }
    
    return {
      backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.8)), url(${imagePath})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    };
  };

  return (
    <div 
      className={`w-full h-24 rounded-lg overflow-hidden mb-3 ${className}`}
      style={getBackgroundStyles()}
    >
      {!loaded && (
        <div className="h-full flex items-center justify-center">
          <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      {/* Hidden image for preloading */}
      <img 
        src={imagePath} 
        alt=""
        className="hidden"
        onLoad={handleImageLoad}
        onError={handleImageError}
      />
    </div>
  );
};

export default RegionImages;
