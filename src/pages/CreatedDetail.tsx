import React, { useState, useEffect, useRef } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Row, notification, Modal, DatePicker, Badge } from 'antd'
import axios from "axios";
import { BsDiscord, BsGlobe2, BsInstagram, BsTwitter, BsEnvelope } from 'react-icons/bs';
import { approveToken, getContract, getNFTContract } from "../utils/contracts";
import { marketplaceContractABI, marketplaceContractAddress, placeholderContractABI } from "../config/abi/common";
import { ethers } from "ethers";
import { convertJsonLinks, convertIamgeURL, getObjectType, parseLocation, toEth, getBigNumber } from "../utils";
import { useActiveWeb3React } from '../hooks';
import { formatPrice, toWei } from "../utils/helper";
import useAuth from "../hooks/useAuth";
import { proxy1 } from "../config/abi/common";
import { getAFCTokenAddress } from "../utils/addressHelpers";

const CreatedDetail = () => {
  const { account } = useActiveWeb3React()
  const { login } = useAuth()
  const { item, collectionId } = parseLocation(useLocation());
  const [collectionInfo, setCollectionInfo] = useState({
    status: "use",
    bannerURL: '',
    bannerFile: null,
    logoFile: null,
    logoURL: '',
    contractAddress: '',
    title: '',
    description: '',
    website: '',
    royalty: '',
    discord: '',
    twitter: '',
    instagram: '',
    category: 'None',
    register: '',
    id: '',
    createdAt: '',
    floor: 0,
    volume: 0,
    latest: 0,
    totalSupply: { hex: 'value' },
    creator: ''
  })
  const [nftData, setNftData] = useState({ realprice: '0', count: 0, price: '0', owner: '', image: '', description: '', attributes: [], name: '' })
  const [buying, setBuying] = useState(false)
  const [isloading, setLoading] = useState(true)

  const onBuy = async () => {
    setBuying(true)
    const approved = await approveToken(getAFCTokenAddress(), account, new ethers.providers.Web3Provider(window.ethereum).getSigner())
    if (approved) {
      const contract = getNFTContract(new ethers.providers.Web3Provider(window.ethereum).getSigner())
      await contract.buyItem(item, toWei(nftData.realprice), {
        value: getBigNumber(0)
      })
      contract.on("ItemSold", async (me, tokenId, _id, _amount) => {
        await axios.post(proxy1 + '/api/saveTokenInfo', {
          payload: { tokenId, collectionId, totalSupply: getBigNumber(1 + (Number(collectionInfo.totalSupply.hex || "0x0"))) }
        })
        notification.success({ message: "Success", description: "Buy Success!!!" })
        window.location.reload()
      })
    } else {
      notification.warning({
        message: "Warning",
        description: "Please approve for buy..."
      })
      setBuying(false)
    }
  }
  // useEffect(() => {
  //   if (!account)
  //     notification.warn({
  //       message: "Warning",
  //       description: "Please login for more explore..."
  //     })
  // }, [account])
  useEffect(() => {
    setTimeout(async () => {
      const { data } = await axios.post(proxy1 + '/api/getCollectionById', {
        params: { collectionid: collectionId }
      })
      setCollectionInfo({ ...data })
      const itemdata = await getNFTContract(new ethers.providers.Web3Provider(window.ethereum).getSigner()).items(item)
      try {
        const { data } = await axios.get(itemdata.uri)
        data.tokenID = item
        setNftData({ ...data, realprice: toEth(itemdata.price), price: formatPrice(toEth(itemdata.price), getAFCTokenAddress()), count: Number(itemdata.count) })
        setLoading(false)
      } catch (e) {
        if (e.toString().search('Network Error') == -1) {
          notification.error({
            message: 'Error',
            description: "Data fetch error!!!"
          })
          window.location.href = "/collections"
        }
        const { data } = await axios.post(proxy1 + '/api/getCorsURLs', { payload: itemdata.uri })
        data.tokenID = item
        setNftData({ ...data, realprice: toEth(itemdata.price), price: formatPrice(toEth(itemdata.price), getAFCTokenAddress()), count: Number(itemdata.count) })
        setLoading(false)
      }
    }, 0)
  }, [collectionId, item])


  return <>
    {
      isloading ? <><div className='flex w-[100vw] h-[100vh] items-center justify-center'>
        <img className="m-auto w-14 h-14" src={"/loading.gif"} alt="loading" />
      </div></> :
        <div className="block md:flex w-[94vw] mt-[90px] mx-[3vw] mb-4">
          <div className="block md:flex w-full md:w-[40vw]">
            <img src={convertIamgeURL(nftData?.image)} className=" md:max-w-[40vw] max-h-[94vh]  rounded-[50px] max-w-[90vw]"></img>
          </div>
          <div className="flex md:flex pl-[2vw] w-full md:w-[52vw] flex-col min-h-[calc(100vh-100px)]">
            <Row className="text-4xl lg:text-5xl 2xl:text-7xl font-extrabold w-full dark:text-white mt-10">{nftData.name}</Row>
            <Row className="mt-4 w-full">
              <Row className="lg:text-xl text-lg 2xl:text-3xl text-gray-400 w-full">Collection</Row>
              <Row className="w-full items-center">
                <img src={collectionInfo.logoURL} className="w-[5vw] h-[5vw] min-w-[40px] min-h-[40px] rounded-[1000px]"></img>
                <p className="lg:text-2xl text-xl 2xl:text-4xl pl-6 font-bold items-center dark:text-white">{collectionInfo.title}</p>
              </Row>
            </Row>
            <Row className="lg:text-2xl text-xl 2xl:text-4xl text-black font-bold items-center dark:text-white"><span className="lg:text-xl text-lg 2xl:text-3xl">Owner</span> &nbsp;&nbsp; Contract</Row>
            <Row className="w-full text-gray-400 text-lg lg:text-xl 2xl:text-3xl mt-4 min-h-[70px]">
              {nftData.description}
            </Row>
            <Row className="w-full flex min-h-[100px]">
              <Row className="text-lg font-bold lg:text-xl 2xl:text-3xl mt-4 dark:text-white">Properties</Row>
              <Row className="flex w-full">
                {
                  nftData.attributes?.map((each) => <div className="flex m-2 flex-col dark:bg-gray-800 justify-center rounded-md p-2 bg-blue-200">
                    <p className="flex text-sm lg:text-lg 2xl:text-2xl text-green dark:text-white justify-center">{each.trait_type}</p>
                    <p className="flex text-sm pt-2 lg:text-lg 2xl:text-2xl text-gray-400 justify-center">{each.value}</p>
                  </div>
                  )
                }
              </Row>
            </Row>
            <Row className="w-full flex">
              <Row className="text-lg font-bold lg:text-xl 2xl:text-3xl mt-4 dark:text-white">Number of Item</Row>
              <Row className="flex w-full lg:text-xl 2xl:text-3xl pl-4 mt-1 dark:text-white text-lg ">
                {
                  nftData.count
                }
              </Row>
            </Row>
            <Row className="w-full flex">
              <Row className="text-lg font-bold lg:text-xl 2xl:text-3xl mt-4 dark:text-white">Price</Row>
              <Row className="flex w-full lg:text-xl 2xl:text-3xl pl-4 mt-1 dark:text-white text-lg ">
                {
                  nftData.price
                }
              </Row>
            </Row>
            {collectionInfo?.creator != account && nftData.count > 0 && <Row className="w-full flex">
              <button className={(buying ? "disabled " : "") + " w-full primaryBtn mt-2 dark:bg-none dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-900 w-full text-sm lg:text-lg 2xl:text-2xl text-green dark:text-white justify-center p-4 "} onClick={
                onBuy
              }>{buying ? "Buying..." : "Buy now"}</button>
            </Row>}
          </div>
        </div >
    }
  </>
};

export default CreatedDetail;
