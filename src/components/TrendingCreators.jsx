import React ,{ useEffect,useState }from 'react';
import ProfileShort from './ProfileShort';
import axios from 'axios'
import useArtists from '../hooks/useArtists';

function TrendingCreators() {

    const [users, setUsers] = useState([])

    const fetchNewUsers = async() => {
        const res = await axios.get('/new-users');
        setUsers(res.data?.users)

        console.log('TrendingCreators:',res.data?.users)
    }

    useEffect(() => {
        fetchNewUsers()
    }, [])

    // const [fetchParams, setFetchParams] = useState({
    //     sortBy: 'created_at',
    //     sortDir: 'desc',
    //     page: 0,
    //     perPage: 24
    // })

    // const { items, hasMore } = useArtists(fetchParams)


    return (
        <div className='trending-auctions lg:pt-24 pt-12 lg:mb-[70px] mb-[50px] relative'>
            <div className="max-w-[1490px] m-auto px-4">
                <div className="flex flex-wrap items-end justify-between pb-8 headline-bar lg:pb-12">
                    <div className="mr-4 headline">
                        <h4 className='text-sm font-bold text-black lg:text-lg md:text-base'>Artists delivering the best today</h4>
                        <h2 className='text-black font-bold lg:text-[62px] md:text-[48px] text-[25px]'>Trending Creators</h2>
                    </div>
                    <div className="mt-2 mb-2 link">
                        <a className='text-black text-base whitespace-nowrap pb-[1px] border-b border-solid border-transparent hover:border-black' href="/creators">View all</a>
                    </div>
                </div>
                <div className="grid grid-cols-1 creators-wrapper xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-7">
                    {users?.map((TrendingAuctionPost, index) => {
                        return(
                            <ProfileShort key={index} index={index} postDetails={TrendingAuctionPost} />
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default TrendingCreators
