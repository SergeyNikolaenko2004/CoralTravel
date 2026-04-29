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
  const [showAbout, setShowAbout] = useState(false)

  const handleHomeClick = () => {
    setActiveIndex(-1)
    setShowFooter(false)
    setShowAbout(false)
  }

  const handleSearchClick = () => {
    setActiveIndex(2)
    setShowAbout(false)
  }

  const handleNavClick = (action) => {
    setShowFooter(false)
    if (action === 'tours') {
      setActiveIndex(0)
      setShowAbout(false)
    } else if (action === 'advantages') {
      setActiveIndex(1)
      setShowAbout(false)
    } else if (action === 'about') {
      setActiveIndex(-1)
      setShowAbout(prev => !prev)
    }
  }

  return (
    <>
      <Hero />
      <Header 
        onSearchClick={handleSearchClick} 
        onLogoClick={handleHomeClick} 
      />
      <HeroTitle hidden={activeIndex >= 0 || showAbout} />
      <ScrollStack
        activeIndex={activeIndex}
        onActiveIndexChange={setActiveIndex}
        onActiveChange={setActiveIndex}
        showAbout={showAbout}
      />
      <GlassNav
        onContactsClick={() => {
          setShowFooter(true)
          setShowAbout(false)
        }}
        onNavClick={handleNavClick}
      />
      <FooterPanel show={showFooter} onClose={() => setShowFooter(false)} />
    </>
  )
}

export default App