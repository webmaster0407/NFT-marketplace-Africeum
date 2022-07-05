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
import CreatedCard from "../components/Utilities/CreatedCard";
import { getNFTContract } from "../utils/contracts";
import { ethers } from "ethers";
import { getBigNumber } from "../utils/helper";


const ExploreCollection = () => {
  const location = useLocation()
  const { account } = useActiveWeb3React();
  
  const collectionid = parseLocation(location).collectionid || null
  const [collectionInfo, setCollectionInfo] = useState(null)
  const [isshow, setShow] = useState(true)
  const [data, setData] = useState({ All: [], Sale: [], Created: [] })
  const [selected, setSel] = useState('All')
  const [hasMore, setHasMore] = useState({ All: false, Sale: false, Created: true })

  
  // useEffect(() => {
  //   if (!account)
  //     notification.warn({
  //       message: "Warning",
  //       description: "Please login for more explore..."
  //     })
  // }, [account])

  const moreData = async () => {
    if (selected == 'Created') {
      const resp = await axios.post(proxy1 + '/api/getCreatedNFT', {
        payload: {
          collectionid,
          perPage: 12,
          lastVisible: (!data['Created'] || data['Created']?.length == 0 ? '' : data['Created'][data['Created'].length - 1].createdAt),
        }
      })
      if (resp.data.length < 12) setHasMore((prev) => ({ ...prev, Created: false }))
      setData((prev) => ({ ...prev, Created: [...prev["Created"], ...resp.data] }))
    } else if (selected == 'All') {
      if (collectionid) {
        const resp = await axios.post(proxy1 + '/api/getNFTsByCollection', {
          payload: {
            collectionid,
            perPage: 12,
            lastVisible: (!data['All'] || data['All']?.length == 0 ? '' : data['All'][data['All'].length - 1].createdAt),
          }
        })
        if (resp.data.length < 12) setHasMore((prev) => ({ ...prev, All: false }))
        resp.data.map(async (each) => {
          if(!account){
            const returnData = { ...each, tokenID: Number(each.tokenId.hex), id: "collectionid=" + each.collectionId + "&token=" + Number(each.tokenId.hex) }
            setData((prev) => ({ ...prev, All: [...prev["All"], ...[returnData]] }))
            return
          }
          const contract = getNFTContract(new ethers.providers.Web3Provider(window.ethereum).getSigner())
          const tokenURI = await contract.tokenURI(Number(each.tokenId.hex))
          const owner = await contract.ownerOf(Number(each.tokenId.hex))
          let returnData
          try {
            const json = await axios.get(tokenURI)
            returnData = { ...each, owner, tokenID: Number(each.tokenId.hex), ...json.data, id: "collectionid=" + each.collectionId + "&token=" + Number(each.tokenId.hex) }
            setData((prev) => ({ ...prev, All: [...prev["All"], ...[returnData]] }))
          } catch (e) {
            if (e.toString().search('Network Error') == -1) {
              notification.error({
                message: 'Error',
                description: "Data fetch error!!!!"
              })
            }
            const json = await axios.post(proxy1 + '/api/getCorsURLs', { payload: tokenURI })
            returnData = { ...each, owner, tokenID: Number(each.tokenId.hex), ...json.data, id: "collectionid=" + each.collectionId + "&token=" + Number(each.tokenId.hex) }
            setData((prev) => ({ ...prev, All: [...prev["All"], ...[returnData]] }))
          }
        })
      } else {
        if(!account){
          const resp = await axios.post(proxy1 + "/api/getAllNFTs",{
            payload : {
              restriction : [],
              lastVisible : data["All"].length>0 ? data["All"][data["All"].length-1].id:'',
              limit : 12
            }
          })
          resp.data.map(async (each) => {
              const returnData = { ...each, tokenID: Number(each.tokenId.hex), id: "collectionid=" + each.collectionId + "&token=" + Number(each.tokenId.hex) }
              setData((prev) => ({ ...prev, All: [...prev["All"], ...[returnData]] }))
          })
          return
        }
        const contract = getNFTContract(new ethers.providers.Web3Provider(window.ethereum).getSigner())
        const totalSupply = await contract.totalSupply()
        const start = (data['All'] ? data['All']?.length : 0) + 5
        for (let i = start; i < start + 12 && i <= totalSupply; i++) {
          contract.tokenURI(i).then(async (tokenURI) => {
            const owner = await contract.ownerOf(i)
            let returnData
            try {
              const json = await axios.get(tokenURI)
              const { data } = await axios.post(proxy1 + '/api/getCollectionInfoByToken', {
                params: { tokenId: getBigNumber(i) }
              })
              returnData = { owner, tokenID: i, ...json.data, logoURL: data.logoURL, id: "collectionid=" + data.id + "&token=" + i }
              setData((prev) => ({ ...prev, All: [...prev["All"], ...[returnData]] }))
            } catch (e) {
              if (e.toString().search('Network Error') == -1) {
                notification.error({
                  message: 'Error',
                  description: "Data fetch error!!!!"
                })
              }
              const json = await axios.post(proxy1 + '/api/getCorsURLs', { payload: tokenURI })
              const { data } = await axios.post(proxy1 + '/api/getCollectionInfoByToken', {
                params: { tokenId: getBigNumber(i) }
              })
              returnData = { owner, tokenID: i, logoURL: data.logoURL, ...json.data, id: "collectionid=" + data.id + "&token=" + i }
              setData((prev) => ({ ...prev, All: [...prev["All"], ...[returnData]] }))
            }
          })
        }
      }
    } else {
      const resp = await axios.post(proxy1 + '/api/getListedData', {
        payload: {
          collectionId: collectionid,
          status: "listed",
          perPage: 12,
          lastVisible: (data.Sale.length == 0 ? '' : data.Sale[data.Sale.length - 1].createdAt),
          sortDir: 'desc',
          sortBy: 'createdAt',
        }
      })
      if (resp.data.length < 12) setHasMore((prev) => ({ ...prev, Sale: false }))
      setData((prev) => ({ ...prev, Sale: [...prev["Sale"], ...resp.data] }))
    }
  }

  useEffect(() => {
    axios.post(proxy1 + '/api/getCollectionById', {
      params: { collectionid }
    }).then((resp) => {
      setCollectionInfo((prev) => (resp.data))
    }).catch((e) => {
      notification.error({
        message: "Error",
        description: "Some error catched on fetching collection information!!"
      })
      // window.location.href = "/collections"
    });
  }, [collectionid])

  useEffect(() => {
    moreData()
  }, [selected])
  const coverBg = useCoverBg(collectionInfo?.bannerURL);
  return (
    account || !account?!isshow ? <><div className='flex w-[100vw] h-[100vh] items-center justify-center'>
      <img className="m-auto w-14 h-14" src={"/loading.gif"} alt="loading" />
    </div></> :
      <InfiniteScroll
        className={"mt-20"}
        dataLength={data[selected].length}
        next={moreData}
        height={"calc(100vh - 80px)"}
        hasMore={hasMore[selected]}
        loader={<div className='flex w-[100vw] h-[150px] items-center justify-center'>
          <img className="m-auto w-14 h-14" src={"/loading.gif"} alt="loading" />
        </div>}
      >
        {collectionid ? <div className="flex flex-col w-full justify-center items-center">
          <div className="flex h-[200px] 2xl:h-[240px] w-full rounded-b-[20px]" style={coverBg}></div>
          <div className='flex h-28 w-28 justify-center -mt-14'>
            <img src={collectionInfo?.logoURL} className="rounded-[500px] bg-white w-full h-full justify-center items-center border border-solid border-black "></img>
          </div>
          <div className="flex xl:w-[50vw] md:w-[60vw] w-[80vw] flex-col justify-center">
            <Badge.Ribbon text={collectionInfo?.category} color={"rgba(32,129,226)"}></Badge.Ribbon>
            <div className="flex justify-center dark:text-white text-4xl 2xl:text-5xl">{collectionInfo?.title}</div>
            <div className="flex justify-center"><span className="p-2 mt-2 rounded-lg text-2xl 2xl:text-3xl dark:text-gray-300 dark:bg-gray-600 bg-gray-300 text-gray-700">{collectionInfo?.contractAddress}</span></div>
            <div className='flex flex-row  text-2xl justify-end items-center my-4 h-[25px] px-4'>
              <div className='flex justify-start w-full pl-2 text-lg dark:text-gray-400'>Resitered:{dateFormat(collectionInfo?.createdAt, "mmm d, yyyy, H:MM:ss")}</div>
              <div className='flex'>
                <a href={collectionInfo?.website} target={"_blank"} className="text-[rgba(32,129,226)] hover:!text-[rgba(32,129,226)] dark:text-white hover:text-3xl w-[40px]">
                  <BsGlobe2 />
                </a>
              </div>
              <div className='flex'>
                <a href={collectionInfo?.twitter} target={"_blank"} className="text-[rgba(32,129,226)] hover:!text-[rgba(32,129,226)] dark:text-white hover:text-3xl w-[40px]">
                  <BsTwitter />
                </a>
              </div>
              <div className='flex'>
                <a href={collectionInfo?.discord} target={"_blank"} className="text-[rgba(32,129,226)] hover:!text-[rgba(32,129,226)] dark:text-white hover:text-3xl w-[40px]">
                  <BsDiscord />
                </a>
              </div>
              <div className='flex'>
                <a href={collectionInfo?.instagram} target={"_blank"} className="text-[rgba(32,129,226)] hover:!text-[rgba(32,129,226)] dark:text-white hover:text-3xl w-[40px]">
                  <BsInstagram />
                </a>
              </div>
            </div>
            <div className="flex justify-center"><span className="p-4 flex mt-2 min-w-[50vw] justify-center rounded-lg text-xl 2xl:text-2xl border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300">{collectionInfo?.description}</span></div>
            <div className="grid grid-cols-4 gap-2 mt-6 -mx-20">
              <div className="flex flex-col justify-center rounded-lg items-center border border-gray-500 dark:border-gray-300 bg-gray-300 dark:bg-gray-700">
                <span className="font-bold p-2 text-2xl dark:text-gray-300">Floor Price</span>
                <span className="text-2xl p-2 dark:text-gray-300">{collectionInfo?.floor}</span>
              </div>
              <div className="flex flex-col justify-center rounded-lg items-center border border-gray-500 dark:border-gray-300 bg-gray-300 dark:bg-gray-700">
                <span className="font-bold p-2 text-2xl dark:text-gray-300">Volume</span>
                <span className="text-2xl p-2 dark:text-gray-300">{collectionInfo?.volume}</span>
              </div>
              <div className="flex flex-col justify-center rounded-lg items-center border border-gray-500 dark:border-gray-300 bg-gray-300 dark:bg-gray-700">
                <span className="font-bold p-2 text-2xl dark:text-gray-300">Latest Price</span>
                <span className="text-2xl p-2 dark:text-gray-300">{collectionInfo?.latest}</span>
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
                if (selected != 'All') {
                  setHasMore({ All: false, Sale: false, Created: false })
                  setData({ All: [], Sale: [], Created: [] })
                  setSel('All')
                }
              }}
              className={"font-bold dark:text-gray-400 hover:!text-gray-700 text-lg dark:hover:!text-white h-10 w-14 " + (selected == "All" ? "primaryBtn  !text-white hover:!text-white dark:hover:!bg-gray-900 dark:bg-none dark:!bg-gray-800" : "")}>All</button>
            <button
              onClick={() => {
                if (selected != 'Sale') {
                  setHasMore({ All: false, Sale: false, Created: false })
                  setData({ All: [], Sale: [], Created: [] })
                  setSel('Sale')
                }
              }} className={"font-bold dark:text-gray-400 text-lg hover:!text-gray-700 dark:hover:!text-white h-10 w-18 " + (selected == "Sale" ? "primaryBtn !text-white hover:!text-white dark:hover:!bg-gray-900 dark:bg-none dark:!bg-gray-800" : "")}>Onsale</button>
            {/* <button
              onClick={() => {
                if (selected != 'Created') {
                  setHasMore({ All: false, Sale: false, Created: false })
                  setData({ All: [], Sale: [], Created: [] })
                  setSel('Created')
                }
              }} className={"font-bold dark:text-gray-400 text-lg hover:!text-gray-700 dark:hover:!text-white h-10 w-18 ml-2 " + (selected == "Created" ? "primaryBtn !text-white hover:!text-white dark:hover:!bg-gray-900 dark:bg-none dark:!bg-gray-800" : "")}>Created</button> */}
          </div>
        </div>
        <div className="App w-full mt-10 grid xl:grid-cols-5 2xl:grid-cols-6 3xl:grid-cols-7 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2  ">
          {
            data[selected].map((each) => (
              selected == 'Created' ?
                <CreatedCard nft={each}></CreatedCard>
                :
                <ItemCard nft={each} Onsale={selected == "Sale"}></ItemCard>
            ))
          }
        </div>
      </InfiniteScroll>:<div  className='flex w-[100vw] h-[100vh] mb-10 font-bold items-center justify-center text-2xl text-gray-800 dark:text-white'>
       Please login to see NFT’s...
         </div>
  );
};

export default ExploreCollection;
