import { useState } from "react";
import "./style.css";

const AddPokemon = ({ onClose, onPokemonAdded }) => {
    const [formData, setFormData] = useState({
        name: {
            english: '',
            french: '',
            japanese: '',
            chinese: ''
        },
        type: [],
        base: {
            HP: 50,
            Attack: 50,
            Defense: 50,
            SpecialAttack: 50,
            SpecialDefense: 50,
            Speed: 50
        },
        image: '',
        shinyImage: ''
    });

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const allTypes = [
        'Normal', 'Fire', 'Water', 'Electric', 'Grass', 'Ice', 'Fighting',
        'Poison', 'Ground', 'Flying', 'Psychic', 'Bug', 'Rock', 'Ghost',
        'Dragon', 'Dark', 'Steel', 'Fairy'
    ];

    const handleNameChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            name: {
                ...formData.name,
                [name]: value
            }
        });
    };

    const handleStatChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            base: {
                ...formData.base,
                [name]: parseInt(value)
            }
        });
    };

    const handleTypeToggle = (type) => {
        setFormData({
            ...formData,
            type: formData.type.includes(type)
                ? formData.type.filter(t => t !== type)
                : [...formData.type, type]
        });
    };

    const handleImageChange = (e) => {
        setFormData({
            ...formData,
            image: e.target.value
        });
    };

    const handleShinyImageChange = (e) => {
        setFormData({
            ...formData,
            shinyImage: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!formData.name.english || !formData.name.french) {
            setError('Le nom anglais et français sont obligatoires');
            return;
        }

        if (formData.type.length === 0) {
            setError('Sélectionnez au moins un type');
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch('http://localhost:3000/pokemons', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                const newPokemon = await response.json();
                alert('Pokémon créé avec succès !');
                onPokemonAdded(newPokemon);
                onClose();
            } else {
                const errorData = await response.json();
                setError(errorData.error || 'Erreur lors de la création du Pokémon');
            }
        } catch (err) {
            console.error('Erreur:', err);
            setError('Erreur lors de la création du Pokémon: ' + err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="add-pokemon-overlay">
            <div className="add-pokemon-container">
                <button className="close-btn" onClick={onClose}>×</button>

                <h2>➕ Ajouter un nouveau Pokémon</h2>

                {error && <div className="error-message">{error}</div>}

                <form onSubmit={handleSubmit} className="pokemon-form">
                    <div className="form-section">
                        <h3>Informations de base</h3>

                        <div className="form-row">
                            <div className="form-group">
                                <label>Nom anglais *</label>
                                <input
                                    type="text"
                                    name="english"
                                    value={formData.name.english}
                                    onChange={handleNameChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Nom français *</label>
                                <input
                                    type="text"
                                    name="french"
                                    value={formData.name.french}
                                    onChange={handleNameChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label>Nom japonais</label>
                                <input
                                    type="text"
                                    name="japanese"
                                    value={formData.name.japanese}
                                    onChange={handleNameChange}
                                />
                            </div>

                            <div className="form-group">
                                <label>Nom chinois</label>
                                <input
                                    type="text"
                                    name="chinese"
                                    value={formData.name.chinese}
                                    onChange={handleNameChange}
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label>URL de l'image</label>
                            <input
                                type="url"
                                value={formData.image}
                                onChange={handleImageChange}
                                placeholder="https://..."
                            />
                        </div>

                        <div className="form-group">
                            <label>URL de l'image Shiny</label>
                            <input
                                type="url"
                                value={formData.shinyImage}
                                onChange={handleShinyImageChange}
                                placeholder="https://..."
                            />
                        </div>

                        {formData.image && (
                            <div className="image-preview">
                                <img 
                                    src={formData.image}
                                    alt="Aperçu"
                                    onError={(e) => e.target.style.display = 'none'}
                                />
                            </div>
                        )}
                    </div>

                    <div className="form-section">
                        <h3>Types *</h3>
                        <div className="types-selection">
                            {allTypes.map(type => (
                                <label key={type} className="type-checkbox">
                                    <input
                                        type="checkbox"
                                        checked={formData.type.includes(type)}
                                        onChange={() => handleTypeToggle(type)}
                                    />
                                    <span>{type}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="form-section">
                        <h3>Statistiques de base</h3>

                        <div className="stats-row">
                            <div className="stat-group">
                                <label>HP</label>
                                <input
                                    type="number"
                                    name="HP"
                                    min="1"
                                    max="255"
                                    value={formData.base.HP}
                                    onChange={handleStatChange}
                                />
                            </div>

                            <div className="stat-group">
                                <label>Attaque</label>
                                <input
                                    type="number"
                                    name="Attack"
                                    min="1"
                                    max="255"
                                    value={formData.base.Attack}
                                    onChange={handleStatChange}
                                />
                            </div>

                            <div className="stat-group">
                                <label>Défense</label>
                                <input
                                    type="number"
                                    name="Defense"
                                    min="1"
                                    max="255"
                                    value={formData.base.Defense}
                                    onChange={handleStatChange}
                                />
                            </div>
                        </div>

                        <div className="stats-row">
                            <div className="stat-group">
                                <label>Sp. Attaque</label>
                                <input
                                    type="number"
                                    name="SpecialAttack"
                                    min="1"
                                    max="255"
                                    value={formData.base.SpecialAttack}
                                    onChange={handleStatChange}
                                />
                            </div>

                            <div className="stat-group">
                                <label>Sp. Défense</label>
                                <input
                                    type="number"
                                    name="SpecialDefense"
                                    min="1"
                                    max="255"
                                    value={formData.base.SpecialDefense}
                                    onChange={handleStatChange}
                                />
                            </div>

                            <div className="stat-group">
                                <label>Vitesse</label>
                                <input
                                    type="number"
                                    name="Speed"
                                    min="1"
                                    max="255"
                                    value={formData.base.Speed}
                                    onChange={handleStatChange}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="form-actions">
                        <button
                            type="submit"
                            className="btn btn-submit"
                            disabled={isLoading}
                        >
                            {isLoading ? '⏳ Création...' : '✅ Créer le Pokémon'}
                        </button>
                        <button
                            type="button"
                            className="btn btn-cancel"
                            onClick={onClose}
                        >
                            ❌ Annuler
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddPokemon;
