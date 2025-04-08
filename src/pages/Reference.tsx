
import React, { useEffect } from 'react';
import ReferenceTable from '../components/ReferenceTable';
import { useNavigate } from 'react-router-dom';
import { useGameContext } from '../contexts/GameContext';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Reference = () => {
  const navigate = useNavigate();
  const { currentCategory } = useGameContext();
  
  // Сбрасываем позицию прокрутки при загрузке страницы
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const handleBack = () => {
    console.log('Back button clicked in Reference, current category:', currentCategory);
    
    if (currentCategory?.includes('capitals')) {
      // If we're in capitals mode, determine which region
      if (currentCategory === 'capitals') {
        navigate('/capitals');
      } else if (currentCategory.includes('Europe')) {
        navigate('/capitals/europe');
      } else if (currentCategory.includes('Asia')) {
        navigate('/capitals/asia');
      } else if (currentCategory.includes('NorthAmerica')) {
        navigate('/capitals/northAmerica');
      } else if (currentCategory.includes('SouthAmerica')) {
        navigate('/capitals/southAmerica');
      } else if (currentCategory.includes('Africa')) {
        navigate('/capitals/africa');
      } else if (currentCategory.includes('AustraliaOceania')) {
        navigate('/capitals/australiaOceania');
      } else {
        navigate('/capitals');
      }
    } else {
      // For flag mode
      navigate('/');
    }
  };
  
  return (
    <div className="min-h-screen bg-background pb-16 relative overflow-hidden">
      {/* Background texture and effects - All made pointer-events-none */}
      <div className="absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMjIiIGZpbGwtb3BhY2l0eT0iMC4wOCI+PHBhdGggZD0iTTM2IDM0djJoLTJ2LTJoMnptMC00aDJ2MmgtMnYtMnptLTQgMHYySDF0djJoMnYyaC0ydjJoMnYyaDJ2LTRoNHYtMmgtNHYtMmg0di0yaC02em04IDB2Mmg0djJoLTJ2MmgydjJoMnYtNmgtNnptNCA0aDJ2MmgtMnYtMnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-5"></div>
      </div>

      {/* Enhanced glowing elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-40 -left-20 w-80 h-80 rounded-full bg-blue-500/5 blur-[100px] opacity-60 animate-float"></div>
        <div className="absolute bottom-40 -right-20 w-96 h-96 rounded-full bg-indigo-500/5 blur-[100px] opacity-50 animate-float" style={{ animationDelay: '-4s' }}></div>
        <div className="absolute top-1/4 right-1/4 w-72 h-72 rounded-full bg-purple-500/3 blur-[80px] opacity-40 animate-float" style={{ animationDelay: '-2s' }}></div>
      </div>

      {/* Header with back button */}
      <div className="relative z-20 w-full max-w-xl mx-auto px-4 pt-6">
        <div className="flex items-center mb-8">
          <Button 
            onClick={handleBack}
            variant="ghost"
            className="flex items-center gap-1.5 text-foreground-subtle hover:text-foreground transition-colors z-50"
          >
            <ArrowLeft size={18} />
            <span>Назад</span>
          </Button>
        </div>

        <ReferenceTable />
      </div>
    </div>
  );
};

export default Reference;
