import './App.css'
import { useState } from 'react'
import Title from './components/title'
import Counter from './components/counter'
import PokeList from './components/pokelist'
import PokemonDetails from './components/pokemonDetails'
import AddPokemon from './components/addPokemon'
import SearchBar from './components/searchBar'
import LanguageSwitcher from './components/languageSwitcher'

function App() {
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [showAddPokemon, setShowAddPokemon] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [searchResult, setSearchResult] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [language, setLanguage] = useState('fr');

  const handleSelectPokemon = (pokemon) => {
    setSelectedPokemon(pokemon);
  };

  const handleBackFromDetails = () => {
    setSelectedPokemon(null);
  };

  const handleUpdatePokemon = (updatedPokemon) => {
    setSelectedPokemon(updatedPokemon);
    setRefreshTrigger(refreshTrigger + 1);
  };

  const handleDeletePokemon = (pokemonId) => {
    setSelectedPokemon(null);
    setRefreshTrigger(refreshTrigger + 1);
  };

  const handlePokemonAdded = (newPokemon) => {
    setShowAddPokemon(false);
    setRefreshTrigger(refreshTrigger + 1);
  };

  const handleSearchResult = (pokemon) => {
    setSearchResult(pokemon);
    setIsSearching(true);
  };

  const handleClearSearch = () => {
    setSearchResult(null);
    setIsSearching(false);
  };

  return (
    <div className="app-container">
      <div className="app-header">
        <Title label="Pokédex" />
        <div className="header-actions">
          <button 
            className="add-pokemon-btn"
            onClick={() => setShowAddPokemon(true)}
          >
            ➕ Ajouter un Pokémon
          </button>
          <LanguageSwitcher 
            currentLanguage={language}
            onLanguageChange={setLanguage}
          />
        </div>
      </div>
      
      <SearchBar 
        onSearchResult={handleSearchResult}
        onClear={handleClearSearch}
      />
      
      {selectedPokemon ? (
        <PokemonDetails 
          pokemon={selectedPokemon}
          onBack={handleBackFromDetails}
          onUpdate={handleUpdatePokemon}
          onDelete={handleDeletePokemon}
        />
      ) : isSearching && searchResult ? (
        <div className="search-result-container">
          <button 
            className="back-to-list-btn"
            onClick={handleClearSearch}
          >
            ← Retour à la liste
          </button>
          <div className="search-result-card">
            <h2>Résultat de la recherche</h2>
            <div className="single-pokemon-card">
              <img 
                src={searchResult.image} 
                alt={searchResult.name.english}
                onError={(e) => e.target.src = 'https://via.placeholder.com/300?text=No+Image'}
              />
              <h3>{searchResult.name.english}</h3>
              <p className="french-name">{searchResult.name.french}</p>
              <div className="quick-stats">
                <div className="stat"><strong>HP:</strong> {searchResult.base.HP}</div>
                <div className="stat"><strong>ATK:</strong> {searchResult.base.Attack}</div>
                <div className="stat"><strong>DEF:</strong> {searchResult.base.Defense}</div>
              </div>
              <button 
                className="view-details-btn"
                onClick={() => handleSelectPokemon(searchResult)}
              >
                Voir les détails complets →
              </button>
            </div>
          </div>
        </div>
      ) : (
        <PokeList onSelectPokemon={handleSelectPokemon} language={language} key={refreshTrigger} />
      )}

      {showAddPokemon && (
        <AddPokemon 
          onClose={() => setShowAddPokemon(false)}
          onPokemonAdded={handlePokemonAdded}
        />
      )}
    </div>
  )
}

export default App
