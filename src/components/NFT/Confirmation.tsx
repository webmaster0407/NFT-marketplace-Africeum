
import { useCoverBg } from '../../hooks/useCoverBg'
import { NFTModel,AssetType } from '../../types/types';
import { getBigNumber, nFormatter,assetType, } from '../../utils/helper';

import {
    TwitterShareButton,
  } from "react-share";

const Confirmation = ({ isAuction = true, name, onCancel, image, text, itemId, isLive = false,type }: any) => {

    const bgImage = useCoverBg(image);

    return (
        <div className="relative flex flex-col items-center max-w-lg p-10 mx-4 text-black bg-white rounded-2xl shadow-btnShadow">
            <button onClick={() => onCancel()} className="absolute top-5 right-5">
                <img src="/close.svg" alt="close" width="24px" height="24px" />
            </button>

            {/* <div className="w-48 h-48 mt-4 rounded-2xl" style={bgImage}></div> */}

            {assetType(type) == AssetType.IMAGE && <img className='object-cover w-48 h-48 mt-4 rounded-2xl' src={image} alt="card-media" /> }
            {assetType(type) == AssetType.AUDIO && <div className="w-48 h-48 mt-4 rounded-2xl">
                <audio controls>
                    <source src={image} type="audio/ogg" />
                    <source src={image} type="audio/mpeg" />
                    Your browser does not support the audio element.
                </audio>
            </div> }
            {assetType(type) == AssetType.VIDEO && 
                <video
                    // width="100%"
                    className='w-48 h-48 mt-4 rounded-2xl'
                    autoPlay
                    controls
                    muted
                    preload="metadata"
                        loop  playsInline  controlsList="nodownload" disablePictureInPicture
                >
                    <source src={`${image}#t=0.5`} type="video/mp4" />
                    <source src={`${image}#t=0.5`} type="video/ogg" />
                    Your browser does not support the video tag.
                </video>
            }


            <h1 className="mt-10 text-2xl font-bold">{isLive ? 'Your NFT is now live!' : isAuction ? 'Your bid went through!' : `${name} is yours!`}</h1>
            <p className="mt-4">{text}</p>
            {/* {!isAuction && !isLive && <a className="flex items-center px-6 py-3 mt-8 font-bold bg-br-gray-200 rounded-3xl" 
                href={image} target="_blank" download>Download assets</a>} */}
            {!isAuction && !isLive && <TwitterShareButton 
                title={`I just bought "${name}" on AFC NFT Marketplace! Check my collection below!`}
                url={`https://nft.africeum.com/nft/${itemId}`}
                className="flex items-center px-6 py-3 mt-8 font-bold bg-br-primary rounded-3xl"
                >
                <img className="mr-2" src="/twitter.svg" alt="share on twitter" width="20px" height="17px" /> 
                Share your collection
            </TwitterShareButton>}    
            {isLive && <TwitterShareButton 
                title={`I just minted "${name}" on AFC NFT Marketplace! Check my creation below!`}
                url={`https://nft.africeum.com/nft/${itemId}`}
                className="flex items-center px-6 py-3 mt-8 font-bold bg-br-primary rounded-3xl"
                >
                <img className="mr-2" src="/twitter.svg" alt="share on twitter" width="20px" height="17px" /> 
                Share your creation
            </TwitterShareButton>}
        </div>
    )
}

export default Confirmation
