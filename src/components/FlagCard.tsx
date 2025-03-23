
import React, { useState } from 'react';
import { Country } from '../types';

interface FlagCardProps {
  country: Country;
  isLoading?: boolean;
}

const FlagCard: React.FC<FlagCardProps> = ({ country, isLoading = false }) => {
  const [loaded, setLoaded] = useState(false);
  const flagUrl = `/images/${country.flagFile}`;
  
  const handleImageLoad = () => {
    setLoaded(true);
  };

  return (
    <div className="w-full max-w-xl mx-auto relative overflow-hidden rounded-xl glass">
      {/* Loading state */}
      {(isLoading || !loaded) && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm">
          <div className="w-8 h-8 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
        </div>
      )}
      
      {/* Flag image */}
      <div className="w-full p-4 flex justify-center">
        <img
          src={flagUrl}
          alt={`Flag of ${country.name}`}
          className={`max-w-full max-h-48 object-contain transition-opacity duration-300 rounded-lg ${
            loaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={handleImageLoad}
        />
      </div>
    </div>
  );
};

export default FlagCard;
