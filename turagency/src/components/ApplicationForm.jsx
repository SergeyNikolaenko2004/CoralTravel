import { useState } from 'react';
import './ApplicationForm.css';

function ApplicationForm({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    consent: false
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    // Очищаем ошибку при вводе
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Введите имя';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Введите номер телефона';
    } else if (!/^[\d+\s()-]{10,}$/.test(formData.phone)) {
      newErrors.phone = 'Введите корректный номер телефона (минимум 10 цифр)';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Введите email';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Введите корректный email';
    }
    
    if (!formData.consent) {
      newErrors.consent = 'Необходимо согласие на обработку персональных данных';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Заглушка - пока просто выводим в консоль
      console.log('Форма отправлена:', formData);
      alert('Заявка отправлена! (заглушка)');
      onClose();
      // Сброс формы
      setFormData({
        name: '',
        phone: '',
        email: '',
        consent: false
      });
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="form-overlay" onClick={handleOverlayClick}>
      <div className="form-modal">
        <button className="form-close" onClick={onClose}>×</button>
        <h2 className="form-title">Оставить заявку</h2>
        <p className="form-subtitle">Заполните форму и мы свяжемся с вами</p>
        
        <form onSubmit={handleSubmit} className="application-form">
          <div className="form-group">
            <label htmlFor="name">Имя *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Введите ваше имя"
              className={errors.name ? 'error' : ''}
            />
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="phone">Номер телефона *</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+7 (999) 123-45-67"
              className={errors.phone ? 'error' : ''}
            />
            {errors.phone && <span className="error-message">{errors.phone}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="example@mail.ru"
              className={errors.email ? 'error' : ''}
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          <div className="form-group checkbox-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="consent"
                checked={formData.consent}
                onChange={handleChange}
              />
              <span>
                Я согласен на{' '}
                <a href="#" className="consent-link" onClick={(e) => e.preventDefault()}>
                  обработку персональных данных
                </a>
              </span>
            </label>
            {errors.consent && <span className="error-message">{errors.consent}</span>}
          </div>

          <button type="submit" className="form-submit-btn">
            Отправить заявку
          </button>
        </form>
      </div>
    </div>
  );
}

export default ApplicationForm;