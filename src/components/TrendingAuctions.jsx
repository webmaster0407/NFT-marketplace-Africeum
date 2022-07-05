
import React, { useState } from 'react';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import NFTItemsCard from './NFTItemsCard';
import useItems from '../hooks/useItems';

const TrendingAuctionsPosts = [

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

function TrendingAuctions() {

    const [fetchParams, setFetchParams] = useState({
        sortBy: 'views',
        sortDir: 'desc',
        page: 0,
        perPage: 24,
        auctionable:true
    })
    const { items, hasMore } = useItems(fetchParams)

    const auctions = items?.filter(item => item.auctionable)

    console.log('TrendingAuctions items:',items,auctions)
    
    return (
        <div className='trending-auctions pt-12 lg:pt-24 mb-[50px] lg:mb-[100px] relative before:absolute before:w-full before:h-[80%]  before:-z-10 before:bg-[#11110f] before:top-0 before:left-0'>
            <div className="max-w-[1490px] m-auto px-4">
                <div className="flex flex-wrap items-end justify-between pb-8 headline-bar lg:pb-12">
                    <div className="headline">
                        <h4 className='text-sm font-bold text-white md:text-base lg:text-lg'>Latest artworks with most valued bids</h4>
                        <h2 className='text-white font-bold text-[25px] md:text-[48px] lg:text-[62px]'>Trending Auctions</h2>
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
                        {items.map((TrendingAuctionPost, index) => {
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

export default TrendingAuctions
