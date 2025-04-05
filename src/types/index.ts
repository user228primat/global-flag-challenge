
export interface Country {
  name: string;
  capital: string;
  flagFile: string;
}

export interface Category {
  id: string;
  title: string;
  count: number;
  countries: Country[];
}

export interface GameStats {
  currentScore: number;
  highScore: number;
  isComplete: boolean;
}

export type CategoryId = 
  | 'level1' 
  | 'level2' 
  | 'level3' 
  | 'allFlags' 
  | 'europe' 
  | 'asia' 
  | 'northAmerica' 
  | 'southAmerica' 
  | 'africa' 
  | 'australiaOceania'
  | 'capitals'
  | 'capitalsEurope'
  | 'capitalsAsia'
  | 'capitalsNorthAmerica'
  | 'capitalsSouthAmerica'
  | 'capitalsAfrica'
  | 'capitalsAustraliaOceania';

export interface GameContextType {
  currentCategory: CategoryId | null;
  gameStats: Record<CategoryId, GameStats>;
  lives: number;
  isPlaying: boolean;
  isGameOver: boolean;
  currentScore: number;
  setCurrentCategory: (category: CategoryId | null) => void;
  setLives: React.Dispatch<React.SetStateAction<number>>;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  setIsGameOver: React.Dispatch<React.SetStateAction<boolean>>;
  incrementScore: (category: CategoryId) => void;
  resetGame: () => void;
  startGame: (category: CategoryId) => void;
  viewReference: (category: CategoryId) => void;
  markCategoryComplete: (category: CategoryId) => void;
  showRewardedAd: () => Promise<boolean>;
}
