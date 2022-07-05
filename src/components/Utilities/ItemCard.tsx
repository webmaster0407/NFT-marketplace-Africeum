import { DefaultArt, DefaultAvatar } from '../../config/constants';
import useAuctionDuration from '../../hooks/useAuctionDuration';
import { useCoverBg } from '../../hooks/useCoverBg';
import useLikeButton from '../../hooks/useLikeButton';
import useLink from '../../hooks/useLink';
import { AssetType, NFTModel } from '../../types/types'
import { assetType, formatPrice, getSymbolFromAddressOrId } from '../../utils/helper';
import { Badge } from 'antd';
import { convertIamgeURL, convertJsonLinks, getObjectType } from '../../utils';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { getContract } from '../../utils/contracts';
import { placeholderContractABI } from '../../config/abi/common';
import { ethers } from 'ethers';
import { proxy1 } from '../../config/abi/common';
import { useActiveWeb3React } from '../../hooks';


const ItemCard = ({ nft, token1 = false, Onsale = false, created = false }: any) => {
    const {account} = useActiveWeb3React()
    const [nfts, setNFT] = useState({ ...nft })
    const temp1 = !Onsale ? nfts?.owner : nfts?.seller
    const [ownername, setOwnerName] = useState(temp1 ? temp1.substring(0, 20) + "......" + temp1.substring(35) : '')
    const coverBg = useCoverBg(convertIamgeURL(nfts.image))
    useEffect(() => {
        if (!nft?.created) {
            axios.post(proxy1 + '/api/getUserInfo', {
                payload: { wallet: temp1 }
            }).then((resp) => {
                const { data } = resp
                if (!data || data.length == 0)
                    setOwnerName(temp1 ? temp1.substring(0, 20) + "......" + temp1.substring(35) : '')
                else setOwnerName(data[0].name)
            })
            axios.post(proxy1 + '/api/getCollectionById', {
                params: { collectionid: (nft.collectionId ? nft.collectionId : nft.id.split("=")[1].split('&')[0]) }
            }).then((resp) => {
                const { data } = resp
                setNFT((prev) => ({ ...prev, logoURL: data.logoURL }))
            })
        }
    }, [nft])

    useEffect(() => {
        if (Onsale) {
            setTimeout(async () => {
                if(!account){
                    const {data} = await axios.post(proxy1 + "/api/getAllNFTs",{
                      payload : {
                        restriction : [],
                        lastVisible : '',
                        limit : 1,
                        token : nft.tokenId
                      }
                    })
                    setNFT((prev) => ({ ...prev, ...data[0], tokenID : nft.tokenId, id:"collectionid=" + nft.collectionId + "&token=" + nft.tokenId  }))
                    return
                  }
                const contract = getContract(nft.contractAddress, placeholderContractABI, new ethers.providers.Web3Provider(window.ethereum).getSigner())
                const jsonLink = await contract.tokenURI(nft.tokenId)
                const owner = await contract.ownerOf(nft.tokenId)
                const newLink = convertJsonLinks(jsonLink)
                if (getObjectType(newLink) == "string") {
                    try {
                        const { data } = await axios.get(newLink)
                        data.tokenID = nft.tokenId
                        data.owner = owner
                        data.id = "collectionid=" + nft.collectionId + "&token=" + nft.tokenId
                        setNFT((prev) => ({ ...prev, ...data }))
                    } catch (e) {
                        if (e.toString().search('Network Error') != -1) {
                            const { data } = await axios.post(proxy1 + '/api/getCorsURLs', { payload: newLink })
                            data.tokenID = nft.tokenId
                            data.owner = owner
                            data.id = "collectionid=" + nft.collectionId + "&token=" + nft.tokenId
                            setNFT((prev) => ({ ...prev, ...data }))
                        }
                    }
                } else {
                    newLink.tokenID = nft.tokenId
                    newLink.owner = owner
                    newLink.id = "collectionid=" + nft.collectionId + "&token=" + nft.tokenId
                    setNFT((prev) => ({ ...prev, ...newLink }))
                }
            }, 0);
        } else if (created) {
            setTimeout(async () => {
                const temp = await axios.post(proxy1 + '/api/getCollectionById', {
                    params: { collectionid: nft.collectionId }
                })
                const collection = temp.data
                const contract = getContract(collection.contractAddress, placeholderContractABI, new ethers.providers.Web3Provider(window.ethereum).getSigner())
                const owner = await contract.ownerOf(Number(nft.itemId.hex))
                const newLink = convertJsonLinks(nft.tokenURI)
                if (getObjectType(newLink) == "string") {
                    try {
                        const { data } = await axios.get(newLink)
                        data.tokenID = Number(nft.itemId.hex)
                        data.owner = owner
                        data.logoURL = collection.logoURL
                        data.id = "collectionid=" + nft.collectionId + "&token=" + Number(nft.itemId.hex)
                        setNFT((prev) => ({ ...prev, ...data }))
                    } catch (e) {
                        if (e.toString().search('Network Error') != -1) {
                            const { data } = await axios.post(proxy1 + '/api/getCorsURLs', { payload: newLink })
                            data.tokenID = Number(nft.itemId.hex)
                            data.owner = owner
                            data.logoURL = collection.logoURL
                            data.id = "collectionid=" + nft.collectionId + "&token=" + Number(nft.itemId.hex)
                            setNFT((prev) => ({ ...prev, ...data }))
                        }
                    }
                } else {
                    newLink.tokenID = Number(nft.itemId.hex)
                    newLink.owner = owner
                    newLink.logoURL = collection.logoURL
                    newLink.id = "collectionid=" + nft.collectionId + "&token=" + Number(nft.itemId.hex)
                    setNFT((prev) => ({ ...prev, ...newLink }))
                }
                axios.post(proxy1 + '/api/getUserInfo', {
                    payload: { wallet: owner }
                }).then((resp) => {
                    const { data } = resp
                    if (!data || data.length == 0)
                        setOwnerName(owner ? owner.substring(0, 20) + "......" + owner.substring(35) : '')
                    else setOwnerName(data[0].name)
                })

            }, 0);
        }
    }, [])
    const temp = (<>
        <div className={"w-full bg-white dark:bg-gray-600 border border-gray-300 rounded-3xl"} >
            <div className="flex items-center rounded-t-3xl h-72" style={coverBg}></div>
            {nfts.logoURL && <img className='p-1 w-20 h-20 rounded-[1000px] -mt-10 ml-2 bg-white border border-gray-400' src={nfts.logoURL}></img>}
            <div className='flex flex-col justify-end py-4'>
                <span className='flex w-full text-2xl justify-center font-bold dark:text-white'>
                    {nfts.name}
                </span>
                <span className='flex justify-end text-xl px-4 mb-2 dark:text-gray-300'>
                    {nfts?.price && <span className='flex w-full justify-start text-xl font-bold px-4 mb-2 dark:text-gray-300'>
                        {nfts?.price}AFC
                    </span>}
                    #{nfts.tokenID || Number(nfts.tokenId.hex)}
                </span>
                <span className=' flex justify-end px-2 dark:text-gray-300' placeholder={nfts.owner}>{ownername}</span>
            </div>
        </div>
    </>)
    return (<a key={nfts?.id} href={"/items?" + nfts?.id} className=" dark:bg-gray-600 w-full mr-8 cursor-pointer roadmapb active rounded-3xl  md:max-w-xs hover:opacity-80">
        {Onsale ? (<Badge.Ribbon text={!nfts.auction ? 'Fix' : 'Auction'} color={!nfts.auction ? 'volcano' : 'cyan'}>
            {nfts.logoURL && temp}
        </Badge.Ribbon>)
            : (<>{nfts.logoURL && temp}</>)
        }</a>)

}

export default ItemCard
