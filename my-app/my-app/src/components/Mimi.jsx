import { useState, useEffect, useMemo } from 'react'
import './Mimi.css'
import NavButtons from './NavButtons'
import db from '../db.json'

function Mimi({ navigateTo, updateScore }) {
  const [gameState, setGameState] = useState('waiting') // 'waiting', 'showing', 'guessing', 'result'
  const [currentPrompt, setCurrentPrompt] = useState(null)
  const [score, setScore] = useState(0)
  const [round, setRound] = useState(1)
  const [timeLeft, setTimeLeft] = useState(30)
  const shuffledPrompts = useMemo(() => {
    const arr = (db.mimic || []).slice()
    // simple shuffle
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[arr[i], arr[j]] = [arr[j], arr[i]]
    }
    return arr
  }, [])
  const [guessed, setGuessed] = useState(false)
  useEffect(() => {
    let timer
    if (gameState === 'showing' && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setGameState('result')
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }
    return () => clearInterval(timer)
  }, [gameState, timeLeft])

  const startGame = () => {
    if (shuffledPrompts.length === 0) return
    const prompt = shuffledPrompts[round - 1]
    setCurrentPrompt(prompt)
    setGameState('showing')
    setTimeLeft(30)
    setGuessed(false)
  }

  const handleGuess = (correct) => {
    if (guessed) return
    setGuessed(true)
    if (correct) {
      const newScore = score + 10
      setScore(newScore)
      updateScore('mimi', 10)
    }
    setGameState('result')
  }

  const nextRound = () => {
    if (round < 20) {
      const nextRoundNum = round + 1
      setRound(nextRoundNum)
      setTimeLeft(30)
      setGuessed(false)
      // Charger le prochain emoji
      if (shuffledPrompts.length > 0 && shuffledPrompts[nextRoundNum - 1]) {
        const prompt = shuffledPrompts[nextRoundNum - 1]
        setCurrentPrompt(prompt)
        setGameState('showing')
      } else {
        setGameState('waiting')
        setCurrentPrompt(null)
      }
    } else {
      // Fin du jeu
      navigateTo('home')
    }
  }

  

    if (!currentPrompt && gameState === 'waiting') {
    return (
      <div className="mimi">
        <div className="mimi-header">
          <NavButtons navigateTo={navigateTo} />
          <h2 className="mimi-title">لعبة الميمي 🎭</h2>
        </div>

        <div className="mimi-instructions">
          <div className="instruction-card">
            <div className="instruction-icon">📱</div>
            <h3>كيف تلعب؟</h3>
            <ol>
              <li>صاحبك يمسك التلفون على جبهته</li>
              <li>أنت تشوف الإيموجي على الشاشة</li>
              <li>حاول تخمن شنو هو!</li>
              <li>صاحبك يخمن من حركاتك</li>
            </ol>
          </div>
        </div>

        <div className="mimi-start">
          <button className="btn-primary mimi-start-btn" onClick={startGame}>
            بدا اللعبة 🎮
          </button>
        </div>
      </div>
    )
  }

  return (
      <div className="mimi">
      <div className="mimi-header">
        <NavButtons navigateTo={navigateTo} />
        <h2 className="mimi-title">لعبة الميمي 🎭</h2>
        <div className="mimi-score">النقاط: {score}</div>
      </div>

      <div className="mimi-progress">
        <div className="progress-info">
          <span>الجولة {round} / 20</span>
          <span className="time-left">⏱️ {timeLeft} ثانية</span>
        </div>
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${(round / 20) * 100}%` }}
          ></div>
        </div>
      </div>

      {gameState === 'showing' && (
        <div className="mimi-game">
          <div className="mimi-game-columns">
            <div className="player-panel">
              <div className="player-warning">أنت اللاعب — لا تنظر إلى الشاشة</div>
              <div className="player-blank">🕶️</div>
            </div>

            <div className="audience-panel">
              <div className="audience-header">عرض للأصدقاء (Audience)</div>
              <div className="audience-card">
                <div className="emoji-display">
                  <div className="mimi-prompt">{currentPrompt?.mot}</div>
                </div>
                <div className="audience-meta">
                  <p className="emoji-name">{currentPrompt?.category || ''}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mimi-actions">
            <button 
              className="btn-success" 
              onClick={() => handleGuess(true)}
              disabled={guessed}
            >
              ✓ خمن صحيح! (+10)
            </button>
            <button 
              className="btn-fail" 
              onClick={() => handleGuess(false)}
              disabled={guessed}
            >
              ✗ ما خمنش
            </button>
          </div>
        </div>
      )}

      {gameState === 'result' && (
        <div className="mimi-result">
          <div className="result-card">
            <div className="result-emoji">
              {guessed && score > 0 ? '🎉' : '😅'}
            </div>
            <h3 className="result-title">
              {guessed && score > 0 ? 'ممتاز! خمن صحيح!' : 'حاول مرة أخرى!'}
            </h3>
            <div className="result-info">
              <p className="emoji-name">الشيء: {currentPrompt?.mot}</p>
              <p className="emoji-category">الفئة: {currentPrompt?.category}</p>
            </div>
            <button className="btn-next" onClick={nextRound}>
              {round < 20 ? 'الجولة التالية →' : 'إنهاء →'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Mimi

