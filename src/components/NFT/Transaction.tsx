import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { DefaultArt, DefaultAvatar } from '../../config/constants';
import { useActiveWeb3React } from '../../hooks';
import useAuctionDuration from '../../hooks/useAuctionDuration';
import { useCoverBg } from '../../hooks/useCoverBg'
import useLikeButton from '../../hooks/useLikeButton';
import useLink from '../../hooks/useLink';
import { AssetType } from '../../types/types';
import { acceptWinningBid, buy, placeABid } from '../../utils/contracts';
import { assetType, formatPrice, formatPriceUsd, nFormatter, toWei } from '../../utils/helper';
import Backdrop from '../Utilities/Backdrop';
import Waiting from '../Utilities/Waiting';
import BidPlacing from './BidPlacing';
import Checkout from './Checkout';
import Confirmation from './Confirmation';

const Transaction = ({nft}) => {
    const { account, library } = useActiveWeb3React()
    const navigate = useNavigate();

    const coverBg = useCoverBg(nft?.image);
    const defaultBg = useCoverBg(DefaultArt)


    const [showCheckoutModal, setShowCheckoutModal] = useState(false);
    const [showBidPlacingModal, setShowBidPlacingModal] = useState(false);
    const [confirmed, setConfirmed] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);

    const [sold, setSold] = useState(false);
    const [acceptable, setAcceptable] = useState(false);
    const [bidDisabled, setBidDisabled] = useState(true);
    const [isAuction, setIsAuction] = useState(false);

    const handleConfirmation = async(amount = 0) => {
        setIsProcessing(true)

        console.log('handleConfirmation:',isAuction,nft)

        try {
            if (isAuction) {
                setShowBidPlacingModal(false);
                const {result, error} = await placeABid(nft, toWei(amount), account, library.getSigner())

                if(!error && result) {
                    toast.success('Successfully Bid!')
                    setIsProcessing(false)
                    navigate('/');
                }
                else {
                    toast.error(error)
                    setIsProcessing(false)
                    return
                }
            } else {
                setShowCheckoutModal(false);
                const {result, error} = await buy(nft, toWei(nft.price), account, library.getSigner())

                if(!error && result) {
                    toast.success('Successfully bought!')
                    setIsProcessing(false)
                    setConfirmed(true);
                    setSold(true);
                }
                else {
                    toast.error(error)
                    setIsProcessing(false)
                    return
                }
            }
        } catch(e) {
            console.log(e)
            setIsProcessing(false)
        }
    }

    const handleAcceptBid = async() => {
        setIsProcessing(true)
        const {result, error} = await acceptWinningBid(nft.id, library.getSigner())

        if(!error && result) {
            toast.success('Successfully accpeted!')
            setIsProcessing(false)
            setSold(true);
        }
        else {
            toast.error(error)
            setIsProcessing(false)
            return
        }
    }

    useEffect(() => {
        nft.auctionable ? setIsAuction(true) : setIsAuction(false);
        setSold(nft?.isSold || false)

        setAcceptable(nft
            && nft.auctionable
            && account && account.toLowerCase() === nft.creator
            && nft.endTime * 1000 < new Date().getTime())

        setBidDisabled(!nft
            || !nft.auctionable
            || nft.isSold
            || !account
            || nft.endTime * 1000 < new Date().getTime())
    }, [nft]);

    //console.log(nft)
    const {status, statusInfo, state} = useAuctionDuration(nft.auctionable ? nft?.startTime : 0, nft.auctionable ? nft?.endTime : 0)
    const { didLike, localLikeCount, like } = useLikeButton(nft)
    const { linkToItem, linkToUser, linkToCollection } = useLink()

    return (
        <div className="">
            {isAuction && <div className="w-20 px-1 py-1 mb-8 text-sm text-white bg-black rounded-2xl">Auction</div>}
            <div className="flex flex-col lg:flex-row">
                <div className="flex flex-col flex-1 order-2 mt-8 lg:items-start lg:pr-10 lg:order-1 lg:mt-0">
                    <div className="flex items-center self-stretch justify-between">
                        <h1 className="text-4xl font-bold">{nft?.name}</h1>
                        <div className="flex items-center px-3 py-1 border border-gray-300 rounded-3xl" onClick={() => like()}>
                            {didLike ? <img src="/love_liked.svg" alt="favourite count" width="17px" height="15px" className="mr-1"/>
                            : <img src="/love.svg" color='white' alt="favourite count" width="17px" height="15px" className="mr-1"/>}
                            <span>{localLikeCount}</span>
                        </div>
                    </div>
                    <div className="flex mt-3 cursor-pointer" onClick={() => {linkToUser(nft.creatorObj)}}>
                        <img src={nft.creatorObj?.image || DefaultAvatar} alt="creator" width="24px" height="24px" className="object-cover mr-2 rounded-3xl" />
                        <span className="font-bold">@{nft.creatorObj?.username}</span>
                    </div>
                    <p className="mt-6 text-left">
                        {nft.description}
                    </p>

                    <div className="flex flex-col items-center justify-center px-20 py-8 mt-10 border border-gray-200 shadow-nftTxnShadow rounded-3xl">
                        <p className="mb-2 font-bold">{`${nft.count} of ${nft.totalCount || 0} editions available`}</p>
                        <p className="font-bold">{isAuction ? 'Current bid' : 'List price'}</p>
                        {isAuction && nft.lastBid.isActive ? <>
                            <p className="mt-2 text-4xl font-bold">{formatPrice(nft.lastBid.price, nft.currency)}</p>
                            <p className="text-gray-500">${formatPriceUsd(nft.lastBid.price, nft.currency, nft.currencyObj?.usdPrice)}</p>
                        </> : <>
                            <p className="mt-2 text-4xl font-bold">{formatPrice(nft.price, nft.currency)}</p>
                            <p className="text-gray-500">${formatPriceUsd(nft.price, nft.currency, nft.currencyObj?.usdPrice)}</p>
                        </>}
                        {!isAuction && (nft.isSold || +nft.count <= 0) && <p className="mt-6 font-bold">This NFT has sold out</p>}
                        {isAuction && <p className="mt-6 font-bold">{statusInfo}</p>}
                        {isAuction && status != 'ended' && <div className="flex mt-2">
                            <div className="flex flex-col">
                                <p className="text-4xl font-bold">{state.days}</p>
                                <p className="mt-1 text-gray-500">Days</p>
                            </div>
                            <div className="flex flex-col mx-4">
                                <p className="text-4xl font-bold">{state.hours}</p>
                                <p className="mt-1 text-gray-500">Hours</p>
                            </div>
                            <div className="flex flex-col mx-4">
                                <p className="text-4xl font-bold">{state.minutes}</p>
                                <p className="mt-1 text-gray-500">Minutes</p>
                            </div>
                            <div className="flex flex-col">
                                <p className="text-4xl font-bold">{state.seconds}</p>
                                <p className="mt-1 text-gray-500">Seconds</p>
                            </div>
                        </div>}
                    </div>
                    <div className="flex justify-center mt-8 mb-4">
                        {!sold && <div>
                            {!isAuction &&
                                <button className="px-6 py-3 mr-4 font-bold bg-br-primary rounded-3xl" disabled={nft.isSold || !account}
                                    onClick={() => setShowCheckoutModal(true)} >Place an order</button>}
                            {isAuction && !bidDisabled &&
                                <button className="px-6 py-3 mr-4 font-bold bg-br-primary rounded-3xl" disabled={bidDisabled}
                                    onClick={() => setShowBidPlacingModal(true)} >Place a bid</button>}
                            {acceptable &&
                                <button className="px-6 py-3 mr-4 font-bold bg-br-primary rounded-3xl"
                                    onClick={() => handleAcceptBid()} >Accept a bid</button>}

                        </div>}
                        {sold && !isAuction && <a className="flex items-center px-8 py-3 mr-4 font-bold text-black bg-br-gray-200 rounded-3xl"
                            href={nft.image} target="_blank"  download>Download</a>}
                        {/* {sold && isAuction && <button className="px-8 py-3 mr-4 font-bold bg-br-gray-200 rounded-3xl">Increase bid</button>} */}

                        <button className="px-5 py-3 font-bold border border-gray-200 rounded-3xl" onClick={() => linkToCollection(nft.collectionId)}>View Etherscan</button>
                    </div>
                </div>
                <div className="flex-1 order-1 rounded-2xl lg:max-w-large lg:pl-10 lg:order-2">
                    <div className="w-full rounded-3xl">
                        {assetType(nft?.type) == AssetType.NONE && <div className="flex items-center rounded-3xl h-72" style={defaultBg}></div> }
                        {/*{assetType(nft?.type) == AssetType.IMAGE && <div className="flex items-center rounded-3xl h-72" style={coverBg}></div> }*/}
                        {assetType(nft?.type) == AssetType.IMAGE && <div className="overflow-hidden rounded-3xl"><img className="object-fit" src={nft.image}/></div> }
                        {assetType(nft?.type) == AssetType.AUDIO && <div className="flex items-center rounded-3xl">
                            <audio controls>
                                <source src={nft?.image} type="audio/ogg" />
                                <source src={nft?.image} type="audio/mpeg" />
                                Your browser does not support the audio element.
                            </audio>
                        </div> }
                        {assetType(nft?.type) == AssetType.VIDEO && <div className="flex items-center rounded-3xl h-72">
                            <video
                                width="100%"
                                autoPlay
                                controls
                                muted
                                preload="metadata"
                            >
                                <source src={`${nft?.image}#t=0.5`} type="video/mp4" />
                                <source src={`${nft?.image}#t=0.5`} type="video/ogg" />
                                Your browser does not support the video tag.
                            </video>
                        </div> }
                    </div>
                </div>
            </div>
            {showCheckoutModal && <Backdrop>
                <Checkout nft={'nft'} onConfirm={() => handleConfirmation()} onCancel={() => setShowCheckoutModal(false)} />
            </Backdrop>}

            {showBidPlacingModal && <Backdrop>
                <BidPlacing nft={'nft'} onConfirm={(amount) => handleConfirmation(amount)} onCancel={() => setShowBidPlacingModal(false)} />
            </Backdrop>}

            {confirmed && <Backdrop>
                <Confirmation onCancel={() => setConfirmed(false)} isAuction={isAuction} name={nft.name} type={nft.type} image={nft.image} text={nft.description} itemId={nft.id} />
            </Backdrop>}

            {isProcessing && <Waiting />}
        </div>
    )
}

export default Transaction
