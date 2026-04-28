import { useState, useEffect } from 'react'
import styles from './HeroTitle.module.css'

const HeroTitle = ({ hidden }) => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true)
    }, 1500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className={`${styles.wrapper} ${visible ? styles.visible : ''} ${hidden ? styles.hidden : ''}`}>
      <div className={styles.glass}>
        <h1 className={styles.title}>
          Самые дешёвые туры <span className={styles.accent}>в Иркутске</span>
        </h1>
        <p className={styles.subtitle}>
          Путешествуй по лучшим ценам с CoralTravel
        </p>
      </div>
    </div>
  )
}

export default HeroTitle