import { useState, useEffect } from "react";
import PokeCard from "../pokeCard";
import FilterPanel from "../filterPanel";
import translations from "../../locales/translations";
import "./style.css";

const PokeList = ({ onSelectPokemon, language = "fr" }) => {
    const [allPokemons, setAllPokemons] = useState([]);
    const [filteredPokemons, setFilteredPokemons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const itemsPerPage = 20;
    
    const t = translations[language] || translations.fr;

    // Fetch all pokemons on component mount
    useEffect(() => {
        setLoading(true);
        const promises = [];
        for (let i = 1; i <= 8; i++) {
            promises.push(
                fetch(`http://localhost:3000/pokemons?page=${i}`)
                    .then(r => r.json())
                    .then(data => data.pokemons)
            );
        }
        Promise.all(promises)
            .then(pages => {
                const allPokes = pages.flat();
                setAllPokemons(allPokes);
                setFilteredPokemons(allPokes);
                setCurrentPage(1);
                setTotalPages(Math.ceil(allPokes.length / itemsPerPage));
                setLoading(false);
            })
            .catch(err => {
                console.error("Erreur:", err);
                setLoading(false);
            });
    }, []);

    // Handle filter changes
    const handleFilterChange = (filtered) => {
        setFilteredPokemons(filtered);
        setCurrentPage(1);
        setTotalPages(Math.ceil(filtered.length / itemsPerPage));
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handlePageClick = (page) => {
        setCurrentPage(page);
    };

    // Get current page items
    const startIdx = (currentPage - 1) * itemsPerPage;
    const endIdx = startIdx + itemsPerPage;
    const currentPokemons = filteredPokemons.slice(startIdx, endIdx);

    if (loading && allPokemons.length === 0) {
        return <p className="loading-text">Chargement des pokémons...</p>
    }

    return (
        <div className="poke-list-container">
            <h2>{t.pokemonList} ({filteredPokemons.length})</h2>
            
            {/* Filter Panel */}
            <FilterPanel 
                allPokemons={allPokemons}
                onFilterChange={handleFilterChange}
                language={language}
            />

            {filteredPokemons.length === 0 ? (
                <div className="no-results">
                    <p>Aucun pokémon ne correspond à vos critères de filtrage.</p>
                </div>
            ) : (
                <>
                    <div className="pokemons-grid">
                        {currentPokemons.map((pokemon) => (
                            <PokeCard 
                                key={pokemon.id} 
                                pokemon={pokemon}
                                onSelectPokemon={onSelectPokemon}
                            />
                        ))}
                    </div>

                    {/* Pagination */}
                    <div className="pagination">
                        <button 
                            onClick={handlePrevPage}
                            disabled={currentPage === 1}
                            className="pagination-btn"
                        >
                            ← Précédent
                        </button>

                        <div className="pagination-info">
                            <span>Page {currentPage} / {totalPages}</span>
                        </div>

                        <div className="pagination-numbers">
                            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                let pageNum;
                                if (totalPages <= 5) {
                                    pageNum = i + 1;
                                } else if (currentPage <= 3) {
                                    pageNum = i + 1;
                                } else if (currentPage >= totalPages - 2) {
                                    pageNum = totalPages - 4 + i;
                                } else {
                                    pageNum = currentPage - 2 + i;
                                }
                                
                                return (
                                    <button
                                        key={pageNum}
                                        onClick={() => handlePageClick(pageNum)}
                                        className={`pagination-number ${pageNum === currentPage ? 'active' : ''}`}
                                    >
                                        {pageNum}
                                    </button>
                                );
                            })}
                        </div>

                        <button 
                            onClick={handleNextPage}
                            disabled={currentPage === totalPages}
                            className="pagination-btn"
                        >
                            Suivant →
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default PokeList;
