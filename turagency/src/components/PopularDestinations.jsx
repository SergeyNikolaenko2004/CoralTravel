import { useState, useRef } from 'react';
import './PopularDestinations.css';
import AngleImage from '/src/assets/Angle.png';

const destinations = [
  {
    id: 1,
    country: 'Таиланд',
    description: 'Экзотическая природа, буддийские храмы, изумрудное море, незабываемая кухня',
    backgroundImage: '/src/assets/BackGroundImageCountry/Tai.png'
  },
  {
    id: 2,
    country: 'Египет',
    description: 'Древние пирамиды, коралловые рифы, круглогодичное солнце и удивительное Красное море',
    backgroundImage: null
  },
  {
    id: 3,
    country: 'Китай',
    description: 'Великая стена, древняя культура, невероятная кухня и современные мегаполисы',
    backgroundImage: null
  }
];

function PopularDestinations({ onCountryChange }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalPages = destinations.length;
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const mouseStartX = useRef(0);
  const isDragging = useRef(false);

  const nextSlide = () => {
    const newIndex = (currentIndex + 1) % totalPages;
    setCurrentIndex(newIndex);
    onCountryChange(newIndex);
  };

  const prevSlide = () => {
    const newIndex = (currentIndex - 1 + totalPages) % totalPages;
    setCurrentIndex(newIndex);
    onCountryChange(newIndex);
  };

  const goToPage = (pageIndex) => {
    setCurrentIndex(pageIndex);
    onCountryChange(pageIndex);
  };

  const scrollToSearch = () => {
    const searchBlock = document.querySelector('.block-3');
    if (searchBlock) {
      searchBlock.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Обработчики для свайпов на мобильных
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const swipeDistance = touchEndX.current - touchStartX.current;
    const minSwipeDistance = 50;

    if (Math.abs(swipeDistance) > minSwipeDistance) {
      if (swipeDistance > 0) {
        prevSlide();
      } else {
        nextSlide();
      }
    }
    
    // Сброс
    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  // Обработчики для drag мышкой
  const handleMouseDown = (e) => {
    isDragging.current = true;
    mouseStartX.current = e.clientX;
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    const mouseEndX = e.clientX;
    const dragDistance = mouseEndX - mouseStartX.current;
    const minDragDistance = 50;

    if (Math.abs(dragDistance) > minDragDistance) {
      if (dragDistance > 0) {
        prevSlide();
      } else {
        nextSlide();
      }
      isDragging.current = false;
    }
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const currentDestination = destinations[currentIndex];

  const topSectionStyle = currentDestination.backgroundImage
    ? {
        backgroundImage: `url(${currentDestination.backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }
    : {
        backgroundColor: '#808080'
      };

  return (
    <div 
      className="popular-destinations"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Верхняя часть 3/4 с фоном страны */}
      <div className="top-section" style={topSectionStyle}>
        {/* Стрелки листания */}
        <button className="popular-btn prev" onClick={prevSlide}>
          <svg className="arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>
        
        <button className="popular-btn next" onClick={nextSlide}>
          <svg className="arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>

        {/* Точки навигации сверху */}
        <div className="dots-container top-dots">
          {destinations.map((_, idx) => (
            <button
              key={idx}
              className={`dot ${idx === currentIndex ? 'active' : ''}`}
              onClick={() => goToPage(idx)}
            />
          ))}
        </div>

        {/* Контент с названием */}
        <div className="top-content">
          <h2 className="country-name">{currentDestination.country}</h2>
        </div>
      </div>

      {/* Плавный переход */}
      <div className="gradient-transition"></div>

      {/* Нижняя часть 1/4 с описанием и кнопкой */}
      <div className="bottom-section">
        <p className="country-description">{currentDestination.description}</p>
        <button className="find-tours-btn-bottom" onClick={scrollToSearch}>
          Найти туры
        </button>
        <img src={AngleImage} alt="Angle" className="angle-image" />
      </div>
    </div>
  );
}

export default PopularDestinations;