import './Footer.css';

function Footer({ show }) {
  return (
    <footer className={`footer ${show ? 'visible' : ''}`}>
      <div className="footer-container">
        {/* Левая часть - контакты */}
        <div className="footer-left">
          <div className="contact-item">
            <span className="contact-label">Телефон:</span>
            <div className="contact-value">
              <a href="tel:+73922366464">+7 (392) 236 64 64</a>
              <br />
              <a href="tel:+79021766372">+7 (902) 176 63 72</a>
            </div>
          </div>
          <div className="contact-item">
            <span className="contact-label">Почта:</span>
            <a href="mailto:irkcoral@mail.ru" className="contact-value">irkcoral@mail.ru</a>
          </div>
          <div className="contact-item">
            <span className="contact-label">График:</span>
            <span className="contact-value">10:00-20:00, Пн-Вс</span>
          </div>
          <div className="contact-item">
            <span className="contact-label">ИНН:</span>
            <span className="contact-value">381016235739</span>
          </div>
          <div className="contact-item">
            <span className="contact-label">ОГРН:</span>
            <span className="contact-value">323385000071955</span>
          </div>
          <div className="contact-item copyright">
            <span className="contact-value">© 2026 ИП Лукашева И.С.</span>
          </div>
        </div>

        {/* Правая часть - адрес и карта */}
        <div className="footer-right">
          <div className="address-wrapper">
            <div className="address-item">
              <span className="address-text">г. Иркутск, ул. Култукская, д. 18, Coral Travel</span>
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