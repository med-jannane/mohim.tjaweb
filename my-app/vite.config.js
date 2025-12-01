import { defineConfig } from 'vite'
import process from 'node:process'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// Pour GitHub Pages, remplacez 'mouhim-tjawb' par le nom de VOTRE dépôt GitHub
const REPO_NAME = 'mouhim-tjawb' // ⚠️ CHANGEZ CE NOM !

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
  ],
  // Configuration pour GitHub Pages
  base: process.env.NODE_ENV === 'production' ? `/${REPO_NAME}/` : '/',
})
