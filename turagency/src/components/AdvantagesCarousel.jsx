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

// Фоны для каждой страны
const countryBackgrounds = [
  '/src/assets/BackGroundImageCountry/Tai.png', // Таиланд
  null, // Египет (будет серый)
  null  // Китай (будет серый)
];

function AdvantagesCarousel({ currentCountry }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalCards = advantages.length;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalCards);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalCards) % totalCards);
  };

  const goToPage = (index) => {
    setCurrentIndex(index);
  };

  // Получаем предыдущую, текущую и следующую карточки
  const prevIndex = (currentIndex - 1 + totalCards) % totalCards;
  const nextIndex = (currentIndex + 1) % totalCards;

  const prevCard = advantages[prevIndex];
  const currentCard = advantages[currentIndex];
  const nextCard = advantages[nextIndex];

  // Определяем стиль фона в зависимости от выбранной страны
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
    <div className="advantages-container" style={containerStyle}>
      <div className="advantages-content">
        <div className="carousel-wrapper">
          {/* Стрелки листания как в первом блоке */}
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

          {/* Карусель карточек - только 3 карточки */}
          <div className="carousel-container">
            <div className="carousel-track">
              {/* Левая карточка */}
              <div className="carousel-card card-left">
                <div className="advantage-card">
                  <div className="card-icon">{prevCard.icon}</div>
                  <h3 className="card-title">{prevCard.title}</h3>
                  <p className="card-description">{prevCard.description}</p>
                </div>
              </div>
              
              {/* Центральная карточка (активная, выше всех) */}
              <div className="carousel-card card-center">
                <div className="advantage-card active">
                  <div className="card-icon">{currentCard.icon}</div>
                  <h3 className="card-title">{currentCard.title}</h3>
                  <p className="card-description">{currentCard.description}</p>
                </div>
              </div>
              
              {/* Правая карточка */}
              <div className="carousel-card card-right">
                <div className="advantage-card">
                  <div className="card-icon">{nextCard.icon}</div>
                  <h3 className="card-title">{nextCard.title}</h3>
                  <p className="card-description">{nextCard.description}</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Точки навигации */}
          <div className="dots-container">
            {advantages.map((_, idx) => (
              <button
                key={idx}
                className={`dot ${idx === currentIndex ? 'active' : ''}`}
                onClick={() => goToPage(idx)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdvantagesCarousel;