import styles from './FooterPanel.module.css'

const FooterPanel = ({ show, onClose }) => {
  return (
    <>
      {/* Затемнение фона */}
      <div
        className={`${styles.overlay} ${show ? styles.overlayVisible : ''}`}
        onClick={onClose}
      />

      {/* Панель */}
      <footer className={`${styles.footer} ${show ? styles.visible : ''}`}>
        <div className={styles.container}>

          {/* Левая часть — контакты */}
          <div className={styles.left}>
            <div className={styles.item}>
              <span className={styles.label}>Телефон</span>
              <div className={styles.value}>
                <a href="tel:+73922366464">+7 (392) 236 64 64</a>
                <br />
                <a href="tel:+79021766372">+7 (902) 176 63 72</a>
              </div>
            </div>

            <div className={styles.item}>
              <span className={styles.label}>Почта</span>
              <a href="mailto:irkcoral@mail.ru" className={styles.value}>irkcoral@mail.ru</a>
            </div>

            <div className={styles.item}>
              <span className={styles.label}>График</span>
              <span className={styles.value}>10:00–20:00, Пн-Вс</span>
            </div>

            <div className={styles.item}>
              <span className={styles.label}>ИНН</span>
              <span className={styles.value}>381016235739</span>
            </div>

            <div className={styles.item}>
              <span className={styles.label}>ОГРН</span>
              <span className={styles.value}>323385000071955</span>
            </div>

            <div className={styles.copy}>
              © 2026 ИП Лукашева И.С.
            </div>
          </div>

          {/* Правая часть — адрес и карта */}
          <div className={styles.right}>
            <div className={styles.address}>
              г. Иркутск, ул. Култукская, д. 18, Coral Travel
            </div>
            <div className={styles.map}>
              <iframe
                src="https://yandex.ru/map-widget/v1/?um=constructor%3Aaa90962098865adece1d75ea81d609d3db641be95475a59262d1a78ad414f1cb&amp;source=constructor"
                width="320"
                height="200"
                frameBorder="0"
                title="Яндекс Карты — Coral Travel"
                className={styles.mapIframe}
              />
            </div>
          </div>

        </div>
      </footer>
    </>
  )
}

export default FooterPanel