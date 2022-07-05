import { useEffect } from 'react';
import { useState } from 'react';
import useItems from '../../hooks/useItems';
import ItemCard from '../Utilities/ItemCard';

const Explore = () => {
    const [fetchParams, setFetchParams] = useState({
        sortBy: 'createdAt',
        sortDir: 'desc',
        page: 0,
        perPage: 24
    })

    const { items, hasMore } = useItems(fetchParams)

    const handleSortBy = (value) => {
        if(value == '0') {
            setFetchParams(prev => ({
                ...prev,
                sortBy: 'createdAt',
                sortDir: 'desc',
                page: 0,
            }))
        } else if(value == '1') {
            setFetchParams(prev => ({
                ...prev,
                sortBy: 'createdAt',
                sortDir: 'asc',
                page: 0
            }))
        } else if(value == '2') {
            setFetchParams(prev => ({
                ...prev,
                sortBy: 'views',
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
        <div className="px-4 mt-32 lg:px-0">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-left">Explore all</h2>
                <div className="flex items-center">
                    <p className="w-20 mr-4">Sort by</p>
                    <div className="w-full mt-2 text-black bg-br-gray rounded-3xl">
                        <select className={"px-4 py-3 pr-6 w-full customSelect rounded-3xl"} onChange={(e) => {handleSortBy(e.target.value)}}>
                            <option value="0">Newest First</option>
                            <option value="1">Oldest First</option>
                            <option value="2">Viewer Count</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className="flex flex-wrap justify-center mt-12 lg:justify-start" >
                {
                    items.map(item => {
                        return <div key={item.id} className="mb-10 lg:mr-8 2xl:mr-12">
                            <ItemCard nft={item} />
                        </div>

                    })
                }
            </div>
            {hasMore && <button className="px-6 py-2 mt-6 mb-24 font-bold bg-br-primary rounded-3xl" 
                onClick={() => {handleLoadMore()}}>Load More</button>}
        </div>
    )
}

export default Explore
