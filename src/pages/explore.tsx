import React, { useEffect, useState } from "react";
import InfiniteScroll from 'react-infinite-scroll-component';
import useItems from "../hooks/useItems";
import ItemCard from "../components/Utilities/ItemCard";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useCoverBg } from '../hooks/useCoverBg'
import dateFormat from 'dateformat'
import axios from "axios";
import { BsDiscord, BsGlobe2, BsInstagram, BsTwitter } from 'react-icons/bs';
import { notification, Badge } from "antd";
import useAuth from "../hooks/useAuth";
import { parseLocation } from "../utils";
import { proxy1 } from "../config/abi/common";
import { useActiveWeb3React } from "../hooks";


const Explore = () => {
  const  location  = useLocation()
  const { account } = useActiveWeb3React();

  const collectionid = parseLocation(location).collectionid || null
  const [collectioninfos, setCollectionInfos] = useState([])
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
    totalSupply: { hex: 'value' }
  })
  const [fetchParams, setFetchParams] = useState({
    page: 0,
    perPage: 12,
    sortBy: 'createdAt',
    sortDir: 'desc',
    url: 'getNFTs',
    type: 'All',
    collectionid,
    contractAddress: '',
    totalSupply: Number(0),
    collectioninfos,
    collectionInfo,
    callback : () => {
      setShow(true)
    }
  })
  const {login} = useAuth()
  const [isshow, setShow] = useState(false)
  const { items, hasMore, sales } = useItems(fetchParams)
  // useEffect(()=>{
  //   if(!account)
  //   notification.warn({
  //     message : "Warning",
  //     description : "Please login for more explore..."
  //   })
  // },[account])

  useEffect(() => {
    axios.post(proxy1+'/api/getCollectionById', {
      params: { collectionid }
    }).then((resp) => {
      if (collectionid) {
        setCollectionInfo((prev) => ({ ...prev, ...resp.data }))
        setCollectionInfos([resp.data])
        setFetchParams((prev) => ({ ...prev, collectioninfos:[resp.data],collectionInfo:resp.data, totalSupply: Number(resp.data?.totalSupply?.hex), contractAddress: resp.data.contractAddress }))
      } else {
        setCollectionInfos(resp.data)
        setFetchParams((prev) => ({ ...prev, collectioninfos: resp.data }))
      }
    }).catch((e) => {
      notification.error({
        message: "Error",
        description: "Some error catched on fetching collection information!!"
      })
      // window.location.href = "/collections"
    });
  }, [])
  const coverBg = useCoverBg(collectionInfo.bannerURL);
  const moreData = () => [
    setFetchParams((prev) => ({ ...prev, page: (fetchParams.page || 0) + 1, totalSupply: Number(collectionInfo?.totalSupply?.hex), contractAddress: collectionInfo.contractAddress }))
  ]
  return (
    !isshow ? <><div className='flex w-[100vw] h-[100vh] items-center justify-center'>
      <img className="m-auto w-14 h-14" src={"/loading.gif"} alt="loading" />
    </div></> :
      <InfiniteScroll
        className={"mt-20"}
        dataLength={items.length}
        next={moreData}
        height={"calc(100vh - 80px)"}
        hasMore={hasMore}
        loader={<div className='flex w-[100vw] h-[150px] items-center justify-center'>
          <img className="m-auto w-14 h-14" src={"/loading.gif"} alt="loading" />
        </div>}
      >
        {collectionid ? <div className="flex flex-col w-full justify-center items-center">
          <div className="flex h-[200px] 2xl:h-[240px] w-full rounded-b-[20px]" style={coverBg}></div>
          <div className='flex h-28 w-28 justify-center -mt-14'>
            <img src={collectionInfo.logoURL} className="rounded-[500px] bg-white w-full h-full justify-center items-center border border-solid border-black "></img>
          </div>
          <div className="flex xl:w-[50vw] md:w-[60vw] w-[80vw] flex-col justify-center">
            <Badge.Ribbon text={collectionInfo.category} color={"rgba(32,129,226)"}></Badge.Ribbon>
            <div className="flex justify-center dark:text-white text-4xl 2xl:text-5xl">{collectionInfo.title}</div>
            <div className="flex justify-center"><span className="p-2 mt-2 rounded-lg text-2xl 2xl:text-3xl dark:text-gray-300 dark:bg-gray-600 bg-gray-300 text-gray-700">{collectionInfo.contractAddress}</span></div>
            <div className='flex flex-row  text-2xl justify-end items-center my-4 h-[25px] px-4'>
              <div className='flex justify-start w-full pl-2 text-lg dark:text-gray-400'>Resitered:{dateFormat(collectionInfo.createdAt, "mmm d, yyyy, H:MM:ss")}</div>
              <div className='flex'>
                <a href={collectionInfo.website} target={"_blank"} className="text-[rgba(32,129,226)] hover:!text-[rgba(32,129,226)] dark:text-white hover:text-3xl w-[40px]">
                  <BsGlobe2 />
                </a>
              </div>
              <div className='flex'>
                <a href={collectionInfo.twitter} target={"_blank"} className="text-[rgba(32,129,226)] hover:!text-[rgba(32,129,226)] dark:text-white hover:text-3xl w-[40px]">
                  <BsTwitter />
                </a>
              </div>
              <div className='flex'>
                <a href={collectionInfo.discord} target={"_blank"} className="text-[rgba(32,129,226)] hover:!text-[rgba(32,129,226)] dark:text-white hover:text-3xl w-[40px]">
                  <BsDiscord />
                </a>
              </div>
              <div className='flex'>
                <a href={collectionInfo.instagram} target={"_blank"} className="text-[rgba(32,129,226)] hover:!text-[rgba(32,129,226)] dark:text-white hover:text-3xl w-[40px]">
                  <BsInstagram />
                </a>
              </div>
            </div>
            <div className="flex justify-center"><span className="p-4 flex mt-2 min-w-[50vw] justify-center rounded-lg text-xl 2xl:text-2xl border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300">{collectionInfo.description}</span></div>
            <div className="grid grid-cols-4 gap-2 mt-6 -mx-20">
              <div className="flex flex-col justify-center rounded-lg items-center border border-gray-500 dark:border-gray-300 bg-gray-300 dark:bg-gray-700">
                <span className="font-bold p-2 text-2xl dark:text-gray-300">Floor Price</span>
                <span className="text-2xl p-2 dark:text-gray-300">{collectionInfo.floor}</span>
              </div>
              <div className="flex flex-col justify-center rounded-lg items-center border border-gray-500 dark:border-gray-300 bg-gray-300 dark:bg-gray-700">
                <span className="font-bold p-2 text-2xl dark:text-gray-300">Volume</span>
                <span className="text-2xl p-2 dark:text-gray-300">{collectionInfo.volume}</span>
              </div>
              <div className="flex flex-col justify-center rounded-lg items-center border border-gray-500 dark:border-gray-300 bg-gray-300 dark:bg-gray-700">
                <span className="font-bold p-2 text-2xl dark:text-gray-300">Latest Price</span>
                <span className="text-2xl p-2 dark:text-gray-300">{collectionInfo.latest}</span>
              </div>
              <div className="flex flex-col justify-center rounded-lg items-center border border-gray-500 dark:border-gray-300 bg-gray-300 dark:bg-gray-700">
                <span className="font-bold p-2 text-2xl dark:text-gray-300">Items</span>
                <span className="text-2xl p-2 dark:text-gray-300">{Number(collectionInfo?.totalSupply?.hex)}</span>
              </div>
            </div>
          </div>
        </div> : ""}
        <div className={"w-full flex "}>
          <p className="text-3xl lg:text-4xl font-extrabold p-4 pl-12 dark:text-white flex">Explore NFTs</p>
          <div className="flex pt-6 pl-10">
            <button
              onClick={() => {
                setFetchParams((prev) => ({
                  ...prev, type: "All", page: 0
                }))
              }}
              className={"font-bold dark:text-gray-400 hover:!text-gray-700 text-lg dark:hover:!text-white h-10 w-16 " + (fetchParams.type == "All" ? "primaryBtn  !text-white hover:!text-white dark:hover:!bg-gray-900 dark:bg-none dark:!bg-gray-800" : "")}>All</button>
            <button
              onClick={() => {
                setFetchParams((prev) => ({
                  ...prev, type: "sale", page: 0
                }))
              }} className={"font-bold dark:text-gray-400 text-lg hover:!text-gray-700 dark:hover:!text-white h-10 w-16 " + (fetchParams.type == "sale" ? "primaryBtn !text-white hover:!text-white dark:hover:!bg-gray-900 dark:bg-none dark:!bg-gray-800" : "")}>Onsale</button>
          </div>
        </div>
        <div className="App w-full mt-10 grid xl:grid-cols-5 2xl:grid-cols-6 3xl:grid-cols-7 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2  ">
        {
        fetchParams.type == "sale" ?
        sales.map((each) => (
            <ItemCard nft={each} Onsale={fetchParams.type == "sale"}></ItemCard>
          )):
        items.map((each) => (
            <ItemCard nft={each}></ItemCard>
          ))}
        </div>
      </InfiniteScroll>
  );
};

export default Explore;
