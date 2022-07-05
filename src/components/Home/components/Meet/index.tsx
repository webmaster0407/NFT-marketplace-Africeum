import styles from "./index.module.css";

const Meet = () => {
  return (
    <div className={styles.container} id="vid">
      <div className={styles.header}>
        <p className={styles.meet + " dark:text-white lg:!text-4xl"}>Meet Africeum</p>
        <p className={styles.desc + " dark:text-gray-400 lg:!text-xl"}>The NFT marketplace with everything for everyone</p>
      </div>
      <div className={styles.vid}>
        <div className={styles.size}>
          {/* <iframe src="https://www.youtube.com/embed/gfGuPd1CELo?playlist=gfGuPd1CELo&autoplay=0&controls=1&loop=1&modestbranding=1&rel=0"></iframe>
          //https://youtu.be/LdSOWmvSaak
          
          /// */}
          <iframe src="https://www.youtube.com/embed/LdSOWmvSaak" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>
        </div>
        <p className={styles.coming + " dark:text-gray-400 lg:!text-lg"}>Flat on-ramp and profile customization is coming soon.</p>
      </div>
    </div>
  );
};

export default Meet;

