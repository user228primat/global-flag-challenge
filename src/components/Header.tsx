
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useGameContext } from '../contexts/GameContext';
import { Globe } from 'lucide-react';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { resetGame } = useGameContext();
  
  const handleHomeClick = () => {
    console.log("Home button clicked in Header, resetting game and navigating to /");
    resetGame();
    navigate('/');
  };
  
  return (
    <header className="w-full glass-dark px-4 py-3 flex items-center justify-between mb-6">
      <button 
        onClick={handleHomeClick}
        className="flex items-center gap-2 text-white font-semibold transition-all duration-300 hover:text-indigo-400"
      >
        <div className="relative">
          <div className="absolute inset-0 bg-indigo-400/20 blur-sm rounded-full"></div>
          <Globe size={28} className="text-indigo-400 relative z-10" />
        </div>
        <span className="text-xl tracking-tight bg-gradient-to-r from-white to-indigo-200/80 bg-clip-text text-transparent">Флаги Мира</span>
      </button>
    </header>
  );
};

export default Header;
