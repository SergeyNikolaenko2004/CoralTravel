import styles from './Advantages.module.css'

const advantages = [
  {
    id: 1,
    title: 'Бонусная система',
    description: 'Приветственные, подарочные и накопительные бонусы от каждого путешествия.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M20 12v8a2 2 0 01-2 2H6a2 2 0 01-2-2v-8" />
        <path d="M22 7H2v5h20V7z" />
        <path d="M12 22v-7" />
        <path d="M12 2l3 5h-6l3-5z" />
        <circle cx="8" cy="12" r="1" fill="currentColor" stroke="none" />
        <circle cx="16" cy="12" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    id: 2,
    title: 'Розыгрыши и викторины',
    description: 'Каждые выходные на наших каналах — призы с доставкой победителям.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10" />
        <polygon points="12,6 14.5,10.5 19,11 15.5,14.5 16.5,19.5 12,17 7.5,19.5 8.5,14.5 5,11 9.5,10.5" fill="currentColor" stroke="none" opacity="0.3" />
        <polygon points="12,6 14.5,10.5 19,11 15.5,14.5 16.5,19.5 12,17 7.5,19.5 8.5,14.5 5,11 9.5,10.5" />
      </svg>
    ),
  },
  {
    id: 3,
    title: 'Насыщенный контент',
    description: 'Рекламные обзоры, полезная информация и развлечения в наших соцсетях.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="3" width="20" height="18" rx="3" />
        <circle cx="8" cy="9" r="2" />
        <path d="M2 15l4-4 3 3 5-5 4 4" />
      </svg>
    ),
  },
  {
    id: 4,
    title: 'Подарок при покупке',
    description: 'Никто не уходит без подарка — каждому туристу приятный бонус.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="8" width="18" height="13" rx="2" />
        <path d="M12 8V3" />
        <path d="M8 3h8" />
        <path d="M16 3l-4 5-4-5" />
        <circle cx="12" cy="14" r="2" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    id: 5,
    title: 'Конкурсы для подписчиков',
    description: 'Праздничные акции и вовлекающие конкурсы для будущих путешественников.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2l3 6 6.5 1-4.5 4.5 1 6.5-6-3-6 3 1-6.5L2.5 9 9 8z" fill="currentColor" stroke="none" opacity="0.3" />
        <path d="M12 2l3 6 6.5 1-4.5 4.5 1 6.5-6-3-6 3 1-6.5L2.5 9 9 8z" />
      </svg>
    ),
  },
]

const Advantages = () => {
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.heading}>Почему выбирают нас</h2>
      <div className={styles.grid}>
        {advantages.map((item) => (
          <div key={item.id} className={styles.card}>
            <div className={styles.iconWrapper}>
              {item.icon}
            </div>
            <div className={styles.textWrapper}>
              <span className={styles.number}>{item.id}</span>
              <h3 className={styles.title}>{item.title}</h3>
            </div>
            <p className={styles.description}>{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Advantages