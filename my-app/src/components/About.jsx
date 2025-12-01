import './About.css'

function About({ navigateTo }) {
  return (
    <div className="about-container">
      {/* Header */}
      <div className="about-header">
        <h1 className="about-title">عن اللعبة</h1>
        <p className="about-subtitle">معلومات عن مشروعنا</p>
      </div>

      {/* Content Sections */}
      <div className="about-content">
        {/* Project Info */}
        <section className="about-section">
          <div className="section-icon">🎮</div>
          <h2 className="section-title">موهيم تْجاوْب</h2>
          <p className="section-text">
            لعبة ثقافية تفاعلية تختبر معرفتك بالثقافة المغربية الأصيلة والتراث الشعبي المغربي الغني.
          </p>
        </section>

        {/* Objective */}
        <section className="about-section">
          <div className="section-icon">🎯</div>
          <h2 className="section-title">الهدف</h2>
          <p className="section-text">
            توعية الجيل الجديد بالثقافة المغربية من خلال ألعاب تفاعلية ممتعة تجمع بين التعليم والترفيه.
            تعلم عن الألغاز التقليدية والأمثال الحكيمة والحكايات الشعبية المغربية.
          </p>
        </section>

        {/* Game Modes */}
        <section className="about-section">
          <div className="section-icon">🕹️</div>
          <h2 className="section-title">أنماط اللعب</h2>
          <div className="modes-list">
            <div className="mode-item">
              <span className="mode-icon">🧩</span>
              <span>ألغاز - حل الألغاز المغربية التقليدية</span>
            </div>
            <div className="mode-item">
              <span className="mode-icon">💬</span>
              <span>أمثال - اختبر معرفتك بالأمثال الشعبية</span>
            </div>
            <div className="mode-item">
              <span className="mode-icon">📖</span>
              <span>حكايات - استمع واستمتع بالحكايات التقليدية</span>
            </div>
            <div className="mode-item">
              <span className="mode-icon">👥</span>
              <span>مع الأصدقاء - لعب الوضع المتعدد مع أصدقائك</span>
            </div>
            <div className="mode-item">
              <span className="mode-icon">🎲</span>
              <span>مود عشوائي - أسئلة عشوائية من جميع الفئات</span>
            </div>
          </div>
        </section>

        {/* Institution Info */}
        <section className="about-section institution">
          <div className="institution-badge">
            <div className="badge-text">
              <p className="badge-title">OFPPT</p>
              <p className="badge-subtitle">Office de la Formation Professionnelle</p>
              <p className="badge-subtitle">et de la Promotion du Travail</p>
            </div>
            <div className="badge-divider"></div>
            <div className="badge-text">
              <p className="badge-title">ISTA NTIC</p>
              <p className="badge-subtitle">Institut Spécialisé de Technologie Appliquée</p>
              <p className="badge-subtitle">Nouvelles Technologies de l'Information et de la Communication</p>
            </div>
          </div>
          <p className="institution-description">
            هذا المشروع تم تطويره كجزء من برنامج التكوين المهني بمعهد الدراسات التقنية المتخصصة.
            يهدف المشروع إلى دمج التكنولوجيا مع الثقافة المغربية لخلق تجربة تعليمية فريدة.
          </p>
        </section>

        {/* Developer */}
        <section className="about-section">
          <div className="section-icon">👨‍💻</div>
          <h2 className="section-title">المطور</h2>
          <p className="section-text">
            تم تطوير هذه اللعبة بواسطة فريق مخصص يعمل على نشر الثقافة المغربية من خلال التكنولوجيا.
          </p>
        </section>

        {/* Technologies */}
        <section className="about-section">
          <div className="section-icon">⚙️</div>
          <h2 className="section-title">التقنيات المستخدمة</h2>
          <div className="tech-grid">
            <div className="tech-item">React</div>
            <div className="tech-item">Vite</div>
            <div className="tech-item">CSS3</div>
            <div className="tech-item">JavaScript</div>
          </div>
        </section>

        {/* Cultural Note */}
        <section className="about-section cultural">
          <p className="cultural-text">
            "الثقافة هي هويتنا وتراثنا الغني الذي يجب أن ننقله إلى الأجيال القادمة 🇲🇦"
          </p>
        </section>
      </div>

      {/* Navigation */}
      <div className="about-footer">
        <button 
          className="btn-back"
          onClick={() => navigateTo('home')}
        >
          ← الرجوع إلى الرئيسية
        </button>
      </div>
    </div>
  )
}

export default About
