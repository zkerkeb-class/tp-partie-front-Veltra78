import { useState, useEffect } from "react";
import PokeCard from "../pokeCard";
import "./style.css";

const PokeList = ({ onSelectPokemon }) => {
    const [pokemons, setPokemons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const fetchPokemons = (page) => {
        setLoading(true);
        fetch(`http://localhost:3000/pokemons?page=${page}`)
            .then((response) => response.json())
            .then((data) => {
                console.log("Données reçues:", data);
                setPokemons(data.pokemons);
                setTotalPages(data.pagination.totalPages);
                setCurrentPage(data.pagination.currentPage);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Erreur:", error);
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchPokemons(1);
    }, []);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            fetchPokemons(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            fetchPokemons(currentPage - 1);
        }
    };

    const handlePageClick = (page) => {
        fetchPokemons(page);
    };

    if (loading && pokemons.length === 0) {
        return <p>Chargement...</p>
    }

    return (
        <div className="poke-list-container">
            <h2>Liste des Pokémon</h2>
            <div className="pokemons-grid">
                {pokemons.map((pokemon) => (
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
        </div>
    );
};

export default PokeList;
