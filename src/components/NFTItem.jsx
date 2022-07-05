import React from "react";
import LoveIcon from "./SVGIcon/LoveIcon";

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

const NFTItem = ({ postDetails, token = false, index }) => {
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
    <div className="nft-item mb-2 overflow-hidden border border-solid border-Grey/40 rounded-lg group transition ease-in hover:shadow-NFT hover:scale-[1.02]">
      <div
        className="thumb relative pb-[100%] flex overflow-hidden"
        onClick={() => {
          if (id) linkToItem(postDetails);
        }}
      >
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
      <div className="flex justify-between px-3 py-4 shadow-sm details">
        <div className="w-3/5 pr-4 left">
          <div className="author max-w-[80%] flex">
            <p
              onClick={() => linkToUser(user)}
              className="text-xs text-Grey leading-[1] overflow-hidden whitespace-nowrap text-ellipsis"
            >
              {user?.fullname || "artist"}
            </p>
            <div className="badge">
              <svg
                className="w-[14px] h-[14px]"
                aria-label="verified-icon"
                fill="none"
                viewBox="0 0 30 30"
              >
                <path
                  className="VerifiedIcon--background"
                  d="M13.474 2.80108C14.2729 1.85822 15.7271 1.85822 16.526 2.80108L17.4886 3.9373C17.9785 4.51548 18.753 4.76715 19.4892 4.58733L20.9358 4.23394C22.1363 3.94069 23.3128 4.79547 23.4049 6.0278L23.5158 7.51286C23.5723 8.26854 24.051 8.92742 24.7522 9.21463L26.1303 9.77906C27.2739 10.2474 27.7233 11.6305 27.0734 12.6816L26.2903 13.9482C25.8918 14.5928 25.8918 15.4072 26.2903 16.0518L27.0734 17.3184C27.7233 18.3695 27.2739 19.7526 26.1303 20.2209L24.7522 20.7854C24.051 21.0726 23.5723 21.7315 23.5158 22.4871L23.4049 23.9722C23.3128 25.2045 22.1363 26.0593 20.9358 25.7661L19.4892 25.4127C18.753 25.2328 17.9785 25.4845 17.4886 26.0627L16.526 27.1989C15.7271 28.1418 14.2729 28.1418 13.474 27.1989L12.5114 26.0627C12.0215 25.4845 11.247 25.2328 10.5108 25.4127L9.06418 25.7661C7.86371 26.0593 6.6872 25.2045 6.59513 23.9722L6.48419 22.4871C6.42773 21.7315 5.94903 21.0726 5.24777 20.7854L3.86969 20.2209C2.72612 19.7526 2.27673 18.3695 2.9266 17.3184L3.70973 16.0518C4.10824 15.4072 4.10824 14.5928 3.70973 13.9482L2.9266 12.6816C2.27673 11.6305 2.72612 10.2474 3.86969 9.77906L5.24777 9.21463C5.94903 8.92742 6.42773 8.26854 6.48419 7.51286L6.59513 6.0278C6.6872 4.79547 7.86371 3.94069 9.06418 4.23394L10.5108 4.58733C11.247 4.76715 12.0215 4.51548 12.5114 3.9373L13.474 2.80108Z"
                ></path>
                <path
                  d="M13.5 17.625L10.875 15L10 15.875L13.5 19.375L21 11.875L20.125 11L13.5 17.625Z"
                  fill="white"
                  stroke="white"
                ></path>
              </svg>
            </div>
          </div>
          <div className="title">
            <h3 className="text-Dark text-xs tracking-[0.1px] font-semibold">
              {name}
            </h3>
          </div>
        </div>
        <div className="w-2/5 right">
          <div className="price">
            <p className="text-xs font-normal text-right text-Grey">Price</p>
            <div className="flex items-center justify-end currency-with-symbol">
              <div className="cursor-pointer symbol">
                {/* <div className="w-2 img">
                    <img
                      src="https://storage.opensea.io/files/6f8e2979d428180222796ff4a33ab929.svg"
                      alt="symbol"
                    />
                  </div> */}
              </div>
              <p className="ml-1 text-sm font-semibold text-Dark">
                {formatPrice(price, currency)}
              </p>
            </div>
          </div>
          <div className="time flex flex-row items-center justify-end text-[11px] text-Dark">
            <div className="mr-1 icon">
              <svg
                width="11px"
                height="11px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 19C10.067 19 8.31704 18.2165 7.05029 16.9498L12 12L12 5C15.866 5 19 8.13401 19 12C19 15.866 15.866 19 12 19Z"
                  fill="rgb(112, 122, 131)"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12ZM21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                  fill="rgb(112, 122, 131)"
                />
              </svg>
            </div>
            {/* {detail.time} left */}
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
        </div>
      </div>
      <div className="flex items-center justify-between p-3 bottom-area">
        <div
          onClick={() => {
            if (id) linkToItem(postDetails);
          }}
          className="invisible text-sm font-semibold transition ease-in opacity-0 text-Blue group-hover:opacity-100 group-hover:visible"
        >
          Buy Now
        </div>
        <div className="flex items-center justify-end text-sm love text-Grey">
          <LoveIcon />
          <span className="ml-1">3</span>
        </div>
      </div>
    </div>
  );
};

export default NFTItem;
