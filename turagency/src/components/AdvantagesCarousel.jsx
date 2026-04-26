import { useState, useRef } from 'react';
import './AdvantagesCarousel.css';
import ApplicationForm from './ApplicationForm';

const advantages = [
  {
    id: 1,
    title: 'Бонусы',
    description: 'Собственная бонусная система турагентства (приветственные бонусы, подарочные, накопленные от путешествий)',
  },
  {
    id: 2,
    title: 'Розыгрыши',
    description: 'Каждые выходные розыгрыши и викторины на наших каналах с ценными подарками с доставкой победителям.',
  },
  {
    id: 3,
    title: 'Контент',
    description: 'Насыщенный контент на наших каналах: рекламный, информационный, развлекательный.',
  },
  {
    id: 4,
    title: 'Подарки',
    description: 'При покупке тура никто от нас не уходит без подарка',
  },
  {
    id: 5,
    title: 'Конкурсы',
    description: 'Конкурсы среди подписчиков на наших каналах: в календарные праздники и на вовлечение аудитории потенциальных туристов',
  }
];

// Фоны для каждой страны
const countryBackgrounds = [
  `${import.meta.env.BASE_URL}images/Tai.webp`,
  `${import.meta.env.BASE_URL}images/egypt.webp`,
  `${import.meta.env.BASE_URL}images/china.webp`
];

function AdvantagesCarousel({ currentCountry }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const totalCards = advantages.length;
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const mouseStartX = useRef(0);
  const isDragging = useRef(false);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalCards);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalCards) % totalCards);
  };

  const goToPage = (index) => {
    setCurrentIndex(index);
  };

  const openApplicationForm = () => {
    setIsFormOpen(true);
  };

  const closeApplicationForm = () => {
    setIsFormOpen(false);
  };

  // Обработчики для свайпов
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

  // Обработчики для drag
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

  // Получаем карточки
  const prevIndex = (currentIndex - 1 + totalCards) % totalCards;
  const nextIndex = (currentIndex + 1) % totalCards;

  const prevCard = advantages[prevIndex];
  const currentCard = advantages[currentIndex];
  const nextCard = advantages[nextIndex];

  const backgroundImage = countryBackgrounds[currentCountry];
  const containerStyle = backgroundImage
    ? {
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }
    : {
        backgroundColor: '#808080'
      };

  return (
    <>
      <div 
        className="advantages-container" 
        style={containerStyle}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <div className="advantages-content">
          <div className="carousel-wrapper">
            <button className="carousel-arrow prev" onClick={prevSlide}>
              <svg className="arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>
            
            <button className="carousel-arrow next" onClick={nextSlide}>
              <svg className="arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>

            <div className="carousel-container">
              <div className="carousel-track">
                <div className="carousel-card card-left">
                  <div className="advantage-card">
                    <h3 className="card-title">{prevCard.title}</h3>
                    <p className="card-description">{prevCard.description}</p>
                  </div>
                </div>
                
                <div className="carousel-card card-center">
                  <div className="advantage-card active">
                    <h3 className="card-title">{currentCard.title}</h3>
                    <p className="card-description">{currentCard.description}</p>
                  </div>
                </div>
                
                <div className="carousel-card card-right">
                  <div className="advantage-card">
                    <h3 className="card-title">{nextCard.title}</h3>
                    <p className="card-description">{nextCard.description}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="dots-container">
              {advantages.map((_, idx) => (
                <button
                  key={idx}
                  className={`dot ${idx === currentIndex ? 'active' : ''}`}
                  onClick={() => goToPage(idx)}
                />
              ))}
            </div>

            {/* Кнопка оставить заявку снизу - всегда видна */}
            <button className="advantages-application-btn" onClick={openApplicationForm}>
              Оставить заявку
            </button>
          </div>
        </div>
        <img 
          src={`${import.meta.env.BASE_URL}images/Angle.png`} 
          alt="Angle" 
          className="angle-image-advantages" 
        />
      </div>
      
      <ApplicationForm isOpen={isFormOpen} onClose={closeApplicationForm} />
    </>
  );
}

export default AdvantagesCarousel;