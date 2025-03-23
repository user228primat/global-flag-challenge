
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGameContext } from '../contexts/GameContext';
import { gameCategories } from '../data';
import FlagCard from './FlagCard';
import LivesIndicator from './LivesIndicator';
import ScoreCounter from './ScoreCounter';
import { generateOptions, getNextCountry } from '../utils/gameLogic';
import { Country } from '../types';
import { ArrowLeft } from 'lucide-react';
import GameOverScreen from './GameOverScreen';

const GameScreen: React.FC = () => {
  const navigate = useNavigate();
  const { 
    currentCategory, 
    lives, 
    setLives, 
    gameStats, 
    currentScore, 
    incrementScore, 
    isGameOver, 
    setIsGameOver,
    resetGame 
  } = useGameContext();
  
  // Game state
  const [currentCountry, setCurrentCountry] = useState<Country | null>(null);
  const [options, setOptions] = useState<Country[]>([]);
  const [usedCountries, setUsedCountries] = useState<Set<string>>(new Set());
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [incorrectOptions, setIncorrectOptions] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(true);
  
  // Exit to main menu
  const handleExit = () => {
    resetGame();
    navigate('/');
  };
  
  // Load next question
  const loadNextQuestion = () => {
    if (!currentCategory) return;
    
    setIsLoading(true);
    setSelectedOption(null);
    setIsCorrect(null);
    setIncorrectOptions(new Set());
    
    const categoryCountries = gameCategories[currentCategory].countries;
    const nextCountry = getNextCountry(categoryCountries, usedCountries);
    
    if (nextCountry) {
      setCurrentCountry(nextCountry);
      setOptions(generateOptions(categoryCountries, nextCountry));
      setUsedCountries(prev => new Set([...prev, nextCountry.name]));
      
      // Simulate loading for a smoother experience
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    } else {
      // All countries have been used
      setIsGameOver(true);
    }
  };
  
  // Handle user answer
  const handleAnswerSelect = (countryName: string) => {
    if (!currentCountry || isCorrect) return;
    
    setSelectedOption(countryName);
    const correct = countryName === currentCountry.name;
    setIsCorrect(correct);
    
    if (correct) {
      // Correct answer
      if (currentCategory) {
        incrementScore(currentCategory);
      }
      
      // Load next question after a slight delay
      setTimeout(() => {
        loadNextQuestion();
      }, 1000);
    } else {
      // Wrong answer - add to incorrect answers set
      setIncorrectOptions(prev => new Set([...prev, countryName]));
      
      // Decrement lives only on first incorrect answer per question
      if (!incorrectOptions.has(countryName)) {
        setLives(lives - 1);
        
        // If no lives left, game over
        if (lives <= 1) {
          setTimeout(() => {
            setIsGameOver(true);
          }, 1000);
        }
      }
      
      // Reset selection after a moment so user can try again
      setTimeout(() => {
        setSelectedOption(null);
      }, 800);
    }
  };
  
  // Initialize game
  useEffect(() => {
    if (currentCategory) {
      loadNextQuestion();
    } else {
      navigate('/');
    }
  }, [currentCategory]);
  
  // If game is over, show the game over screen
  if (isGameOver) {
    return (
      <GameOverScreen
        score={currentScore}
        onExit={handleExit}
        onRestart={() => {
          resetGame();
          if (currentCategory) {
            setUsedCountries(new Set());
            setIsGameOver(false);
            loadNextQuestion();
          }
        }}
      />
    );
  }
  
  // If no current country, show loading
  if (!currentCountry) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
      </div>
    );
  }
  
  const totalFlags = currentCategory ? gameCategories[currentCategory].countries.length : 0;
  const highScore = currentCategory ? gameStats[currentCategory].highScore : 0;
  
  return (
    <div className="w-full max-w-xl mx-auto px-4 pb-8">
      <div className="flex items-center justify-between mb-6">
        <button 
          onClick={handleExit}
          className="flex items-center text-white/70 hover:text-white transition-colors"
        >
          <ArrowLeft size={20} className="mr-1" />
          <span>Выход</span>
        </button>
        <LivesIndicator lives={lives} maxLives={3} />
      </div>
      
      <ScoreCounter 
        score={currentScore} 
        highScore={highScore} 
        totalFlags={totalFlags} 
      />
      
      <div className="mt-8 mb-6">
        <FlagCard country={currentCountry} isLoading={isLoading} />
      </div>
      
      <div className="space-y-3">
        {options.map((option) => {
          const isSelected = selectedOption === option.name;
          const isOptionCorrect = currentCountry.name === option.name;
          const isIncorrect = incorrectOptions.has(option.name);
          
          let buttonClass = "w-full text-left p-4 rounded-xl transition-all duration-300 ";
          
          if (isSelected) {
            // Current selection is shown as incorrect
            if (!isOptionCorrect) {
              buttonClass += "bg-error/20 border border-error text-white";
            } else {
              // Correct answer
              buttonClass += "bg-success/20 border border-success text-white";
            }
          } else if (isIncorrect) {
            // Previously selected incorrect answers
            buttonClass += "bg-error/10 border border-error/40 text-white/80";
          } else {
            buttonClass += "glass hover:bg-white/10";
          }
          
          return (
            <button
              key={option.name}
              onClick={() => handleAnswerSelect(option.name)}
              disabled={isIncorrect || isCorrect}
              className={buttonClass}
              style={{ 
                opacity: 0,
                animation: 'scale-in 0.3s ease-out forwards',
                animationDelay: `${options.indexOf(option) * 0.1}s` 
              }}
            >
              <span className="text-lg">{option.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default GameScreen;
