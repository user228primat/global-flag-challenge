
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GameScreen from '../components/GameScreen';
import { useGameContext } from '../contexts/GameContext';
import { toast } from "@/hooks/use-toast";
import { gameCategories } from '../data';
import { CategoryId } from '../types';

const CapitalsGame = () => {
  const navigate = useNavigate();
  const { currentCategory } = useGameContext();
  
  console.log("CapitalsGame rendered with currentCategory:", currentCategory);
  
  // Convert capitals category to corresponding region category for validation
  const getCategoryForValidation = (category: CategoryId | null): CategoryId | null => {
    if (!category) return null;
    
    if (category.startsWith('capitals')) {
      const regionMapping: Record<string, CategoryId> = {
        'capitalsEurope': 'europe',
        'capitalsAsia': 'asia',
        'capitalsNorthAmerica': 'northAmerica',
        'capitalsSouthAmerica': 'southAmerica',
        'capitalsAfrica': 'africa',
        'capitalsAustraliaOceania': 'australiaOceania',
        'capitals': 'allFlags'
      };
      
      return regionMapping[category] || null;
    }
    
    return category;
  };
  
  // Reset scroll position when page loads
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Check if we have a category set
    if (!currentCategory) {
      console.error('No category set in capitals game, redirecting to capitals page');
      toast({
        title: "Ошибка",
        description: "Категория не выбрана, пожалуйста выберите регион",
        variant: "destructive",
      });
      navigate('/capitals');
      return;
    }
    
    // Check if it's a capitals category
    const isCapitalsCategory = currentCategory.startsWith('capitals');
    if (!isCapitalsCategory) {
      console.error('Not a capitals category:', currentCategory, ', redirecting to capitals page');
      toast({
        title: "Ошибка",
        description: "Выбрана неверная категория, пожалуйста выберите регион",
        variant: "destructive",
      });
      navigate('/capitals');
      return;
    }
    
    // Convert to corresponding region category for validation
    const validationCategory = getCategoryForValidation(currentCategory);
    
    // Check if category exists in gameCategories
    if (!validationCategory || !gameCategories[validationCategory]) {
      console.error(`Category ${validationCategory} (mapped from ${currentCategory}) not found in gameCategories`);
      toast({
        title: "Ошибка",
        description: `Категория ${currentCategory} не найдена в данных игры`,
        variant: "destructive",
      });
      navigate('/capitals');
      return;
    }
    
    console.log(`Category ${currentCategory} validated successfully using ${validationCategory} with ${gameCategories[validationCategory].countries.length} countries`);
  }, [currentCategory, navigate]);
  
  const handleBackClick = () => {
    console.log('Back button clicked in CapitalsGame');
    navigate('/capitals');
  };
  
  return (
    <div className="min-h-screen bg-background pb-16 relative overflow-hidden">
      {/* Background texture and effects */}
      <div className="absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMjIiIGZpbGwtb3BhY2l0eT0iMC4wOCI+PHBhdGggZD0iTTM2IDM0djJoLTJ2LTJoMnptMC00aDJ2MmgtMnYtMnptLTQgMHYySDF0djJoMnYyaC0ydjJoMnYyaDJ2LTRoNHYtMmgtNHYtMmg0di0yaC02em04IDB2Mmg0djJoLTJ2MmgydjJoMnYtNmgtNnptNCA0aDJ2MmgtMnYtMnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-5"></div>
      </div>
      
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/5 via-slate-900/0 to-transparent pointer-events-none"></div>
      
      {/* Glowing elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 right-10 w-48 h-48 rounded-full bg-blue-700/5 blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-56 h-56 rounded-full bg-indigo-800/5 blur-3xl"></div>
      </div>
      
      <div className="relative z-20">
        <GameScreen onBack={handleBackClick} />
      </div>
    </div>
  );
};

export default CapitalsGame;
