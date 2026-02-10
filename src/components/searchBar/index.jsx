import { useState } from "react";
import "./style.css";

const SearchBar = ({ onSearchResult, onClear }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [isSearching, setIsSearching] = useState(false);
    const [error, setError] = useState("");

    const handleSearch = async (e) => {
        e.preventDefault();
        
        if (!searchTerm.trim()) {
            setError("");
            onClear();
            return;
        }

        setIsSearching(true);
        setError("");

        try {
            const response = await fetch(`http://localhost:3000/search/${searchTerm}`);
            
            if (response.ok) {
                const pokemon = await response.json();
                onSearchResult(pokemon);
            } else {
                setError(`Pokémon "${searchTerm}" non trouvé`);
                onClear();
            }
        } catch (err) {
            console.error("Erreur de recherche:", err);
            setError("Erreur lors de la recherche");
        } finally {
            setIsSearching(false);
        }
    };

    const handleClear = () => {
        setSearchTerm("");
        setError("");
        onClear();
    };

    return (
        <div className="search-container">
            <form onSubmit={handleSearch} className="search-form">
                <div className="search-input-wrapper">
                    <input
                        type="text"
                        placeholder="🔍 Chercher un pokémon par nom..."
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setError("");
                        }}
                        className="search-input"
                    />
                    {searchTerm && (
                        <button
                            type="button"
                            className="clear-btn"
                            onClick={handleClear}
                            title="Effacer"
                        >
                            ✕
                        </button>
                    )}
                </div>
                <button 
                    type="submit" 
                    className="search-btn"
                    disabled={isSearching}
                >
                    {isSearching ? "🔍..." : "🔍 Chercher"}
                </button>
            </form>
            {error && <div className="search-error">{error}</div>}
        </div>
    );
};

export default SearchBar;
