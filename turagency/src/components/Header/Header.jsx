import styles from './Header.module.css'

const BASE_URL = import.meta.env.BASE_URL

const Header = ({ onSearchClick, onLogoClick }) => {
  return (
    <header className={styles.header}>
      {/* Логотип слева */}
      <div className={styles.logo} onClick={onLogoClick} style={{ cursor: 'pointer' }}>
        <img src={`${BASE_URL}CoralTravel.png`} alt="CoralTravel" />
      </div>

      {/* Правая часть */}
      <div className={styles.right}>
        <div className={styles.socials}>
          {/* Telegram */}
          <a href="https://t.me/irkcoral" className={styles.socialIcon} aria-label="Telegram">
            <img 
              src={`${BASE_URL}images/telegram.png`} 
              alt="Telegram" 
              className={styles.socialIconImg} 
            />
          </a>

          {/* Instagram */}
          <a href="https://www.instagram.com/coral_travelirk" className={styles.socialIcon} aria-label="Instagram">
            <img 
              src={`${BASE_URL}images/instagram.png`} 
              alt="Instagram" 
              className={styles.socialIconImg} 
            />
          </a>

          {/* Max */}
          <a href="https://max.ru/id381016235739_biz" className={styles.socialIcon} aria-label="Max">
            <img 
              src={`${BASE_URL}images/MaxLogo.png`} 
              alt="Max" 
              className={styles.socialIconImg} 
            />
          </a>
        </div>
        
        <button className={styles.searchBtn} onClick={onSearchClick}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <span>Найти туры</span>
        </button>
      </div>
    </header>
  )
}

export default Header