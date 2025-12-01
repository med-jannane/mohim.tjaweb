# 🚀 Guide de Déploiement sur GitHub Pages

Ce guide vous explique comment héberger votre application "Mouhim Tjawb" sur GitHub Pages.

## 📋 Prérequis

1. Un compte GitHub
2. Git installé sur votre ordinateur
3. Node.js et npm installés

## 🔧 Étapes de Déploiement

### Étape 1 : Créer un dépôt GitHub

1. Allez sur [GitHub.com](https://github.com)
2. Cliquez sur le bouton **"+"** en haut à droite → **"New repository"**
3. Nommez votre dépôt (ex: `mouhim-tjawb`)
4. Choisissez **Public** ou **Private**
5. **Ne cochez PAS** "Initialize this repository with a README"
6. Cliquez sur **"Create repository"**

### Étape 2 : Initialiser Git dans votre projet

Ouvrez un terminal dans le dossier `my-app` et exécutez :

```bash
# Initialiser Git
git init

# Ajouter tous les fichiers
git add .

# Faire le premier commit
git commit -m "Initial commit - Mouhim Tjawb"
```

### Étape 3 : Connecter à GitHub

```bash
# Remplacez VOTRE_USERNAME et VOTRE_REPO par vos informations
git remote add origin https://github.com/VOTRE_USERNAME/VOTRE_REPO.git

# Renommer la branche principale en main (si nécessaire)
git branch -M main

# Pousser le code sur GitHub
git push -u origin main
```

### Étape 4 : Installer gh-pages

```bash
npm install --save-dev gh-pages
```

### Étape 5 : Configurer le nom du dépôt

**Important** : Modifiez `vite.config.js` et remplacez `/mouhim-tjawb/` par le nom de VOTRE dépôt GitHub.

Par exemple, si votre dépôt s'appelle `mon-jeu-marocain`, changez :
```js
base: process.env.NODE_ENV === 'production' ? '/mon-jeu-marocain/' : '/',
```

### Étape 6 : Déployer sur GitHub Pages

```bash
npm run deploy
```

Cette commande va :
1. Construire votre application (`npm run build`)
2. Déployer le dossier `dist` sur GitHub Pages

### Étape 7 : Activer GitHub Pages

1. Allez sur votre dépôt GitHub
2. Cliquez sur **Settings** (Paramètres)
3. Dans le menu de gauche, cliquez sur **Pages**
4. Sous **Source**, sélectionnez **gh-pages** branch
5. Cliquez sur **Save**

### Étape 8 : Accéder à votre site

Votre site sera disponible à :
```
https://VOTRE_USERNAME.github.io/VOTRE_REPO/
```

Par exemple : `https://map45.github.io/mouhim-tjawb/`

## 🔄 Mettre à jour le site

Chaque fois que vous modifiez votre code :

```bash
# Ajouter les changements
git add .

# Faire un commit
git commit -m "Description de vos changements"

# Pousser sur GitHub
git push

# Déployer sur GitHub Pages
npm run deploy
```

## ⚙️ Configuration Alternative (Sans gh-pages)

Si vous préférez utiliser GitHub Actions, créez un fichier `.github/workflows/deploy.yml` :

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm install
        
      - name: Build
        run: npm run build
        
      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

## 📝 Notes Importantes

1. **Nom du dépôt** : Assurez-vous que le `base` dans `vite.config.js` correspond au nom de votre dépôt
2. **Premier déploiement** : Le premier déploiement peut prendre quelques minutes
3. **HTTPS** : GitHub Pages utilise HTTPS par défaut
4. **Domaine personnalisé** : Vous pouvez ajouter un domaine personnalisé dans les paramètres Pages

## 🐛 Résolution de Problèmes

### Le site ne s'affiche pas
- Vérifiez que GitHub Pages est activé dans Settings → Pages
- Vérifiez que la branche `gh-pages` existe
- Attendez 5-10 minutes après le déploiement

### Les chemins ne fonctionnent pas
- Vérifiez que le `base` dans `vite.config.js` est correct
- Assurez-vous que tous les liens utilisent des chemins relatifs

### Erreur lors du déploiement
- Vérifiez que `gh-pages` est installé : `npm install --save-dev gh-pages`
- Vérifiez que vous êtes connecté à GitHub : `git remote -v`

## 🎉 Félicitations !

Votre application est maintenant en ligne sur GitHub Pages ! 🚀

