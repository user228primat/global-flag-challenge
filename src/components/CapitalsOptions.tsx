
import React from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useGameContext, getCapitalsCategory } from '../contexts/GameContext';
import { categoryDisplayNames, gameCategories } from '../data';
import { CategoryId } from '../types';
import { Play, Book, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from "@/components/ui/use-toast";

const CapitalsOptions: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { regionId } = useParams<{ regionId: string }>();
  const { startGame, viewReference } = useGameContext();
  
  console.log("CapitalsOptions rendered with regionId:", regionId);
  
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
  
  const capitalsCategory = getCapitalsCategory(regionId as CategoryId);
  console.log('Mapped capitals category:', capitalsCategory);
  
  const handlePlayClick = () => {
    console.log('Starting capitals game with category:', capitalsCategory);
    startGame(capitalsCategory);
    navigate('/capitals/game');
  };
  
  const handleReferenceClick = () => {
    console.log('Viewing reference for category:', capitalsCategory);
    viewReference(capitalsCategory);
    navigate('/reference');
  };
  
  const handleBackClick = () => {
    console.log('Back button clicked in CapitalsOptions, navigating to /capitals');
    navigate('/capitals');
  };
  
  const displayName = categoryDisplayNames[regionId as CategoryId] || 'Регион';
  
  return (
    <div className="w-full max-w-xl mx-auto px-4 relative z-10">
      <div className="flex items-center mb-8 pt-6">
        <Button 
          onClick={handleBackClick}
          variant="ghost"
          className="flex items-center gap-1.5 text-foreground-subtle hover:text-foreground transition-colors"
        >
          <ArrowLeft size={18} />
          <span>Назад</span>
        </Button>
      </div>
      
      <div className="mb-12 text-center">
        <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-white to-foreground-subtle bg-clip-text text-transparent">
          Столицы: {displayName}
        </h1>
        <p className="text-accent-muted">
          Выберите режим
        </p>
      </div>
      
      <div className="space-y-4">
        <button
          onClick={handlePlayClick}
          className="bg-card-dark border border-border hover:border-border-hover w-full p-6 rounded-xl transition-all duration-300 hover:bg-card-hover flex items-center group relative shadow-elegant"
          type="button"
        >
          <div className="w-12 h-12 flex items-center justify-center rounded-full bg-accent/10 mr-4 group-hover:bg-accent/15 transition-colors">
            <Play size={24} className="text-accent ml-1" />
          </div>
          <div className="text-left">
            <div className="text-xl font-medium text-foreground">Играть</div>
            <div className="text-sm text-foreground-subtle">Тест по столицам</div>
          </div>
          
          {/* Highlight effect on hover - Made pointer-events-none */}
          <div className="absolute inset-0 rounded-xl border border-accent/0 group-hover:border-accent/10 transition-all duration-300 pointer-events-none"></div>
        </button>
        
        <button
          onClick={handleReferenceClick}
          className="bg-card-dark border border-border hover:border-border-hover w-full p-6 rounded-xl transition-all duration-300 hover:bg-card-hover flex items-center group relative shadow-elegant"
          type="button"
        >
          <div className="w-12 h-12 flex items-center justify-center rounded-full bg-foreground/5 mr-4 group-hover:bg-foreground/10 transition-colors">
            <Book size={24} className="text-foreground" />
          </div>
          <div className="text-left">
            <div className="text-xl font-medium text-foreground">Таблица</div>
            <div className="text-sm text-foreground-subtle">Изучить справочник со странами</div>
          </div>
          
          {/* Highlight effect on hover - Made pointer-events-none */}
          <div className="absolute inset-0 rounded-xl border border-foreground/0 group-hover:border-foreground/5 transition-all duration-300 pointer-events-none"></div>
        </button>
      </div>
    </div>
  );
};

export default CapitalsOptions;
