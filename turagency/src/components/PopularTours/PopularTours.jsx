import styles from './PopularTours.module.css'

const tours = [
  { id: 1 },
  { id: 2 },
  { id: 3 },
  { id: 4 },
  { id: 5 },
  { id: 6 }
]

const PopularTours = ({ onTourSelect }) => {
  return (
    <div className={styles.grid}>
      {tours.map((tour) => (
        <div key={tour.id} className={styles.card}>
          <div className={styles.imagePlaceholder}>Здесь будет фото страны</div>
          <div className={styles.overlay} />
          <div className={styles.info}>
            <h3 className={styles.country}>Название страны</h3>
            <p className={styles.description}>Описание страны</p>
            <button
              className={styles.button}
              onClick={() => onTourSelect?.('страна')}
            >
              Кнопка "Перейти"
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default PopularTours