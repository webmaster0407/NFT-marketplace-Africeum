import { useParams } from 'react-router-dom';
import useSimilarItems from '../../hooks/useSimilarItems';
import ItemCard from '../Utilities/ItemCard';

const NFTList = () => {
    const { id }: any = useParams()
    const items = useSimilarItems(id)

    return (
        <div className="px-4 mb-20 lg:px-0 mt-28">
            <h2 className="text-2xl font-bold text-left">You may also like</h2>
            <div className="flex flex-wrap justify-center mt-12 lg:justify-start lg:-mx-4 2xl:-mx-4" >
                {
                    items.map(item => {
                        return <div key={item.id} className="mb-10 lg:mx-4 2xl:mx-4">
                            <ItemCard nft={item} />
                        </div>

                    })
                }
            </div>
        </div>
    )
}

export default NFTList
