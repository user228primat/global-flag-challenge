
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
      <div className="flex items-center justify-between mb-8">
        <button 
          onClick={() => navigate(-1)} // Исправлено для возврата на предыдущую страницу
          className="flex items-center text-white/70 hover:text-white transition-colors"
        >
          <ArrowLeft size={20} className="mr-1" />
          <span>Назад</span>
        </button>
        
        <h1 className="text-xl font-medium text-white text-shadow">
          {displayName}
        </h1>
      </div>
      
      <div className="glass mb-6 flex items-center rounded-xl overflow-hidden">
        <div className="pl-4">
          <Search size={20} className="text-white/60" />
        </div>
        <input
          type="text"
          placeholder="Поиск по стране или столице..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-transparent px-4 py-3 focus:outline-none text-white"
        />
      </div>
      
      <div className="glass rounded-xl overflow-hidden">
        <div className="overflow-x-auto scrollbar-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left p-4 text-white/70">Флаг</th>
                <th className="text-left p-4 text-white/70">Страна</th>
                <th className="text-left p-4 text-white/70">Столица</th>
              </tr>
            </thead>
            <tbody>
              {filteredCountries.map((country) => (
                <tr 
                  key={country.name} 
                  className="border-b border-white/10 hover:bg-white/5 transition-colors"
                >
                  <td className="p-4">
                    <div className="w-12 h-8 overflow-hidden rounded">
                      <img 
                        src={`/images/${country.flagFile}`} 
                        alt={country.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </td>
                  <td className="p-4 text-white">{country.name}</td>
                  <td className="p-4 text-white">{country.capital}</td>
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
