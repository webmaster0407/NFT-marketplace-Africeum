import React from "react";

import { DefaultArt, DefaultAvatar } from "../config/constants";
import useAuctionDuration from "../hooks/useAuctionDuration";
import { useCoverBg } from "../hooks/useCoverBg";

import useLikeButton from "../hooks/useLikeButton";
import useLink from "../hooks/useLink";

import { AssetType, NFTModel } from "../types/types";
import {
  assetType,
  formatPrice,
  getSymbolFromAddressOrId,
} from "../utils/helper";

function NFTItemsCard({ postDetails, token = false, index }) {
  const {
    id,
    name,
    auctionable,
    price,
    currencyObj,
    likes,
    image,
    type,
    user,
    selfLiked,
    startTime,
    endTime,
    currency,
  } = postDetails;
  const { status, statusInfo, state } = useAuctionDuration(
    auctionable ? startTime : 0,
    auctionable ? endTime : 0
  );
  const { didLike, localLikeCount, like } = useLikeButton(postDetails);
  const { linkToItem, linkToUser } = useLink();

  const userBg = useCoverBg(user?.image || DefaultAvatar);
  const coverBg = useCoverBg(image);
  const defaultBg = useCoverBg(DefaultArt);

  return (
    <div className={`NFTItemsCard w-full transition ease-in count-${index}`}>
      <div className="h-fit rounded-[22px] bg-white border border-solid border-opacity-10 border-white relative cursor-pointer shadow-md transition ease-in hover:-translate-y-3">
        <div
          className="block p-4 overflow-hidden"
          onClick={() => {
            if (id) linkToItem(postDetails);
          }}
        >
          <div className="media-wrap overflow-hidden rounded-[22px] object-contain relative shadow-sm w-full pb-[100%]">
            {assetType(type) == AssetType.NONE && (
              <div
                className="flex items-center mx-4 rounded-3xl h-72"
                style={defaultBg}
              ></div>
            )}
            {assetType(type) == AssetType.IMAGE && (
              <img
                className="absolute top-0 left-0 object-cover w-full"
                src={image || DefaultArt}
                alt="card-media"
              />
            )}
            {assetType(type) == AssetType.AUDIO && (
              <div className="flex items-center rounded-3xl h-72">
                <audio controls>
                  <source src={image} type="audio/ogg" />
                  <source src={image} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              </div>
            )}
            {assetType(type) == AssetType.VIDEO && (
              <video
                // width="100%"
                className="absolute top-0 left-0 w-full h-full"
                autoPlay
                controls
                muted
                preload="metadata"
                loop
                playsInline
                controlsList="nodownload"
                disablePictureInPicture
              >
                <source src={`${image}#t=0.5`} type="video/mp4" />
                <source src={`${image}#t=0.5`} type="video/ogg" />
                Your browser does not support the video tag.
              </video>
            )}
          </div>

          <div className="card-details p-[10px] relative">
            <div className="my-4 title">
              <h2 className="overflow-hidden text-lg font-bold whitespace-nowrap text-ellipsis text-primaryBlack">
                {name} - #{id}
              </h2>
            </div>
            <div className="nft-price flex items-end justify-between pb-[15px] mb-[15px] border-b border-solid border-black border-opacity-20">
              <div className="text-left bid">
                <p className="label text-primaryBlack text-xs mb-[5px] font-medium opacity-60">
                  Current bid
                </p>
                <h4 className="text-xs font-bold text-primaryBlack">
                  {formatPrice(price, currency)}
                </h4>
              </div>
              {auctionable && (
                <div className="text-right time">
                  <p className="label text-primaryBlack text-xs mb-[5px] font-medium opacity-60">
                    Ends in
                  </p>
                  <h4 className="text-xs font-bold text-primaryBlack">
                    {state?.days}d {state?.hours}h {state?.minutes}m{" "}
                    {state?.seconds}s
                  </h4>
                </div>
              )}
            </div>

            <div className="flex flex-wrap w-full nft-creator-owner">
              <div
                onClick={() => linkToUser(user)}
                className="flex items-center w-1/2 pr-1 creator"
              >
                <div
                  className="flex overflow-hidden rounded-full head w-11 h-11"
                  style={userBg}
                >
                  {/* <img className='object-cover w-full h-full' src={creator.image} alt="creator" /> */}
                </div>

                <div className="info ml-[10px]">
                  <p className="text-[10px] text-primaryBlack font-medium opacity-60">
                    Creator
                  </p>
                  <p className="text-[10px] text-primaryBlack font-medium">
                    {user?.username || "artist"}
                  </p>
                </div>
              </div>
              <div
                onClick={() => linkToUser(user)}
                className="flex items-center w-1/2 pl-1 owner"
              >
                <div
                  className="flex overflow-hidden rounded-full head w-11 h-11"
                  style={userBg}
                >
                  {/* <img className='object-cover w-full h-full' src={owner.image} alt="owner" /> */}
                </div>
                <div className="info ml-[10px]">
                  <p className="text-[10px] text-primaryBlack font-medium opacity-60">
                    Owner
                  </p>
                  <p className="text-[10px] text-primaryBlack font-medium">
                    {user?.username || "artist"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NFTItemsCard;
