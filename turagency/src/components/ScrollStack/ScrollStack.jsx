import { useEffect, useCallback, useRef } from 'react'
import styles from './ScrollStack.module.css'
import PopularTours from '../PopularTours/PopularTours'
import Advantages from '../Advantages/Advantages'

const tabs = [
  { id: 1, label: 'Популярные туры' },
  { id: 2, label: 'Наши преимущества' },
  { id: 3, label: 'Поиск туров' },
]

const ScrollStack = ({ activeIndex, onActiveIndexChange, onActiveChange }) => {
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
    // Скролл вниз
    if (e.deltaY > 0) {
      if (activeIndex < 0) {
        // Нет активных блоков — открываем первый
        e.preventDefault()
        goTo(0)
      } else if (canScrollDown(activeIndex)) {
        // Есть куда скроллить внутри — не мешаем
        return
      } else if (activeIndex < tabs.length - 1) {
        // Дошли до конца — переключаем блок
        e.preventDefault()
        goTo(activeIndex + 1)
      }
    }
    // Скролл вверх
    else {
      if (activeIndex >= 0 && canScrollUp(activeIndex)) {
        // Есть куда скроллить вверх внутри — не мешаем
        return
      } else if (activeIndex >= 0) {
        e.preventDefault()
        goTo(activeIndex - 1)
      }
    }
  }, [activeIndex, goTo])

  // Свайпы для мобильных
  const touchStartY = useRef(0)

  const handleTouchStart = useCallback((e) => {
    touchStartY.current = e.touches[0].clientY
  }, [])

  const handleTouchEnd = useCallback((e) => {
    const deltaY = touchStartY.current - e.changedTouches[0].clientY
    const absDelta = Math.abs(deltaY)

    if (absDelta < 30) return // слишком короткий свайп

    if (deltaY > 0) {
      // Свайп вверх (хотим следующий блок)
      if (activeIndex < 0) {
        goTo(0)
      } else if (!canScrollDown(activeIndex) && activeIndex < tabs.length - 1) {
        goTo(activeIndex + 1)
      }
    } else {
      // Свайп вниз (хотим предыдущий блок)
      if (activeIndex >= 0 && !canScrollUp(activeIndex)) {
        goTo(activeIndex - 1)
      }
    }
  }, [activeIndex, goTo])

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
    console.log('Выбрана страна:', country)
  }

  return (
    <div className={styles.container}>
      {/* Слой с закладками */}
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

      {/* Блоки */}
      {tabs.map((tab, index) => {
        const isVisible = index <= activeIndex

        return (
            <div
              key={tab.id}
              className={`${styles.tab} ${isVisible ? styles.visible : ''}`}
              style={{
                zIndex: index + 1,
              }}
            >
            <div
              className={styles.content}
              ref={(el) => (contentRefs.current[index] = el)}
            >
              {index === 0 && <PopularTours onTourSelect={handleTourSelect} />}
              {index === 1 && <Advantages />}
              {index === 2 }
            </div>
          </div>
        )}
      )}
    </div>
  )
}

export default ScrollStack