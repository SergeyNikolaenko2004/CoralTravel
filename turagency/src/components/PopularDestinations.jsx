import { useState, useRef, useEffect } from 'react';
import './PopularDestinations.css';
import AngleImage from '/src/assets/Angle.png';

const destinations = [
  {
    id: 1,
    country: 'Таиланд',
    description: 'Экзотическая природа, буддийские храмы, изумрудное море, незабываемая кухня',
    backgroundImage: '/src/assets/BackGroundImageCountry/Tai.webp'
  },
  {
    id: 2,
    country: 'Египет',
    description: 'Древние пирамиды, коралловые рифы, круглогодичное солнце и удивительное Красное море',
    backgroundImage: '/src/assets/BackGroundImageCountry/egypt.webp'
  },
  {
    id: 3,
    country: 'Китай',
    description: 'Великая стена, древняя культура, невероятная кухня и современные мегаполисы',
    backgroundImage:  '/src/assets/BackGroundImageCountry/china.webp'
  }
];

function PopularDestinations({ onCountryChange }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayCountry, setDisplayCountry] = useState(destinations[0].country);
  const [displayDescription, setDisplayDescription] = useState(destinations[0].description);
  const totalPages = destinations.length;
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const mouseStartX = useRef(0);
  const isDragging = useRef(false);
  const topSectionRef = useRef(null);
  const autoPlayInterval = useRef(null);

  const updateContent = (newIndex) => {
    setIsTransitioning(true);
    
    setTimeout(() => {
      setDisplayCountry(destinations[newIndex].country);
      setDisplayDescription(destinations[newIndex].description);
      setIsTransitioning(false);
    }, 150);
  };

  const nextSlide = () => {
    const newIndex = (currentIndex + 1) % totalPages;
    setCurrentIndex(newIndex);
    onCountryChange(newIndex);
    updateContent(newIndex);
    resetAutoPlay();
  };

  const prevSlide = () => {
    const newIndex = (currentIndex - 1 + totalPages) % totalPages;
    setCurrentIndex(newIndex);
    onCountryChange(newIndex);
    updateContent(newIndex);
    resetAutoPlay();
  };

  const goToPage = (pageIndex) => {
    if (pageIndex === currentIndex) return;
    setCurrentIndex(pageIndex);
    onCountryChange(pageIndex);
    updateContent(pageIndex);
    resetAutoPlay();
  };

  // Функция для автопереключения
  const startAutoPlay = () => {
    autoPlayInterval.current = setInterval(() => {
      nextSlide();
    }, 15000); // 15 секунд
  };

  const resetAutoPlay = () => {
    // Останавливаем текущий интервал
    if (autoPlayInterval.current) {
      clearInterval(autoPlayInterval.current);
    }
    // Запускаем новый
    startAutoPlay();
  };

  const stopAutoPlay = () => {
    if (autoPlayInterval.current) {
      clearInterval(autoPlayInterval.current);
      autoPlayInterval.current = null;
    }
  };

  const scrollToSearch = () => {
    const searchBlock = document.querySelector('.block-3');
    if (searchBlock) {
      searchBlock.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Обработчик клика по верхней секции для переключения по половинам
  const handleTopSectionClick = (e) => {
    if (!topSectionRef.current) return;
    
    const rect = topSectionRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    
    if (clickX < width / 2) {
      prevSlide();
    } else {
      nextSlide();
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

  // Запускаем автопереключение при монтировании, останавливаем при размонтировании
  useEffect(() => {
    startAutoPlay();
    return () => {
      stopAutoPlay();
    };
  }, []); // Пустой массив зависимостей - запускаем только один раз

  const currentDestination = destinations[currentIndex];

  const topSectionStyle = currentDestination.backgroundImage
    ? {
        backgroundImage: `url(${currentDestination.backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        transition: 'background-image 0.5s ease-in-out'
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
      <div 
        className="top-section" 
        style={topSectionStyle}
        ref={topSectionRef}
        onClick={handleTopSectionClick}
      >
        {/* Стрелки листания */}
        <button className="popular-btn prev" onClick={(e) => { e.stopPropagation(); prevSlide(); }}>
          <svg className="arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>
        
        <button className="popular-btn next" onClick={(e) => { e.stopPropagation(); nextSlide(); }}>
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
              onClick={(e) => { e.stopPropagation(); goToPage(idx); }}
            />
          ))}
        </div>

        {/* Контент с названием */}
        <div className="top-content">
          <h2 className={`country-name ${isTransitioning ? 'fade-out' : 'fade-in'}`}>
            {displayCountry}
          </h2>
        </div>
      </div>

      {/* Плавный переход */}
      <div className="gradient-transition"></div>

      {/* Нижняя часть 1/4 с описанием и кнопкой */}
      <div className="bottom-section">
        <p className={`country-description ${isTransitioning ? 'fade-out' : 'fade-in'}`}>
          {displayDescription}
        </p>
        <button className="find-tours-btn-bottom" onClick={scrollToSearch}>
          Найти туры
        </button>
        <img src={AngleImage} alt="Angle" className="angle-image" />
      </div>
    </div>
  );
}

export default PopularDestinations;