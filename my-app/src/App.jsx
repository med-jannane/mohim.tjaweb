import { useState } from 'react'
import './App.css'
import Home from './components/Home'
import Categories from './components/Categories'
import Game from './components/Game'
import FriendsMode from './components/FriendsMode'
import Results from './components/Score'
import About from './components/About'
import Mimi from './components/Mimi'

function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [gameMode, setGameMode] = useState('solo') // solo or multiplayer
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [gameScore, setGameScore] = useState(0)

  const updateScore = (type, amount) => {
    setGameScore(prev => prev + (Number(amount) || 0))
  }

  const navigateTo = (page) => {
    setCurrentPage(page)
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <Home 
            navigateTo={navigateTo} 
            setGameMode={setGameMode}
          />
        )
      
      case 'categories':
        return (
          <Categories 
            navigateTo={navigateTo}
            setGameMode={setGameMode}
            setSelectedCategory={setSelectedCategory}
          />
        )
      
      case 'game':
        return (
          <Game 
            navigateTo={navigateTo}
            selectedCategory={selectedCategory}
            setGameScore={setGameScore}
            updateScore={updateScore}
          />
        )
      
      case 'friendsMode':
        return (
          <FriendsMode 
            navigateTo={navigateTo}
          />
        )

      case 'mimi':
        return (
          <Mimi 
            navigateTo={navigateTo}
            updateScore={updateScore}
          />
        )
      
      case 'results':
        return (
          <Results 
            navigateTo={navigateTo}
            gameScore={gameScore}
          />
        )
      
      case 'about':
        return (
          <About 
            navigateTo={navigateTo}
          />
        )
      
      default:
        return <Home navigateTo={navigateTo} setGameMode={setGameMode} />
    }
  }

  return (
    <div className="app-wrapper">
      {renderPage()}
    </div>
  )
}

export default App

