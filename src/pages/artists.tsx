import { useState } from 'react'
import ArtistCard from '../components/Artist/ArtistCard'
import useArtists from '../hooks/useArtists'

const Artists = () => {
    const [fetchParams, setFetchParams] = useState({
        sortBy: 'created_at',
        sortDir: 'desc',
        page: 0,
        perPage: 24
    })
    const { items, hasMore } = useArtists(fetchParams)

    const handleSortBy = (value) => {
        if(value == '0') {
            setFetchParams(prev => ({
                ...prev,
                sortBy: 'created_at',
                sortDir: 'desc',
                page: 0,
            }))
        } else if(value == '1') {
            setFetchParams(prev => ({
                ...prev,
                sortBy: 'created_at',
                sortDir: 'asc',
                page: 0
            }))
        } else if(value == '2') {
            setFetchParams(prev => ({
                ...prev,
                sortBy: 'follower',
                sortDir: 'desc',
                page: 0
            }))
        }
    }

    const handleLoadMore = () => {
        setFetchParams(prev => ({
            ...prev,
            page: (prev?.page || 0) + 1
        }))
    }

    return (
        <div className="px-4 mt-20 lg:px-0 lg:mx-56">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-left">Artists</h2>
                <div className="flex items-center">
                    <p className="w-20 mr-4">Sort by</p>
                    <div className="w-full mt-2 text-black bg-br-gray rounded-3xl">
                        <select className={"px-4 py-3 pr-6 w-full customSelect rounded-3xl"} onChange={(e) => handleSortBy(e.target.value)}>
                            <option value="0">Newest First</option>
                            <option value="1">Oldest First</option>
                            <option value="2">Follower Count</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className="flex flex-wrap mt-12">
                {
                    items.map((item, index) => {
                        return <div key={index} className="mb-10  md:mr-6 xl:mr-12">
                            <ArtistCard artist={item} />
                        </div>

                    })
                }
            </div>
            {hasMore && <button className="px-6 py-2 mt-6 mb-24 font-bold bg-br-primary rounded-3xl" 
                onClick={() => {handleLoadMore()}}>Load More</button>}
        </div>
    )
}

export default Artists
