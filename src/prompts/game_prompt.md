
# Detailed Prompt for Global Flag Challenge Game

## Game Overview
You are assisting with a fully-developed educational flag quiz game called "Global Flag Challenge". This web application helps users learn country flags and capitals through an engaging quiz format. The game is primarily in Russian and is integrated with the Yandex Games platform.

## Technical Stack
- **Frontend**: React 18+ with TypeScript 
- **Styling**: Tailwind CSS with custom gradients and animations
- **State Management**: React Context API via `GameContext`
- **Routing**: React Router v6
- **Platform Integration**: Yandex Games SDK for monetization and data persistence
- **Build Tool**: Vite

## Core Game Mechanics

### Game Modes
1. **Flag Identification Mode**: Players are shown a flag and must select the correct country name from 4 options
2. **Capitals Mode**: Players are shown a country name and must select the correct capital city from 4 options

### Game Categories
The game has 11 distinct categories:
- **Difficulty Levels**:
  - Level 1: 17 most recognizable countries
  - Level 2: 50 countries (medium difficulty)
  - Level 3: 100 countries (hard difficulty)
  - All Flags: 238 countries (expert level)
- **Geographic Regions**:
  - Europe (66 countries)
  - Asia (53 countries)
  - North America (39 countries)
  - South America (12 countries)
  - Africa (54 countries)
  - Australia & Oceania (24 countries)
- **Special Mode**:
  - Capitals: Quiz on the capital cities of countries

### Game Flow
1. Player starts at the main menu and selects a category or the capitals mode
2. Game initializes with 3 lives and a score of 0
3. Each round:
   - A random flag (or country name in capitals mode) is displayed
   - Player must select the correct answer from 4 options
   - Correct answer: score increases by 1, next question loads
   - Incorrect answer: lose a life, option becomes disabled
4. Game ends when either:
   - All flags in the category have been correctly identified (win)
   - All 3 lives are lost (game over)
5. After game over, players can:
   - Exit to main menu
   - Restart the same category
   - Continue with one extra life by watching a rewarded ad

## User Interface Components

### Main Menu (`MainMenu.tsx`)
- Title section with game logo
- Three difficulty levels (Level 1-3 and All Flags)
- Six geographic region options
- Special "Capitals" mode button
- Each option shows current progress

### Game Screen (`GameScreen.tsx`)
- Top bar with lives indicator (heart icons) and exit button
- Score counter showing current score, high score, and total flags
- Flag display area (or country name in capitals mode)
- Four answer buttons that highlight green (correct) or red (incorrect)
- Dynamic content loading with appropriate error states

### Game Over Screen (`GameOverScreen.tsx`)
- Final score display
- High score notification if achieved
- "Continue with Ad" button (shows rewarded video ad)
- "Restart" and "Exit" buttons
- Shows fullscreen ad when first displayed

### Reference Table (`ReferenceTable.tsx`)
- Grid display of all flags/countries in the selected category
- Search functionality to filter the list
- Back button to return to previous screen

## Data Structure

### Country Type
```typescript
interface Country {
  name: string;       // Country name in Russian
  capital: string;    // Capital city name in Russian
  flagFile: string;   // Flag file name (e.g. "ru.svg")
}
```

### Category Type
```typescript
interface Category {
  id: CategoryId;     // Unique identifier
  title: string;      // Display name in Russian
  count: number;      // Number of countries in category
  countries: Country[]; // Array of country objects
}
```

### Game Stats Type
```typescript
interface GameStats {
  currentScore: number;
  highScore: number;
  isComplete: boolean;
}
```

## Yandex Games SDK Integration

### Initialization
- SDK is loaded via script tag in index.html
- Initialization happens on app startup in the GameContext provider
- Fallback to local storage when SDK is unavailable

### Features Used
1. **Advertisements**:
   - `showFullscreenAdv()`: Shown after game completion
   - `showRewardedVideo()`: Used for the "Continue with Ad" feature to gain an extra life

2. **Cloud Storage**:
   - `set()`: Saves player progress (game stats for each category) to Yandex cloud
   - `get()`: Retrieves saved progress when the game loads
   - Backup to localStorage when offline

### Implementation Details
The game uses a singleton service pattern via `YandexGamesSDK.ts`:
```typescript
// Simplified example
class YandexGamesSDK {
  private static instance: YandexGamesSDK;
  private ysdk: any = null;
  
  public static getInstance(): YandexGamesSDK {...}
  public async init(): Promise<boolean> {...}
  public async showFullscreenAd(): Promise<void> {...}
  public async showRewardedAd(onRewarded: () => void): Promise<boolean> {...}
  public async saveProgress(data: PlayerProgress): Promise<boolean> {...}
  public async loadProgress(): Promise<PlayerProgress | null> {...}
}
```

## State Management
Game state is managed via React Context (`GameContext.tsx`):
- Current category selection
- Game statistics for all categories
- Lives management
- Game status (playing, game over)
- Score tracking
- Ad integration methods

## Game Logic
Core game logic is in utils/gameLogic.ts:
- `generateOptions()`: Creates multiple choice options
- `getNextCountry()`: Selects the next random country not yet used
- `shuffleArray()`: Randomizes options order

## Visual Design
- Dark theme with blue-to-indigo gradient backgrounds
- Flag cards with subtle shadows and rounded corners
- Button transitions and hover effects
- Heart icons for lives display
- Score counters with high score tracking
- Responsive design for all screen sizes

## Special Considerations
1. **Performance Optimization**:
   - Images are preloaded
   - Efficient re-rendering with memoization
   - Smart state updates to prevent unnecessary re-renders

2. **User Experience**:
   - Clear feedback for correct/incorrect answers
   - Smooth transitions between questions
   - Proper error handling for network issues
   - Progress saving between sessions

3. **Monetization Strategy**:
   - Strategic ad placement after game completion
   - Optional rewarded ads for extra lives
   - Non-intrusive implementation that maintains gameplay flow

4. **Accessibility**:
   - Proper contrast ratios
   - Keyboard navigation support
   - Screen reader compatibility

## Future Enhancement Opportunities
- Leaderboards integration
- Social sharing features
- Achievement system
- Additional language support
- Timed challenge modes
- Multiplayer capabilities

Use this detailed breakdown to provide accurate assistance with the Global Flag Challenge game, focusing on maintaining the educational value while optimizing user experience and monetization opportunities.
