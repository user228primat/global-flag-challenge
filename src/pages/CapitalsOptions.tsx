
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGameContext } from '../contexts/GameContext';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Book, Play } from 'lucide-react';
import { toast } from "@/hooks/use-toast";
import { categoryDisplayNames } from '../data';
import { CategoryId } from '../types';

const CapitalsOptions = () => {
  const navigate = useNavigate();
  const { regionId } = useParams<{ regionId: string }>();
  const { startGame, viewReference } = useGameContext();
  
  console.log("CapitalsOptions rendered with regionId:", regionId);
  
  // Reset scroll position when page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  if (!regionId) {
    console.error("No regionId parameter in CapitalsOptions");
    toast({
      title: "Ошибка",
      description: "Не выбран регион",
      variant: "destructive",
    });
    navigate('/capitals');
    return null;
  }
  
  // Преобразование названий регионов в категории столиц
  const getCapitalsCategoryId = (region: string): CategoryId => {
    const capitalsMapping: Record<string, CategoryId> = {
      'europe': 'capitalsEurope',
      'asia': 'capitalsAsia',
      'northAmerica': 'capitalsNorthAmerica',
      'southAmerica': 'capitalsSouthAmerica',
      'africa': 'capitalsAfrica',
      'australiaOceania': 'capitalsAustraliaOceania'
    };
    
    return capitalsMapping[region] || 'capitals';
  };
  
  const capitalsCategoryId = getCapitalsCategoryId(regionId);
  console.log("Capitals category ID:", capitalsCategoryId);
  
  const handlePlayClick = () => {
    console.log('Starting game with capitals category:', capitalsCategoryId);
    startGame(capitalsCategoryId);
    navigate('/capitals/game');
  };
  
  const handleReferenceClick = () => {
    console.log('Viewing reference for capitals category:', capitalsCategoryId);
    viewReference(capitalsCategoryId);
    navigate('/reference');
  };
  
  const handleBackClick = () => {
    console.log('Back button clicked in CapitalsOptions');
    navigate('/capitals');
  };
  
  const displayName = categoryDisplayNames[capitalsCategoryId] || 'Столицы';
  
  return (
    <div className="min-h-screen bg-background pb-16 relative overflow-hidden">
      {/* Background texture and effects */}
      <div className="absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMjIiIGZpbGwtb3BhY2l0eT0iMC4wOCI+PHBhdGggZD0iTTM2IDM0djJoLTJ2LTJoMnptMC00aDJ2MmgtMnYtMnptLTQgMHYySDF0djJoMnYyaC0ydjJoMnYyaDJ2LTRoNHYtMmgtNHYtMmg0di0yaC02em04IDB2Mmg0djJoLTJ2MmgydjJoMnYtNmgtNnptNCA0aDJ2MmgtMnYtMnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-5"></div>
      </div>

      {/* Glowing elements */}
      <div className="absolute top-40 -right-20 w-80 h-80 rounded-full bg-blue-600/5 blur-[100px] opacity-60 pointer-events-none"></div>
      <div className="absolute bottom-40 -left-20 w-96 h-96 rounded-full bg-[#FF5252]/5 blur-[100px] opacity-50 pointer-events-none"></div>

      <div className="w-full max-w-xl mx-auto px-4 pt-6 relative z-20">
        <div className="flex items-center mb-8">
          <Button 
            onClick={handleBackClick}
            variant="ghost"
            className="flex items-center gap-1.5 text-foreground-subtle hover:text-foreground transition-colors z-50"
          >
            <ArrowLeft size={18} />
            <span>Назад</span>
          </Button>
        </div>
        
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold mb-2 text-white text-shadow bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-blue-100">
            {displayName}
          </h1>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto rounded-full"></div>
        </div>
        
        <div className="space-y-5">
          <button
            onClick={handlePlayClick}
            className="relative w-full p-6 rounded-xl transition-all duration-300 border border-white/10
                      bg-gradient-to-br from-blue-800/40 to-indigo-900/40 hover:from-blue-700/50 
                      hover:to-indigo-800/50 flex items-center group overflow-hidden"
            type="button"
          >
            <div className="w-14 h-14 flex items-center justify-center rounded-full 
                          bg-gradient-to-br from-blue-600/30 to-indigo-600/30 
                          group-hover:from-blue-500/50 group-hover:to-indigo-500/50
                          transition-colors mr-5">
              <Play size={28} className="text-blue-200 ml-1 group-hover:text-blue-100" />
            </div>
            <div className="text-left z-10">
              <div className="text-xl font-semibold text-white mb-1 group-hover:text-blue-100 transition-colors">Играть</div>
              <div className="text-sm text-blue-300/90 group-hover:text-blue-200/90 transition-colors">Пройти викторину по столицам</div>
            </div>
            
            {/* Background effects */}
            <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-transparent to-indigo-600/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="absolute -inset-1 rounded-xl bg-blue-500/20 blur-xl opacity-0 group-hover:opacity-30 transition-opacity z-0"></div>
          </button>
          
          <button
            onClick={handleReferenceClick}
            className="relative w-full p-6 rounded-xl transition-all duration-300 border border-white/10
                      bg-gradient-to-br from-slate-800/60 to-slate-900/60 hover:from-slate-700/60 
                      hover:to-slate-800/60 flex items-center group overflow-hidden"
            type="button"
          >
            <div className="w-14 h-14 flex items-center justify-center rounded-full 
                          bg-gradient-to-br from-slate-700/40 to-slate-800/40
                          group-hover:from-slate-600/50 group-hover:to-slate-700/50
                          transition-colors mr-5">
              <Book size={26} className="text-blue-200 group-hover:text-blue-100" />
            </div>
            <div className="text-left z-10">
              <div className="text-xl font-semibold text-white mb-1 group-hover:text-blue-100 transition-colors">Таблица</div>
              <div className="text-sm text-blue-300/90 group-hover:text-blue-200/90 transition-colors">Изучить справочник со столицами</div>
            </div>
            
            {/* Background effects */}
            <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-slate-600/10 via-transparent to-slate-600/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="absolute -inset-1 rounded-xl bg-slate-500/10 blur-xl opacity-0 group-hover:opacity-30 transition-opacity z-0"></div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CapitalsOptions;
