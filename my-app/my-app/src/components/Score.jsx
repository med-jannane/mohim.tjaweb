import { useState, useEffect } from 'react'
import './Score.css'

function Results({ navigateTo, gameScore }) {
  const [randomMessage, setRandomMessage] = useState('')
  const [showConfetti, setShowConfetti] = useState(false)

  const messages = [
    { text: 'رَاك عَايش! 🎉', meaning: '(Rak 3ayech!) - Tu es en vie!' },
    { text: 'آلله يعطيك شي مِخ! 🧠', meaning: '(A3llah y3tik chi mkh!) - Que Dieu te donne un cerveau!' },
    { text: 'سميح ليَّا دَابَا، رَاك خْرَجْتِ على رَاسَك! 😄', meaning: '(Smi7 lia daba, rak khrejti 3la rasek!)' },
    { text: 'واه، هَاد الْمُستَوى! 🔥', meaning: '(Wah, had el moussstawa!) - Ouah, ce niveau!' },
    { text: 'مَا بْقَاش فيك حِتَّى شِي! 😅', meaning: '(Ma bqash fik htta shi!) - Il ne te reste plus rien!' },
    { text: 'فْرَاقِسْت كْتَاع! 💪', meaning: '(Fraqst kta3!) - Tu as échoué complètement!' },
    { text: 'آلله يصبْرِك! 🙏', meaning: '(Allah y3tiyk sabr!) - Que Dieu te donne la patience!' },
    { text: 'رَاك تْفَاقِدْ! 🤔', meaning: '(Rak tfaqd!) - Tu déclines!' }
  ]

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * messages.length)
    setRandomMessage(messages[randomIndex])
    setShowConfetti(true)
  }, [])

  const scorePercentage = (gameScore / 100) * 100 // Si max score est 100
  const isHighScore = gameScore >= 70

  return (
    <div className={`score-container ${isHighScore ? 'high-score' : ''}`}>
      {/* Confetti Effect */}
      {showConfetti && (
        <div className="confetti-container">
          {[...Array(30)].map((_, i) => (
            <div key={i} className="confetti"></div>
          ))}
        </div>
      )}

      {/* Result Header */}
      <div className="result-header">
        <h1 className="result-title">
          {isHighScore ? 'مبروووك! 🏆' : 'خسْرْتِ! 😢'}
        </h1>
        <p className="result-subtitle">انتهت اللعبة</p>
      </div>

      {/* Score Display */}
      <div className="score-display">
        <div className="score-circle">
          <svg className="score-ring" width="200" height="200">
            <circle
              cx="100"
              cy="100"
              r="90"
              fill="none"
              stroke="rgba(0,0,0,0.1)"
              strokeWidth="8"
            />
            <circle
              cx="100"
              cy="100"
              r="90"
              fill="none"
              stroke={isHighScore ? '#228B22' : '#8B0000'}
              strokeWidth="8"
              strokeDasharray={`${(scorePercentage / 100) * 565.48} 565.48`}
              strokeLinecap="round"
              style={{ transition: 'stroke-dasharray 1s ease' }}
            />
          </svg>
          <div className="score-value">
            <span className="score-number">{gameScore}</span>
            <span className="score-unit">/100</span>
          </div>
        </div>

        {/* Performance Message */}
        <div className="performance-section">
          <div className="moroccan-message">
            <p className="message-text">{randomMessage.text}</p>
            <p className="message-meaning">{randomMessage.meaning}</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="stats-grid">
        <div className="stat-card">
          <span className="stat-icon">⭐</span>
          <span className="stat-label">النسبة</span>
          <span className="stat-value">{scorePercentage.toFixed(0)}%</span>
        </div>
        <div className="stat-card">
          <span className="stat-icon">🎯</span>
          <span className="stat-label">الدرجة</span>
          <span className="stat-value">{gameScore}</span>
        </div>
        <div className="stat-card">
          <span className="stat-icon">🏅</span>
          <span className="stat-label">المستوى</span>
          <span className="stat-value">
            {isHighScore ? 'ممتاز' : 'جيد'}
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="action-buttons">
        <button
          className="btn-replay"
          onClick={() => navigateTo('categories')}
        >
          <span className="btn-icon">🔄</span>
          <span>العب مرة أخرى</span>
        </button>
        <button
          className="btn-home"
          onClick={() => navigateTo('home')}
        >
          <span className="btn-icon">🏠</span>
          <span>الرئيسية</span>
        </button>
      </div>

      {/* Footer Message */}
      <div className="result-footer">
        <p className="footer-text">شكراً للعب معنا! 🎮 تحداني في المرة القادمة!</p>
      </div>
    </div>
  )
}

export default Results

