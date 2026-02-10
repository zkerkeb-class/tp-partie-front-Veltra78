import { useState, useEffect } from "react";
import translations from "../../locales/translations";
import "./style.css";

const FilterPanel = ({ allPokemons, onFilterChange, language = "fr" }) => {
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [minId, setMinId] = useState(1);
  const [maxId, setMaxId] = useState(151);
  const [sortBy, setSortBy] = useState("id-asc");
  const [allTypes, setAllTypes] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);
  
  const t = translations[language] || translations.fr;

  const getTypeColor = (type) => {
    const colors = {
      'Grass': '#78c850',
      'Poison': '#a040a0',
      'Fire': '#f08030',
      'Water': '#6890f0',
      'Electric': '#f8d030',
      'Ice': '#98d8d8',
      'Fighting': '#c03028',
      'Flying': '#a890f0',
      'Ground': '#e0c068',
      'Rock': '#b8a038',
      'Bug': '#a8b820',
      'Ghost': '#705898',
      'Steel': '#b8b8d0',
      'Psychic': '#f85888',
      'Dragon': '#7038f8',
      'Dark': '#705848',
      'Fairy': '#ee99ac',
      'Normal': '#a8a878'
    };
    return colors[type] || '#a8a8a8';
  };

  // Extract all unique types from pokemons
  useEffect(() => {
    if (allPokemons.length > 0) {
      const types = new Set();
      allPokemons.forEach(pokemon => {
        pokemon.type.forEach(t => types.add(t));
      });
      const sortedTypes = Array.from(types).sort();
      setAllTypes(sortedTypes);
    }
  }, [allPokemons]);

  const handleTypeToggle = (type) => {
    const newSelectedTypes = selectedTypes.includes(type)
      ? selectedTypes.filter(t => t !== type)
      : [...selectedTypes, type];
    setSelectedTypes(newSelectedTypes);
    applyFilters(newSelectedTypes, minId, maxId, sortBy);
  };

  const handleMinIdChange = (e) => {
    const value = parseInt(e.target.value);
    setMinId(value);
    applyFilters(selectedTypes, value, maxId, sortBy);
  };

  const handleMaxIdChange = (e) => {
    const value = parseInt(e.target.value);
    setMaxId(value);
    applyFilters(selectedTypes, minId, value, sortBy);
  };

  const handleSortChange = (e) => {
    const newSort = e.target.value;
    setSortBy(newSort);
    applyFilters(selectedTypes, minId, maxId, newSort);
  };

  const applyFilters = (types, min, max, sort) => {
    let filtered = [...allPokemons];

    // Filter by type
    if (types.length > 0) {
      filtered = filtered.filter(pokemon =>
        types.some(type => pokemon.type.includes(type))
      );
    }

    // Filter by ID range
    filtered = filtered.filter(pokemon => pokemon.id >= min && pokemon.id <= max);

    // Apply sorting
    if (sort === "id-asc") {
      filtered.sort((a, b) => a.id - b.id);
    } else if (sort === "id-desc") {
      filtered.sort((a, b) => b.id - a.id);
    } else if (sort === "name-asc") {
      filtered.sort((a, b) => a.name.english.localeCompare(b.name.english));
    } else if (sort === "name-desc") {
      filtered.sort((a, b) => b.name.english.localeCompare(a.name.english));
    }

    onFilterChange(filtered);
  };

  const handleReset = () => {
    setSelectedTypes([]);
    setMinId(1);
    setMaxId(151);
    setSortBy("id-asc");
    onFilterChange(allPokemons);
  };

  return (
    <div className="filter-panel">
      <div className="filter-header">
        <h3>{t.filters}</h3>
        <button 
          className={`toggle-filter-btn ${isExpanded ? 'expanded' : 'collapsed'}`}
          onClick={() => setIsExpanded(!isExpanded)}
          title={isExpanded ? t.collapsible : t.expandable}
        >
          {isExpanded ? '▼' : '▶'}
        </button>
      </div>

      {isExpanded && (
        <div className="filter-section">

        {/* Type Filter */}
        <div className="filter-group">
          <label className="filter-label">{t.types}</label>
          <div className="types-grid">
            {allTypes.map(type => (
              <button
                key={type}
                className={`type-badge ${selectedTypes.includes(type) ? 'active' : ''}`}
                onClick={() => handleTypeToggle(type)}
                style={{
                  backgroundColor: selectedTypes.includes(type) ? getTypeColor(type) : 'white',
                  borderColor: getTypeColor(type),
                  color: selectedTypes.includes(type) ? 'white' : getTypeColor(type),
                }}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* ID Range Filter */}
        <div className="filter-group">
          <label className="filter-label">{t.number}</label>
          <div className="range-inputs">
            <div>
              <label htmlFor="min-id">{t.min}:</label>
              <input
                id="min-id"
                type="number"
                min="1"
                max="151"
                value={minId}
                onChange={handleMinIdChange}
              />
            </div>
            <span className="range-separator">-</span>
            <div>
              <label htmlFor="max-id">{t.max}:</label>
              <input
                id="max-id"
                type="number"
                min="1"
                max="151"
                value={maxId}
                onChange={handleMaxIdChange}
              />
            </div>
          </div>
          <div className="range-slider">
            <input
              type="range"
              min="1"
              max="151"
              value={minId}
              onChange={handleMinIdChange}
              className="slider slider-min"
            />
            <input
              type="range"
              min="1"
              max="151"
              value={maxId}
              onChange={handleMaxIdChange}
              className="slider slider-max"
            />
          </div>
        </div>

        {/* Sort */}
        <div className="filter-group">
          <label className="filter-label" htmlFor="sort-select">{t.sort}</label>
          <select id="sort-select" value={sortBy} onChange={handleSortChange} className="sort-select">
            <option value="id-asc">{t.sortByIdAsc}</option>
            <option value="id-desc">{t.sortByIdDesc}</option>
            <option value="name-asc">{t.sortByNameAsc}</option>
            <option value="name-desc">{t.sortByNameDesc}</option>
          </select>
        </div>

        {/* Reset Button */}
        <button className="reset-filters-btn" onClick={handleReset}>
          {t.resetFilters}
        </button>
      </div>
      )}
    </div>
  );
};

export default FilterPanel;
