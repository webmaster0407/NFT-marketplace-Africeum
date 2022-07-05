import styles from "./index.module.css";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { useState } from "react";
import useItems from "../../../../hooks/useItems";
import useLink from "../../../../hooks/useLink";
import { assetType } from "../../../../utils/helper";
import { AssetType } from "../../../../types/types";
import { useCoverBg } from "../../../../hooks/useCoverBg";
import { DefaultArt } from "../../../../config/constants";
import CollectionCard from "../../../Utilities/CollectionCard";

const Notable = () => {
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
        <p className={styles.notable + " lg:!text-4xl dark:text-white"}>Notable Drops</p>
        <a className={styles.button +" !hidden"}>
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
          arrows : false,
          type: "slide",
          drag : false,
          dragMinThreshold : { mouse : 1000000000, touch : 100000},
          breakpoints: {
            1600 :{
              perPage : 4
            },
            1366 :{
              perPage : 3
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
            prev  : 'splide__arrow--prev dark:!bg-gray-600 dark:!text-white',
            next  : 'splide__arrow--next dark:!bg-gray-600 dark:!text-white',
          },
        }}
      >
        {items.map((each, index) => {
          return (
            <SplideSlide key={index}>
              <CollectionCard collection={each}></CollectionCard>
            </SplideSlide>
          );
        })}
      </Splide>
    </div>
  );
};

export default Notable;
