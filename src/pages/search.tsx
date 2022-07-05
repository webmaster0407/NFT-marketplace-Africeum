import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom'
import ArtistCard from '../components/Artist/ArtistCard'
import NFTItemsCard from '../components/NFTItemsCard';
import Profile from '../components/Profile';
import ItemCard from '../components/Utilities/ItemCard';
import useArtists from '../hooks/useArtists';
import useItems from '../hooks/useItems';
import NFTItem from "../components/NFTItem";
const Search = (props: any) => {

    const location: any = useLocation();
    const searchQuery = new URLSearchParams(location.search).get("q");

    const searchQuery2 = new URLSearchParams(location.search).get("s");

    useEffect(() => {
        setFetchCollectibleParams(prev => ({
            ...prev,
            page: 0,
            genre: searchQuery2
        }))

    }, [searchQuery2])

    
    useEffect(() => {
        setFetchCollectibleParams(prev => ({
            ...prev,
            page: 0,
            search: searchQuery
        }))
        setFetchUserParams(prev => ({
            ...prev,
            page: 0,
            search: searchQuery
        }))

        
    }, [searchQuery])
    
    const [fetchCollectibleParams, setFetchCollectibleParams] = useState({
        sortBy: 'createdAt',
        sortDir: 'desc',
        page: 0,
        perPage: 50,
        search: searchQuery,
        genre: searchQuery2
    })

    const [fetchUserParams, setFetchUserParams] = useState({
        sortBy: 'created_at',
        sortDir: 'desc',
        page: 0,
        perPage: 50,
        search: searchQuery
    })

    const handleSortBy = (value) => {
        if(value == '0') {
            setFetchCollectibleParams(prev => ({
                ...prev,
                sortBy: 'createdAt',
                sortDir: 'desc',
                page: 0,
                perPage: 50,
                
            }))
            setFetchUserParams(prev => ({
                ...prev,
                sortBy: 'created_at',
                sortDir: 'desc',
                page: 0,
                perPage: 50,
            }))
        } else if(value == '1') {
            setFetchCollectibleParams(prev => ({
                ...prev,
                sortBy: 'createdAt',
                sortDir: 'asc',
                page: 0,
                perPage: 50,
            }))
            setFetchUserParams(prev => ({
                ...prev,
                sortBy: 'created_at',
                sortDir: 'asc',
                page: 0,
                perPage: 50,
            }))
        } else if(value == '2') {
            setFetchCollectibleParams(prev => ({
                ...prev,
                sortBy: 'price',
                sortDir: 'desc',
                page: 0,
                perPage: 50,
            }))
        } else if(value == '3') {
            setFetchCollectibleParams(prev => ({
                ...prev,
                sortBy: 'price',
                sortDir: 'desc',
                page: 0,
                perPage: 50,
            }))
        }
    }

    const { items } = useItems(fetchCollectibleParams)
    const { items: users } = useArtists(fetchUserParams)

    const [active, setActive] = useState('collectibles');

    return (
        <div className="px-4 mt-20 lg:px-0 lg:mx-56">
            <h2 className="text-2xl font-bold text-left text-gray-800">Search results for <span className="text-black">{location?.state?.query}</span> </h2>

            <div className="flex items-center justify-between mt-20">
                <div className="flex justify-start space-x-8 ">
                    <button onClick={() => setActive('collectibles')} className={" hover:text-gray-800 font-bold " +
                        (active === 'collectibles' ? 'text-black' : 'text-gray-600')}>Collectibles </button>
                    <button onClick={() => setActive('users')} className={"hover:text-gray-800 font-bold " +
                        (active === 'users' ? 'text-black' : 'text-gray-600')}>Users</button>
                </div>

                <div className="flex items-center">
                    {/* <p className="hidden w-20 mr-4 sm:block">Sort by</p> */}
                    <div className="w-full mb-4 text-black border-2 border-gray-800 rounded-full bg-br-gray">
                        <select className={"px-2 py-2 pr-4 w-full border-none rounded-3xl"} onChange={(e) => handleSortBy(e.target.value)}>
                            <option value="0">Newest First</option>
                            <option value="1">Oldest First</option>
                            {active === 'collectibles' && <option value="2">Highest First</option>}
                            {active === 'collectibles' && <option value="3">Lowest First</option>}
                        </select>
                    </div>
                </div>
            </div>

            {active === 'users' && 
                    <div className={`all-nfts-wrapper grid transition ease-in gap-7 w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-6`}>
                        {users.map((CreatorsPost, index) => {
                            return(
                                <Profile key={index} postDetails={CreatorsPost} />
                            )
                        })}
                    </div>
      
            }

            {active === 'collectibles' && 
                        <div className={`all-nfts-wrapper grid transition ease-in gap-7 w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5`}>
                        {items.map((item, index) => {
                            return(
                                <NFTItem postDetails={item} key={item.id} index={index} />
                                // <NFTItemsCard key={index} index={index} postDetails={TrendingAuctionPost} />
                            )
                        })}
                    </div>
            }

            {
                items.length === 0 && users.length === 0 && (
                    <div className={`all-nfts-wrapper grid transition ease-in gap-7 w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5`}>
                      <p className='h-[250px]'>
                          No result
                      </p>
                    </div>
                )
            }
            
            {/* {hasMore && <button className="px-6 py-2 mt-6 mb-24 font-bold bg-br-primary rounded-3xl" 
                onClick={() => {handleLoadMore()}}>Load More</button>} */}
            {/* <button className="px-6 py-2 mt-6 mb-24 font-bold bg-br-primary rounded-3xl">Load More</button> */}
        </div>
    )
}

export default Search
