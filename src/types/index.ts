
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
  | 'capitals';

export interface GameContextType {
  currentCategory: CategoryId | null;
  gameStats: Record<CategoryId, GameStats>;
  lives: number;
  isPlaying: boolean;
  isGameOver: boolean;
  currentScore: number;
  setCurrentCategory: (category: CategoryId | null) => void;
  setLives: (lives: number) => void;
  setIsPlaying: (isPlaying: boolean) => void;
  setIsGameOver: (isGameOver: boolean) => void;
  incrementScore: (category: CategoryId) => void;
  resetGame: () => void;
  startGame: (category: CategoryId) => void;
  viewReference: (category: CategoryId) => void;
  markCategoryComplete: (category: CategoryId) => void;
}
