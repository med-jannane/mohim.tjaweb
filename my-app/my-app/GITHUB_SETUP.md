# 🚀 Guide Complet : Héberger sur GitHub

## 📝 Étapes Simples

### 1️⃣ Créer un dépôt sur GitHub

1. Allez sur [github.com](https://github.com) et connectez-vous
2. Cliquez sur le **"+"** en haut → **"New repository"**
3. Nommez votre dépôt (ex: `mouhim-tjawb`)
4. Choisissez **Public**
5. **Ne cochez PAS** "Add a README file"
6. Cliquez sur **"Create repository"**

### 2️⃣ Configurer le nom du dépôt

**IMPORTANT** : Avant de continuer, modifiez `vite.config.js` :

Ouvrez `vite.config.js` et changez cette ligne :
```js
const REPO_NAME = 'mouhim-tjawb' // ⚠️ CHANGEZ CE NOM !
```

Remplacez `'mouhim-tjawb'` par le nom de VOTRE dépôt GitHub.

### 3️⃣ Initialiser Git

Ouvrez un terminal dans le dossier `my-app` :

```bash
# Aller dans le dossier du projet
cd my-app

# Initialiser Git
git init

# Ajouter tous les fichiers
git add .

# Faire le premier commit
git commit -m "Premier commit - Mouhim Tjawb"
```

### 4️⃣ Connecter à GitHub

```bash
# Remplacez VOTRE_USERNAME et VOTRE_REPO
git remote add origin https://github.com/VOTRE_USERNAME/VOTRE_REPO.git

# Renommer la branche en main
git branch -M main

# Envoyer le code sur GitHub
git push -u origin main
```

**Exemple** : Si votre username est `map45` et votre repo `mouhim-tjawb` :
```bash
git remote add origin https://github.com/map45/mouhim-tjawb.git
```

### 5️⃣ Installer gh-pages

```bash
npm install --save-dev gh-pages
```

### 6️⃣ Déployer sur GitHub Pages

```bash
npm run deploy
```

Cette commande va :
- Construire votre application
- Créer une branche `gh-pages`
- Déployer votre site

### 7️⃣ Activer GitHub Pages

1. Allez sur votre dépôt GitHub
2. Cliquez sur **Settings** (Paramètres)
3. Dans le menu de gauche : **Pages**
4. Sous **Source** : sélectionnez **gh-pages** branch
5. Cliquez sur **Save**

### 8️⃣ Accéder à votre site

Votre site sera disponible à :
```
https://VOTRE_USERNAME.github.io/VOTRE_REPO/
```

**Exemple** : `https://map45.github.io/mouhim-tjawb/`

## 🔄 Mettre à jour le site

Quand vous modifiez votre code :

```bash
# Ajouter les changements
git add .

# Faire un commit
git commit -m "Description des changements"

# Envoyer sur GitHub
git push

# Redéployer
npm run deploy
```

## ⚠️ Important

1. **Nom du dépôt** : Assurez-vous que `REPO_NAME` dans `vite.config.js` correspond exactement au nom de votre dépôt GitHub
2. **Premier déploiement** : Peut prendre 5-10 minutes
3. **HTTPS** : Votre site sera en HTTPS automatiquement

## 🐛 Problèmes Courants

### Erreur : "gh-pages not found"
```bash
npm install --save-dev gh-pages
```

### Le site ne s'affiche pas
- Vérifiez Settings → Pages → Source = `gh-pages`
- Attendez 5-10 minutes
- Vérifiez l'URL (doit correspondre au nom du dépôt)

### Les chemins ne fonctionnent pas
- Vérifiez que `REPO_NAME` dans `vite.config.js` est correct
- Rebuild : `npm run build` puis `npm run deploy`

## ✅ Checklist

- [ ] Dépôt GitHub créé
- [ ] `REPO_NAME` modifié dans `vite.config.js`
- [ ] Git initialisé (`git init`)
- [ ] Fichiers ajoutés (`git add .`)
- [ ] Premier commit fait (`git commit`)
- [ ] Remote ajouté (`git remote add origin`)
- [ ] Code poussé (`git push`)
- [ ] `gh-pages` installé (`npm install --save-dev gh-pages`)
- [ ] Déployé (`npm run deploy`)
- [ ] GitHub Pages activé dans Settings

## 🎉 C'est tout !

Votre application est maintenant en ligne ! 🚀

