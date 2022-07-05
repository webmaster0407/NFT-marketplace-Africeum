import { useEffect } from 'react';
import { useState } from 'react';
import { useActiveWeb3React } from '../../hooks';
import { useCoverBg } from '../../hooks/useCoverBg'
import useTokenApproval from '../../hooks/useTokenApproval';
import useTokenBalance from '../../hooks/useTokenBalance';
import { toEth } from '../../utils';
import { approveToken } from '../../utils/contracts';
import { nFormatter,assetType } from '../../utils/helper';
import { NFTModel,AssetType } from '../../types/types';

const Checkout = ({ nft, onCancel, onConfirm }: CheckoutModel) => {
    const { account, library } = useActiveWeb3React()
    const bgImage = useCoverBg(nft.image || '/defaultArt.png');
    const balance = useTokenBalance(nft?.currency)
    const approved = useTokenApproval(nft.currency)
    const [enabled, setEnabled] = useState(false)

    useEffect(() => {
        setEnabled(approved)
    }, [approved])

    const approve = async() => {
        await approveToken(nft.currency, account, library.getSigner())
        setEnabled(true)
    }

    return (
        <div className="flex flex-col items-center w-full max-w-xl p-10 mx-4 bg-white border-2 border-br-primary text-dark lg:w-auto lg:mx-0 rounded-2xl shadow-btnShadow lg:flex-row lg:items-stretch">
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

            <div className="hidden w-px min-h-full mx-10 bg-gray-200 lg:block"></div>
            <div className="mt-10 lg:mt-0">
                <h1 className="text-2xl font-bold text-left">Checkout</h1>
                <p className="mt-4 mb-8 text-left">You are about to purchase <br /><strong>{nft.name}</strong></p>
                <ul>
                    <li className="flex justify-between font-bold">
                        <span>{nft.price} {nft.currencyObj.symbol}</span>
                        <span>~${nFormatter(nft.currencyObj?.usdPrice * nft.price, 5)}</span>
                    </li>
                    <li className="flex justify-between mt-4 text-gray-900">
                        <span>Your balance</span>
                        <span>{nFormatter(toEth(balance?.toString(), nft.currencyObj.decimals), 6)} {nft.currencyObj.symbol}</span>
                    </li>
                </ul>
                <div className="flex justify-center mt-8 lg:ml-12">
                    <button onClick={() => onCancel()} className="px-5 py-2 mr-4 font-bold border border-br-primary rounded-3xl hover:bg-gray-900 hover:text-white">Cancel</button>
                    {enabled ? <button onClick={() => onConfirm()} className="px-5 py-2 font-bold bg-gray-200 rounded-3xl hover:bg-gray-900 hover:text-white">Confirm</button>
                        : <button onClick={() => approve()} className="px-5 py-2 font-bold bg-gray-200 rounded-3xl hover:bg-gray-900 hover:text-white">Approve</button>}
                </div>
            </div>

        </div>
    )
}

interface CheckoutModel {
    nft: any,
    onCancel: Function,
    onConfirm: Function
}

export default Checkout
