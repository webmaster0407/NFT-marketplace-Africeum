import React, { useState, useEffect } from "react";
import AnimatedPage from "../AnimatedPage";
import { useParams, useNavigate } from "react-router-dom";
import useItemDetail from "../../hooks/useItemDetail";
import axios from "axios";
import { DefaultArt, DefaultAvatar } from "../../config/constants";

import { toast } from "react-toastify";

import { AssetType, NFTModel } from "../../types/types";

import { acceptWinningBid, buy, placeABid } from "../../utils/contracts";

import {
  assetType,
  formatPrice,
  getSymbolFromAddressOrId,
  formatPriceUsd,
  nFormatter,
  toWei,
} from "../../utils/helper";
import useLink from "../../hooks/useLink";
import loadingGIF from "../../assets/images/loading.gif";
import useAuctionDuration from "../../hooks/useAuctionDuration";
import useLikeButton from "../../hooks/useLikeButton";

import BidPlacing from "../../components/NFT/BidPlacing";
import Checkout from "../../components/NFT/Checkout";
import Confirmation from "../../components/NFT/Confirmation";
import Backdrop from "../../components/Utilities/Backdrop";
import Waiting from "../../components/Utilities/Waiting";
import { useActiveWeb3React } from "../../hooks";
import { toEth } from "../../utils";
import { useCoverBg } from "../../hooks/useCoverBg";

function NFTsSinglePage() {
  const [toggleState, setToggleState] = useState(1);

  const { account, library } = useActiveWeb3React();

  const { linkToItem, linkToUser, linkToCollection, linkToIPFS } = useLink();

  const { id } = useParams();
  const item = useItemDetail(id);

  const navigate = useNavigate();

  const toggleTab = (index) => {
    setToggleState(index);
  };

  const [historyData, setHistoryData] = useState([]);

  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [showBidPlacingModal, setShowBidPlacingModal] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const [sold, setSold] = useState(false);
  const [acceptable, setAcceptable] = useState(false);
  const [bidDisabled, setBidDisabled] = useState(true);
  const [isAuction, setIsAuction] = useState(false);

  const [isMyNFT, setIsMyNFT] = useState(false);

  useEffect(() => {
    if (item) {
      item.auctionable ? setIsAuction(true) : setIsAuction(false);
      setSold(item?.isSold || false);

      setAcceptable(
        item &&
          item.auctionable &&
          account &&
          account.toLowerCase() === item.creator &&
          item.endTime * 1000 < new Date().getTime()
      );

      setIsMyNFT(account && account.toLowerCase() === item.creator);

      setBidDisabled(
        !item ||
          !item.auctionable ||
          item.isSold ||
          !account ||
          item.endTime * 1000 < new Date().getTime()
      );

      fetchHistory();
    }
  }, [item]);

  const { didLike, localLikeCount, like } = useLikeButton(item);

  const { status, statusInfo, state } = useAuctionDuration(
    item?.auctionable ? item?.startTime : 0,
    item?.auctionable ? item?.endTime : 0
  );

  const fetchHistory = async () => {
    const res = await axios.get(`/item/history/${item.id}`);

    setHistoryData(res.data?.events?.reverse());
  };

  const handleConfirmation = async (amount = 0) => {
    setIsProcessing(true);

    console.log("handleConfirmation:", isAuction, item);
    if (!item) {
      return;
    }

    if (isMyNFT) {
      return;
    }

    try {
      if (isAuction) {
        setShowBidPlacingModal(false);
        const { result, error } = await placeABid(
          item,
          toWei(amount),
          account,
          library.getSigner()
        );

        if (!error && result) {
          toast.success("Successfully Bid!");
          setIsProcessing(false);
          navigate("/");
        } else {
          toast.error(error);
          setIsProcessing(false);
          return;
        }
      } else {
        setShowCheckoutModal(false);
        const { result, error } = await buy(
          item,
          toWei(item.price),
          account,
          library.getSigner()
        );

        if (!error && result) {
          toast.success("Successfully bought!");
          setIsProcessing(false);
          setConfirmed(true);
          setSold(true);
        } else {
          toast.error(error);
          setIsProcessing(false);
          return;
        }
      }
    } catch (e) {
      console.log(e);
      setIsProcessing(false);
    }
  };

  const handleAcceptBid = async () => {
    setIsProcessing(true);
    const { result, error } = await acceptWinningBid(
      item.id,
      library.getSigner()
    );

    if (!error && result) {
      toast.success("Successfully accpeted!");
      setIsProcessing(false);
      setSold(true);
    } else {
      toast.error(error);
      setIsProcessing(false);
      return;
    }
  };


  
  const defaultBg = useCoverBg(DefaultArt);

  const getActiveClass = (index, className) =>
    toggleState === index ? className : "";



  return (
    <AnimatedPage>
      <div className="pb-24 single-page mt-[70px]">
        {item ? (
          <div className="max-w-[1490px]  m-auto px-4">
            <div className="grid grid-cols-1 gap-1 py-5 sm:grid-cols-2 sm:gap-3 single-page-banner">
              <div className="block p-4 overflow-hidden">
                <div className="media-wrap overflow-hidden rounded-[22px] object-contain relative shadow-sm w-full pb-[100%]">
                  {assetType(item.type) == AssetType.NONE && (
                    <div
                      className="flex items-center mx-4 rounded-3xl h-72"
                      style={defaultBg}
                    ></div>
                  )}
                  {assetType(item.type) == AssetType.IMAGE && (
                    <img
                      className="absolute top-0 left-0 object-cover w-full"
                      src={item.image || DefaultArt}
                      alt="card-media"
                    />
                  )}
                  {assetType(item.type) == AssetType.AUDIO && (
                    <div className="flex items-center rounded-3xl h-72">
                      <audio controls>
                        <source src={item.image} type="audio/ogg" />
                        <source src={item.image} type="audio/mpeg" />
                        Your browser does not support the audio element.
                      </audio>
                    </div>
                  )}
                  {assetType(item.type) == AssetType.VIDEO && (
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
                      <source src={`${item.image}#t=0.5`} type="video/mp4" />
                      <source src={`${item.image}#t=0.5`} type="video/ogg" />
                      Your browser does not support the video tag.
                    </video>
                  )}
                </div>
              </div>
              <div className="w-full right lg:px-5 h-fit">
                <div className="NFTs-details">
                  <div className="back"></div>
                  <h1 className="text-[30px] md:text-[35px] lg:text-[48px] font-semibold text-black mb-2">
                    {item?.name}
                  </h1>
                  {/* <div className="price">
                    <p className="text-sm text-black">Price</p>
                    <h2 className="text-[20px] md:text-[25px] lg:text-[30px] font-semibold text-black">
                      {formatPrice(item.price, item.currency)}
                    </h2>
                    <p className="text-[13px] md:text-[15px] text-black">
                      {"90 USD"}
                    </p>
                  </div> */}

                  <p className="mb-2 font-bold">{`${item.count} of ${
                    item.totalCount || 0
                  } editions available`}</p>
                  <p className="font-bold">
                    {isAuction ? "Current bid" : "List price"}
                  </p>
                  {isAuction && item.lastBid.isActive ? (
                    <>
                      <p className="mt-2 text-4xl font-bold">
                        {formatPrice(item.lastBid.price, item.currency)}
                      </p>
                      <p className="text-gray-900">
                        $
                        {formatPriceUsd(
                          item.lastBid.price,
                          item.currency,
                          item.currencyObj?.usdPrice
                        )}
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="mt-2 text-4xl font-bold">
                        {formatPrice(item.price, item.currency)}
                      </p>
                      <p className="text-gray-900">
                        $
                        {formatPriceUsd(
                          item.price,
                          item.currency,
                          item.currencyObj?.usdPrice
                        )}
                      </p>
                    </>
                  )}
                  {!isAuction && (item.isSold || +item.count <= 0) && (
                    <p className="mt-6 font-bold text-pink-700">
                      This NFT has sold out
                    </p>
                  )}
                  {isAuction && <p className="mt-6 font-bold">{statusInfo}</p>}
                  {isAuction && status != "ended" && (
                    <div className="flex mt-2">
                      <div className="flex flex-col">
                        <p className="text-4xl font-bold">{state.days}</p>
                        <p className="mt-1 text-gray-900">Days</p>
                      </div>
                      <div className="flex flex-col mx-4">
                        <p className="text-4xl font-bold">{state.hours}</p>
                        <p className="mt-1 text-gray-900">Hours</p>
                      </div>
                      <div className="flex flex-col mx-4">
                        <p className="text-4xl font-bold">{state.minutes}</p>
                        <p className="mt-1 text-gray-900">Minutes</p>
                      </div>
                      <div className="flex flex-col">
                        <p className="text-4xl font-bold">{state.seconds}</p>
                        <p className="mt-1 text-gray-900">Seconds</p>
                      </div>
                    </div>
                  )}

                  <div className="flex flex-wrap items-end justify-between mb-8 creator-owner">
                    <div className="w-full c-c md:w-1/2">
                      <div
                        onClick={() => linkToUser(item?.user)}
                        className="flex items-center w-full mt-8"
                      >
                        <div className="flex overflow-hidden rounded-full head w-11 h-11">
                          <img
                            className="object-cover w-full h-full"
                            src={item?.creatorObj?.image || DefaultAvatar}
                            alt="creator"
                          />
                        </div>
                        <div className="info ml-[10px]">
                          <p className="text-[13px] text-primaryBlack font-medium opacity-60">
                            Creator
                          </p>
                          <p className="text-[14px] md:text-[17px] text-primaryBlack font-medium">
                            {item?.creatorObj?.username}
                          </p>
                        </div>
                      </div>
                      <div
                        onClick={() => linkToUser(item?.user)}
                        className="flex items-center w-full mt-8"
                      >
                        <div className="flex overflow-hidden rounded-full head w-11 h-11">
                          <img
                            className="object-cover w-full h-full"
                            src={item?.creatorObj?.image || DefaultAvatar}
                            alt="owner"
                          />
                        </div>
                        <div className="info ml-[10px]">
                          <p className="text-[13px] text-primaryBlack font-medium opacity-60">
                            Owner
                          </p>
                          <p className="text-[14px] md:text-[17px] text-primaryBlack font-medium">
                            {item?.creatorObj?.username}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="w-full text-left btns md:w-1/2 md:text-right">
                      {/* {!account && (
                        <button
                          type="button"
                          className="inline-block px-14 mr-0 ml-auto text-white text-sm bg-black mt-5 font-bold border-2 border-solid border-black h-[50px] rounded-3xl cursor-pointer transition ease-in hover:bg-transparent hover:text-black"
                        >
                          Connect Wallet
                        </button>
                      )} */}

                      {!sold && (
                        <div>
                          {!isAuction && !isMyNFT && (
                            <button
                              className="inline-block px-14 mr-0 ml-auto text-white text-sm bg-black mt-5 font-bold border-2 border-solid border-black h-[50px] rounded-3xl cursor-pointer transition ease-in hover:bg-transparent hover:text-black"
                              disabled={item.isSold || !account}
                              onClick={() => setShowCheckoutModal(true)}
                            >
                              Place an order
                            </button>
                          )}
                          {isAuction && !bidDisabled && !isMyNFT && (
                            <button
                              className="inline-block px-14 mr-0 ml-auto text-white text-sm bg-black mt-5 font-bold border-2 border-solid border-black h-[50px] rounded-3xl cursor-pointer transition ease-in hover:bg-transparent hover:text-black"
                              disabled={bidDisabled}
                              onClick={() => setShowBidPlacingModal(true)}
                            >
                              Place a bid
                            </button>
                          )}
                          {acceptable && (
                            <button
                              className="inline-block px-14 mr-0 ml-auto text-white text-sm bg-black mt-5 font-bold border-2 border-solid border-black h-[50px] rounded-3xl cursor-pointer transition ease-in hover:bg-transparent hover:text-black"
                              onClick={() => handleAcceptBid()}
                            >
                              Accept a bid
                            </button>
                          )}
                        </div>
                      )}
                      {/* {sold && !isAuction && (
                         <a
                          className="inline-block px-14 mr-0 ml-auto min-w-[150px]  text-white text-sm bg-black mt-5 font-bold border-2 border-solid border-black h-[50px] rounded-3xl cursor-pointer transition ease-in hover:bg-transparent hover:text-black"
                          href={item.image}
                          target="_blank"
                          download
                        >
                          <div className="flex items-center justify-center w-full h-full">
                            <span>Download</span>
                          </div>
                        </a>
                      )} */}
                    </div>
                  </div>
                  <div className="container-tab">
                    <ul className="flex border-b border-black border-solid tab-list border-opacity-10">
                      <li
                        className={`tabs p-4 text-sm font-bold opacity-60 border-b-2 border-solid border-transparent transition ease-in cursor-pointer ${getActiveClass(
                          1,
                          "opacity-100 border-black"
                        )}`}
                        onClick={() => toggleTab(1)}
                      >
                        History
                      </li>
                      <li
                        className={`tabs p-4 text-sm font-bold opacity-60 border-b-2 border-solid border-transparent transition ease-in cursor-pointer ${getActiveClass(
                          2,
                          "opacity-100 border-black"
                        )}`}
                        onClick={() => toggleTab(2)}
                      >
                        Offers
                      </li>
                    </ul>
                    <div className="content-container">
                      <div
                        className={`content hidden p-5 pl-3 transition ease-in ${getActiveClass(
                          1,
                          "active"
                        )}`}
                      >
                        <div className="w-full content-inner">
                          <ul>
                            {historyData.map((history) => {
                              return (
                                <li>
                                  <a
                                    href={history?.user?.username}
                                    className="flex items-center justify-between w-full"
                                  >
                                    <div className="flex items-center">
                                      <div className="flex overflow-hidden rounded-full head w-11 h-11">
                                        <img
                                          className="object-cover w-full h-full"
                                          src={history?.user?.image}
                                          alt="owner"
                                        />
                                      </div>
                                      <div className="info ml-[10px]">
                                        <p className="text-[13px] text-primaryBlack font-medium opacity-60">
                                          Owner
                                        </p>
                                        <p className="text-[17px] text-primaryBlack font-medium">
                                          @{history?.user?.username}
                                        </p>
                                      </div>
                                    </div>
                                    <div className="price">
                                      <h2 className="text-lg font-semibold text-black">
                                        {history?.args?.length < 2
                                          ? formatPrice(
                                              item.price,
                                              item.currency
                                            )
                                          : formatPrice(
                                              toEth(
                                                history?.args[
                                                  history?.args.length - 1
                                                ]
                                              ),
                                              item.currency
                                            )}
                                      </h2>
                                      <p className="text-[13px] text-black">
                                        Price
                                      </p>
                                    </div>
                                  </a>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      </div>
                      <div
                        className={`content hidden p-5 pl-3 transition ease-in ${getActiveClass(
                          2,
                          "active"
                        )}`}
                      >
                        <div className="w-full content-inner">
                          <h2>No Offers Yet</h2>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* <div className="flex justify-center mt-8 mb-4">

                {sold && isAuction && <button className="px-8 py-3 mr-4 font-bold bg-br-gray-200 rounded-3xl">Increase bid</button>}

                <button className="px-5 py-3 font-bold border border-gray-200 rounded-3xl" onClick={() => linkToCollection(nft.collectionId)}>View Etherscan</button>
              </div> */}
            </div>

            <div className="flex flex-wrap py-5 single-page-description">
              <div className="w-full left lg:w-1/2 lg:px-5 lg:pr-10">
                <h3 className="mb-5 text-lg font-semibold text-black opacity-80">
                  Description
                </h3>
                <div className="desc text-[15px]">
                  <p>{item.description}</p>
                </div>
              </div>
              <div className="w-full mt-8 right lg:w-1/2 lg:px-5 lg:mt-0">
                <h3 className="mb-5 text-lg font-semibold text-black opacity-80">
                  Authenticity
                </h3>
                <div className="flex flex-wrap btns">
                  <button
                    onClick={() => linkToIPFS(item)}
                    className="w-full flex items-center justify-between px-4 lg:mr-5 text-black text-sm bg-white mt-5 font-medium border-none h-[50px] rounded-full cursor-pointer transition ease-in"
                  >
                    <h5 className="flex items-center">
                      <img
                        className="w-5 mr-2"
                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAoCAYAAACWwljjAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAIhSURBVHgBzZiLbcMgEIZ/dYJuULpBRyCb0AnqDexOkGSCuBOkGyQbtBvEG6QbtJwMEZinbYL6Syf5Aebz3Rk4A+vEpJ2k/So7qGvV9SitNUCmtq0J9ibtGoHRdpEmcEdx2OEhqAajJxrjWCgYE4yjoJi0I+y37zCGLdZnN+mzOr90npjhOc18KLXtJ2At4i/jlUBZtwvP80RORw5/npRS4wFjvobkwgNs1+6wwLUZYnDDaOXX9DMmD3HcXwxuNCi/LBeSfaHOpMYnQDqEDlCxzzQgSoMtwpNpEEg3KJnUFJJrYrwbUAc32WZ/pgFx+F/8qsZtfEBCdWZwY7s0jCzyLHOSFTEgGI1C4Uyt5qk84Z6xkkBaHfxx12HksBfX0G4gNsmKOUCAfzKbY6lJVmigB+RpUJ2e1XGuztI2GD3zk9MhF0hrwAj1ijjYoNpsFFS25gJp9dL2kft71Wa2lgKRviP3PrFQa4DO0t491+nagIVaA0TqYOdIr64t1lqg4ioNxLBS/9pDrbQX1BeNudUnJhAzb1QU1Xy3ZWUaMi7tCfXEMMk7AvqAvc70qLenPhrnxHCb/RkSpUlEJ9ibrpQY3E0bjfUYanzBvD11LlCoNOfIkEB+6ZsDJCYgsecFRW/UIR3GGBCHWwx2WFkRM7j5Ze6pfUAMbml+ROGPhcMfRhOIqt4WlUtzgXhxmbOpLy4G9w+ZaR3u8+ckC6yHv/hbpD/ZwlH/I7UnZQAAAABJRU5ErkJggg=="
                        alt="s"
                      />{" "}
                      View on IPFS
                    </h5>{" "}
                    <img
                      className="w-4"
                      src="https://nft.wazirx.org/static/media/link.f737a25d.svg"
                      alt="a"
                    />{" "}
                  </button>
                  <button
                    onClick={() => linkToCollection(item?.collectionId)}
                    className="w-full flex items-center justify-between px-4 text-black text-sm bg-white mt-5 font-medium border-none h-[50px] rounded-full cursor-pointer transition ease-in"
                  >
                    <h5 className="flex items-center">
                      <img
                        className="w-5 mr-2"
                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACkAAAAoCAYAAABjPNNTAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAN+SURBVHgBzVnNcdNAFH678YDJZIKcE0dx4xangigVkFSQUIGhgsQVEFcQUwHhyCmiAkwHriBWBmZiYLD4nrTrWdm71m9sfzOyV9JK+/n9v7WgivC8vYBIdoUQxzjt8iV1MCIcYz7iOP5BNAuj6FdIFSHKTPYAKWe9OBbvDUJFMRYiDmcz2Y+iaFzmwUIkFblLRa42QHZYhuxO3gTwO8VL7/DqgBqDgJnQabv97GE6/TPKm72S5MHB/kd8XeNoU/PwYM+nu7vPvcfH319XTXSqGwRvoN4LWg9usdY7qD+y3bRKcs0EGW+kjF9Bol9sN5dIet7+JQTciIOUg+i6VJ9RN5zkAk5yQ0+DSB0avm0SNHgGrd+a1+YkQdBPvdj+cB3EMWHRrM2p9T5TmghMRCD62pwr5wPEwacgmEIMFp2CYySykc0GOSZnzC0hyb9qzY6yEuDS4wSizxOSSorbhIw0E5JgHlANICgP2I6M4wiqHFAN4B3netxKq5latji6v4+WQha0dYWlelQdvh5AkjKgerBmCVf2KIF5TpdQ1SFtHzgMnemTFuWrmh9g+xob11DF1FLlSmC9D2YZl0sSDoC67+F68TrSJztM40Txzv5kEg3TNTyfybJ351TYscu26trc8kqQIJzwSp/r0ChpOxCpnD3XGDTV0wmG1c0SKduvNAmkR3Fi2iDUzDY/J8ySbFxtxSG52D1aIKgLD0YShlpq4NMGAHKZ/sZSiSUClGlfvHkoFWdKRXD7xt+ccULaMDg122vZlJuEyHnwVHYZqcAckpPg/qUQO0xw0XnH+jm2SRbrAEG08XJtMnnokJNcYn/cqgS2++AU6rGKk3JIawTHQBD8Tg6CKWR/PuIPVcp/csx2mIIcQZV9sxDIJ7cXdDov76A1joHO2AwuQzMsmY2Yp36db8xfCrRVwKpVe0kXBaYvrSksLwxItZ/1ye0FUsrzMv1THM/QVf4cmtdKbf0VRRpSdtgRgzLPcRtiq/IbI6mk9lZJrUotMEI0OLLdaFFFpC3nPxATx5oYNgGqgp3wxHWz8CYq0V+ft59B6lB1l11qAC4VZ+ZQPsFABV2fmgVno75ZQ7qQu9M7nU7H7fYLbIfEHfzqxqSnityw0HwqAY53+CfhSv3j4FM56Ibuumy7W9m703g6w5G0xMjDCWnzLxKQ4lqVyy05Kio1G/4DozqfHUF9/wEAAAAASUVORK5CYII="
                        alt=""
                      />{" "}
                      View on BSCScan
                    </h5>{" "}
                    <img
                      className="w-4"
                      src="https://nft.wazirx.org/static/media/link.f737a25d.svg"
                      alt="a"
                    />{" "}
                  </button>
                </div>
              </div>
            </div>

            {showCheckoutModal && (
              <Backdrop>
                <Checkout
                  nft={item}
                  onConfirm={() => handleConfirmation()}
                  onCancel={() => setShowCheckoutModal(false)}
                />
              </Backdrop>
            )}

            {showBidPlacingModal && (
              <Backdrop>
                <BidPlacing
                  nft={item}
                  onConfirm={(amount) => handleConfirmation(amount)}
                  onCancel={() => setShowBidPlacingModal(false)}
                />
              </Backdrop>
            )}

            {confirmed && (
              <Backdrop>
                <Confirmation
                  onCancel={() => setConfirmed(false)}
                  isAuction={isAuction}
                  name={item.name}
                  image={item.image}
                  text={item.description}
                  itemId={item.id}
                  type={item.type}
                />
              </Backdrop>
            )}

            {isProcessing && <Waiting />}
          </div>
        ) : (
          <div className="flex items-center justify-center w-full h-full min-h-screen py-10 text-center loading-animation">
            <img className="m-auto w-14 h-14" src={loadingGIF} alt="loading" />
          </div>
        )}
      </div>
    </AnimatedPage>
  );
}

export default NFTsSinglePage;
