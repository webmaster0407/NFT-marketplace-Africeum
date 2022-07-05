import {
    FacebookShareButton,
    TwitterShareButton,
    TelegramShareButton,
    EmailShareButton,
    TwitterIcon,
    FacebookIcon,
    TelegramIcon,
    EmailIcon
  } from "react-share";

const Share = ({onCancel }: ShareModel) => {
    const shareUrl = 'https://www.africeumnft.com'
    const title = 'AFC NFT'
    const hashtags = ['AFC NFT', 'NFT', 'AFC Token']
  
    return (
        <div className="z-50 flex flex-col items-center w-full max-w-xl p-10 mx-4 bg-white border border-gray-900 lg:w-auto lg:mx-0 rounded-2xl shadow-btnShadow lg:flex-row lg:items-stretch">
            <div className="mt-10 lg:mt-0">
                <h1 className="text-2xl font-bold text-left">Share link to this page</h1>
                <div className="mt-5">
                    <TwitterShareButton
                        url={shareUrl}
                        title={'title'}
                        hashtags={hashtags}
                        className="mr-2"
                    >
                        <TwitterIcon size={35} round />
                    </TwitterShareButton>
                    <FacebookShareButton
                        url={shareUrl}
                        quote={'title'}
                        className="mr-2"
                    >
                        <FacebookIcon size={35} round />
                    </FacebookShareButton>
                    <TelegramShareButton
                        url='https://t.me/'
                        title={'title'}
                        className="mr-2"
                    >
                        <TelegramIcon size={35} round />
                    </TelegramShareButton>
                </div>
                <div className="flex justify-center mt-3">
                    <button onClick={() => onCancel()} className="px-5 py-2 mr-4 font-bold border border-gray-700 rounded-3xl">Cancel</button>
                </div>
            </div>
        </div>
    )
}

interface ShareModel {
    onCancel: Function
}

export default Share
