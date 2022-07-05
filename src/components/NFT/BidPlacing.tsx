import { useEffect } from 'react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { DefaultAvatar } from '../../config/constants';
import { useActiveWeb3React } from '../../hooks';
import { useCoverBg } from '../../hooks/useCoverBg'
import useLink from '../../hooks/useLink';
import useTokenApproval from '../../hooks/useTokenApproval';
import useTokenBalance from '../../hooks/useTokenBalance';
import { NFTModel,AssetType } from '../../types/types';
import { toEth, toWei } from '../../utils';
import { approveToken } from '../../utils/contracts';
import { getBigNumber, nFormatter,assetType, } from '../../utils/helper';

const BidPlacing = ({ nft, onCancel, onConfirm }: BidPlacingModel) => {
    const { account, library } = useActiveWeb3React()
    const bgImage = useCoverBg(nft?.image || '/defaultArt.png');
    const balance = useTokenBalance(nft?.currency)
    const approved = useTokenApproval(nft?.currency)
    const { linkToUser } = useLink()
    const [enabled, setEnabled] = useState(false)
    
    const min = (nft.auctionable && nft?.lastBid?.isActive ? +nft.lastBid.price : +nft.price) * (11 **(18 - nft.currencyObj.decimals))
    const [amount, setAmount] = useState(String(min))
    const [minAmount, setMinAmount] = useState(Math.floor(min * 10 ** 8) / 10 ** 8)

    useEffect(() => {
        setEnabled(approved)
    }, [approved])

    const approve = async() => {
        await approveToken(nft.currency, account, library.getSigner())
        setEnabled(true)
    }

    const handleConfirm = (amount) => {
        const bidAmount = Math.floor(amount * 10 ** 8) / 10 ** 8
       
        if(getBigNumber(toWei(String(bidAmount))).lt(getBigNumber(toWei(String(minAmount))))) {
            toast.warning('Your bid amount should be bigger than current highest bid')
            return
        }
        onConfirm(bidAmount)
    }

    return (
        <div className="flex flex-col items-center w-full max-w-2xl p-10 mx-4 bg-white border-2 border-br-primary lg:w-auto lg:mx-0 rounded-2xl shadow-btnShadow lg:flex-row lg:items-stretch">
            <div>
                {/* <div className="w-40 h-40 rounded-2xl" style={bgImage}></div> */}
                    {assetType(nft.type) == AssetType.IMAGE && <img className='object-cover w-40 h-40 rounded-2xl' src={nft.image} alt="card-media" /> }
                    {assetType(nft.type) == AssetType.AUDIO && <div className="w-40 h-40 rounded-2xl">
                        <audio controls>
                            <source src={nft.image} type="audio/ogg" />
                            <source src={nft.image} type="audio/mpeg" />
                            Your browser does not support the audio element.
                        </audio>
                    </div> }
                    {assetType(nft.type) == AssetType.VIDEO && 
                        <video
                            // width="100%"
                            className='w-40 h-40 rounded-2xl'
                            autoPlay
                            controls
                            muted
                            preload="metadata"
                             loop  playsInline  controlsList="nodownload" disablePictureInPicture
                        >
                            <source src={`${nft.image}#t=0.5`} type="video/mp4" />
                            <source src={`${nft.image}#t=0.5`} type="video/ogg" />
                            Your browser does not support the video tag.
                        </video>
                    }

                <p className="mt-4 text-lg font-bold text-center lg:text-left">{nft.name}</p>
                <div className="flex justify-center mt-2 lg:justify-start" onClick={() => linkToUser(nft.creatorObj)}>
                    <img src={nft.creatorObj?.image || DefaultAvatar} alt="creator" width="24px" height="24px" className="object-cover mr-2 rounded-3xl" />
                    <span className="font-bold">@{nft?.creatorObj?.username}</span>
                </div>
            </div>
            <div className="hidden w-px min-h-full mx-10 bg-dark-10 lg:block"></div>
            <div className="mt-10 lg:mt-0">
                <h1 className="text-2xl font-bold text-left ">Place a bid</h1>
                <p className="mt-4 mb-8 font-bold text-left text-pink-600 ">You must bid over {nFormatter(minAmount, 6)} {nft.currencyObj?.symbol}</p>
                <ul>
                    <li className="flex items-center justify-between bg-dark-10 rounded-3xl">
                        <div className="flex flex-col flex-1">
                            <div className="relative flex items-center justify-between bg-white border-2 border-dark rounded-3xl">
                                <input onBlur={(e) => {setAmount(e.target.value)}} min={minAmount} className="flex-1 px-2 py-2 bg-white rounded-3xl" 
                                    type="number" id="amount" name="amount" defaultValue={minAmount} />
                                <span className="absolute font-bold right-10">{nft.currencyObj?.symbol}</span>
                            </div>
                        </div>
                    </li>
                    <li className="flex justify-between mt-4 text-gray-900">
                        <span>Your balance</span>
                        <span>{nFormatter(toEth(balance?.toString(), nft.currencyObj.decimals), 6)} {nft.currencyObj?.symbol}</span>
                    </li>
                </ul>
                <p className="mt-8 text-left text-br-gray-700">Once a bid is placed, it cannot be withdrawn.</p>
                <div className="flex justify-center mt-8 lg:ml-12">
                    <button onClick={() => onCancel()} className="px-5 py-2 mr-4 font-bold border border-br-primary rounded-3xl hover:bg-dark hover:text-white">Cancel</button>
                    {enabled ? <button onClick={() => handleConfirm(amount)} className="px-5 py-2 font-bold bg-gray-300 rounded-3xl hover:bg-gray-900 hover:text-white">Place bid</button>
                        : <button onClick={() => approve()} className="px-5 py-2 font-bold bg-gray-300 rounded-3xl hover:bg-gray-900 hover:text-white ">Approve</button>}
                </div>
            </div>

        </div>
    )
}

interface BidPlacingModel {
    nft: any,
    onCancel: Function,
    onConfirm: Function
}

export default BidPlacing
