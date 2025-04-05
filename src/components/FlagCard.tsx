
import React, { useState, useEffect } from 'react';
import { Country } from '../types';

interface FlagCardProps {
  country: Country;
  isLoading?: boolean;
}

const FlagCard: React.FC<FlagCardProps> = ({ country, isLoading = false }) => {
  const [loaded, setLoaded] = useState(false);
  const [flagSrc, setFlagSrc] = useState('');
  const [error, setError] = useState(false);
  
  useEffect(() => {
    // Определяем, находимся ли в окружении Яндекс.Игр
    const inYandexGames = window.location.href.includes('yandex') || 
                          window.location.href.includes('games.s3') || 
                          window.location.origin.includes('app-');
    
    // Формируем путь к флагу с учетом окружения
    const baseImagePath = `/images/${country.flagFile}`;
    setFlagSrc(inYandexGames ? `.${baseImagePath}` : baseImagePath);
    
    // При смене страны сбрасываем состояние загрузки
    setLoaded(false);
    setError(false);
  }, [country.flagFile]);
  
  const handleImageLoad = () => {
    setLoaded(true);
    setError(false);
  };

  const handleImageError = () => {
    console.error(`Failed to load flag image: ${country.flagFile}`);
    setError(true);
    setLoaded(true); // Consider it "loaded" even though it errored
  };

  return (
    <div className="w-full max-w-md mx-auto relative overflow-hidden rounded-xl glass-dark shadow-lg">
      {/* Fixed height container to ensure consistent layout */}
      <div className="aspect-[3/2] relative flex items-center justify-center">
        {/* Loading state */}
        {(isLoading || !loaded) && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-10">
            <div className="w-8 h-8 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
          </div>
        )}
        
        {/* Error state */}
        {error && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-10">
            <div className="text-center p-4">
              <div className="text-red-500 text-lg mb-2">Ошибка загрузки</div>
              <div className="text-sm text-white/70">{country.name}</div>
            </div>
          </div>
        )}
        
        {/* Flag image */}
        <img
          src={flagSrc}
          alt={`Флаг ${country.name}`}
          className={`max-w-full max-h-full object-contain transition-opacity duration-300 ${
            loaded && !error ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={handleImageLoad}
          onError={handleImageError}
        />
      </div>
    </div>
  );
};

export default FlagCard;
