import { useState } from 'react';
import './Header.css';
import TelegramLogo from '/images/TelegrammLogo.png';
import InstagramLogo from '/images/InstagramLogo.png';
import MaxLogo from '/images/MaxLogo.png';
import ApplicationForm from './ApplicationForm';

function Header({ hideApplicationBtn = false }) {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const openApplicationForm = () => {
    setIsFormOpen(true);
  };

  const closeApplicationForm = () => {
    setIsFormOpen(false);
  };

  const scrollToFirstBlock = () => {
    const firstBlock = document.querySelector('.block-1');
    if (firstBlock) {
      firstBlock.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header className="header">
        <div className="header-container">
          {/* Логотип - клик возвращает на первый блок */}
          <div className="logo" onClick={scrollToFirstBlock}>
            <img src="/CoralTravel.png" alt="Coral Travel" className="logo-img" />
          </div>

          {/* Правая часть */}
          <div className="header-right">
            {/* Социальные иконки */}
            <div className="social-icons">
              <a href="https://t.me/irkcoral" target="_blank" rel="noopener noreferrer" className="social-circle">
                <img src={TelegramLogo} alt="Telegram" className="social-icon-img" />
              </a>
              
              <a href="https://www.instagram.com/coral_travelirk?igsh=NDlkZ3RhaGh6Y3Ex&utm_source=ig_contact_invite" target="_blank" rel="noopener noreferrer" className="social-circle">
                <img src={InstagramLogo} alt="Instagram" className="social-icon-img" />
              </a>
              
              <a href="https://max.ru/id381016235739_biz" target="_blank" rel="noopener noreferrer" className="social-circle">
                <img src={MaxLogo} alt="Messenger" className="social-icon-img" />
              </a>
            </div>

            {/* Кнопка оставить заявку - скрывается на 2 блоке */}
            {!hideApplicationBtn && (
              <button className="application-btn" onClick={openApplicationForm}>
                Оставить заявку
              </button>
            )}
          </div>
        </div>
      </header>
      
      <ApplicationForm isOpen={isFormOpen} onClose={closeApplicationForm} />
    </>
  );
}

export default Header;