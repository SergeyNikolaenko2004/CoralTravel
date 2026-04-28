import styles from './Hero.module.css'

const BASE_URL = import.meta.env.BASE_URL

const Hero = () => {
  return (
    <section className={styles.hero}>
      <video
        className={styles.video}
        autoPlay
        loop
        muted
        playsInline
      >
        <source src={`${BASE_URL}video/shanghai2.mp4`} type="video/mp4" />
      </video>
      <div className={styles.overlay} />
    </section>
  )
}

export default Hero