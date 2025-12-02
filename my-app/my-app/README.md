# موهيم تْجاوْب - Mouhim Tjawb

Une application web éducative et ludique pour découvrir la culture marocaine à travers les proverbes, énigmes et histoires traditionnelles.

## 🎮 Fonctionnalités

### Mode Solo
- **ألغاز (Alghaz)** - Quiz interactif avec des énigmes marocaines
- **أمثال (Amthal)** - Quiz pour compléter les proverbes populaires marocains
- **حكايات (Hkayat)** - Lecture d'histoires traditionnelles

### Mode Multijoueur
- Jouez avec des amis localement
- Comparez vos scores en temps réel
- Défiez vos amis avec les mêmes questions

### Mode Mimi 🎭
- Jeu de mime avec emojis
- Un joueur place le téléphone sur son front
- L'autre doit deviner l'emoji en mimant

### Système de Score
- Points par catégorie
- Scores sauvegardés localement
- Rangs basés sur le score total (مبتدئ, متعلم, عالم, حكيم)

### Thème Dark/Light
- Toggle entre mode clair et mode sombre
- Préférence sauvegardée automatiquement

## 🚀 Installation

```bash
npm install
npm run dev
```

## 📦 Build pour Production

```bash
npm run build
```

## 🌐 Déploiement sur GitHub Pages

Voir le fichier [DEPLOY.md](./DEPLOY.md) pour les instructions complètes.

### Déploiement Rapide

```bash
# Installer gh-pages
npm install --save-dev gh-pages

# Déployer
npm run deploy
```

**Important** : Modifiez le `base` dans `vite.config.js` avec le nom de votre dépôt GitHub.

## 🛠️ Technologies

- **React 19** - Framework JavaScript
- **Vite** - Build tool
- **CSS3** - Styles avec thème dark/light
- **LocalStorage** - Sauvegarde des scores

## 📁 Structure du Projet

```
my-app/
├── src/
│   ├── components/      # Composants React
│   │   ├── Home.jsx    # Page d'accueil
│   │   ├── Quiz.jsx    # Mode quiz (énigmes)
│   │   ├── Amthal.jsx  # Mode proverbes (quiz)
│   │   ├── Hkayat.jsx  # Mode histoires
│   │   ├── Multiplayer.jsx  # Mode multijoueur
│   │   ├── Mimi.jsx    # Mode mime
│   │   └── Score.jsx   # Page des scores
│   ├── db.json         # Base de données
│   ├── App.jsx         # Composant principal
│   └── main.jsx        # Point d'entrée
├── public/             # Fichiers statiques
├── index.html          # HTML principal
└── vite.config.js      # Configuration Vite
```

## 🎯 Points de Score

- **ألغاز (Alghaz)** : 10 points par bonne réponse
- **أمثال (Amthal)** : 10 points par bonne réponse
- **حكايات (Hkayat)** : 15 points par histoire lue
- **ميمي (Mimi)** : 10 points par bonne réponse

## 📱 Responsive

L'application est entièrement responsive et fonctionne sur :
- Mobile (320px+)
- Tablette (768px+)
- Desktop (1024px+)

## 🎨 Thèmes

### Mode Clair
- Fond : Blanc/Beige clair
- Texte : Noir/Gris foncé
- Accents : Majorelle Blue, Terracotta, Gold

### Mode Sombre
- Fond : Bleu foncé/Gris foncé
- Texte : Blanc/Gris clair
- Accents : Indigo, Amber, Vert

## 📝 Licence

Ce projet est open source et disponible sous licence MIT.

---

صُنع بحب ❤️ للمغرب

Made with ❤️ for Morocco
