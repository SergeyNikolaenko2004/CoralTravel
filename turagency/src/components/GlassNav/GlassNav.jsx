import styles from './GlassNav.module.css'

const navItems = [
  { label: 'Главная', path: '/' },
  { label: 'Розыгрыши', path: '/giveaways' },
  { label: 'О нас', path: '/about' },
  { label: 'Контакты', path: '/contacts' },
]

const GlassNav = ({ onContactsClick, onHomeClick }) => {
  return (
    <nav className={styles.nav}>
      {navItems.map((item) => (
        <button
          key={item.label}
          className={styles.navBtn}
          onClick={() => {
            if (item.label === 'Контакты') {
              onContactsClick?.()
            }
            if (item.label === 'Главная') {
              onHomeClick?.()
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