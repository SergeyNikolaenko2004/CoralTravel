import { useEffect } from 'react';
import './TourvisorSearch.css';

function TourvisorSearch({ currentCountry, onSearchActive }) {
  useEffect(() => {
    // Настройки модуля Турвизора - отключаем лишние вкладки
    window.TVSettings = window.TVSettings || {};
    window.TVSettings.module = window.TVSettings.module || {};
    window.TVSettings.module.favorites = false; // Отключаем избранное
    window.TVSettings.module.history = false;   // Отключаем историю
    window.TVSettings.module.showTabs = false;  // Отключаем вкладки

    // Создаем div для формы поиска с базовым модулем
    const searchDiv = document.createElement('div');
    searchDiv.className = 'tv-search-form';
    searchDiv.setAttribute('data-tv-moduleid', '9976464');
    
    const container = document.querySelector('.tourvisor-container');
    if (container) {
      container.innerHTML = '';
      container.appendChild(searchDiv);
    }

    // Загружаем скрипт Турвизора
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = '//tourvisor.ru/module/init.js';
    script.charset = 'utf-8';
    document.head.appendChild(script);

    // Сообщаем родителю, что поиск активен
    if (onSearchActive) {
      onSearchActive(true);
    }

    // Очистка при размонтировании
    return () => {
      if (container) {
        container.innerHTML = '';
      }
      const oldScript = document.querySelector('script[src="//tourvisor.ru/module/init.js"]');
      if (oldScript) {
        oldScript.remove();
      }
      if (onSearchActive) {
        onSearchActive(false);
      }
      // Очищаем настройки
      delete window.TVSettings;
    };
  }, [onSearchActive]);

  // Фоны для каждой страны (как во втором блоке)
  const countryBackgrounds = [
    '/src/assets/BackGroundImageCountry/Tai.png', // Таиланд
    null, // Египет (будет серый)
    null  // Китай (будет серый)
  ];

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
    <div className="tourvisor-section" style={containerStyle}>
      <div className="tourvisor-overlay"></div>
      <div className="tourvisor-content">
        <div className="tourvisor-container"></div>
      </div>
    </div>
  );
}

export default TourvisorSearch;