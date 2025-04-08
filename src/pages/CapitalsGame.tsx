
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GameScreen from '../components/GameScreen';
import { useGameContext } from '../contexts/GameContext';
import { toast } from "@/hooks/use-toast";

const CapitalsGame = () => {
  const navigate = useNavigate();
  const { currentCategory, startGame } = useGameContext();
  
  console.log("CapitalsGame rendered with currentCategory:", currentCategory);
  
  // Reset scroll position when page loads
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // If no category is set, we need to set a default capitals category
    if (!currentCategory) {
      console.log('No category set in CapitalsGame, setting default capitals category');
      startGame('capitalsEurope'); // Use a default category
    } 
    // Check if we have a category set and if it's a capitals category
    else if (!currentCategory.includes('capitals')) {
      console.error('Not a capitals category:', currentCategory, ', setting proper capitals category');
      // Convert region to capitals region if possible
      if (currentCategory === 'europe') {
        startGame('capitalsEurope');
      } else if (currentCategory === 'asia') {
        startGame('capitalsAsia');
      } else if (currentCategory === 'northAmerica') {
        startGame('capitalsNorthAmerica');
      } else if (currentCategory === 'southAmerica') {
        startGame('capitalsSouthAmerica');
      } else if (currentCategory === 'africa') {
        startGame('capitalsAfrica');
      } else if (currentCategory === 'australiaOceania') {
        startGame('capitalsAustraliaOceania');
      } else {
        // If we can't match it, use a default
        startGame('capitalsEurope');
      }
    }
  }, [currentCategory, navigate, startGame]);
  
  const handleBackClick = () => {
    console.log('Back button clicked in CapitalsGame');
    navigate('/capitals');
  };
  
  return (
    <div className="min-h-screen bg-background pb-16 relative overflow-hidden">
      {/* Enhanced background texture */}
      <div className="absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMjIiIGZpbGwtb3BhY2l0eT0iMC4wOCI+PHBhdGggZD0iTTM2IDM0djJoLTJ2LTJoMnptMC00aDJ2MmgtMnYtMnptLTQgMHYySDF0djJoMnYyaC0ydjJoMnYyaDJ2LTRoNHYtMmgtNHYtMmg0di0yaC02em04IDB2Mmg0djJoLTJ2MmgydjJoMnYtNmgtNnptNCA0aDJ2MmgtMnYtMnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-5"></div>
      </div>
      
      {/* Enhanced gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-slate-900/5 to-transparent pointer-events-none"></div>
      
      {/* Enhanced glowing elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 right-10 w-72 h-72 rounded-full bg-blue-700/10 blur-[80px] animate-float"></div>
        <div className="absolute bottom-10 left-10 w-80 h-80 rounded-full bg-indigo-800/10 blur-[90px] animate-float" style={{ animationDelay: '-4s' }}></div>
        <div className="absolute top-1/3 left-1/4 w-64 h-64 rounded-full bg-purple-700/5 blur-[70px] animate-float" style={{ animationDelay: '-2s' }}></div>
      </div>
      
      {/* Dynamic moving particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
        <div className="absolute top-1/5 left-1/3 w-1 h-1 rounded-full bg-white/30 animate-pulse-slow"></div>
        <div className="absolute top-1/2 left-3/4 w-1 h-1 rounded-full bg-white/30 animate-pulse-slow" style={{ animationDelay: '-1s' }}></div>
        <div className="absolute top-3/4 left-1/4 w-1 h-1 rounded-full bg-white/30 animate-pulse-slow" style={{ animationDelay: '-2s' }}></div>
        <div className="absolute top-2/3 right-1/3 w-1 h-1 rounded-full bg-white/30 animate-pulse-slow" style={{ animationDelay: '-3s' }}></div>
        <div className="absolute bottom-1/3 right-1/2 w-1 h-1 rounded-full bg-white/30 animate-pulse-slow" style={{ animationDelay: '-4s' }}></div>
      </div>
      
      <div className="relative z-20">
        <GameScreen onBack={handleBackClick} />
      </div>
    </div>
  );
};

export default CapitalsGame;
