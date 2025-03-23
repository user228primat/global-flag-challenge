
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
  
  // Game state
  const [currentCountry, setCurrentCountry] = useState<Country | null>(null);
  const [options, setOptions] = useState<string[]>([]);
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
  
  // Check if all countries in the category have been used
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
  
  // Generate capital options for a country in capitals mode
  const generateCapitalOptions = (
    countries: Country[],
    correctCountry: Country
  ): string[] => {
    // Start with the correct capital
    const correctCapital = correctCountry.capital;
    const capitalOptions: string[] = [correctCapital];
    
    // Create a copy of countries without the correct one
    const otherCountries = countries.filter(c => c.name !== correctCountry.name);
    
    // Add random capitals until we have 4 options
    while (capitalOptions.length < 4 && otherCountries.length > 0) {
      const randomIndex = Math.floor(Math.random() * otherCountries.length);
      const randomCapital = otherCountries[randomIndex].capital;
      
      // Only add if it's not already in our options
      if (!capitalOptions.includes(randomCapital)) {
        capitalOptions.push(randomCapital);
      }
      
      // Remove this country from options to avoid duplicates
      otherCountries.splice(randomIndex, 1);
    }
    
    // Shuffle the options to randomize the position of the correct answer
    return shuffleArray(capitalOptions);
  };
  
  // Shuffle array helper function
  const shuffleArray = <T,>(array: T[]): T[] => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };
  
  // Load next question
  const loadNextQuestion = () => {
    if (!currentCategory) return;
    
    // First check if all countries have been used
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
      
      // Generate different options based on game mode
      if (currentCategory === 'capitals') {
        setOptions(generateCapitalOptions(categoryCountries, nextCountry));
      } else {
        // For flag games, we need country name options
        const countryOptions = generateOptions(categoryCountries, nextCountry);
        setOptions(countryOptions.map(country => country.name));
      }
      
      setUsedCountries(prev => new Set([...prev, nextCountry.name]));
      setIsLoading(false);
    } else {
      // All countries have been used
      markCategoryComplete(currentCategory);
      setIsGameOver(true);
    }
  };
  
  // Handle user answer
  const handleAnswerSelect = (answer: string) => {
    if (!currentCountry || isCorrect) return;
    
    setSelectedOption(answer);
    let correct = false;
    
    if (currentCategory === 'capitals') {
      // In capitals mode, check if selected capital matches the correct capital
      correct = answer === currentCountry.capital;
    } else {
      // In flag mode, check if selected country name matches
      correct = answer === currentCountry.name;
    }
    
    setIsCorrect(correct);
    
    if (correct) {
      // Correct answer
      if (currentCategory) {
        incrementScore(currentCategory);
      }
      
      // Load next question immediately
      setTimeout(() => {
        loadNextQuestion();
      }, 300); // Very short delay for visual feedback
    } else {
      // Wrong answer - add to incorrect answers set
      setIncorrectOptions(prev => new Set([...prev, answer]));
      
      // Decrement lives only on first incorrect answer per question
      if (!incorrectOptions.has(answer)) {
        setLives(lives - 1);
        
        // If no lives left, game over
        if (lives <= 1) {
          setIsGameOver(true);
        }
      }
      
      // Reset selection after a moment so user can try again
      setTimeout(() => {
        setSelectedOption(null);
      }, 400);
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
  const isCapitalsMode = currentCategory === 'capitals';
  
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
        
        {/* Show country name for capitals mode */}
        {isCapitalsMode && (
          <div className="mt-4 mb-2 text-center">
            <h2 className="text-2xl font-bold text-white">
              {currentCountry.name}
            </h2>
            <p className="text-white/60">Выберите столицу</p>
          </div>
        )}
      </div>
      
      <div className="space-y-3">
        {options.map((option) => {
          const isSelected = selectedOption === option;
          const isOptionCorrect = isCapitalsMode 
            ? currentCountry.capital === option
            : currentCountry.name === option;
          const isIncorrect = incorrectOptions.has(option);
          
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
              key={option}
              onClick={() => handleAnswerSelect(option)}
              disabled={isIncorrect || isCorrect}
              className={buttonClass}
            >
              <span className="text-lg">{option}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default GameScreen;
