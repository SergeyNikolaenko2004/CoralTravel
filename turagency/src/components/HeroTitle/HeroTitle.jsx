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
        <h1 className={styles.title}>Пример текста</h1>
      </div>
    </div>
  )
}

export default HeroTitle