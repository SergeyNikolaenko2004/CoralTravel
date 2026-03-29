import './Footer.css';

function Footer({ show }) {
  return (
    <footer className={`footer ${show ? 'visible' : ''}`}>
      <div className="footer-container">
        {/* Левая часть - контакты */}
        <div className="footer-left">
          <div className="contact-item">
            <span className="contact-label">Телефон:</span>
            <a href="tel:+78001234567" className="contact-value">8 (800) 123-45-67</a>
          </div>
          <div className="contact-item">
            <span className="contact-label">График работы:</span>
            <span className="contact-value">с 10:00 до 20:00, Пн-Вс</span>
          </div>
          <div className="contact-item">
            <span className="contact-label">ИНН:</span>
            <span className="contact-value">1234567890</span>
          </div>
          <div className="contact-item">
            <span className="contact-label">ОГРН:</span>
            <span className="contact-value">1234567890123</span>
          </div>
        </div>

        {/* Правая часть - адрес и карта в одной строке */}
        <div className="footer-right">
          <div className="address-wrapper">
            <div className="address-item">
              <span className="address-text">г. Иркутск, ул. Култукская, 18, Coral Travel</span>
            </div>
            <div className="map-container">
              <iframe 
                src="https://yandex.ru/map-widget/v1/?um=constructor%3Aaa90962098865adece1d75ea81d609d3db641be95475a59262d1a78ad414f1cb&amp;source=constructor" 
                width="320" 
                height="240" 
                frameBorder="0"
                title="Яндекс Карты - Coral Travel"
                className="map-iframe"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;