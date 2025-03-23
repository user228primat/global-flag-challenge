
import { Country } from '../types';

// Get a random element from an array
export const getRandomElement = <T>(array: T[]): T => {
  return array[Math.floor(Math.random() * array.length)];
};

// Shuffle an array using Fisher-Yates algorithm
export const shuffleArray = <T>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

// Generate options for multiple choice questions
export const generateOptions = (
  countries: Country[],
  correctCountry: Country,
  optionsCount = 4
): Country[] => {
  // Make sure we have enough countries for options
  if (countries.length < optionsCount) {
    return shuffleArray(countries);
  }

  // Start with the correct answer
  const options: Country[] = [correctCountry];
  
  // Create a copy of countries without the correct one
  const remainingCountries = countries.filter(
    country => country.name !== correctCountry.name
  );
  
  // Add random countries until we have enough options
  while (options.length < optionsCount && remainingCountries.length > 0) {
    const randomIndex = Math.floor(Math.random() * remainingCountries.length);
    const randomCountry = remainingCountries[randomIndex];
    
    // Add the random country to options and remove it from remaining countries
    options.push(randomCountry);
    remainingCountries.splice(randomIndex, 1);
  }
  
  // Shuffle the options to randomize the position of the correct answer
  return shuffleArray(options);
};

// Get a random country that hasn't been used yet
export const getNextCountry = (
  countries: Country[],
  usedCountries: Set<string>
): Country | null => {
  if (usedCountries.size >= countries.length) {
    return null; // All countries have been used
  }
  
  // Filter out used countries
  const availableCountries = countries.filter(
    country => !usedCountries.has(country.name)
  );
  
  if (availableCountries.length === 0) {
    return null;
  }
  
  return getRandomElement(availableCountries);
};
