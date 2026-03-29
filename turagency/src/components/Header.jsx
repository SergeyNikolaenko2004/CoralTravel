import './Header.css';
import TelegramLogo from '../assets/TelegrammLogo.png';
import InstagramLogo from '../assets/InstagramLogo.png';
import MaxLogo from '../assets/MaxLogo.png';

function Header() {
  const scrollToSearch = () => {
    const searchBlock = document.querySelector('.block-3');
    if (searchBlock) {
      searchBlock.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const openApplicationForm = () => {
    // TODO: открыть форму оставить заявку
    console.log('Открыть форму оставить заявку');
  };

  return (
    <header className="header">
      <div className="header-container">
        {/* Логотип */}
        <div className="logo">
          <img src="/CoralTravel.png" alt="Coral Travel" className="logo-img" />
        </div>

        {/* Правая часть */}
        <div className="header-right">
          {/* Социальные иконки */}
          <div className="social-icons">
            <a href="https://t.me/coraltravel" target="_blank" rel="noopener noreferrer" className="social-circle">
              <img src={TelegramLogo} alt="Telegram" className="social-icon-img" />
            </a>
            
            <a href="https://instagram.com/coraltravel" target="_blank" rel="noopener noreferrer" className="social-circle">
              <img src={InstagramLogo} alt="Instagram" className="social-icon-img" />
            </a>
            
            <a href="https://m.me/coraltravel" target="_blank" rel="noopener noreferrer" className="social-circle">
              <img src={MaxLogo} alt="Messenger" className="social-icon-img" />
            </a>
          </div>

          {/* Кнопка оставить заявку */}
          <button className="application-btn" onClick={openApplicationForm}>
            Оставить заявку
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;