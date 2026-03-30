import { useEffect, useRef, useState } from 'react';
import Header from './components/Header';
import TourvisorSearch from './components/TourvisorSearch';
import AdvantagesCarousel from './components/AdvantagesCarousel';
import PopularDestinations from './components/PopularDestinations';
import Footer from './components/Footer';
import './App.css';

function App() {
  const blocksRef = useRef([]);
  const currentBlockRef = useRef(0);
  const isScrollingRef = useRef(false);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [currentCountry, setCurrentCountry] = useState(0);
  const [showFooter, setShowFooter] = useState(false);
  const [activeBlock, setActiveBlock] = useState(0);

  const scrollToBlock = (index) => {
    blocksRef.current[index]?.scrollIntoView({ behavior: 'smooth' });
    currentBlockRef.current = index;
    setActiveBlock(index);
    setShowFooter(index === 2);
  };

  useEffect(() => {
    const handleWheel = (e) => {
      if (isSearchActive) return;
      if (isScrollingRef.current) return;
      
      const totalBlocks = 3;
      
      if (e.deltaY > 0 && currentBlockRef.current < totalBlocks - 1) {
        isScrollingRef.current = true;
        scrollToBlock(currentBlockRef.current + 1);
        setTimeout(() => {
          isScrollingRef.current = false;
        }, 800);
      } 
      else if (e.deltaY < 0 && currentBlockRef.current > 0) {
        isScrollingRef.current = true;
        scrollToBlock(currentBlockRef.current - 1);
        setTimeout(() => {
          isScrollingRef.current = false;
        }, 800);
      }
    };

    window.addEventListener('wheel', handleWheel);
    return () => window.removeEventListener('wheel', handleWheel);
  }, [isSearchActive]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = blocksRef.current.findIndex(block => block === entry.target);
          if (index !== -1) {
            setActiveBlock(index);
            setShowFooter(index === 2);
          }
        }
      });
    }, { threshold: 0.5 });

    blocksRef.current.forEach(block => {
      if (block) observer.observe(block);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Header hideApplicationBtn={activeBlock === 1} />
      <div className="app">
        <div 
          className="block block-1"
          ref={el => blocksRef.current[0] = el}
        >
          <div className="block-content">
            <PopularDestinations onCountryChange={setCurrentCountry} />
          </div>
        </div>

        <div 
          className="block block-2"
          ref={el => blocksRef.current[1] = el}
        >
          <AdvantagesCarousel currentCountry={currentCountry} />
        </div>

        <div 
          className="block block-3"
          ref={el => blocksRef.current[2] = el}
        >
          <TourvisorSearch 
            currentCountry={currentCountry}
            onSearchActive={setIsSearchActive} 
          />
        </div>
      </div>
      <Footer show={showFooter} />
    </>
  );
}

export default App;