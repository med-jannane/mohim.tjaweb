import { useState, useEffect, useMemo } from 'react'
import './Multiplayer.css'
import db from '../db.json'

function FriendsMode({ navigateTo }) {
  const [gameStarted, setGameStarted] = useState(false)
  const [difficulty, setDifficulty] = useState('mixed') // 'riddles', 'amtila', 'mixed'
  const [playerCount, setPlayerCount] = useState(2)
  const [players, setPlayers] = useState([])
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answered, setAnswered] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [timeLeft, setTimeLeft] = useState(30)

  // Build questions based on difficulty setting - memoized so it only changes when difficulty changes
  const questions = useMemo(() => {
    let questionsArray = []

    if (difficulty === 'riddles' || difficulty === 'mixed') {
      const riddleQuestions = (db.riddles || []).map(r => ({
        question: r.question,
        answers: r.choices || [r.answer],
        correctIndex: r.choices ? r.choices.indexOf(r.answer) : 0,
        type: 'riddle'
      }))
      questionsArray = questionsArray.concat(riddleQuestions)
    }

    if (difficulty === 'amtila' || difficulty === 'mixed') {
      const amthalaQuestions = (db.amtila || []).map(a => ({
        question: a.start,
        answers: a.choices || [a.answer],
        correctIndex: a.choices ? a.choices.indexOf(a.answer) : 0,
        type: 'amthal'
      }))
      questionsArray = questionsArray.concat(amthalaQuestions)
    }

    // Shuffle if mixed mode
    if (difficulty === 'mixed' && questionsArray.length > 1) {
      for (let i = questionsArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[questionsArray[i], questionsArray[j]] = [questionsArray[j], questionsArray[i]]
      }
    }

    return questionsArray.length > 0
      ? questionsArray
      : [
          {
            question: 'ما هو الشيء الذي كلما أخذت منه كبر؟',
            answers: ['الحفرة', 'البيت', 'السيارة', 'الكتاب'],
            correctIndex: 0,
            type: 'riddle'
          }
        ]
  }, [difficulty])

  useEffect(() => {
    let timer
    if (gameStarted && timeLeft > 0 && !answered) {
      timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }
    return () => clearInterval(timer)
  }, [gameStarted, answered, timeLeft])

  // Reset when difficulty changes (if game hasn't started)
  useEffect(() => {
    if (!gameStarted) {
      setCurrentQuestion(0)
      setCurrentPlayerIndex(0)
      setAnswered(false)
      setSelectedAnswer(null)
    }
  }, [difficulty, gameStarted])

  const handleStartGame = () => {
    const newPlayers = Array(playerCount).fill(null).map((_, i) => ({
      id: i,
      name: `لاعب ${i + 1}`,
      score: 0
    }))
    setPlayers(newPlayers)
    setGameStarted(true)
    setCurrentQuestion(0)
    setCurrentPlayerIndex(0)
    setAnswered(false)
    setSelectedAnswer(null)
    setTimeLeft(30)
  }

  const handlePlayerNameChange = (index, name) => {
    const newPlayers = [...players]
    newPlayers[index].name = name || `لاعب ${index + 1}`
    setPlayers(newPlayers)
  }

  const handleAnswerClick = (index) => {
    if (answered) return

    setSelectedAnswer(index)
    setAnswered(true)

    if (index === questions[currentQuestion].correctIndex) {
      const newPlayers = [...players]
      newPlayers[currentPlayerIndex].score += 10
      setPlayers(newPlayers)
    }
  }

  const handleNextTurn = () => {
    const nextPlayerIndex = (currentPlayerIndex + 1) % playerCount

    if (nextPlayerIndex === 0) {
      // جولة جديدة
      setCurrentQuestion(currentQuestion + 1)
    }

    if (currentQuestion + 1 >= questions.length) {
      // اللعبة انتهت - يجب إضافة صفحة النتائج
      // للآن سننتقل للمنزل
      navigateTo('home')
      return
    }

    setCurrentPlayerIndex(nextPlayerIndex)
    setSelectedAnswer(null)
    setAnswered(false)
    setTimeLeft(30)
  }

  if (!gameStarted) {
    return (
      <div className="multiplayer-setup">
        <div className="setup-container">
          <h1 className="setup-title">مع الأصدقاء</h1>
          <p className="setup-subtitle">العب مع أصدقائك وتنافس معهم</p>

          <div className="setup-content">
            {/* Difficulty Selection */}
            <div className="difficulty-section">
              <label className="difficulty-label">نوع الأسئلة:</label>
              <div className="difficulty-buttons">
                <button
                  className={`difficulty-btn ${difficulty === 'riddles' ? 'active' : ''}`}
                  onClick={() => setDifficulty('riddles')}
                >
                  🎭 ألغاز فقط
                </button>
                <button
                  className={`difficulty-btn ${difficulty === 'amtila' ? 'active' : ''}`}
                  onClick={() => setDifficulty('amtila')}
                >
                  📖 أمثال فقط
                </button>
                <button
                  className={`difficulty-btn ${difficulty === 'mixed' ? 'active' : ''}`}
                  onClick={() => setDifficulty('mixed')}
                >
                  🎪 مختلط
                </button>
              </div>
            </div>

            {/* Player Count Selection */}
            <div className="player-count-section">
              <label className="player-label">عدد اللاعبين:</label>
              <div className="count-buttons">
                {[2, 3, 4, 5, 6].map((count) => (
                  <button
                    key={count}
                    className={`count-btn ${playerCount === count ? 'active' : ''}`}
                    onClick={() => setPlayerCount(count)}
                  >
                    {count}
                  </button>
                ))}
              </div>
            </div>

            {/* Player Names Input */}
            <div className="player-names-section">
              <label className="names-label">أسماء اللاعبين:</label>
              <div className="names-grid">
                {Array(playerCount).fill(null).map((_, i) => (
                  <input
                    key={i}
                    type="text"
                    placeholder={`اسم اللاعب ${i + 1}`}
                    className="player-name-input"
                    onChange={(e) => handlePlayerNameChange(i, e.target.value)}
                  />
                ))}
              </div>
            </div>

            {/* Start Button */}
            <button
              className="btn-start-game"
              onClick={handleStartGame}
            >
              <span className="btn-icon">🎮</span>
              <span>ابدأ اللعبة</span>
            </button>
          </div>

          {/* Back Button */}
          <button 
            className="btn-setup-back"
            onClick={() => navigateTo('home')}
          >
            ← رجوع
          </button>
        </div>
      </div>
    )
  }

  // Game in Progress
  const currentPlayer = players[currentPlayerIndex]
  const currentQuestionData = questions[currentQuestion]

  return (
    <div className="multiplayer-game">
      {/* Header */}
      <div className="multiplayer-header">
        <div className="turn-info">
          <p className="turn-text">دور اللاعب:</p>
          <p className="current-player">{currentPlayer.name}</p>
        </div>
        <div className="question-progress">
          <p className="progress-text">{currentQuestion + 1}/{questions.length}</p>
        </div>
        <div className="timer-info">
          <p className="timer-text">⏱️ {timeLeft}ث</p>
        </div>
      </div>

      {/* Scoreboard */}
      <div className="scoreboard">
        {players.map((player, index) => (
          <div
            key={player.id}
            className={`player-score-card ${currentPlayerIndex === index ? 'active' : ''}`}
          >
            <span className="player-rank">{index + 1}</span>
            <span className="player-name-score">{player.name}</span>
            <span className="score-value">{player.score}</span>
          </div>
        ))}
      </div>

      {/* Question */}
      <div className="multiplayer-question">
        <h2 className="question-text">{currentQuestionData.question}</h2>
      </div>

      {/* Answers */}
      <div className="answers-grid">
        {currentQuestionData.answers.map((answer, index) => (
          <button
            key={index}
            className={`answer-button ${
              answered && index === currentQuestionData.correctIndex
                ? 'correct'
                : answered && index === selectedAnswer && selectedAnswer !== currentQuestionData.correctIndex
                ? 'incorrect'
                : ''
            }`}
            onClick={() => handleAnswerClick(index)}
            disabled={answered}
          >
            {answer}
          </button>
        ))}
      </div>

      {/* Next Turn Button */}
      {answered && (
        <button className="btn-next-turn" onClick={handleNextTurn}>
          الدور التالي
        </button>
      )}

      {/* Exit Button */}
      <button 
        className="btn-exit-multiplayer"
        onClick={() => navigateTo('home')}
      >
        خروج
      </button>
    </div>
  )
}

export default FriendsMode
