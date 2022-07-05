import { DefaultArt, DefaultAvatar } from '../../config/constants';
import useAuctionDuration from '../../hooks/useAuctionDuration';
import { useCoverBg } from '../../hooks/useCoverBg';
import useLikeButton from '../../hooks/useLikeButton';
import useLink from '../../hooks/useLink';
import { AssetType, NFTModel } from '../../types/types'
import { assetType, formatPrice, getSymbolFromAddressOrId } from '../../utils/helper';
import { Badge } from 'antd';
import { convertIamgeURL, convertJsonLinks, getObjectType, toEth } from '../../utils';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { getContract, getNFTContract } from '../../utils/contracts';
import { placeholderContractABI } from '../../config/abi/common';
import { ethers } from 'ethers';
import { proxy1 } from '../../config/abi/common';
import { getAFCTokenAddress } from '../../utils/addressHelpers';


const CreatedCard = ({ nft, token1 = false, Onsale = false }: any) => {
    const [nfts, setNFT] = useState({ ...nft })
    const [ownername, setOwnerName] = useState("Not Minted")
    const coverBg = useCoverBg(convertIamgeURL(nfts.image))
    useEffect(() => {
        axios.post(proxy1 + '/api/getCollectionById', {
            params: { collectionid: nft.collectionId }
        }).then((resp) => {
            const { data } = resp
            setNFT((prev) => ({ ...prev, logoURL: data.logoURL }))
        })
    }, [nft])

    useEffect(() => {
        setTimeout(async () => {
            const contract = getNFTContract(new ethers.providers.Web3Provider(window.ethereum).getSigner())
            const itemInfo = await contract.items(Number(nft.itemId.hex))
            console.log(itemInfo)
            if (itemInfo.isSold) {
                setOwnerName("Sold..")
            } else {
                if (nft.count == Number(itemInfo.count._hex)) {
                    setOwnerName('Created..')
                } else {
                    setOwnerName("Selling..")
                }
            }
            const { data } = await axios.get(nft.tokenURI)
            data.id = "collectionId=" + nft.collectionId + "&item=" + Number(nft.itemId.hex)
            setNFT((prev) => ({ ...prev, ...data, price: (itemInfo.price), count:Number(itemInfo.count._hex) }))
        }, 0)
    }, [nft])

    const temp = (<>
        <div className={"w-full bg-white dark:bg-gray-600 border border-gray-300 rounded-3xl"} >
            <div className="flex items-center rounded-t-3xl h-72" style={coverBg}></div>
            {nfts.logoURL && <img className='p-1 w-20 h-20 rounded-[1000px] -mt-10 ml-2 bg-white border border-gray-400' src={nfts.logoURL}></img>}
            <div className='flex flex-col justify-end py-4'>
                <span className='flex w-full text-2xl justify-center font-bold dark:text-white'>
                    {nfts.name}
                </span>
                <span className='flex flex-row justify-end text-xl px-4 mb-2 dark:text-gray-300'>
                    {nfts?.count >0 && <span className='flex w-full justify-start text-xl font-bold px-4 mb-2 dark:text-gray-300'>
                         {nfts?.count} Items
                    </span>}
                    {nfts?.price ? <span className='flex w-full justify-end'>{formatPrice(toEth(nfts?.price), getAFCTokenAddress())}</span> : ''}
                </span>
                <span className=' flex justify-end px-2 dark:text-gray-300' placeholder={nfts.owner}>{ownername}</span>
            </div>
        </div>
    </>)
    return (<a key={nfts?.id} href={"/createdItem?" + nfts?.id} className=" dark:bg-gray-600 w-full mr-8 cursor-pointer roadmapb active rounded-3xl  md:max-w-xs hover:opacity-80">
        {Onsale ? (<Badge.Ribbon text={!nfts.auction ? 'Fix' : 'Auction'} color={!nfts.auction ? 'volcano' : 'cyan'}>
            {temp}
        </Badge.Ribbon>)
            : (<>{temp}</>)
        }</a>)

}

export default CreatedCard
