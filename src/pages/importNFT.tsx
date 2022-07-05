import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Confirmation from '../components/NFT/Confirmation'
import NFTForm from '../components/NFT/NFTForm'
import NFTImportForm from '../components/NFT/NFTImportForm'
import Backdrop from '../components/Utilities/Backdrop'
import ItemCard from '../components/Utilities/ItemCard'
import Waiting from '../components/Utilities/Waiting'
import { zeroAddress } from '../config/constants'
import { useAuthState } from '../contexts/AuthContext'
import { useActiveWeb3React } from '../hooks'
import useLink from '../hooks/useLink'
import { ArtistModel, AssetType, NFTDataModel, NFTModel } from '../types/types'
import { toWei } from '../utils'
import { getAFCTokenAddress } from '../utils/addressHelpers'
import { importItem } from '../utils/contracts'
import { assetType } from '../utils/helper'
import ipfs from '../utils/ipfsApi'

const ImportNFT = () => {
    const { account, library } = useActiveWeb3React()
    const { user } = useAuthState()
    const navigate = useNavigate()
    const { linkToItem } = useLink()

    const [isProcessing, setIsProcessing] = useState(false)
    const [itemId, setItemId] = useState('')

    const AFCAddress = getAFCTokenAddress()

    const tempNFT: NFTModel = {
        id: 0,
        collection: '',
        tokenId: 0,
        name: 'Titile',
        description: 'Description',
        image: '/defaultArt.png',
        type: 'image/png',
        uri: '',
        creator: account,
        liked: '0',
        mintable: true,
        count: 1,
        price: '0',
        currency: AFCAddress,
        usdPrice: '0',
        auctionable: false,
        owner: null
    }

    const [nftData, setNftData] = useState<NFTModel>(tempNFT)
    
    const handleSubmit = async (formData: NFTModel) => {
        updateNFTdata(formData)
        if(!account) {
            toast.error('Please connect to Wallet to create collectible')
            return
        }
        if(!nftData.name || !nftData.description) {
            toast.error('Please input valid Title and Description')
            return
        }
        if(+nftData.price < 0) {
            toast.error('Please input valid Price')
            return
        }
        if(assetType(nftData.type) == AssetType.NONE) {
            toast.error('Please input valid Asset Type')
            return
        }
        if(!nftData.image) {
            toast.error('Please upload asset')
            return
        }

        
        //const assetBuffer = await new Response(formData.image).arrayBuffer()
        
        setIsProcessing(true)
        const metaUploaded = await ipfs.add(Buffer.from(
            JSON.stringify({
              name: nftData.name,
              description: nftData.description,
              creator: account,
              type: nftData.type,
              image: nftData.image
            }),
          ))
        
        try {
            let nftPrice = toWei('0');
            if (nftData.currency == getAFCTokenAddress()) {
                nftPrice = toWei(String(nftData.price), 18);
            } else {
                nftPrice = toWei(String(nftData.price))
            }
            const tokenURI = `https://ipfs.io/ipfs/${metaUploaded.path}`;
            
            const {transactionHash, itemId, error} = await importItem(
                nftData.collection,
                nftData.tokenId,
                nftData.currency, 
                nftPrice, 
                nftData.auctionable, 
                nftData.auctionable ? nftData.startTime : 0,
                nftData.auctionable ? nftData.endTime : 0,
                toWei(String(nftData.requireAFC), 18),
                library.getSigner())

            if(!error) {
                toast.success('Imported successfully.')
                setItemId(itemId)
                setIsProcessing(false)
                setConfirmed(true);
            } else {
                toast.error('Failed to import Item')
            }
        } catch(e) {
            console.log(e)
        }

        setIsProcessing(false)
    }

    const handleChange = (formData: NFTModel) => {
        updateNFTdata(formData)
    }

    const updateNFTdata = (formData: NFTModel) => {
        setNftData(prev => ({
            ...formData, 
            owner: {
                fullname: user?.fullname,
                username: user?.username,
                image: user?.image,
            }
        }));
    }
    
    const [confirmed, setConfirmed] = useState(false);

    const onConfirm = () => {
        setConfirmed(false)
        linkToItem({id: itemId})
    }

    return (
        <div className="mx-4 mt-[70px] lg:mx-auto lg:max-w-3xl 2xl:max-w-4xl">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold lg:text-4xl">Import a collectible</h1>
                {account && <button className="px-5 py-3 font-bold border border-gray-800 rounded-3xl" onClick={() => {navigate('/create')}}>Create NFT</button>}
            </div>
            {account ? <div className="flex flex-col justify-between lg:flex-row lg:items-start">
                <div className="flex-2 lg:pr-12 ">
                    <NFTImportForm onSubmit={(formData: NFTModel) => handleSubmit(formData)} onChangeData={(formData: NFTModel) => handleChange(formData)}/>
                </div>
                <div className="flex-1 mt-8" >
                    <p className="mb-3 font-bold text-left text-br-dark-blue">Preview</p>

                    <div className="flex">
                        <ItemCard nft={nftData} />
                    </div>
                </div>
            </div> : <>
                <p className="mt-5">Please connect Wallet to import a collectible</p>
            </>}
        

            {confirmed && <Backdrop>
                <Confirmation onCancel={() => onConfirm()} isLive={true} type={nftData.type} name={nftData.name} image={nftData.image}  itemId={itemId}
                text={nftData.description} /> 
            </Backdrop>}

            {isProcessing && <Waiting />}
        </div>
    )
}

export default ImportNFT
