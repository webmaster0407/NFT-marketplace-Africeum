import React, { useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import NFTItemsCard from "./NFTItemsCard";
import { Link } from "react-router-dom";

import { useActiveWeb3React } from "../hooks";
import useAuth from "../hooks/useAuth";

import ConnectModal from "./WalletConnect/ConnectModal";
import Backdrop from "./Utilities/Backdrop";

import useItems from "../hooks/useItems";
import { useAuthState } from "../contexts/AuthContext";

const TrendingAuctionsPosts = [
  // {
  //     "title": "INTO THE SANTAVERSE",
  //     "slug": "cyber-skull-forcen",
  //     "bid": "35 AFC (39.16 USD)",
  //     "time": "16h 57m 30s",
  //     "media": {
  //         "image": "https://wazirx-nft-production.imgix.net/nft/QmWE6gskw91RgRmjf638VgQVf41QKDXSicRaKsAcpwZKcz?h=640&q=60&auto=format",
  //         "video": "",
  //     },
  //     "creator": {
  //         "name": "YashShetye",
  //         "image": "https://wazirx-nft-production.imgix.net/profile/0x68d546D0a540689053810351D8A1B375087E8790_Newdp.jpg?h=100&q=80&auto=format",
  //     },
  //     "owner": {
  //         "name": "YashShetye",
  //         "image": "https://wazirx-nft-production.imgix.net/profile/0x68d546D0a540689053810351D8A1B375087E8790_Newdp.jpg?h=100&q=80&auto=format",
  //     },
  // },
  // {
  //     "title": "Cyber Skull Force",
  //     "slug": "cyber-skull-forcen",
  //     "bid": "35 AFC (39.16 USD)",
  //     "time": "16h 57m 30s",
  //     "media": {
  //         "image": "",
  //         "video": "https://wazirxnft.s3-ap-southeast-1.amazonaws.com/preview/QmNmUfpNboy6sXUbAB5HA1z21FJ9NVpjsWiqRNzZgct9u9",
  //     },
  //     "creator": {
  //         "name": "YashShetye",
  //         "image": "https://wazirx-nft-production.imgix.net/profile/0x68d546D0a540689053810351D8A1B375087E8790_Newdp.jpg?h=100&q=80&auto=format",
  //     },
  //     "owner": {
  //         "name": "YashShetye",
  //         "image": "https://wazirx-nft-production.imgix.net/profile/0x68d546D0a540689053810351D8A1B375087E8790_Newdp.jpg?h=100&q=80&auto=format",
  //     },
  // },
  // {
  //     "title": "Mystical woods",
  //     "slug": "cyber-skull-forcen",
  //     "bid": "35 AFC (39.16 USD)",
  //     "time": "16h 57m 30s",
  //     "media": {
  //         "image": "https://wazirx-nft-production.imgix.net/nft/QmcsrJK7fdo7ULkLSpzz4y81LdXnrrv34REBZdZR1ooPwC?h=640&q=60&auto=format",
  //         "video": "",
  //     },
  //     "creator": {
  //         "name": "YashShetye",
  //         "image": "https://wazirx-nft-production.imgix.net/profile/0x68d546D0a540689053810351D8A1B375087E8790_Newdp.jpg?h=100&q=80&auto=format",
  //     },
  //     "owner": {
  //         "name": "YashShetye",
  //         "image": "https://wazirx-nft-production.imgix.net/profile/0x68d546D0a540689053810351D8A1B375087E8790_Newdp.jpg?h=100&q=80&auto=format",
  //     },
  // }
];
const responsive = {
  xlDesktop: {
    breakpoint: { max: 3000, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
};

function HeroSlider() {
  const [showConnectOptions, setShowConnectOptions] = useState(false);

  const { account } = useActiveWeb3React();
  const { login } = useAuth();

  const { user, token } = useAuthState();

  const [fetchParams, setFetchParams] = useState({
    sortBy: "views",
    sortDir: "desc",
    page: 0,
    perPage: 24,
  });

  const reverseArr = (input) => {
    var ret = new Array();
    for (var i = input.length - 1; i >= 0; i--) {
      ret.push(input[i]);
    }
    return ret;
  };
  const { items, hasMore } = useItems(fetchParams);

  // const slideshowsItems = items?.reverse()

//   let slideshowsItems = reverseArr(items);

  let slideshowsItems = []

  const firstNFT = {
    auctionable: false,
    collectionId: "0x704b8113cc54baf8761ca145e207858922fc8824",
    count: 1,
    createdAt: "2022-01-04T03:59:42.000Z",
    creator: "0x2d97a45d32669bc5a043ec8d33c40ff7858d3607",
    currency: "0xb9bFE9241aCFFBe7f5B06C4e668c4a43b8431D3a",
    currencyObj: {
      id: "AFC",
      name: "AFC",
      address: "0xb9bFE9241aCFFBe7f5B06C4e668c4a43b8431D3a",
      symbol: "AFC",
      chainId: 4,
      decimals: 18,
      icon: "",
      id: "AFC",
      name: "AFC",
      symbol: "AFC",
      usdPrice: 0,
    },
    description: "Anim video nft",
    endTime: 0,
    id: 9,
    image:
      "https://ipfs.io/ipfs/Qmb3pvK66BG4oZAq2iebWR4EuKGMhto4u2jTxSEwYkHdSs",
    isSold: false,
    likes: 0,
    mintable: true,
    name: "First V",
    price: "342.0",
    requiredAFC: "0.0",
    selfLiked: false,
    startTime: 0,
    status: true,
    tokenId: 0,
    totalCount: 1,
    type: "video/mp4",
    updatedAt: "2022-01-04T18:05:55.955Z",
    uri: "https://ipfs.io/ipfs/QmbsxLDTdSdVf8RRX2xtCb1tgFKryrbR3tmmfu9ynNoXsZ",
    user: {
      address: "0x2d97a45d32669bc5a043ec8d33c40ff7858d3607",
      admin: false,
      banner:
        "https://ipfs.io/ipfs/QmdK64v1QPxfMH1RWxc2i3UxyJDqZ9WbunUT3XV5vetoJS",
      created_at: "2021-12-23T01:40:53.364Z",
      description: "The sehosethol aoha;lsdht",
      facebook: "https://twitter.com/ethairmarket",
      follower: 0,
      following: 1,
      fullname: "My Full name ",
      image:
        "https://ipfs.io/ipfs/QmXVAHh1UyQ3nzHqb22NUSMBQGPonMvKCnxgQBcikHb2cq",
      instagram: "https://twitter.com/ethairmarket",
      last_login: "2021-12-23T01:40:53.364Z",
      liked: 0,
      likes: 0,
      nonce: 338805,
      slug: "rabiitsell",
      telegram: "",
      twitter: "https://twitter.com/ethairmarket",
      username: "rabiitsell",
      worth: 0,
    },
    views: 5,
  };

  slideshowsItems.push(firstNFT)
  slideshowsItems.push(firstNFT)
  slideshowsItems.push(firstNFT)

  return (
    <div className="hero-slider">
      <Carousel
        swipeable={false}
        draggable={false}
        showDots={false}
        responsive={responsive}
        ssr={true} // means to render carousel on server-side.
        infinite={true}
        autoPlay={true}
        infinite={true}
        autoPlaySpeed={5000}
        keyBoardControl={true}
        // customTransition="all .5"
        // transitionDuration={1000}
        containerClass="carousel-container"
        removeArrowOnDeviceType={["tablet", "mobile"]}
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
      >
        <div className="relative z-10 h-full overflow-hidden hero-slide-one">
          <svg
            className="absolute top-0 left-0 -z-10 hero-lines"
            width="1765"
            height="943"
            viewBox="0 0 1765 943"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              opacity="0.2"
              d="M813.163 442.903L505.728 152.297C486.463 134.087 455.228 134.087 435.963 152.297L1.99987 562.504"
              stroke="#C0C0C0"
              strokeWidth="3"
              strokeLinecap="round"
            ></path>
            <path
              opacity="0.2"
              d="M813.344 443.179L1120.78 733.785C1140.04 751.995 1171.28 751.995 1190.54 733.785L1624.51 323.578"
              stroke="#C0C0C0"
              strokeWidth="3"
              strokeLinecap="round"
            ></path>
            <path
              opacity="0.2"
              d="M951.656 454.489L644.22 163.883C624.955 145.673 593.72 145.673 574.455 163.883L140.493 574.09"
              stroke="#C0C0C0"
              strokeWidth="3"
              strokeLinecap="round"
            ></path>
            <path
              opacity="0.2"
              d="M820.698 499.949L1128.13 790.554C1147.4 808.765 1178.63 808.765 1197.9 790.554L1631.86 380.347"
              stroke="#C0C0C0"
              strokeWidth="3"
              strokeLinecap="round"
            ></path>
            <path
              opacity="0.2"
              d="M820.517 499.669L513.082 209.063C493.817 190.852 462.582 190.852 443.317 209.063L9.35387 619.27"
              stroke="#C0C0C0"
              strokeWidth="3"
              strokeLinecap="round"
            ></path>
            <path
              opacity="0.2"
              d="M951.837 454.765L1259.27 745.371C1278.54 763.581 1309.77 763.581 1329.04 745.371L1763 335.164"
              stroke="#C0C0C0"
              strokeWidth="3"
              strokeLinecap="round"
            ></path>
          </svg>
          <div className="max-w-[1490px] h-full m-auto px-4 flex flex-wrap justify-between items-center relative z-10">
            <div className="w-full lg:w-1/2 headline-bar mb-11 mt-7 lg:mb-0 lg:mt-0">
              <div className="text-center headline lg:text-left">
                <h2 className="text-black font-bold text-[25px] md:text-[48px] lg:text-[52px] xl:text-[62px] leading-[1.2]">
                  Create Collect,
                  <br />
                  <span className="gradient-text">Timeless</span> Artworks
                </h2>
                <p className="text-sm md:text-base lg:text-lg text-black opacity-60 lg:mt-[10px] mb-[20px] lg:mb-[30px]">
                  NFT marketplace made simpler
                </p>
              </div>
              <div className="flex items-center justify-center mt-2 link lg:justify-start">
                {!account ? (
                  <button
                    onClick={() => {
                      setShowConnectOptions(true);
                    }}
                    type="button"
                    className="px-6 py-2 mr-5 text-base font-medium text-black cursor-pointer special-btn shadow-white"
                  >
                    Connect Wallet
                  </button>
                ) : (
                  <Link
                    to="/discover"
                    className="px-6 py-2 mr-5 text-base font-medium text-black cursor-pointer special-btn shadow-white"
                  >
                    Discover
                  </Link>
                )}

                {/* <a href="/" className='px-6 py-2 mr-5 text-base font-medium text-black cursor-pointer special-btn shadow-white'>Connect Wallet</a> */}
                {user?.image && (
                  <a
                    href="/create"
                    className="py-1 mb-1 gradient-text text-black text-base cursor-pointer font-medium mr-5 flex items-center transition ease-in-out delay-150 pb-[1px] border-b border-solid border-transparent hover:border-[#af4261]"
                  >
                    Create NFT{" "}
                    <svg
                      className="ml-2"
                      width="8"
                      height="10"
                      viewBox="0 0 8 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7.53998 6.28955L1.87998 0.639548C1.78702 0.54582 1.67642 0.471426 1.55456 0.420657C1.4327 0.369888 1.30199 0.34375 1.16998 0.34375C1.03797 0.34375 0.907264 0.369888 0.785405 0.420657C0.663546 0.471426 0.552945 0.54582 0.459982 0.639548C0.273731 0.826911 0.169189 1.08036 0.169189 1.34455C0.169189 1.60873 0.273731 1.86219 0.459982 2.04955L5.40998 7.04955L0.459982 11.9995C0.273731 12.1869 0.169189 12.4404 0.169189 12.7045C0.169189 12.9687 0.273731 13.2222 0.459982 13.4095C0.552597 13.504 0.663042 13.5792 0.784917 13.6307C0.906792 13.6822 1.03767 13.709 1.16998 13.7095C1.30229 13.709 1.43317 13.6822 1.55505 13.6307C1.67692 13.5792 1.78737 13.504 1.87998 13.4095L7.53998 7.75955C7.64149 7.66591 7.7225 7.55225 7.7779 7.42576C7.83331 7.29926 7.86191 7.16265 7.86191 7.02455C7.86191 6.88645 7.83331 6.74984 7.7779 6.62334C7.7225 6.49684 7.64149 6.38319 7.53998 6.28955Z"
                        fill="#af4261"
                      ></path>
                    </svg>
                  </a>
                )}
              </div>
            </div>
            <div className="flip-section-wrap w-full lg:w-1/2 relative h-[500px] max-w-[450px] m-auto mt-0 lg:m-0 px-10">
              <div className="flip-section-inner">
                {slideshowsItems?.map((TrendingAuctionPost, index) => {
                  return (
                    <NFTItemsCard
                      key={index}
                      postDetails={TrendingAuctionPost}
                      index={index}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="flex hero-slide-three md:h-screen">
          <div
            className="block w-full"
            href="https://nft.wazirx.org/Creativedignity/creations?sort%3Dcreated-desc"
          >
            <picture>
              <source
                media="(max-width: 1199px)"
                srcset="https://dpz0n88ffnk83.cloudfront.net/assets/banner/collection_small.jpg"
              />
              <source
                media="(min-width: 1200px)"
                srcset="https://dpz0n88ffnk83.cloudfront.net/assets/banner/collection_large.jpg"
              />
              <img
                aria-hidden="true"
                src="https://dpz0n88ffnk83.cloudfront.net/assets/banner/collection_large.jpg"
                alt="banner image"
              />
            </picture>
          </div>
        </div>
        {/* <div className="flex hero-slide-three md:h-screen">
                    <div className='block w-full' >
                        <picture className='w-full'>
                            <source className='object-cover object-left w-full h-full' media="(max-width: 767px)" srcSet="https://wazirxnft.s3-ap-southeast-1.amazonaws.com/assets/banner/cd_banner_small.jpg" />
                            <source className='object-cover object-left w-full h-full' media="(min-width: 768px)" srcSet="https://wazirxnft.s3-ap-southeast-1.amazonaws.com/assets/banner/cd_banner_large.jpg" />
                            <img aria-hidden="true" className='object-cover object-left w-full h-full' src="https://wazirxnft.s3-ap-southeast-1.amazonaws.com/assets/banner/cd_banner_large.jpg" alt="banner image" />
                        </picture>
                    </div>
                </div> */}
        {/* <div className="flex hero-slide-two md:h-screen">
                    <a className='block w-full' href="https://nft.wazirx.org/Creativedignity/creations?sort%3Dcreated-desc">
                        <picture className='w-full'>
                            <source className='object-cover object-left w-full h-full' media="(max-width: 767px)" srcSet="https://wazirxnft.s3-ap-southeast-1.amazonaws.com/assets/banner/cd_banner_small.jpg" />
                            <source className='object-cover object-left w-full h-full' media="(min-width: 768px)" srcSet="https://wazirxnft.s3-ap-southeast-1.amazonaws.com/assets/banner/cd_banner_large.jpg" />
                            <img aria-hidden="true" className='object-cover object-left w-full h-full' src="https://wazirxnft.s3-ap-southeast-1.amazonaws.com/assets/banner/cd_banner_large.jpg" alt="banner image" />
                        </picture>
                    </a>
                </div> */}
      </Carousel>

      {showConnectOptions && (
        <Backdrop>
          <ConnectModal
            login={login}
            onDismiss={() => setShowConnectOptions(false)}
          />
        </Backdrop>
      )}
    </div>
  );
}

export default HeroSlider;
