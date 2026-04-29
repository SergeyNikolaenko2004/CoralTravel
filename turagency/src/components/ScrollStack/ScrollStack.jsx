import { useEffect, useCallback, useRef } from 'react'
import styles from './ScrollStack.module.css'
import PopularTours from '../PopularTours/PopularTours'
import Advantages from '../Advantages/Advantages'
import SearchTours from '../SearchTours/SearchTours'

const tabs = [
  { id: 1, label: 'Популярные туры' },
  { id: 2, label: 'Наши преимущества' },
  { id: 3, label: 'Поиск туров' },
]

const ScrollStack = ({ activeIndex, onActiveIndexChange, onActiveChange, showAbout }) => {
  const contentRefs = useRef([])
  const isTransitioning = useRef(false)

  const canScrollDown = (index) => {
    const el = contentRefs.current[index]
    if (!el) return false
    return el.scrollTop + el.clientHeight < el.scrollHeight - 2
  }

  const canScrollUp = (index) => {
    const el = contentRefs.current[index]
    if (!el) return false
    return el.scrollTop > 2
  }

  const goTo = useCallback((index) => {
    if (isTransitioning.current) return
    isTransitioning.current = true
    onActiveIndexChange?.(index)
    onActiveChange?.(index)
    setTimeout(() => {
      isTransitioning.current = false
    }, 650)
  }, [onActiveChange, onActiveIndexChange])

  const handleWheel = useCallback((e) => {
    // Если открыт блок "О нас" — не переключаем скролл-блоки
    if (showAbout) return;

    if (e.deltaY > 0) {
      if (activeIndex < 0) {
        e.preventDefault()
        goTo(0)
      } else if (canScrollDown(activeIndex)) {
        return
      } else if (activeIndex < tabs.length - 1) {
        e.preventDefault()
        goTo(activeIndex + 1)
      }
    } else {
      if (activeIndex >= 0 && canScrollUp(activeIndex)) {
        return
      } else if (activeIndex >= 0) {
        e.preventDefault()
        goTo(activeIndex - 1)
      }
    }
  }, [activeIndex, goTo, showAbout])

  const touchStartY = useRef(0)

  const handleTouchStart = useCallback((e) => {
    touchStartY.current = e.touches[0].clientY
  }, [])

  const handleTouchEnd = useCallback((e) => {
    // Если открыт блок "О нас" — не переключаем
    if (showAbout) return;

    const deltaY = touchStartY.current - e.changedTouches[0].clientY
    const absDelta = Math.abs(deltaY)

    if (absDelta < 30) return

    if (deltaY > 0) {
      if (activeIndex < 0) {
        goTo(0)
      } else if (!canScrollDown(activeIndex) && activeIndex < tabs.length - 1) {
        goTo(activeIndex + 1)
      }
    } else {
      if (activeIndex >= 0 && !canScrollUp(activeIndex)) {
        goTo(activeIndex - 1)
      }
    }
  }, [activeIndex, goTo, showAbout])

  useEffect(() => {
    window.addEventListener('wheel', handleWheel, { passive: false })
    window.addEventListener('touchstart', handleTouchStart, { passive: false })
    window.addEventListener('touchend', handleTouchEnd, { passive: false })
    return () => {
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchend', handleTouchEnd)
    }
  }, [handleWheel, handleTouchStart, handleTouchEnd])

  const handleLabelClick = (index) => {
    goTo(index)
  }

  const handleTourSelect = (country) => {
    goTo(2)
  }

  return (
    <div className={styles.container}>
      {/* Закладки для скролл-блоков */}
      <div className={styles.labelsRow}>
        {tabs.map((tab, index) => (
          index <= activeIndex && (
            <div
              key={tab.id}
              className={`${styles.label} ${index < activeIndex ? styles.labelClickable : ''} ${index === activeIndex ? styles.labelActive : ''}`}
              onClick={() => index < activeIndex && handleLabelClick(index)}
              role="button"
              tabIndex={0}
            >
              {tab.label}
            </div>
          )
        ))}
      </div>

      {/* Скролл-блоки */}
      {tabs.map((tab, index) => {
        const isVisible = index <= activeIndex

        return (
          <div
            key={tab.id}
            className={`${styles.tab} ${isVisible ? styles.visible : ''}`}
            style={{ zIndex: index + 1 }}
          >
            <div
              className={styles.content}
              ref={(el) => (contentRefs.current[index] = el)}
            >
              {index === 0 && <PopularTours onTourSelect={handleTourSelect} />}
              {index === 1 && <Advantages />}
              {index === 2 && <SearchTours />}
            </div>
          </div>
        )
      })}

      {/* Блок "О нас" — отдельно, не скроллится */}
      <div
        className={`${styles.tab} ${styles.aboutTab} ${showAbout ? styles.visible : ''}`}
        style={{ zIndex: 10 }}
      >
        <div className={styles.content}>
          <h2 style={{ color: '#fff', paddingTop: '50px' }}>О нас</h2>
          <p style={{ color: '#fff', paddingTop: '25px' }}>Информация о компании</p>
        </div>
      </div>
    </div>
  )
}

export default ScrollStack