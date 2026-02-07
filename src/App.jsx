import './App.css'
import { useState } from 'react'
import Title from './components/title'
import Counter from './components/counter'
import PokeList from './components/pokelist'
import PokemonDetails from './components/pokemonDetails'
import AddPokemon from './components/addPokemon'

function App() {
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [showAddPokemon, setShowAddPokemon] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

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

  return (
    <div className="app-container">
      <div className="app-header">
        <Title label="Pokédex" />
        <button 
          className="add-pokemon-btn"
          onClick={() => setShowAddPokemon(true)}
        >
          ➕ Ajouter un Pokémon
        </button>
      </div>
      
      {selectedPokemon ? (
        <PokemonDetails 
          pokemon={selectedPokemon}
          onBack={handleBackFromDetails}
          onUpdate={handleUpdatePokemon}
          onDelete={handleDeletePokemon}
        />
      ) : (
        <PokeList onSelectPokemon={handleSelectPokemon} key={refreshTrigger} />
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
