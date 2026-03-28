import { useEffect } from 'react';

function TourvisorSearch() {
  useEffect(() => {
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

    // Очистка при размонтировании
    return () => {
      if (container) {
        container.innerHTML = '';
      }
      const oldScript = document.querySelector('script[src="//tourvisor.ru/module/init.js"]');
      if (oldScript) {
        oldScript.remove();
      }
    };
  }, []);

  return <div className="tourvisor-container"></div>;
}

export default TourvisorSearch;