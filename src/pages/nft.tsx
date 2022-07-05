import Transaction from '../components/NFT/Transaction'
import History from '../components/NFT/History'
import NFTList from '../components/NFT/NFTList'
import { useParams } from 'react-router-dom';
import useItemDetail from '../hooks/useItemDetail';

const NFT = () => {
    const { id }: any = useParams();
    const item = useItemDetail(id)
    return (
        <>
            {item ?  (<div className="max-w-sm px-4 mx-auto mt-12 lg:px-0 lg:mt-24 lg:max-w-large lg:w-full">
                <Transaction nft={item}/>
                <History nft={item}/>
                <NFTList/>
            </div>) : <></>}
        </>
    )
}

export default NFT
