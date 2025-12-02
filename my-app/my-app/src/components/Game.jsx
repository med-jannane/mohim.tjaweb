import { useState, useEffect } from 'react'
import './Game.css'
import db from '../db.json'

function Game({ navigateTo, selectedCategory, setGameScore }) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [answered, setAnswered] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [isCorrect, setIsCorrect] = useState(false)

  // Load questions from src/db.json when possible
  const buildQuestions = () => {
    const id = selectedCategory?.id
    if (!id) return []

    if (id === 'alghaz') {
      return (db.riddles || []).map(r => ({
        type: 'riddle',
        question: r.question,
        answer: r.answer,
        choices: r.choices
      }))
    }

    if (id === 'amthal' || id === 'amtila') {
      return (db.amtila || []).map(a => ({
        type: 'amthal',
        start: a.start,
        choices: a.choices,
        answer: a.answer
      }))
    }

    if (id === 'moderandom') {
      const r = (db.riddles || []).slice()
      const a = (db.amtila || []).slice()
      const mixed = []
      r.forEach(it => mixed.push({ type: 'riddle', question: it.question, answer: it.answer }))
      a.forEach(it => mixed.push({ type: 'amthal', start: it.start, choices: it.choices, answer: it.answer }))
      return mixed
    }

    // fallback to some simple fun questions
    return [
      { type: 'mcq', question: 'كم عدد أرجل الدجاجة؟', answers: ['2', '3', '4', '6'], correctIndex: 0 },
      { type: 'mcq', question: 'ماذا يأكل الأسد؟', answers: ['اللحم', 'العشب', 'الثمار', 'الحبوب'], correctIndex: 0 }
    ]
  }

  const questions = buildQuestions()

  useEffect(() => {
    if (currentQuestion >= questions.length) {
      // اللعبة انتهت
      setGameScore(score)
      setTimeout(() => {
        navigateTo('results')
      }, 1000)
    }
  }, [currentQuestion])

  const handleAnswerClick = (index) => {
    if (answered) return

    setSelectedAnswer(index)
    setAnswered(true)
    const correct = index === questions[currentQuestion].correctIndex
    setIsCorrect(correct)

    if (correct) {
      setScore(score + 10)
    }
  }

  const handleNextQuestion = () => {
    setCurrentQuestion(currentQuestion + 1)
    setSelectedAnswer(null)
    setAnswered(false)
    setIsCorrect(false)
  }

  if (currentQuestion >= questions.length) {
    return null
  }

  const question = questions[currentQuestion]
  const progress = ((currentQuestion + 1) / questions.length) * 100

  return (
    <div className="game-container">
      {/* Header */}
      <div className="game-header">
        <div className="header-left">
          <span className="category-badge">{selectedCategory?.name}</span>
        </div>
        <div className="header-center">
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="progress-text">{currentQuestion + 1}/{questions.length}</p>
        </div>
        <div className="header-right">
          <span className="score-badge">النقاط: {score}</span>
        </div>
      </div>

      {/* Main Game Area */}
      <div className="game-main">
        {/* Question */}
        {question?.type === 'riddle' && (
          <div className="question-section">
            <h2 className="question-text">{question.question}</h2>
            <p className="question-number">السؤال #{currentQuestion + 1}</p>
            <div className="choices-grid">
              {question.choices && question.choices.map((choice, index) => (
                <button
                  key={index}
                  className={`choice-button ${
                    answered && choice === question.answer
                      ? 'correct'
                      : answered && choice === selectedAnswer && choice !== question.answer
                      ? 'incorrect'
                      : answered && choice === selectedAnswer
                      ? 'selected'
                      : ''
                  }`}
                  onClick={() => {
                    if (!answered) {
                      setSelectedAnswer(choice)
                      setAnswered(true)
                      const correct = choice === question.answer
                      setIsCorrect(correct)
                      if (correct) {
                        setScore(prev => prev + 10)
                      }
                    }
                  }}
                  disabled={answered}
                >
                  <span className="choice-text">{choice}</span>
                </button>
              ))}
            </div>
            {answered && (
              <div className={`feedback ${isCorrect ? 'correct' : 'incorrect'}`}>
                <p className="feedback-text">
                  {isCorrect ? 'ممتاز! إجابة صحيحة 🎉' : `الإجابة الصحيحة: ${question.answer}`}
                </p>
              </div>
            )}
          </div>
        )}

        {question?.type === 'amthal' && (
          <div className="question-section">
            <h2 className="question-text">{question.start} ...</h2>
            <p className="question-number">اختر الإكمال الصحيح #{currentQuestion + 1}</p>
            <div className="choices-grid">
              {question.choices && question.choices.map((choice, index) => (
                <button
                  key={index}
                  className={`choice-button ${
                    answered && choice === question.answer
                      ? 'correct'
                      : answered && choice === selectedAnswer && choice !== question.answer
                      ? 'incorrect'
                      : answered && choice === selectedAnswer
                      ? 'selected'
                      : ''
                  }`}
                  onClick={() => {
                    if (!answered) {
                      setSelectedAnswer(choice)
                      setAnswered(true)
                      const correct = choice === question.answer
                      setIsCorrect(correct)
                      if (correct) {
                        setScore(prev => prev + 10)
                      }
                    }
                  }}
                  disabled={answered}
                >
                  <span className="choice-text">{choice}</span>
                </button>
              ))}
            </div>
            {answered && (
              <div className={`feedback ${isCorrect ? 'correct' : 'incorrect'}`}>
                <p className="feedback-text">
                  {isCorrect ? 'ممتاز! إجابة صحيحة 🎉' : `الإجابة الصحيحة: ${question.answer}`}
                </p>
              </div>
            )}
          </div>
        )}

        {question?.type === 'mcq' && (
          <div>
            <div className="question-section">
              <h2 className="question-text">{question.question}</h2>
              <p className="question-number">السؤال #{currentQuestion + 1}</p>
            </div>
            <div className="answers-grid">
              {question.answers.map((answer, index) => (
                <button
                  key={index}
                  className={`answer-button ${
                    answered && index === question.correctIndex
                      ? 'correct'
                      : answered && index === selectedAnswer && !isCorrect
                      ? 'incorrect'
                      : answered && index === selectedAnswer
                      ? 'selected'
                      : ''
                  }`}
                  onClick={() => handleAnswerClick(index)}
                  disabled={answered}
                >
                  <span className="answer-letter">{String.fromCharCode(65 + index)}</span>
                  <span className="answer-text">{answer}</span>
                </button>
              ))}
            </div>

            {answered && (
              <div className={`feedback ${isCorrect ? 'correct' : 'incorrect'}`}>
                <p className="feedback-text">
                  {isCorrect ? 'إجابة صحيحة! ممتاز! 🎉' : 'إجابة خاطئة. حاول مرة أخرى! 💪'}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Next Button */}
        {answered && (
          <button
            className="btn-next"
            onClick={handleNextQuestion}
          >
            {currentQuestion + 1 === questions.length ? 'انتهي اللعبة' : 'السؤال التالي'}
          </button>
        )}
      </div>

      {/* Exit Button */}
      <button 
        className="btn-exit"
        onClick={() => navigateTo('home')}
      >
        ✕ خروج
      </button>
    </div>
  )
}

export default Game
