import { useState } from "react";
import "./style.css";

const PokeCard = ({ pokemon, onSelectPokemon }) => {
    const [isHovered, setIsHovered] = useState(false);

    const handleClick = () => {
        if (onSelectPokemon) {
            onSelectPokemon(pokemon);
        }
    };

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

    return (
        <div 
            className="poke-card"
            onClick={handleClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="poke-card-inner">
                <div className="poke-card-front">
                    <img 
                        src={pokemon.image} 
                        alt={pokemon.name.english}
                        className="poke-image"
                        onError={(e) => e.target.src = 'https://via.placeholder.com/200?text=No+Image'}
                    />
                    <h3 className="poke-name">{pokemon.name.english}</h3>
                    <p className="poke-name-french">{pokemon.name.french}</p>
                    <div className="poke-types">
                        {pokemon.type.map((t) => (
                            <span 
                                key={t}
                                className="poke-type"
                                style={{ backgroundColor: getTypeColor(t) }}
                            >
                                {t}
                            </span>
                        ))}
                    </div>
                    <p className="poke-id">#{pokemon.id}</p>
                </div>
                {isHovered && (
                    <div className="poke-card-back">
                        <div className="poke-stats">
                            <div className="stat">
                                <span className="stat-label">HP:</span>
                                <span className="stat-value">{pokemon.base.HP}</span>
                            </div>
                            <div className="stat">
                                <span className="stat-label">ATK:</span>
                                <span className="stat-value">{pokemon.base.Attack}</span>
                            </div>
                            <div className="stat">
                                <span className="stat-label">DEF:</span>
                                <span className="stat-value">{pokemon.base.Defense}</span>
                            </div>
                            <div className="stat">
                                <span className="stat-label">Sp.ATK:</span>
                                <span className="stat-value">{pokemon.base.SpecialAttack}</span>
                            </div>
                            <div className="stat">
                                <span className="stat-label">Sp.DEF:</span>
                                <span className="stat-value">{pokemon.base.SpecialDefense}</span>
                            </div>
                            <div className="stat">
                                <span className="stat-label">SPD:</span>
                                <span className="stat-value">{pokemon.base.Speed}</span>
                            </div>
                        </div>
                        <p className="click-hint">Cliquez pour plus de détails</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PokeCard;