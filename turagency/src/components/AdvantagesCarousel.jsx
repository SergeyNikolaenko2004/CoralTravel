import { useState, useEffect } from 'react';
import './AdvantagesCarousel.css';

const advantages = [
  {
    id: 1,
    title: 'Лучшие цены',
    description: 'Гарантируем самые выгодные предложения от ведущих туроператоров',
    icon: '💰'
  },
  {
    id: 2,
    title: 'Надежные партнеры',
    description: 'Работаем только с проверенными туроператорами и отелями',
    icon: '🤝'
  },
  {
    id: 3,
    title: 'Индивидуальный подход',
    description: 'Подберем тур под ваши пожелания и бюджет',
    icon: '🎯'
  },
  {
    id: 4,
    title: 'Поддержка 24/7',
    description: 'Всегда на связи во время вашего отдыха',
    icon: '📞'
  },
  {
    id: 5,
    title: 'Быстрое бронирование',
    description: 'Подтверждение тура в течение 30 минут',
    icon: '⚡'
  },
  {
    id: 6,
    title: 'Рассрочка без %',
    description: 'Оплачивайте тур частями без переплат',
    icon: '💳'
  }
];

function AdvantagesCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerPage, setCardsPerPage] = useState(3);

  // Определяем количество карточек в зависимости от ширины экрана
  useEffect(() => {
    const updateCardsPerPage = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setCardsPerPage(1);
      } else if (width < 1024) {
        setCardsPerPage(2);
      } else {
        setCardsPerPage(3);
      }
    };

    updateCardsPerPage();
    window.addEventListener('resize', updateCardsPerPage);
    return () => window.removeEventListener('resize', updateCardsPerPage);
  }, []);

  const totalPages = Math.ceil(advantages.length / cardsPerPage);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalPages);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const goToPage = (pageIndex) => {
    setCurrentIndex(pageIndex);
  };

  const visibleCards = advantages.slice(
    currentIndex * cardsPerPage,
    currentIndex * cardsPerPage + cardsPerPage
  );

  return (
    <div className="carousel-container">
      <button className="carousel-btn prev" onClick={prevSlide}>
        ❮
      </button>
      
      <div className="carousel-track">
        {visibleCards.map((card) => (
          <div key={card.id} className="advantage-card">
            <div className="card-icon">{card.icon}</div>
            <h3 className="card-title">{card.title}</h3>
            <p className="card-description">{card.description}</p>
          </div>
        ))}
      </div>
      
      <button className="carousel-btn next" onClick={nextSlide}>
        ❯
      </button>
      
      <div className="dots-container">
        {Array.from({ length: totalPages }).map((_, idx) => (
          <button
            key={idx}
            className={`dot ${idx === currentIndex ? 'active' : ''}`}
            onClick={() => goToPage(idx)}
          />
        ))}
      </div>
    </div>
  );
}

export default AdvantagesCarousel;