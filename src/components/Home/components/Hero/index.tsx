import { useState, useEffect } from "react";
import styles from "./index.module.css";
import { AiFillPlayCircle } from "react-icons/ai";
import { GrCircleInformation } from "react-icons/gr";
import { useAuthState } from "../../../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { useActiveWeb3React } from "../../../../hooks";
import useAuth from "../../../../hooks/useAuth";

const Hero = () => {
  //this is fetched from Backend
  const navigate = useNavigate();
  
  const { account } = useActiveWeb3React();
  const { login, logout } = useAuth();
  const HeroInfo = require('../../../../config/constants/datamodel/HeroInfoData')
  const { user } = useAuthState();
  return (
    <div className={styles.main}>
      <div className={styles.intro}>
        {/* <div className={styles.background}></div> */}
        <div className={styles.content}>
          <div className={styles.discover}>
            <h1 className="dark:text-white lg:!text-6xl 2xl:!text-8xl !text-4xl !font-extrablod">Discover, collect, and sell extraordinary NFTs</h1>
            <p className="dark:text-gray-300">Africeum is the largest NFT marketplace in Africa</p>
            <div className={styles.buttons}>
              <button  onClick={
                () => {
                  navigate("exploreCollection");
              }
              } className={styles.explore + " lg:!text-2xl dark:bg-none dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-900"}>Explore</button>
              <button               onClick={() => {
               if(account){
                navigate("/create");
              }else{
                login("Injected");
              }
              }} className={styles.create + " lg:!text-2xl dark:bg-gray-600 dark:bg-opacity-40 dark:border-gray-300 dark:hover:bg-gray-800 dark:hover:bg-opacity-100 dark:text-gray-300"}>Create</button>
            </div>
            <a className={styles.learn + " !hidden dark:text-gray-400 dark:hover:text-gray-300"} href="#vid">
              <AiFillPlayCircle className="dark:fill-gray-400"/>
              Learn More about Africeum
            </a>
          </div>
          <a className={styles.image}>
          <Splide
        className={styles.splide + " "}
        options={{
          rewind: true,
          gap: "0.5rem",
          perPage: 1,
          perMove: 1,
          type: "fade",
          drag : false,
          
          autoplay : true,
          interval : 500,
          arrows : false,
          classes: {
            pagination: `splide__pagination !hidden ${styles.pagination}`,
            prev  : 'splide__arrow--prev dark:!bg-gray-600 dark:!text-white',
            next  : 'splide__arrow--next dark:!bg-gray-600 dark:!text-white',
          },
        }}
      >
        {HeroInfo.map((each, idx) =>(<SplideSlide key = {idx} className="!p-0">
            <img src={each?.bannerURL}/>
        </SplideSlide>))}
      </Splide>
            <div className={styles.info + " !hidden dark:bg-gray-600"} >
              <div className={styles.credit}>
                <img src={"HeroInfo.logoURL"}/>
                <div className={styles.name }>
                  <p className="dark:text-gray-300">{"HeroInfo.info1"}</p>
                  <p className="text-[rgb(32,129,226)] dark:text-gray-400">{"HeroInfo.info2"}</p>
                </div>
              </div>
              <GrCircleInformation />
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Hero;
