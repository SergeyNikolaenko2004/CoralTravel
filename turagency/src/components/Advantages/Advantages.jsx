import styles from './Advantages.module.css'

const advantages = [
  { id: 1 },
  { id: 2 },
  { id: 3 },
  { id: 4 },
  { id: 5 },
  { id: 6 }
]

const Advantages = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.grid}>
        {advantages.map((item) => (
          <div key={item.id} className={styles.card}>
            <div className={styles.iconPlaceholder}>
              Ваше фото/иконка
            </div>
            <div className={styles.textWrapper}>
              <h3 className={styles.title}>Название преимущества</h3>
            </div>
            <p className={styles.description}>Описание преимущества</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Advantages