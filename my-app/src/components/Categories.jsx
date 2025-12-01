import { useState } from 'react'
import './Categories.css'

function Categories({ navigateTo, setGameMode, setSelectedCategory }) {
  const [selectedCat, setSelectedCat] = useState(null)

  const categories = [
    {
      id: 'alghaz',
      name: 'ألغاز',
      englishName: 'Alghaz',
      icon: '🧩',
      description: 'حل الألغاز التقليدية المغربية',
      color: 'cat-alghaz'
    },
    {
      id: 'amthal',
      name: 'أمثال',
      englishName: 'Amthal',
      icon: '💬',
      description: 'اختبر معرفتك بالأمثال المغربية',
      color: 'cat-amthal'
    },
    {
      id: 'moderandom',
      name: 'مود عشوائي',
      englishName: 'Mode Random',
      icon: '🎲',
      description: 'أسئلة عشوائية من جميع الفئات',
      color: 'cat-moderandom'
    }
  ]

  const handleCategorySelect = (category) => {
    setSelectedCat(category.id)
    setSelectedCategory(category)
    setTimeout(() => {
      navigateTo('game')
    }, 300)
  }

  return (
    <div className="categories-container">
      {/* Header */}
      <div className="categories-header">
        <h2 className="categories-title">اختر الفئة</h2>
        <p className="categories-subtitle">اختر نوع اللعبة المفضلة لديك</p>
      </div>

      {/* Categories Grid */}
      <div className="categories-grid">
        {categories.map((category) => (
          <div
            key={category.id}
            className={`category-card ${category.color} ${selectedCat === category.id ? 'selected' : ''}`}
            onClick={() => handleCategorySelect(category)}
          >
            <div className="card-icon-large">{category.icon}</div>
            <h3 className="card-name">{category.name}</h3>
            <p className="card-english">{category.englishName}</p>
            <p className="card-desc">{category.description}</p>
            <div className="card-action">
              <span className="action-text">اختر →</span>
            </div>
          </div>
        ))}
      </div>

      {/* Back Button */}
      <div className="categories-footer">
        <button 
          className="btn-back"
          onClick={() => navigateTo('home')}
        >
          ← رجوع
        </button>
      </div>
    </div>
  )
}

export default Categories
