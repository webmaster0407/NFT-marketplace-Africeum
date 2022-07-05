import styles from "./index.module.css";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import useLink from "../../../../hooks/useLink";
import TrendingItem from './TrendingItem'
import ItemCard from "../../../Utilities/ItemCard";
import { useEffect, useState } from "react";
import useItems from "../../../../hooks/useItems";
import axios from "axios";
import { notification } from "antd";
import { proxy1 } from "../../../../config/abi/common";
const NFTNew = () => {
  const [collectioninfos, setCollectionInfos] = useState(null)
  const [fetchParams, setFetchParams] = useState({
    page: 3,
    perPage: 12,
    sortBy: 'createdAt',
    sortDir: 'desc',
    url: 'getNFTs',
    type: 'All',
    collectioninfos
  })
  const { items } = useItems(fetchParams)
  useEffect(() => {
    axios.post(proxy1+'/api/getCollectionById', {
      params: {}
    }).then((resp) => {
      setCollectionInfos(resp.data)
      setFetchParams((prev) => ({ ...prev, collectioninfos: resp.data }))
    }).catch((e) => {
    });
  }, [])
  return (
    <div className={styles.container}>
      <div className={styles.temp}>
        <p className={styles.trending + " lg:!text-4xl dark:text-white"}>Newest Items</p>
        <a className={styles.button + " !hidden"}>
          <button className="lg:text-xl primaryBtn dark:bg-none dark:bg-gray-800 dark:hover:bg-gray-900">More...</button>
        </a>
      </div>
      <Splide
        className={styles.splide}
        options={{
          rewind: true,
          gap: "0.5rem",
          perPage: 6,
          perMove: 1,
          type: "loop",
          drag: false,

          autoplay: true,
          interval: 1000,
          arrows: false,
          breakpoints: {
            1600: {
              perPage: 5
            },
            1366: {
              perPage: 4
            },
            1200: {
              perPage: 3,
            },
            815: {
              perPage: 2,
            },
          },
          classes: {
            pagination: `splide__pagination !hidden ${styles.pagination}`,
            prev: 'splide__arrow--prev !z-[1] dark:!bg-gray-600 dark:!text-white',
            next: 'splide__arrow--next !z-[1] dark:!bg-gray-600 dark:!text-white',
          },
        }}
      >
        {items.map((each) => (<SplideSlide>
          <ItemCard nft={each}></ItemCard>
        </SplideSlide>))}
      </Splide>
    </div>
  );
};

export default NFTNew;
