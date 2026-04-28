import { useState } from 'react'
import Hero from './components/Hero/Hero'
import Header from './components/Header/Header'
import HeroTitle from './components/HeroTitle/HeroTitle'
import GlassNav from './components/GlassNav/GlassNav'
import ScrollStack from './components/ScrollStack/ScrollStack'
import FooterPanel from './components/FooterPanel/FooterPanel'

const App = () => {
  const [activeIndex, setActiveIndex] = useState(-1)
  const [showFooter, setShowFooter] = useState(false)

  const handleSearchClick = () => {
    setActiveIndex(2) // Переход на 3-й блок (Поиск туров)
  }

  const handleHomeClick = () => {
    setActiveIndex(-1) // Закрываем все блоки
    setShowFooter(false) // Закрываем футер, если открыт
  }

  return (
    <>
      <Hero />
      <Header onSearchClick={handleSearchClick} />
      <HeroTitle hidden={activeIndex >= 0} />
      <ScrollStack
        activeIndex={activeIndex}
        onActiveIndexChange={setActiveIndex}
        onActiveChange={setActiveIndex}
      />
      <GlassNav
        onContactsClick={() => setShowFooter(true)}
        onHomeClick={handleHomeClick}
      />
      <FooterPanel show={showFooter} onClose={() => setShowFooter(false)} />
    </>
  )
}

export default App