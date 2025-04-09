
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGameContext } from '../contexts/GameContext';
import { gameCategories, categoryDisplayNames } from '../data';
import { ArrowLeft, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from "@/hooks/use-toast";

const ReferenceTable: React.FC = () => {
  const navigate = useNavigate();
  const { currentCategory } = useGameContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [inYandexGames, setInYandexGames] = useState(false);
  
  useEffect(() => {
    // Определяем, находимся ли в окружении Яндекс.Игр
    const isYandexGames = window.location.href.includes('yandex') || 
                         window.location.href.includes('games.s3') || 
                         window.location.origin.includes('app-');
    setInYandexGames(isYandexGames);
  }, []);
  
  if (!currentCategory) {
    console.error("No current category set in ReferenceTable");
    toast({
      title: "Ошибка",
      description: "Категория не выбрана",
      variant: "destructive",
    });
    return null;
  }
  
  // Debug output to see what category is being used
  console.log(`Reference table for category: ${currentCategory}`);
  console.log(`Available categories: ${Object.keys(gameCategories).join(', ')}`);
  
  if (!gameCategories[currentCategory]) {
    console.error(`Category ${currentCategory} not found in gameCategories`);
    toast({
      title: "Ошибка",
      description: `Категория ${currentCategory} не найдена в данных игры`,
      variant: "destructive",
    });
    return null;
  }
  
  const category = gameCategories[currentCategory];
  const displayName = categoryDisplayNames[currentCategory] || 'Категория';
  
  console.log(`Found category with ${category.countries.length} countries`);
  
  const handleBackClick = () => {
    console.log('Back button clicked in ReferenceTable, currentCategory:', currentCategory);
    const isCapitalsCategory = currentCategory.startsWith('capitals');
    
    if (isCapitalsCategory) {
      // Extract region from capitals category (e.g., capitalsEurope -> europe)
      let region = '';
      if (currentCategory === 'capitals') {
        region = '';
      } else if (currentCategory === 'capitalsEurope') {
        region = 'europe';
      } else if (currentCategory === 'capitalsAsia') {
        region = 'asia';
      } else if (currentCategory === 'capitalsNorthAmerica') {
        region = 'northAmerica';
      } else if (currentCategory === 'capitalsSouthAmerica') {
        region = 'southAmerica';
      } else if (currentCategory === 'capitalsAfrica') {
        region = 'africa';
      } else if (currentCategory === 'capitalsAustraliaOceania') {
        region = 'australiaOceania';
      }
      
      if (region) {
        console.log('Navigating to capitals options with region:', region);
        navigate(`/capitals/${region}`);
      } else {
        console.log('Navigating to main capitals page');
        navigate('/capitals');
      }
    } else {
      // For regular flag categories
      console.log('Navigating to category page:', currentCategory);
      navigate(`/category/${currentCategory}`);
    }
  };
  
  // Filter countries based on search term
  const filteredCountries = category.countries.filter(country => 
    country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    country.capital.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div className="w-full max-w-4xl mx-auto px-4 relative z-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 pt-6">
        <Button 
          onClick={handleBackClick}
          variant="ghost"
          className="flex items-center gap-1.5 text-foreground-subtle hover:text-foreground transition-colors z-50"
        >
          <ArrowLeft size={18} />
          <span>Назад</span>
        </Button>
        
        <h1 className="text-2xl font-medium text-foreground animate-fade-in">
          {displayName}
        </h1>
      </div>
      
      {/* Search input */}
      <div className="relative mb-6">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
          <Search size={18} className="text-foreground-subtle" />
        </div>
        <input
          type="text"
          placeholder="Поиск по стране или столице..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-card border border-border rounded-xl pl-11 pr-4 py-3 focus:outline-none focus:border-border-hover text-foreground placeholder-foreground-subtle/70 transition-all"
        />
      </div>
      
      {/* Table */}
      <div className="bg-card border border-border rounded-xl overflow-hidden shadow-elegant">
        <div className="overflow-x-auto scrollbar-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-4 text-foreground-subtle">Флаг</th>
                <th className="text-left p-4 text-foreground-subtle">Страна</th>
                <th className="text-left p-4 text-foreground-subtle">Столица</th>
              </tr>
            </thead>
            <tbody>
              {filteredCountries.map((country, index) => {
                const flagPath = inYandexGames ? `./images/${country.flagFile}` : `/images/${country.flagFile}`;
                
                return (
                  <tr 
                    key={country.name} 
                    className="border-b border-border hover:bg-card-hover transition-colors"
                    style={{ 
                      opacity: 0,
                      animation: 'fade-in 0.3s ease-out forwards',
                      animationDelay: `${index * 0.02}s` 
                    }}
                  >
                    <td className="p-4">
                      <div className="w-12 h-8 overflow-hidden rounded shadow-inner-highlight">
                        <img 
                          src={flagPath} 
                          alt={country.name} 
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                    </td>
                    <td className="p-4 text-foreground font-medium">{country.name}</td>
                    <td className="p-4 text-foreground-muted">{country.capital}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ReferenceTable;
