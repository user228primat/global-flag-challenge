
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useGameContext } from '../contexts/GameContext';
import { Globe } from 'lucide-react';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { resetGame } = useGameContext();
  
  const handleHomeClick = () => {
    resetGame();
    navigate('/');
  };
  
  return (
    <header className="w-full glass px-4 py-3 flex items-center justify-between mb-6">
      <button 
        onClick={handleHomeClick}
        className="flex items-center gap-2 text-white font-semibold transition-all duration-300 hover:text-primary"
      >
        <Globe size={28} className="text-primary animate-pulse-slow" />
        <span className="text-xl tracking-tight">Флаги Мира</span>
      </button>
    </header>
  );
};

export default Header;
