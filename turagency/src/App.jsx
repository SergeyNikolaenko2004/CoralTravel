import { useEffect, useRef, useState } from 'react';
import TourvisorSearch from './components/TourvisorSearch';
import AdvantagesCarousel from './components/AdvantagesCarousel';
import './App.css';

function App() {
  const blocksRef = useRef([]);
  const currentBlockRef = useRef(0);
  const isScrollingRef = useRef(false);
  const [isSearchActive, setIsSearchActive] = useState(false);

  const scrollToBlock = (index) => {
    blocksRef.current[index]?.scrollIntoView({ behavior: 'smooth' });
    currentBlockRef.current = index;
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

  return (
    <div className="app">
      {/* Блок 1 */}
      <div 
        className="block block-1"
        ref={el => blocksRef.current[0] = el}
      >
        <div className="block-content">
          <h1>Добро пожаловать в Coral Travel</h1>
          <p>Откройте для себя лучшие туры</p>
        </div>
      </div>

      {/* Блок 2 - Карусель преимуществ */}
      <div 
        className="block block-2"
        ref={el => blocksRef.current[1] = el}
      >
        <div className="block-content">
          <h1>Наши преимущества</h1>
          <AdvantagesCarousel />
        </div>
      </div>

      {/* Блок 3 */}
      <div 
        className="block block-3"
        ref={el => blocksRef.current[2] = el}
      >
        <div className="block-content">
          <h1>Найдите свой идеальный тур</h1>
          <TourvisorSearch onSearchActive={setIsSearchActive} />
        </div>
      </div>
    </div>
  );
}

export default App;