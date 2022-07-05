
import Categories from "../components/Home/components/Categories/index";
import Collection from "../components/Home/components/Collections/index";
import Create from "../components/Home/components/Create/index";
import Hero from "../components/Home/components/Hero/index";
import Meet from "../components/Home/components/Meet/index";
import Notable from "../components/Home/components/Notable/index";
import Resources from "../components/Home/components/Resources/index";
import Trending from "../components/Home/components/Trending/index";
import styles from "../components/Home/components/styles/Home.module.css";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import NFTNew from "../components/Home/components/NFTNew";
import NFTHot from "../components/Home/components/NFTHot";
import NFTExplore from "../components/Home/components/NFTExplore";
const Home = () => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.background + " dark:background"}></div>
        <div className={styles.background1 + " dark:background1"}></div>
          <Hero />

          <Splide
            className={styles.splide}
            options={{
              rewind: true,
              gap: "0.5rem",
              perPage: 1,
              perMove: 1,
              arrows : true,
              autoplay : false,
              interval : 3000,
              pauseOnHover : true,
              pauseOnFocus : true,
              type: "slide",
              classes: { 
                pagination: `splide__pagination !hidden ${styles.pagination} `,
                prev  : 'splide__arrow--prev !z-10 dark:!bg-gray-600 dark:!text-white ' + styles.arrows1,
                next  : 'splide__arrow--next !z-10 dark:!bg-gray-600 dark:!text-white ' + styles.arrows1,
              },
            }}
          >
          <SplideSlide className = {styles.card} >
            <NFTExplore page = {0}/>
          </SplideSlide>

          <SplideSlide className = {styles.card} >
            <NFTExplore page = {10} />
          </SplideSlide>

          <SplideSlide className = {styles.card} >
            <NFTExplore page={3}></NFTExplore>
          </SplideSlide>

      </Splide>
      <Collection />
          <Splide
            className={styles.splide + " mt-10"}
            options={{
              rewind: true,
              gap: "0.5rem",
              perPage: 1,
              perMove: 1,
              arrows : true,
              autoplay : true,
              interval : 3000000000,
              pauseOnHover : true,
              pauseOnFocus : true,
              type: "slide",
              classes: {
                pagination: `splide__pagination !hidden ${styles.pagination} `,
                prev  : 'splide__arrow--prev !z-10 dark:!bg-gray-600 dark:!text-white ' + styles.arrows,
                next  : 'splide__arrow--next !z-10 dark:!bg-gray-600 dark:!text-white ' + styles.arrows,
              },
            }}
          >
          <SplideSlide className = {styles.card} >
            <Notable />
          </SplideSlide>

          <SplideSlide className = {styles.card} >
            <Trending />
          </SplideSlide>

          <SplideSlide className = {styles.card} >
            <Categories />
          </SplideSlide>

      </Splide>
          
          {/* <Create /> */}
          {/* <Resources /> */}

          <Meet />
      </div>
    </>
  );
};

export default Home;
