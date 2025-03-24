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
    resetGame();
    navigate('/');
  };
  
  const checkForCategoryCompletion = () => {
    if (!currentCategory) return false;
    
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
    if (!currentCategory) return;
    
    if (checkForCategoryCompletion()) {
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
      
      if (currentCategory === 'capitals' || window.location.pathname.includes('/capitals')) {
        setIsCapitalsMode(true);
        setOptions(generateCapitalsOptions(categoryCountries, nextCountry));
      } else {
        setIsCapitalsMode(false);
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
      
      loadNextQuestion();
    } else {
      setIncorrectOptions(prev => new Set([...prev, value]));
      
      if (!incorrectOptions.has(value)) {
        setLives(lives - 1);
        
        if (lives <= 1) {
          setIsGameOver(true);
        }
      }
      
      setTimeout(() => {
        setSelectedOption(null);
      }, 400);
    }
  };
  
  useEffect(() => {
    if (currentCategory) {
      setIsCapitalsMode(currentCategory === 'capitals' || window.location.pathname.includes('/capitals'));
      loadNextQuestion();
    } else {
      navigate('/');
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
        
        {isCapitalsMode && (
          <div className="mt-4 text-center">
            <h2 className="text-2xl font-bold text-white">{currentCountry.name}</h2>
          </div>
        )}
      </div>
      
      <div className="space-y-3">
        {options.map((option) => {
          const isSelected = selectedOption === option.value;
          const isOptionCorrect = isCapitalsMode 
            ? currentCountry.capital === option.value 
            : currentCountry.name === option.value;
          const isIncorrect = incorrectOptions.has(option.value);
          
          let buttonClass = "w-full text-left p-4 rounded-xl transition-all duration-300 ";
          
          if (isSelected) {
            if (!isOptionCorrect) {
              buttonClass += "bg-error/30 border border-error text-white";
            } else {
              buttonClass += "bg-success/30 border border-success text-white";
            }
          } else if (isIncorrect) {
            buttonClass += "bg-error/20 border border-error/40 text-white/80";
          } else {
            buttonClass += "dark-blur hover:bg-slate-800/70";
          }
          
          return (
            <button
              key={option.value}
              onClick={() => handleAnswerSelect(option.value)}
              disabled={isIncorrect || isCorrect}
              className={buttonClass}
            >
              <span className="text-lg">{option.text}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default GameScreen;
