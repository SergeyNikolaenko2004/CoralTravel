import styles from './GlassNav.module.css'

const navItems = [
  { label: 'Популярные туры', action: 'tours' },
  { label: 'Преимущества', action: 'advantages' },
  { label: 'О нас', action: 'about' },
  { label: 'Контакты', action: 'contacts' },
]

const GlassNav = ({ onContactsClick, onHomeClick, onNavClick }) => {
  return (
    <nav className={styles.nav}>
      {navItems.map((item) => (
        <button
          key={item.label}
          className={styles.navBtn}
          onClick={() => {
            if (item.action === 'contacts') {
              onContactsClick?.()
            } else {
              onNavClick?.(item.action)
            }
          }}
        >
          {item.label}
        </button>
      ))}
    </nav>
  )
}

export default GlassNav