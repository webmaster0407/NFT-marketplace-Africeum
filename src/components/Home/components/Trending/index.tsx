import styles from "./index.module.css";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import useLink from "../../../../hooks/useLink";
import TrendingItem from './TrendingItem'
import { useState } from "react";
import useItems from "../../../../hooks/useItems";
import CollectionCard from "../../../Utilities/CollectionCard";

const Trending = () => {
  const [fetchParams, setFetchParams] = useState({
    sortBy: "createdAt",
    sortDir: "desc",
    lastVisible: '',
    perPage: 12,
    type: 'All',
    url: 'getCollection'
  })
  const { items, hasMore } = useItems(fetchParams)
  return (
    <div className={styles.container}>
      <div className={styles.temp}>
        <p className={styles.trending + " dark:text-white lg:!text-4xl"}>Trending Collections</p>
        <a className={styles.button + " !hidden"}>
          <button className="primaryBtn lg:!text-xl dark:bg-none dark:bg-gray-800 dark:hover:bg-gray-900">More...</button>
        </a>
      </div>
      <Splide
        className={styles.splide}
        options={{
          rewind: false,
          gap: "0.5rem",
          perPage: 5,
          perMove: 0,
          arrows: false,
          type: "slide",
          drag: false,
          dragMinThreshold: { mouse: 1000000000, touch: 100000 },
          breakpoints: {
            1600: {
              perPage: 4
            },
            1366: {
              perPage: 3
            },
            1200: {
              perPage: 2,
            },
            815: {
              perPage: 1,
            },
          },
          classes: {
            pagination: `splide__pagination !hidden ${styles.pagination} `,
            prev: 'splide__arrow--prev dark:!bg-gray-600 dark:!text-white',
            next: 'splide__arrow--next dark:!bg-gray-600 dark:!text-white',
          },
        }}
      >
        {items.map((each, idx) => (idx > items.length - 4 && <SplideSlide key={idx}>
          <CollectionCard collection={each} />
        </SplideSlide>))}
      </Splide>
    </div>
  );
};

export default Trending;
