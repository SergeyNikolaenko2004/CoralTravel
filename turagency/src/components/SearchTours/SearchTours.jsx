import styles from './SearchTours.module.css'

const BASE_URL = import.meta.env.BASE_URL

const SearchTours = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.imageWrapper}>
        <img
          src={`${BASE_URL}images/Entr.png`}
          alt="Поиск туров"
          className={styles.image}
        />
      </div>
    </div>
  )
}

export default SearchTours