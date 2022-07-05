import React from 'react';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import NFTItemsCard from './NFTItemsCard';
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
    // },
    // { 
    //     "title": "Cyber Skull Force",
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
];
const responsive = {
    xlDesktop: {
      breakpoint: { max: 3000, min: 1490 },
      items: 4,
      slidesToSlide: 1 // optional, default to 1.
    },
    desktop: {
      breakpoint: { max: 1490, min: 1024 },
      items: 3,
      slidesToSlide: 1 // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 767 },
      items: 2,
      slidesToSlide: 1 // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 767, min: 0 },
      items: 1,
      slidesToSlide: 1 // optional, default to 1.
    }
};

function GenesisNFTs() {
    return (
        <div className='genesis-nfts pt-12 lg:pt-24 mb-[50px] lg:mb-[100px] relative before:absolute before:w-full before:h-[80%]  before:-z-10 before:bg-[#11110f] before:top-0 before:left-0'>
            <div className="max-w-[1490px] m-auto px-4">
                <div className="flex flex-wrap items-end justify-between pb-8 headline-bar lg:pb-12">
                    <div className="headline">
                        <h4 className='text-sm font-bold text-white md:text-base lg:text-lg'>First creations on our platform</h4>
                        <h2 className='text-white font-bold text-[25px] md:text-[48px] lg:text-[62px]'>Genesis NFTs</h2>
                    </div>
                    <div className="mt-2 mb-2 link">
                        <a className='text-white text-base whitespace-nowrap pb-[1px] border-b border-solid border-transparent hover:border-white' href="/">View all</a>
                    </div>
                </div>
                <div className="slider-wrap mx-[-15px]">
                    <Carousel
                        swipeable={false}
                        draggable={false}
                        showDots={false}
                        responsive={responsive}
                        ssr={true} // means to render carousel on server-side.
                        infinite={true}
                        autoPlay={false}
                        autoPlaySpeed={5000}
                        keyBoardControl={true}
                        // customTransition="all .5"
                        // transitionDuration={1000}
                        containerClass="carousel-container"
                        // removeArrowOnDeviceType={["tablet", "mobile"]}
                        dotListClass="custom-dot-list-style"
                        itemClass="carousel-item-padding-40-px"
                    >
                        {TrendingAuctionsPosts.map((TrendingAuctionPost, index) => {
                            return(
                                <NFTItemsCard key={index} index={index} postDetails={TrendingAuctionPost} />
                            )
                        })}
                    </Carousel>
                </div>
            </div>
        </div>
    )
}

export default GenesisNFTs
