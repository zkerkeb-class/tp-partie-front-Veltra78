import { useState, useEffect } from "react";
import "./style.css";

const PokemonDetails = ({ pokemon, onBack, onUpdate, onDelete }) => {
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState(pokemon);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        setFormData(pokemon);
    }, [pokemon]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        
        if (name.includes('.')) {
            const [section, field] = name.split('.');
            setFormData({
                ...formData,
                [section]: {
                    ...formData[section],
                    [field]: isNaN(value) ? value : parseInt(value)
                }
            });
        } else {
            setFormData({
                ...formData,
                [name]: isNaN(value) ? value : parseInt(value)
            });
        }
    };

    const handleTypeChange = (e) => {
        setFormData({
            ...formData,
            type: e.target.value.split(',').map(t => t.trim())
        });
    };

    const handleSave = async () => {
        setIsSaving(true);
        try {
            const response = await fetch(`http://localhost:3000/pokemons/${pokemon.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                const updatedPokemon = await response.json();
                onUpdate(updatedPokemon);
                setEditMode(false);
                alert('Pokémon mis à jour avec succès !');
            } else {
                alert('Erreur lors de la mise à jour');
            }
        } catch (error) {
            console.error('Erreur:', error);
            alert('Erreur lors de la mise à jour');
        } finally {
            setIsSaving(false);
        }
    };

    const handleDelete = async () => {
        setShowDeleteModal(false);
        try {
            const response = await fetch(`http://localhost:3000/pokemons/${pokemon.id}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                alert('Pokémon supprimé avec succès !');
                onDelete(pokemon.id);
            } else {
                alert('Erreur lors de la suppression');
            }
        } catch (error) {
            console.error('Erreur:', error);
            alert('Erreur lors de la suppression');
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
        <div className="pokemon-details-overlay">
            <div className="pokemon-details-container">
                <button className="close-btn" onClick={onBack}>×</button>

                <div className="pokemon-details-content">
                    <div className="pokemon-image-section">
                        <img 
                            src={formData.image} 
                            alt={formData.name.english}
                            className="pokemon-detail-image"
                            onError={(e) => e.target.src = 'https://via.placeholder.com/400?text=No+Image'}
                        />
                        <h1>{formData.name.english}</h1>
                        <p className="pokemon-id-detail">#{formData.id}</p>
                    </div>

                    <div className="pokemon-info-section">
                        {!editMode ? (
                            <>
                                <div className="info-group">
                                    <h3>Informations</h3>
                                    <div className="info-item">
                                        <span className="label">Nom français:</span>
                                        <span className="value">{formData.name.french}</span>
                                    </div>
                                    <div className="info-item">
                                        <span className="label">Nom japonais:</span>
                                        <span className="value">{formData.name.japanese}</span>
                                    </div>
                                    <div className="info-item">
                                        <span className="label">Nom chinois:</span>
                                        <span className="value">{formData.name.chinese}</span>
                                    </div>
                                </div>

                                <div className="info-group">
                                    <h3>Types</h3>
                                    <div className="types-display">
                                        {formData.type.map((t) => (
                                            <span 
                                                key={t}
                                                className="type-badge"
                                                style={{ backgroundColor: getTypeColor(t) }}
                                            >
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="info-group">
                                    <h3>Statistiques</h3>
                                    <div className="stats-grid">
                                        <div className="stat-box">
                                            <span className="stat-label">HP</span>
                                            <div className="stat-bar">
                                                <div 
                                                    className="stat-fill" 
                                                    style={{ width: `${(formData.base.HP / 150) * 100}%`, backgroundColor: '#FF6B6B' }}
                                                ></div>
                                            </div>
                                            <span className="stat-value">{formData.base.HP}</span>
                                        </div>
                                        <div className="stat-box">
                                            <span className="stat-label">ATK</span>
                                            <div className="stat-bar">
                                                <div 
                                                    className="stat-fill" 
                                                    style={{ width: `${(formData.base.Attack / 150) * 100}%`, backgroundColor: '#FFA502' }}
                                                ></div>
                                            </div>
                                            <span className="stat-value">{formData.base.Attack}</span>
                                        </div>
                                        <div className="stat-box">
                                            <span className="stat-label">DEF</span>
                                            <div className="stat-bar">
                                                <div 
                                                    className="stat-fill" 
                                                    style={{ width: `${(formData.base.Defense / 150) * 100}%`, backgroundColor: '#FFD93D' }}
                                                ></div>
                                            </div>
                                            <span className="stat-value">{formData.base.Defense}</span>
                                        </div>
                                        <div className="stat-box">
                                            <span className="stat-label">Sp.ATK</span>
                                            <div className="stat-bar">
                                                <div 
                                                    className="stat-fill" 
                                                    style={{ width: `${(formData.base.SpecialAttack / 150) * 100}%`, backgroundColor: '#7C3AED' }}
                                                ></div>
                                            </div>
                                            <span className="stat-value">{formData.base.SpecialAttack}</span>
                                        </div>
                                        <div className="stat-box">
                                            <span className="stat-label">Sp.DEF</span>
                                            <div className="stat-bar">
                                                <div 
                                                    className="stat-fill" 
                                                    style={{ width: `${(formData.base.SpecialDefense / 150) * 100}%`, backgroundColor: '#06B6D4' }}
                                                ></div>
                                            </div>
                                            <span className="stat-value">{formData.base.SpecialDefense}</span>
                                        </div>
                                        <div className="stat-box">
                                            <span className="stat-label">SPD</span>
                                            <div className="stat-bar">
                                                <div 
                                                    className="stat-fill" 
                                                    style={{ width: `${(formData.base.Speed / 150) * 100}%`, backgroundColor: '#F43F5E' }}
                                                ></div>
                                            </div>
                                            <span className="stat-value">{formData.base.Speed}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="action-buttons">
                                    <button className="btn btn-edit" onClick={() => setEditMode(true)}>
                                        ✏️ Modifier
                                    </button>
                                    <button className="btn btn-delete" onClick={() => setShowDeleteModal(true)}>
                                        🗑️ Supprimer
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="edit-form">
                                    <div className="form-group">
                                        <label>Nom français:</label>
                                        <input 
                                            type="text"
                                            name="name.french"
                                            value={formData.name.french}
                                            onChange={handleInputChange}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Types (séparés par des virgules):</label>
                                        <input 
                                            type="text"
                                            value={formData.type.join(', ')}
                                            onChange={handleTypeChange}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>HP:</label>
                                        <input 
                                            type="number"
                                            name="base.HP"
                                            value={formData.base.HP}
                                            onChange={handleInputChange}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Attaque:</label>
                                        <input 
                                            type="number"
                                            name="base.Attack"
                                            value={formData.base.Attack}
                                            onChange={handleInputChange}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Défense:</label>
                                        <input 
                                            type="number"
                                            name="base.Defense"
                                            value={formData.base.Defense}
                                            onChange={handleInputChange}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Sp. Attaque:</label>
                                        <input 
                                            type="number"
                                            name="base.SpecialAttack"
                                            value={formData.base.SpecialAttack}
                                            onChange={handleInputChange}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Sp. Défense:</label>
                                        <input 
                                            type="number"
                                            name="base.SpecialDefense"
                                            value={formData.base.SpecialDefense}
                                            onChange={handleInputChange}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Vitesse:</label>
                                        <input 
                                            type="number"
                                            name="base.Speed"
                                            value={formData.base.Speed}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>

                                <div className="action-buttons">
                                    <button 
                                        className="btn btn-save" 
                                        onClick={handleSave}
                                        disabled={isSaving}
                                    >
                                        {isSaving ? '⏳ Sauvegarde...' : '💾 Sauvegarder'}
                                    </button>
                                    <button className="btn btn-cancel" onClick={() => setEditMode(false)}>
                                        ❌ Annuler
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>

                {/* Delete Modal */}
                {showDeleteModal && (
                    <div className="modal-overlay">
                        <div className="modal-content">
                            <h2>⚠️ Attention</h2>
                            <p>Êtes-vous sûr de vouloir supprimer <strong>{pokemon.name.english}</strong> ?</p>
                            <p>Cette action est irréversible.</p>
                            <div className="modal-buttons">
                                <button className="btn btn-confirm" onClick={handleDelete}>
                                    Supprimer
                                </button>
                                <button className="btn btn-cancel" onClick={() => setShowDeleteModal(false)}>
                                    Annuler
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PokemonDetails;
