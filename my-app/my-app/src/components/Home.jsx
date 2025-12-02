import { useState } from 'react'
import './Home.css'
import ImageCarousel from './ImageCarousel'

function Home({ navigateTo, setGameMode }) {
  const [showSlangs, setShowSlangs] = useState(false)

  const slangs = ['Nexti', 'Yalla', 'Smi7 lia', 'Baraka!', 'Katgoul!']
  const randomSlang = slangs[Math.floor(Math.random() * slangs.length)]

  const handlePlay = () => {
    setGameMode('solo')
    navigateTo('categories')
  }

  const handleFriendMode = () => {
    setGameMode('multiplayer')
    navigateTo('friendsMode')
  }

  return (
    <div className="home-container">
      {/* Header */}
      <div className="home-header">
        <div className="logo-section">
          <div className="logo-emoji">🎮</div>
          <h1 className="game-title">موهيم تْجاوْب</h1>
          <p className="game-subtitle">Mouhim Tjawb</p>
          <p className="game-description">لعبة الثقافة المغربية</p>
        </div>

        {/* Slang Animation */}
        <div 
          className="slang-box"
          onClick={() => setShowSlangs(!showSlangs)}
        >
          <span className="slang-text animate-bounce">
            {showSlangs ? randomSlang : 'دارجة...'}
          </span>
        </div>
      </div>

      {/* Image Carousel */}
      <ImageCarousel />

      {/* Welcome Message */}
      <div className="welcome-box">
        <p className="welcome-text">أهلاً وسهلاً في اللعبة الأروع! 🇲🇦</p>
        <p className="welcome-subtitle">تحدى نفسك واختبر معلوماتك عن الثقافة المغربية</p>
      </div>

      {/* Main Buttons */}
      <div className="button-grid">
        <button 
          className="btn-play btn-large"
          onClick={handlePlay}
        >
          <span className="btn-icon">▶️</span>
          <span className="btn-text">تشغيل</span>
          <span className="btn-subtitle">لعب بمفردك</span>
        </button>

        <button 
          className="btn-friends btn-large"
          onClick={handleFriendMode}
        >
          <span className="btn-icon">👥</span>
          <span className="btn-text">مع الأصدقاء</span>
          <span className="btn-subtitle">لعب مع صديقك</span>
        </button>
      </div>

      {/* Quick Category Selection */}
      <div className="quick-categories">
        <p className="quick-title">اختر بسرعة:</p>
        <div className="category-buttons">
          <button className="cat-btn cat-alghaz" onClick={() => {
            setGameMode('solo')
            navigateTo('categories')
          }}>
            🧩 ألغاز
          </button>
          <button className="cat-btn cat-amthal" onClick={() => {
            setGameMode('solo')
            navigateTo('categories')
          }}>
            💬 أمثال
          </button>
          <button className="cat-btn cat-mimic" onClick={() => {
            setGameMode('solo')
            navigateTo('mimi')
          }}>
            🎭 ميميك (Mimic)
          </button>
        </div>
      </div>

      {/* About Button */}
      <div className="home-footer">
        <button 
          className="btn-about"
          onClick={() => navigateTo('about')}
        >
          ℹ️ عن اللعبة
        </button>
      </div>
    </div>
  )
}

export default Home
