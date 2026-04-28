import styles from './PopularTours.module.css'

const BASE_URL = import.meta.env.BASE_URL

const tours = [
  {
    id: 1,
    country: 'Таиланд',
    description: 'Райские пляжи, древние храмы и экзотическая кухня',
    image: 'images/Tai.webp',
  },
  {
    id: 2,
    country: 'Китай',
    description: 'Великая стена, небоскрёбы Шанхая и чайные плантации',
    image: 'images/china.webp',
  },
  {
    id: 3,
    country: 'Египет',
    description: 'Пирамиды, Красное море и загадки древней цивилизации',
    image: 'images/Egypt.webp',
  },
]

const PopularTours = ({ onTourSelect }) => {
  return (
    <div className={styles.grid}>
      {tours.map((tour) => (
        <div key={tour.id} className={styles.card}>
          <img
            src={`${BASE_URL}${tour.image}`}
            alt={tour.country}
            className={styles.image}
          />
          <div className={styles.overlay} />
          <div className={styles.info}>
            <h3 className={styles.country}>{tour.country}</h3>
            <p className={styles.description}>{tour.description}</p>
            <button
              className={styles.button}
              onClick={() => onTourSelect?.(tour.country)}
            >
              Полететь
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