Voici le fichier read me du tp de technologie web.

Lien de la vidéo youtube :
https://youtu.be/oqUDSoui-tM

https://youtu.be/oqUDSoui-tM
## Fonctionnalités de Base

### CRUD & Gestion des Pokémons
- Afficher une liste de pokémon avec pagination (20 par 20)
- Cliquer sur une carte pokémon pour accéder à la page détails
- Modifier les infos d'un pokémon sur la page détails
- Supprimer un pokémon avec modale d'avertissement
- Ajouter un nouveau pokémon
- Recherche par nom de pokémon

## Fonctionnalités Bonus

### Système de Filtrage Avancé
- Filtre par type (multi-sélection avec vrais couleurs Pokémon)
- Filtre par numéro/ID (range slider min/max)
- Système de tri complet:
  - Par ID (croissant/décroissant)
  - Par nom (A→Z / Z→A)
- Bouton réinitialiser tous les filtres
- Panneau filtres réductible (fermé par défaut)

### Support Multilingue
- 8 langues disponibles: Français, English, Español, Deutsch, Italiano, 日本語, Português, 中文
- Sélecteur de langue dans l'en-tête

### Images Shiny
- Deux versions d'image pour chaque pokémon (Normal + Shiny)
- Flèches pour basculer entre Normal et Shiny
- Label pour identifier le type d'image affiché

### Améliorations Visuelles & UX
- Fond de carte colorisé selon le type principal du pokémon
- Couleurs dynamiques des types dans les filtres (correspondance TCG)
- Pas de scroll automatique lors du changement de page (reste à la même position)
- Stats affichées au survol de la carte (grille 2x3)
- Gradient et ombres 3D sur les cartes
- Design responsive (mobile, tablet, desktop)

### Détails Modal
- Graphiques des stats avec visualisation
- Affichage complet des informations
- Formulaire d'édition intégré
- Modale de confirmation avant suppression

### Design & Architecture
- Thème cohérent orange (#ff5722) sur toute l'application
- Composants modulaires et réutilisables
- Gestion d'erreurs détaillée
- Sauvegarde des modifications en temps réel