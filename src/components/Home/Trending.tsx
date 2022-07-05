import { useState } from 'react';
import useItems from '../../hooks/useItems';
import ItemCard from '../Utilities/ItemCard'

const Trending = () => {
    const [fetchParams, setFetchParams] = useState({
        sortBy: 'views',
        sortDir: 'desc',
        page: 0,
        perPage: 24
    })
    const { items, hasMore } = useItems(fetchParams)

    return (
        <div className="px-4 lg:px-0 mt-14 lg:mt-0">
            <h2 className="text-2xl font-bold text-left">Trending now</h2>
            <div className="flex flex-wrap justify-center mt-12 lg:justify-start" >
                {
                    items.map(item => {
                        return <div key={item.id} className="mb-10 lg:mr-8 2xl:mr-12">
                            <ItemCard nft={item} />
                        </div>

                    })
                }
            </div>
        </div>
    )
}

export default Trending
