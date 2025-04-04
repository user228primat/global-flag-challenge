
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGameContext } from '../contexts/GameContext';
import { gameCategories, categoryDisplayNames } from '../data';
import { ArrowLeft, Search } from 'lucide-react';

const ReferenceTable: React.FC = () => {
  const navigate = useNavigate();
  const { currentCategory } = useGameContext();
  const [searchTerm, setSearchTerm] = useState('');
  
  if (!currentCategory) {
    return null;
  }
  
  const category = gameCategories[currentCategory];
  const displayName = categoryDisplayNames[currentCategory];
  
  // Filter countries based on search term
  const filteredCountries = category.countries.filter(country => 
    country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    country.capital.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 pt-6">
        <button 
          onClick={() => navigate('/')}
          className="flex items-center gap-1.5 text-foreground-subtle hover:text-foreground transition-colors"
        >
          <ArrowLeft size={18} />
          <span>Назад</span>
        </button>
        
        <h1 className="text-2xl font-medium text-foreground animate-fade-in">
          {displayName}
        </h1>
      </div>
      
      {/* Search input */}
      <div className="relative mb-6">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
          <Search size={18} className="text-foreground-subtle" />
        </div>
        <input
          type="text"
          placeholder="Поиск по стране или столице..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-card border border-border rounded-xl pl-11 pr-4 py-3 focus:outline-none focus:border-border-hover text-foreground placeholder-foreground-subtle/70 transition-all"
        />
      </div>
      
      {/* Table */}
      <div className="bg-card border border-border rounded-xl overflow-hidden shadow-elegant">
        <div className="overflow-x-auto scrollbar-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-4 text-foreground-subtle">Флаг</th>
                <th className="text-left p-4 text-foreground-subtle">Страна</th>
                <th className="text-left p-4 text-foreground-subtle">Столица</th>
              </tr>
            </thead>
            <tbody>
              {filteredCountries.map((country, index) => (
                <tr 
                  key={country.name} 
                  className="border-b border-border hover:bg-card-hover transition-colors"
                  style={{ 
                    opacity: 0,
                    animation: 'fade-in 0.3s ease-out forwards',
                    animationDelay: `${index * 0.02}s` 
                  }}
                >
                  <td className="p-4">
                    <div className="w-12 h-8 overflow-hidden rounded shadow-inner-highlight">
                      <img 
                        src={`/images/${country.flagFile}`} 
                        alt={country.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </td>
                  <td className="p-4 text-foreground font-medium">{country.name}</td>
                  <td className="p-4 text-foreground-muted">{country.capital}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ReferenceTable;
