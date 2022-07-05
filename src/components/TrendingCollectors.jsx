import React, { useState } from 'react';
import useArtists from '../hooks/useArtists';
import ProfileShort from './ProfileShort';

function TrendingCollectors() {

    const [fetchParams, setFetchParams] = useState({
        sortBy: 'created_at',
        sortDir: 'desc',
        page: 0,
        perPage: 24
    })

    const { items, hasMore } = useArtists(fetchParams)
    
    return (
        <div className='relative trending-collections'>
            <div className="max-w-[1490px] m-auto px-4">
                <div className="flex flex-wrap items-end justify-between pb-8 headline-bar lg:pb-12 ">
                    <div className="mr-4 headline">
                        <h4 className='text-sm font-bold text-black md:text-base lg:text-lg'>Collectors of fine art on the rise today</h4>
                        <h2 className='text-black font-bold text-[25px] md:text-[48px] lg:text-[62px]'>Trending Collectors</h2>
                    </div>
                    <div className="mt-2 mb-2 link">
                        <a className='text-black text-base whitespace-nowrap pb-[1px] border-b border-solid border-transparent hover:border-black' href="/collectors">View all</a>
                    </div>
                </div>
                <div className="grid grid-cols-1 creators-wrapper xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-7">
                    {items.map((TrendingAuctionPost, index) => {
                        return(
                            <ProfileShort key={index} index={index} postDetails={TrendingAuctionPost} />
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default TrendingCollectors
