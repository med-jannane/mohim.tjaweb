import './NavButtons.css'

function NavButtons({ navigateTo }) {
  const goBack = () => {
    if (typeof navigateTo === 'function') return navigateTo('home')
    if (window && window.history) return window.history.back()
  }

  const handleExit = () => {
    const ok = window.confirm('هل تريد العودة إلى الشاشة الرئيسية؟')
    if (!ok) return
    if (typeof navigateTo === 'function') return navigateTo('home')
    window.location.href = '/'
  }

  return (
    <div className="nav-buttons">
      <button className="nav-btn nav-back" onClick={goBack} aria-label="رجوع">← رجوع</button>
      <button className="nav-btn nav-exit" onClick={handleExit} aria-label="خروج">✕ خروج</button>
    </div>
  )
}

export default NavButtons
