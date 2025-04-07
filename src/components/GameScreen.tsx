import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useGameContext } from '../contexts/GameContext';
import { gameCategories } from '../data';
import FlagCard from './FlagCard';
import LivesIndicator from './LivesIndicator';
import ScoreCounter from './ScoreCounter';
import { generateOptions, getNextCountry } from '../utils/gameLogic';
import { Country } from '../types';
import { ArrowLeft, X, Check } from 'lucide-react';
import GameOverScreen from './GameOverScreen';
import { Button } from '@/components/ui/button';
import { toast } from "@/components/ui/use-toast";

const GameScreen: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { 
    currentCategory, 
    lives, 
    setLives, 
    gameStats, 
    currentScore, 
    incrementScore, 
    isGameOver, 
    setIsGameOver,
    resetGame,
    markCategoryComplete
  } = useGameContext();
  
  const [currentCountry, setCurrentCountry] = useState<Country | null>(null);
  const [options, setOptions] = useState<Array<{ text: string, value: string }>>([]);
  const [usedCountries, setUsedCountries] = useState<Set<string>>(new Set());
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [incorrectOptions, setIncorrectOptions] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(true);
  const [isCapitalsMode, setIsCapitalsMode] = useState(false);
  
  const handleExit = () => {
    console.log("Exit button clicked, resetting game and navigating");
    resetGame();
    const isCapitals = currentCategory?.includes('capitals') || location.pathname.includes('capitals');
    navigate(isCapitals ? '/capitals' : '/');
  };
  
  const checkForCategoryCompletion = () => {
    if (!currentCategory || !gameCategories[currentCategory]) return false;
    
    const categoryCountries = gameCategories[currentCategory].countries;
    const allCountriesUsed = usedCountries.size >= categoryCountries.length;
    
    if (allCountriesUsed) {
      markCategoryComplete(currentCategory);
      setIsGameOver(true);
      return true;
    }
    
    return false;
  };
  
  const generateCapitalsOptions = (countries: Country[], correctCountry: Country, count = 4) => {
    if (countries.length < count) {
      return countries.map(country => ({ 
        text: country.capital,
        value: country.capital
      }));
    }
    
    const options = [{ 
      text: correctCountry.capital,
      value: correctCountry.capital
    }];
    
    const remainingCountries = countries.filter(
      country => country.capital !== correctCountry.capital
    );
    
    while (options.length < count && remainingCountries.length > 0) {
      const randomIndex = Math.floor(Math.random() * remainingCountries.length);
      const randomCountry = remainingCountries[randomIndex];
      
      options.push({ 
        text: randomCountry.capital,
        value: randomCountry.capital
      });
      
      remainingCountries.splice(randomIndex, 1);
    }
    
    return options.sort(() => Math.random() - 0.5);
  };
  
  const loadNextQuestion = () => {
    if (!currentCategory) {
      console.error("No current category set");
      return;
    }
    
    if (checkForCategoryCompletion()) {
      return;
    }
    
    // Ensure that gameCategories[currentCategory] exists
    if (!gameCategories[currentCategory]) {
      console.error(`Category ${currentCategory} not found in gameCategories`);
      toast({
        title: "Ошибка",
        description: `Категория ${currentCategory} не найдена`,
        variant: "destructive",
      });
      navigate('/');
      return;
    }
    
    setIsLoading(true);
    setSelectedOption(null);
    setIsCorrect(null);
    setIncorrectOptions(new Set());
    
    const categoryCountries = gameCategories[currentCategory].countries;
    const nextCountry = getNextCountry(categoryCountries, usedCountries);
    
    if (nextCountry) {
      setCurrentCountry(nextCountry);
      
      const isCurrentCapitalsMode = currentCategory.includes('capitals') || location.pathname.includes('/capitals');
      console.log('Current game mode:', isCurrentCapitalsMode ? 'capitals' : 'flags', 'Current category:', currentCategory);
      setIsCapitalsMode(isCurrentCapitalsMode);
      
      if (isCurrentCapitalsMode) {
        console.log('Setting options for capitals mode');
        setOptions(generateCapitalsOptions(categoryCountries, nextCountry));
      } else {
        console.log('Setting options for flags mode');
        setOptions(generateOptions(categoryCountries, nextCountry).map(country => ({
          text: country.name,
          value: country.name
        })));
      }
      
      setUsedCountries(prev => new Set([...prev, nextCountry.name]));
      setIsLoading(false);
    } else {
      markCategoryComplete(currentCategory);
      setIsGameOver(true);
    }
  };
  
  const handleAnswerSelect = (value: string) => {
    if (!currentCountry || isCorrect) return;
    
    setSelectedOption(value);
    
    const isAnswerCorrect = isCapitalsMode 
      ? value === currentCountry.capital 
      : value === currentCountry.name;
    
    setIsCorrect(isAnswerCorrect);
    
    if (isAnswerCorrect) {
      if (currentCategory) {
        incrementScore(currentCategory);
      }
      
      setTimeout(() => {
        loadNextQuestion();
      }, 300);
    } else {
      setIncorrectOptions(prev => new Set([...prev, value]));
      
      if (!incorrectOptions.has(value)) {
        setLives(lives - 1);
        
        if (lives <= 1) {
          setIsGameOver(true);
        }
      }
    }
  };
  
  useEffect(() => {
    if (currentCategory) {
      console.log("Current category in GameScreen:", currentCategory);
      const isCurrentCapitalsMode = currentCategory.includes('capitals') || location.pathname.includes('/capitals');
      console.log('Is capitals mode:', isCurrentCapitalsMode);
      setIsCapitalsMode(isCurrentCapitalsMode);
      loadNextQuestion();
    } else {
      console.error("No category selected, redirecting to home");
      const isCapitals = location.pathname.includes('/capitals');
      toast({
        title: "Ошибка",
        description: "Категория не выбрана, перенаправление на главную страницу",
        variant: "destructive",
      });
      navigate(isCapitals ? '/capitals' : '/');
    }
  }, [currentCategory]);
  
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
        isVictory={currentCategory ? usedCountries.size >= gameCategories[currentCategory].countries.length : false}
        lastCountry={currentCountry}
        isCapitalsMode={isCapitalsMode}
      />
    );
  }
  
  if (!currentCountry) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
      </div>
    );
  }
  
  const totalFlags = currentCategory ? gameCategories[currentCategory].countries.length : 0;
  const highScore = currentCategory && gameStats[currentCategory] ? gameStats[currentCategory].highScore : 0;
  
  return (
    <div className="w-full max-w-xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <Button 
          onClick={handleExit}
          variant="ghost" 
          className="flex items-center px-4 py-2 rounded-full bg-card/80 hover:bg-card-hover transition-colors"
          type="button"
        >
          <ArrowLeft size={18} className="mr-2 text-foreground-subtle" />
          <span className="text-foreground-muted">Выход</span>
        </Button>
        <LivesIndicator lives={lives} maxLives={3} />
      </div>
      
      <ScoreCounter 
        score={currentScore} 
        highScore={highScore} 
        totalFlags={totalFlags} 
      />
      
      <div className="mt-8 mb-6">
        <FlagCard country={currentCountry} isLoading={isLoading} />
        
        {isCapitalsMode && (
          <div className="mt-4 text-center">
            <h2 className="text-2xl font-bold text-foreground">{currentCountry?.name}</h2>
          </div>
        )}
      </div>
      
      <div className="space-y-3">
        {options.map((option) => {
          const isSelected = selectedOption === option.value;
          const isOptionCorrect = isCapitalsMode 
            ? currentCountry?.capital === option.value 
            : currentCountry?.name === option.value;
          const isIncorrect = incorrectOptions.has(option.value);
          
          const shouldHighlightCorrect = isSelected && isOptionCorrect;
          
          let buttonClass = "relative w-full text-left p-4 rounded-xl transition-all duration-300 flex items-center ";
          
          if (isSelected) {
            if (isOptionCorrect) {
              buttonClass += "bg-green-500/20 border border-green-500/50 text-foreground";
            } else {
              buttonClass += "bg-red-500/20 border border-red-500/50 text-foreground";
            }
          } else if (isIncorrect) {
            buttonClass += "bg-red-500/10 border border-red-500/20 text-foreground-subtle";
          } else {
            buttonClass += "border border-border hover:border-border-hover bg-card hover:bg-card-hover shadow-inner-highlight";
          }
          
          return (
            <button
              key={option.value}
              onClick={() => handleAnswerSelect(option.value)}
              disabled={isIncorrect || isCorrect}
              className={buttonClass}
              type="button"
            >
              <div className="flex-1">
                <span className="text-lg">{option.text}</span>
              </div>
              
              {isSelected && (
                <div className="flex items-center justify-center ml-2">
                  {isOptionCorrect ? (
                    <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center">
                      <Check size={14} className="text-green-500" />
                    </div>
                  ) : (
                    <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center">
                      <X size={14} className="text-red-500" />
                    </div>
                  )}
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default GameScreen;
