
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGameContext } from '../contexts/GameContext';
import { categoryDisplayNames } from '../data';
import { CategoryId } from '../types';
import { Play, Book, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from "@/components/ui/use-toast";

interface CategoryOptionsProps {
  onBack?: () => void;
}

const CategoryOptions: React.FC<CategoryOptionsProps> = ({ onBack }) => {
  const navigate = useNavigate();
  const { categoryId } = useParams<{ categoryId: string }>();
  const { startGame, viewReference } = useGameContext();
  
  console.log("CategoryOptions rendered with categoryId:", categoryId);
  
  if (!categoryId) {
    console.error("No categoryId parameter in CategoryOptions");
    toast({
      title: "Ошибка",
      description: "Не выбрана категория",
      variant: "destructive",
    });
    navigate('/');
    return null;
  }
  
  const handlePlayClick = () => {
    console.log('Starting game with category:', categoryId);
    startGame(categoryId as CategoryId);
    navigate('/game');
  };
  
  const handleReferenceClick = () => {
    console.log('Viewing reference for category:', categoryId);
    viewReference(categoryId as CategoryId);
    navigate('/reference');
  };
  
  const handleBackClick = () => {
    console.log('Back button clicked in CategoryOptions');
    if (onBack) {
      onBack();
    } else {
      navigate('/');
    }
  };
  
  const displayName = categoryDisplayNames[categoryId as CategoryId] || 'Категория';
  
  return (
    <div className="w-full max-w-xl mx-auto px-4 pt-6">
      <div className="flex items-center mb-8">
        <Button 
          onClick={handleBackClick}
          variant="ghost"
          className="flex items-center gap-1.5 text-foreground-subtle hover:text-foreground transition-colors"
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
        >
          <div className="w-14 h-14 flex items-center justify-center rounded-full 
                        bg-gradient-to-br from-blue-600/30 to-indigo-600/30 
                        group-hover:from-blue-500/50 group-hover:to-indigo-500/50
                        transition-colors mr-5">
            <Play size={28} className="text-blue-200 ml-1 group-hover:text-blue-100" />
          </div>
          <div className="text-left z-10">
            <div className="text-xl font-semibold text-white mb-1 group-hover:text-blue-100 transition-colors">Играть</div>
            <div className="text-sm text-blue-300/90 group-hover:text-blue-200/90 transition-colors">Пройти викторину по флагам</div>
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
        >
          <div className="w-14 h-14 flex items-center justify-center rounded-full 
                        bg-gradient-to-br from-slate-700/40 to-slate-800/40
                        group-hover:from-slate-600/50 group-hover:to-slate-700/50
                        transition-colors mr-5">
            <Book size={26} className="text-blue-200 group-hover:text-blue-100" />
          </div>
          <div className="text-left z-10">
            <div className="text-xl font-semibold text-white mb-1 group-hover:text-blue-100 transition-colors">Таблица</div>
            <div className="text-sm text-blue-300/90 group-hover:text-blue-200/90 transition-colors">Изучить справочник со странами</div>
          </div>
          
          {/* Background effects */}
          <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-slate-600/10 via-transparent to-slate-600/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="absolute -inset-1 rounded-xl bg-slate-500/10 blur-xl opacity-0 group-hover:opacity-30 transition-opacity z-0"></div>
        </button>
      </div>
    </div>
  );
};

export default CategoryOptions;
