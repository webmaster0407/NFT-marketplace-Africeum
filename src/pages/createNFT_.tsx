
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Confirmation from '../components/NFT/Confirmation'
import NFTForm from '../components/NFT/NFTForm'
import Backdrop from '../components/Utilities/Backdrop'
import ItemCard from '../components/Utilities/ItemCard'
import Waiting from '../components/Utilities/Waiting'
import { zeroAddress } from '../config/constants'
import { useAuthState } from '../contexts/AuthContext'
import { useActiveWeb3React } from '../hooks'
import useLink from '../hooks/useLink'
import { ArtistModel, AssetType, NFTDataModel, NFTModel } from '../types/types'
import { toWei } from '../utils'
import { getAFCNFTAddress, getAFCTokenAddress } from '../utils/addressHelpers'
import { checkCanCreate } from '../utils/contracts'
import { assetType } from '../utils/helper'
import ipfs from '../utils/ipfsApi'
import {Buffer} from 'buffer';

const CreateNFT1 = () => {
    const { account, library } = useActiveWeb3React()
    const { user } = useAuthState()
    const { linkToItem } = useLink()
    const navigate = useNavigate()


    const [isProcessing, setIsProcessing] = useState(false)
    const [itemId, setItemId] = useState('')

    useEffect(()=>{
        console.log('CreateNFT:',user)
        if(!user?.image && user && account){
            toast.error("You didn't fill all artist information")
            navigate('/edit-profile')
        }
    },[user])

    // useEffect(()=>{
    //     if(!account){
    //         navigate('/')
    //     }
    // },[account])

    const AFCAddress = getAFCTokenAddress();

    const tempNFT: NFTModel = {
        id: 0,
        collection: getAFCNFTAddress(),
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

        if(isProcessing){
            return
        }
        
        updateNFTdata(formData)
        if(!account) {
            toast.error('Please connect to Wallet to create collectible')
            return
        }
        const {can, error} = await checkCanCreate(account, library);
        if(!can) {
            toast.error(error)
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
        const assetUploaded = await ipfs.add(Buffer.from(nftData.imageBuffer))

        console.log('assetUploaded:',assetUploaded,assetUploaded.path)
        const metaUploaded = await ipfs.add(Buffer.from(
            JSON.stringify({
              name: nftData.name,
              description: nftData.description,
              creator: account,
              type: nftData.type,
              image: `https://ipfs.io/ipfs/${assetUploaded.path}`
            }),
          ))

          console.log('metaUploaded:',metaUploaded)
        
        try {
            // const nftPrice = toWei(String(nftData.price))
            let nftPrice = toWei('0');

            console.log('AFC token price:',getAFCTokenAddress())

            if (nftData.currency == getAFCTokenAddress()) {
                nftPrice = toWei(String(nftData.price), 18);
            } else {
                nftPrice = toWei(String(nftData.price))
            }
            const tokenURI = `https://ipfs.io/ipfs/${metaUploaded.path}`;
            
            // const {transactionHash, itemId, error} = await mint(
            //     tokenURI,
            //     nftData.currency, 
            //     nftPrice, 
            //     nftData.auctionable ? 1 : nftData.count,
            //     nftData.auctionable, 
            //     nftData.auctionable ? nftData.startTime : 0,
            //     nftData.auctionable ? nftData.endTime : 0,
            //     toWei(String(nftData.requireAFC), 18),
            //     library.getSigner())

            // if(!error) {
            //     toast.success('Minted successfully.')
            //     setItemId(itemId)
            //     setIsProcessing(false)
            //     setConfirmed(true);
            // } else {
            //     toast.error('Failed to create Item')
            // }
        } catch(e) {
            console.log(e)
        }

        setIsProcessing(false)
    }

    const handleChange = (formData: NFTModel) => {
        updateNFTdata(formData)
    }

    const updateNFTdata = (formData: NFTModel) => {
        let updatedNFT: NFTModel = { ...formData, 
            owner: {
                fullname: user?.fullname,
                username: user?.username,
                image: user?.image,
            }
        }
        setNftData(updatedNFT);
    }

    const [confirmed, setConfirmed] = useState(false);

    const onConfirm = () => {
        setConfirmed(false)
        linkToItem({id: itemId})
    }

    return (
        <div className="mx-4 mt-[100px] lg:mx-auto lg:max-w-3xl  dark:text-white 2xl:max-w-4xl">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold lg:text-4xl  dark:text-white ">Create a collectible</h1>
                {/* {account && <button className="px-5 py-3 font-bold border border-gray-800 rounded-3xl" onClick={() => {navigate('/import')}}>Import NFT</button>} */}
            </div>
            {account ? <div className="flex flex-col justify-between lg:flex-row lg:items-start">
                <div className="flex-2 lg:pr-12 ">
                    <NFTForm isProcessing={isProcessing} onSubmit={(formData: NFTModel) => handleSubmit(formData)} onChangeData={(formData: NFTModel) => handleChange(formData)}/>
                </div>
                <div className="flex-1 mt-8" >
                    <p className="mb-3 font-bold text-left text-br-dark-blue  dark:text-white ">Preview</p>

                    <div className="flex">
                        <ItemCard nft={nftData} />
                    </div>
                </div> 
            </div> : <>
                <p className="mt-5">Please connect Wallet to create a collectible</p>
            </>}

            {confirmed && <Backdrop>
                <Confirmation onCancel={() => onConfirm()} isLive={true} name={nftData.name} type={nftData.type} image={nftData.image} itemId={itemId}
                text={nftData.description} />
            </Backdrop>}

            {isProcessing && <Waiting />}
        </div>
    )
}

export default CreateNFT1
