import styles from "./index.module.css";
import { Splide, SplideSlide } from "@splidejs/react-splide";

const Resources = () => {
  return (
    <div className={styles.container}>
      <p className={styles.resources}>Resources for getting started</p>
      <Splide
        className={styles.splide}
        options={{
          rewind: true,
          gap: "0.5rem",
          perPage: 3,
          perMove: 1,
          type: "loop",
          breakpoints: {
            1200: {
              perPage: 2,
            },
            815: {
              gap: 0,
              perPage: 1,
              arrows: false,
            },
          },
          classes: {
            pagination: `splide__pagination ${styles.pagination}`,
          },
        }}
      >
        <SplideSlide>
          <div className={styles.card}>
            <div className={styles.shadow}>
              <img src="https://opensea.io/blog/wp-content/uploads/2022/02/image-13.png" />
              <div className={styles.info}>
                <p>Wyvern 2.3: Developer Upgrade Guide</p>
              </div>
            </div>
          </div>
        </SplideSlide>
        <SplideSlide>
          <div className={styles.card}>
            <div className={styles.shadow}>
              <img src="https://opensea.io/blog/wp-content/uploads/2022/01/image-10.png" />
              <div className={styles.info}>
                <p>Important updates for listing and delisting your NFTs</p>
              </div>
            </div>
          </div>
        </SplideSlide>
        <SplideSlide>
          <div className={styles.card}>
            <div className={styles.shadow}>
              <img src="https://opensea.io/blog/wp-content/uploads/2021/09/Untitled.png" />
              <div className={styles.info}>
                <p>10 tips for avoiding scams and staying safe on the decentralized web</p>
              </div>
            </div>
          </div>
        </SplideSlide>
        <SplideSlide>
          <div className={styles.card}>
            <div className={styles.shadow}>
              <img src="https://opensea.io/blog/wp-content/uploads/2021/03/buy-nft-safely-on-opensea-1.png" />
              <div className={styles.info}>
                <p>Keeping yourself safe when buying NFTs on Africeum</p>
              </div>
            </div>
          </div>
        </SplideSlide>
        <SplideSlide>
          <div className={styles.card}>
            <div className={styles.shadow}>
              <img src="https://opensea.io/blog/wp-content/uploads/2021/02/creating-selling-nfts.png" />
              <div className={styles.info}>
                <p>The beginner&apos;s guide to creating & selling digital art NFTs</p>
              </div>
            </div>
          </div>
        </SplideSlide>
        <SplideSlide>
          <div className={styles.card}>
            <div className={styles.shadow}>
              <img src="https://opensea.io/blog/wp-content/uploads/2020/11/sell-on-opensea.png" />
              <div className={styles.info}>
                <p>7 reasons to sell your NFTs on Africeum</p>
              </div>
            </div>
          </div>
        </SplideSlide>
      </Splide>
    </div>
  );
};

export default Resources;
