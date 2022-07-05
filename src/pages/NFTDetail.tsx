import React, { useState, useEffect, useRef } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Row, notification, Modal, DatePicker, Badge } from 'antd'
import axios from "axios";
import { BsDiscord, BsGlobe2, BsInstagram, BsTwitter, BsEnvelope } from 'react-icons/bs';
import { approvedMarketContract, getContract } from "../utils/contracts";
import { marketplaceContractABI, marketplaceContractAddress, placeholderContractABI } from "../config/abi/common";
import { ethers } from "ethers";
import { convertJsonLinks, convertIamgeURL, getObjectType, parseLocation } from "../utils";
import { useActiveWeb3React } from '../hooks';
import { toWei } from "../utils/helper";
import useAuth from "../hooks/useAuth";
import { proxy1 } from "../config/abi/common";
import { getAFCTokenAddress } from "../utils/addressHelpers";

const NFTDetail = () => {
  const { account } = useActiveWeb3React()
  const { login } = useAuth()
  const { token, collectionid } = parseLocation(useLocation());
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
  const [nftData, setNftData] = useState({ owner: '', image: '', description: '', attributes: [], name: '' })
  const [listedInfo, setListedInfo] = useState(null)
  const [ownername, setOwnerName] = useState(null)
  const [ownerinfo, setOwnerInfo] = useState(null)
  const [isloading, setLoading] = useState(true)
  const [bidding, setBidding] = useState(false)
  const [listModal, setListModal] = useState({ visible: false, disableApprove: false, disableList: true, auction: false, confirmLoading: false, cancelLoading: false })
  const [listData, setListData] = useState({ price: 0, endDate: '' })
  const [delisting, setDelisting] = useState(false)
  const [bidprice, setBidPrice] = useState(null)
  const [auctionEnding, setAuctionEnding] = useState(false)
  const [buying, setBuying] = useState(false)
  const remain = useRef(null)
  const [auctionTimerLabel, setAuctionTimerLabel] = useState(<></>)

  const onBuy = async () => {
    if(!account){
      login("Injected")
      return
    }
    setBuying(true)
    try {
      const approved = await approvedMarketContract(getAFCTokenAddress(), account, new ethers.providers.Web3Provider(window.ethereum).getSigner())
      if (!approved) {
        notification.warn({
          message: 'Warning',
          description: 'Failed Token Approve!!'
        })
        return
      }
      const collectionContract = getContract(collectionInfo.contractAddress, placeholderContractABI, new ethers.providers.Web3Provider(window.ethereum).getSigner())
      let owner = "";
      try {
        owner = await collectionContract.owner()
      } catch (e) {
        const { data } = await axios.post(proxy1 + '/api/getCorsURLs', { payload: `https://bscscan.com/address/${collectionInfo.contractAddress}` })
        const temp1 = data.split("Creator Address")[1].substring(1, 60)
        const owner = temp1.substring(temp1.search("0x"), temp1.search("</a>"))
      }
      try {
        const contract = getContract(marketplaceContractAddress, marketplaceContractABI, new ethers.providers.Web3Provider(window.ethereum).getSigner())
        var tokens = toWei(listedInfo.price)
        await contract.buy(listedInfo.listingId, parseInt((100 / parseInt(collectionInfo.royalty)) + ""), owner, tokens, { from: account })
        contract.on("Sale", async () => {
          const { data } = await axios.post(proxy1 + "/api/buy", {
            payload: { id: listedInfo.id, buyer: account }
          })
          notification[(data.type)]({
            message: (data.type).at(0).toUpperCase() + data.type.substring(1),
            description: data.msg
          })
          window.location.reload()
        })
      } catch (e) {
        setBuying(false)
        if (e.toString().search('gas') == -1)
          notification[("error")]({
            message: "Error",
            description: "Error catched!!Check your balance!!"
          })
        else
          notification[("info")]({
            message: "Info",
            description: "Please check your balance..."
          })
      }
    } catch (e) {
      const contract = getContract(marketplaceContractAddress, marketplaceContractABI, new ethers.providers.Web3Provider(window.ethereum).getSigner())
      var tokens = toWei(listedInfo.price)
      await contract.buy_none(listedInfo.listingId, tokens, { from: account })
      contract.on("Sale", async () => {
        const { data } = await axios.post(proxy1 + "/api/buy", {
          payload: { id: listedInfo.id, buyer: account }
        })
        notification[(data.type)]({
          message: (data.type).at(0).toUpperCase() + data.type.substring(1),
          description: data.msg
        })
        window.location.reload()
      })
    }
  }

  const onBid = async () => {
    if(!account){
      login("Injected")
      return
    }
    if (!bidprice) {
      notification.warn({
        message: "Warning",
        description: "Please input bid price..."
      })
      return
    }

    if (bidprice < listedInfo.price) {
      notification.warn({
        message: "Warning",
        description: "Bid price must be greater than current bid price!!!"
      })
      return
    }
    setBidding(true)
    const approved = await approvedMarketContract(getAFCTokenAddress(), account, new ethers.providers.Web3Provider(window.ethereum).getSigner())
    if (!approved) {
      notification.warn({
        message: 'Warning',
        description: 'Failed Token Approve!!'
      })
      return
    }
    try {

      const contract = getContract(marketplaceContractAddress, marketplaceContractABI, new ethers.providers.Web3Provider(window.ethereum).getSigner())
      const tokens = toWei(bidprice)
      await contract.bid(listedInfo.listingId - 1, tokens, { from: account })
      contract.on("NewBidOnAuction", async (res) => {
        const { data } = await axios.post(proxy1 + '/api/updateListingInfo', {
          payload: { price: bidprice, curBidder: account, id: listedInfo.id, msg: "Bid Success!!!" }
        })
        notification[(data.type)]({
          message: (data.type).at(0).toUpperCase() + data.type.substring(1),
          description: data.msg
        })
        if (data.type == "success") setListedInfo((prev) => ({ ...prev, price: bidprice, curBidder: account }))
        setBidding(false)
      })
    } catch (e) {
      setBidding(false)
      notification.warn({
        message: "Error",
        description: "You can't do this action..."
      })
    }
  }

  const convert = (number) => {
    if (number >= 10) return number
    else return "0" + number
  }

  const auctionTimer = (count) => {
    const remainSec = Math.floor(remain.current) - count
    if (remainSec > 0) {
      const sec = 1
      const minute = sec * 60
      const hour = minute * 60
      const day = hour * 24

      const remainingDay = Math.floor(remainSec / day);
      const remainingHour = Math.floor((remainSec % day) / hour);
      const remainingMinute = Math.floor((remainSec % hour) / minute);
      const remainingSecond = Math.floor((remainSec % minute) / sec);
      setAuctionTimerLabel(
        <><span>Remain </span> <span className="text-xl font-bold lg:text-2xl 2xl:text-4xl  px-4">{convert(remainingDay)}</span> days <span className="text-xl  px-4 font-bold lg:text-2xl 2xl:text-4xl">{convert(remainingHour)}</span> hours <span className="  px-4 text-xl font-bold lg:text-2xl 2xl:text-4xl">{convert(remainingMinute)}</span> minutes<span className=" px-4 text-xl font-bold lg:text-2xl 2xl:text-4xl">{convert(remainingSecond)}</span>seconds</>
      )


      if (remainingSecond % 10 == 0 && !delisting)
        axios.post(proxy1 + '/api/getListedData', {
          payload: {
            collectionId: collectionid,
            tokenId: token,
            status: "listed"
          }
        }).then((resp) => {
          const { data } = resp
          if (data.length > 0) {
            setListedInfo({ ...data[0] })
            setBidPrice(data[0].price)
          }
          else {
            setListedInfo(null)
            window.location.reload()
          }
        })
      setTimeout(() => {
        auctionTimer(count + 1)
      }, 1000)
    } else {
      setAuctionEnding(true)
      const contract = getContract(marketplaceContractAddress, marketplaceContractABI, new ethers.providers.Web3Provider(window.ethereum).getSigner())
      contract.on("NFTClaimed", () => {
        notification.success({
          message: "Success",
          description: "Auction Ended!!!"
        })
        window.location.reload()
      })
    }
  }


  const onApprove = async () => {
    if (listData.price == 0) {
      notification.warn({
        message: "Warning",
        description: "Price must be a number greater than 0!!"
      })
      return
    }
    if (listModal.auction && listData.endDate == '') {
      notification.warn({
        message: "Warning",
        description: "Date is not selected!!"
      })
      return
    }
    setListModal((prev) => ({ ...prev, confirmLoading: true, disableApprove: true }))
    const contract = getContract(collectionInfo.contractAddress, placeholderContractABI, new ethers.providers.Web3Provider(window.ethereum).getSigner())
    await contract.setApprovalForAll(marketplaceContractAddress, true, { from: account })
    contract.on("ApprovalForAll", () => {
      setListModal((prev) => ({ ...prev, confirmLoading: false, disableList: false }))
    })
  }

  const onDelist = async (status = "delisted") => {
    setDelisting(true)
    try {
      const contract = getContract(marketplaceContractAddress, marketplaceContractABI, new ethers.providers.Web3Provider(window.ethereum).getSigner())
      if (status == "delisted") {
        await contract.delist(listedInfo.listingId, { from: account })
        contract.on("NFTDelisted", async () => {
          const res = await axios.post(proxy1 + "/api/delist", {
            payload: { id: listedInfo.id, status }
          })
          notification[(res.data.type)]({
            message: (res.data.type).at(0).toUpperCase() + res.data.type.substring(1),
            description: res.data.msg
          })
          setDelisting(false)
          window.location.reload()
        })
      }
      else {
        await contract.refund(listedInfo.listingId - 1, { from: account })
        contract.on("NFTRefunded", async () => {
          const res = await axios.post(proxy1 + "/api/delist", {
            payload: { id: listedInfo.id, status }
          })
          notification[(res.data.type)]({
            message: (res.data.type).at(0).toUpperCase() + res.data.type.substring(1),
            description: res.data.msg
          })
          setDelisting(false)
          window.location.reload()
        })
      }
    } catch (e) {
      notification.warn({
        message: "Warning",
        description: "You can't do this action...."
      })
      setDelisting(false)
    }
  }

  const onList = async () => {
    setListModal((prev) => ({ ...prev, cancelLoading: true, disableList: true }))
    try {
      const contract = getContract(marketplaceContractAddress, marketplaceContractABI, new ethers.providers.Web3Provider(window.ethereum).getSigner())
      var tokens = toWei(listData.price)
      if (listModal.auction) {
        const end = new Date(listData.endDate + ' '), start = new Date()
        await contract.createAuction(collectionInfo.contractAddress, token, tokens, Math.floor((end.getTime() - start.getTime()) / 1000), { from: account })
        contract.on("NewAuction", (res) => {
          const saveData = {
            contractAddress: collectionInfo.contractAddress,
            tokenId: token,
            collectionId: collectionid,
            seller: account,
            status: "listed",
            auction: true,
            listingId: Number(res),
            price: listData.price,
            originPrice: listData.price,
            duration: Math.floor((end.getTime() - start.getTime()) / 1000),
            curBidder: account
          }
          axios.post(proxy1 + '/api/saveListData', { payload: saveData }).then((res) => {
            notification[(res.data.type)]({
              message: (res.data.type).at(0).toUpperCase() + res.data.type.substring(1),
              description: res.data.msg
            })
            setListModal((prev) => ({ ...prev, visible: false }))
          })
        })
      } else {
        await contract.list(collectionInfo.contractAddress, token, tokens, { from: account })
        contract.on("Listed", (res) => {
          const saveData = {
            contractAddress: collectionInfo.contractAddress,
            tokenId: token,
            collectionId: collectionid,
            seller: account,
            status: "listed",
            auction: false,
            listingId: Number(res),
            price: listData.price,
            originPrice: listData.price,
          }
          axios.post(proxy1 + '/api/saveListData', { payload: saveData }).then((res) => {
            notification[(res.data.type)]({
              message: (res.data.type).at(0).toUpperCase() + res.data.type.substring(1),
              description: res.data.msg
            })
            setListModal((prev) => ({ ...prev, visible: false }))
          })
        })
      }
    } catch (e) {
      notification.error({
        message: "Error",
        description: "Some error catched!!"
      })
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
    if (nftData.owner != '' || listedInfo)
      axios.post(proxy1 + '/api/getUserInfo', {
        payload: { wallet: listedInfo ? listedInfo.seller : nftData.owner }
      }).then((resp) => {
        const { data } = resp
        if (!data || data.length == 0)
          setOwnerName(listedInfo ? listedInfo.seller : nftData.owner)
        else setOwnerInfo(data[0])
      })
  }, [nftData, listedInfo])

  useEffect(() => {
    if (!delisting && !listModal.visible)
      axios.post(proxy1 + '/api/getListedData', {
        payload: {
          collectionId: collectionid,
          tokenId: token,
          status: "listed"
        }
      }).then((resp) => {
        const { data } = resp
        if (data.length > 0) {
          setListedInfo({ ...data[0] })
          const remain1 = Math.floor((data[0].duration * 1000 + data[0].createdAt - data[0].curDate) / 1000)
          remain.current = remain1
          setBidPrice(data[0].price)
          auctionTimer(0)
        }
        else setListedInfo(null)
      })
  }, [collectionid, token, delisting, listModal.visible])

  useEffect(() => {
    axios.post(proxy1 + '/api/getCollectionById', {
      params: { collectionid }
    }).then(async (resp) => {
      setCollectionInfo({ ...resp.data })
      if(!account){
        const {data} = await axios.post(proxy1 + "/api/getAllNFTs",{
          payload : {
            restriction : [],
            lastVisible : '',
            limit : 1,
            token
          }
        })
        setNftData({ ...data[0] })
          setLoading(false)
        return
      }

      const contract = getContract(resp.data.contractAddress, placeholderContractABI, new ethers.providers.Web3Provider(window.ethereum).getSigner())
      const jsonLink = await contract.tokenURI(token)
      const owner = await contract.ownerOf(token)
      const newLink = convertJsonLinks(jsonLink)
      if (getObjectType(newLink) == "string") {
        try {
          const { data } = await axios.get(newLink)
          data.tokenID = token
          data.owner = owner
          setNftData({ ...data })
          setLoading(false)
        } catch (e) {
          if (e.toString().search('Network Error') == -1) {
            notification.error({
              message: 'Error',
              description: "Data fetch error!!!"
            })
            window.location.href = "/collections"
          }
          const { data } = await axios.post(proxy1 + '/api/getCorsURLs', { payload: newLink })
          data.tokenID = token
          data.owner = owner
          setNftData({ ...data })
          setLoading(false)

        }
      } else {
        newLink.tokenID = token
        newLink.owner = owner
        setNftData({ ...newLink })
        setLoading(false)
      }
    }).catch((e) => {
      alert(e)
      notification.error({
        message: "Error",
        description: "Some error catched on fetching collection information!!"
      })
      window.location.href = "/collections"
    });
  }, [collectionid])

  return <>
    {
      isloading ? <><div className='flex w-[100vw] h-[100vh] items-center justify-center'>
        <img className="m-auto w-14 h-14" src={"/loading.gif"} alt="loading" />
      </div></> :
        <div className="block md:flex w-[94vw] min-h-[80vh] mt-[90px] mx-[3vw] mb-4">
          <div className="block md:flex w-full md:w-[40vw]">
            <img src={convertIamgeURL(nftData?.image)} className=" md:max-w-[40vw] max-h-[94vh]  rounded-[50px] max-w-[90vw]"></img>
          </div>
          <div className="flex md:flex pl-[2vw] w-full md:w-[52vw] flex-col">
            <Row className="text-4xl lg:text-5xl 2xl:text-7xl font-extrabold w-full dark:text-white mt-10">{nftData?.name + (nftData?.name?.includes(token) ? '' : ' #' + token)}</Row>
            <Row className="mt-4 w-full">
              <Row className="lg:text-xl text-lg 2xl:text-3xl text-gray-400 w-full">Collection</Row>
              <Row className="w-full items-center">
                <img src={collectionInfo.logoURL} className="w-[5vw] h-[5vw] min-h-[40px] min-w-[40px] rounded-[1000px]"></img>
                <p className="lg:text-2xl text-xl 2xl:text-4xl pl-6 font-bold items-center dark:text-white">{collectionInfo.title}</p>
              </Row>
            </Row>
            <Row className="lg:text-2xl text-xl 2xl:text-4xl text-black font-bold items-center dark:text-white"><span className="lg:text-xl text-lg 2xl:text-3xl">Owner</span> &nbsp;&nbsp; {ownername || ownerinfo?.name}</Row>
            {
              ownerinfo ?
                <Row className='flex mt-2 items-center justify-start'>
                  <div className="flex justify-center items-center px-4 py-2 lg:text-lg text-lg 2xl:text-2xl dark:text-white">{ownerinfo.address}</div>
                  <div className="flex h-[40px] flex-row justify-center items-center px-4 py-2 lg:text-lg text-lg 2xl:text-2xl dark:text-white">
                    <div className='flex justify-center items-center'>
                      <a href={ownerinfo?.email} target={"_blank"} className="text-[rgba(32,129,226)] hover:!text-[rgba(32,129,226)] dark:text-white text-3xl hover:text-4xl  w-[40px]">
                        <BsEnvelope />
                      </a>
                    </div>
                    <div className='flex justify-center items-center'>
                      <a href={ownerinfo?.bio} target={"_blank"} className="text-[rgba(32,129,226)] hover:!text-[rgba(32,129,226)] dark:text-white  text-3xl hover:text-4xl w-[40px]">
                        <BsGlobe2 />
                      </a>
                    </div>
                    <div className='flex justify-center items-center'>
                      <a href={ownerinfo?.twitter} target={"_blank"} className="text-[rgba(32,129,226)] hover:!text-[rgba(32,129,226)] dark:text-white  text-3xl hover:text-4xl  w-[40px]">
                        <BsTwitter />
                      </a>
                    </div>
                    <div className='flex justify-center items-center'>
                      <a href={ownerinfo?.discord} target={"_blank"} className="text-[rgba(32,129,226)] hover:!text-[rgba(32,129,226)] dark:text-white  text-3xl hover:text-4xl w-[40px]">
                        <BsDiscord />
                      </a>
                    </div>
                    <div className='flex justify-center items-center'>
                      <a href={ownerinfo?.instagram} target={"_blank"} className="text-[rgba(32,129,226)] hover:!text-[rgba(32,129,226)] dark:text-white text-3xl hover:text-4xl w-[40px]">
                        <BsInstagram />
                      </a>
                    </div>
                  </div>
                </Row> : null
            }
            <Row className="w-full text-gray-400 text-lg lg:text-xl 2xl:text-3xl mt-4">
              {nftData.description}
            </Row>
            {nftData.attributes?.length && <Row className="w-full flex">
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
            </Row>}
            {account == nftData.owner && listedInfo == null ?
              <Row className="w-full flex flex-col">
                <Modal visible={listModal.visible} title={<div className="text-xl 2xl:text-2xl">Listing for Sale...</div>} footer={[
                  <button className={"primaryBtn p-4 py-2 min-w-[100px]  dark:bg-none dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-900 mr-2 text-lg 2xl:text-xl " + (listModal.disableApprove ? "disabled" : "")} key="approve" onClick={onApprove}>
                    {listModal.confirmLoading ? "Approving..." : listModal.disableApprove ? "Approved" : "Approve"}
                  </button>,
                  <button className={"primaryBtn p-4 py-2 min-w-[100px]  dark:bg-none dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-900 text-lg 2xl:text-xl " + (listModal.disableList ? "disabled" : "")} key="list" onClick={onList}>
                    {listModal.cancelLoading ? "Listing..." : "List"}
                  </button>
                ]} onCancel={() => { setListModal((prev) => ({ ...prev, visible: false })) }}>
                  <div className="flex flex-col w-5/6">
                    <div className="flex flex-row w-full items-center">
                      <p className="text-lg lg:text-xl 2xl:text-2xl">Price</p>
                      <div className="ml-6 border w-full dark:border-gray-300 border-gray-800 text-lg lg:text-xl 2xl:text-2xl rounded-[100px]"><input value={listData.price} className="bg-transparent w-full rounded-[100px] p-4" onChange={(e) => { setListData((prev) => ({ ...prev, price: parseInt(e.target.value) })) }} type="number"></input></div>
                      <p className="text-lg lg:text-xl 2xl:text-2xl ml-2">AFC</p>
                    </div>
                    {listModal.auction ?
                      <div className="flex flex-row w-full mt-2 items-center">
                        <p className="text-lg lg:text-xl 2xl:text-2xl">Date</p>
                        <div className="ml-6 border w-full dark:border-gray-300 border-gray-800 text-lg lg:text-xl 2xl:text-2xl rounded-[100px]"><DatePicker disabledDate={d => !d
                          || d.isBefore(Date.now())} className="bg-transparent rounded-[100px] w-full text-lg lg:text-xl 2xl:text-2xl dark:!text-white p-4" onChange={(date, dateString) => { setListData((prev) => ({ ...prev, endDate: dateString })) }}></DatePicker></div>
                      </div> : null
                    }
                  </div>
                </Modal>
                <div className="text-lg flex font-bold lg:text-xl 2xl:text-3xl mt-4 dark:text-white">List for Sale</div>
                <div className="flex flex-col lg:flex-row mt-4 lg:px-[5%] w-full">
                  <button className="primaryBtn mt-2 dark:bg-none dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-900 w-full text-sm lg:text-lg 2xl:text-2xl text-green dark:text-white justify-center p-4 lg:w-[40%] lg:mx-[4%]" onClick={
                    () => {
                      setListModal((prev) => ({ ...prev, visible: true, disableApprove: false, disableList: true, auction: false, confirmLoading: false, cancelLoading: false }))
                      setListData((prev) => ({ ...prev, price: 0 }))
                    }
                  }>Fixed </button>
                  <button className="primaryBtn mt-2 dark:bg-none dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-900 w-full text-sm lg:text-lg 2xl:text-2xl text-green dark:text-white justify-center p-4 lg:w-[40%] lg:mx-[4%]" onClick={
                    () => {
                      setListModal((prev) => ({ ...prev, visible: true, disableApprove: false, disableList: true, auction: true, confirmLoading: false, cancelLoading: false }))
                      setListData((prev) => ({ ...prev, price: 0 }))
                    }
                  }>Auction</button>
                </div>
              </Row> : null}
            {
              listedInfo ?
                listedInfo.seller == account ?
                  <Row className="flex flex-col w-full">
                    <Row className="text-lg font-bold lg:text-xl 2xl:text-3xl mt-4 dark:text-white">{listedInfo.auction ? "Listed for Auction" : "Listed for Fixed Sale"}</Row>
                    <Row className="flex w-full">
                      {
                        listedInfo.auction ?
                          <>
                            <div className=" text-gray-700 dark:text-gray-300 text-lg lg:text-xl 2xl:text-3xl mt-2 flex pl-6 flex-row min-h-[30px] items-end w-full">
                              {auctionTimerLabel}
                            </div>
                            <div className="flex pl-6 flex-row min-h-[30px] items-end w-full">
                              <p className="text-lg lg:text-xl 2xl:text-3xl mt-4 text-gray-700 dark:text-gray-300">Price</p>
                              <p className="text-xl lg:text-2xl mx-4 2xl:text-4xl font-bold mt-4 text-gray-700 dark:text-gray-300">{listedInfo.price}AFC</p>
                              <p className="text-lg lg:text-xl 2xl:text-3xl mt-4 text-gray-700 dark:text-gray-300">OriginPrice</p>
                              <p className="text-xl lg:text-2xl mx-4 2xl:text-4xl font-bold mt-4 text-gray-700 dark:text-gray-300">{listedInfo.originPrice}AFC</p>
                            </div>
                            {
                              listedInfo.curBidder == account ?
                                <button className={(auctionEnding ? "disabled " : "") + "mt-2 w-full primaryBtn mt-2 dark:bg-none dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-900 w-full text-sm lg:text-lg 2xl:text-2xl text-green dark:text-white justify-center p-4 "} onClick={
                                  () => { onDelist("refunded") }
                                }>{delisting ? "Claiming..." : auctionEnding ? "AuctionEnding..." : "Claim"}</button>
                                : <Modal title="Auction Ending..." visible={auctionEnding} closable={false} footer={null}>
                                  <p className="text-2xl dark:text-white">Just a moment....</p>
                                </Modal>
                            }
                          </>
                          :
                          <div className="flex pl-6 flex-row min-h-[30px] items-end w-full">
                            <p className="text-lg lg:text-xl 2xl:text-3xl mt-4 text-gray-700 dark:text-gray-300">Price</p>
                            <p className="text-xl lg:text-2xl mx-4 2xl:text-4xl font-bold mt-4 text-gray-700 dark:text-gray-300">{listedInfo.price}AFC</p>
                            <button className={(delisting ? "disabled " : "") + "w-full primaryBtn mt-2 dark:bg-none dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-900 w-full text-sm lg:text-lg 2xl:text-2xl text-green dark:text-white justify-center p-4 "} onClick={
                              () => onDelist("delisted")
                            }>{delisting ? "Delisting..." : "Delist"}</button>
                          </div>
                      }
                    </Row>
                  </Row> :
                  <Row className="flex flex-col w-full">
                    {listedInfo.auction && listedInfo.curBidder == account ? <Badge.Ribbon text={"Bidder : You"}></Badge.Ribbon> : null}
                    <Row className="text-lg font-bold lg:text-xl 2xl:text-3xl mt-4 dark:text-white">{listedInfo.auction ? "Listed for Auction" : "Listed for Fixed Sale"}</Row>
                    <Row className="flex w-full">
                      {
                        listedInfo.auction ?
                          <>
                            <div className=" text-gray-700 dark:text-gray-300 text-lg lg:text-xl 2xl:text-3xl mt-2 flex pl-6 flex-row min-h-[30px] items-end w-full">
                              {auctionTimerLabel}
                            </div>
                            <div className="flex pl-6 flex-row min-h-[30px] items-end w-full">
                              <p className="text-lg lg:text-xl 2xl:text-3xl mt-4 text-gray-700 dark:text-gray-300">Price</p>
                              <p className="text-xl lg:text-2xl mx-4 2xl:text-4xl font-bold mt-4 text-gray-700 dark:text-gray-300">{listedInfo.price}AFC</p>
                              <p className="text-lg lg:text-xl 2xl:text-3xl mt-4 text-gray-700 dark:text-gray-300">OriginPrice</p>
                              <p className="text-xl lg:text-2xl mx-4 2xl:text-4xl font-bold mt-4 text-gray-700 dark:text-gray-300">{listedInfo.originPrice}AFC</p>
                            </div>
                            <div className="flex pl-6 flex-row min-h-[30px] items-end w-full">
                              <div className="flex flex-row w-full items-center text-gray-700 dark:text-gray-300">
                                <p className="text-lg lg:text-xl 2xl:text-2xl">BidPrice</p>
                                <div className="mx-1 border w-full dark:border-gray-300 border-gray-700 text-lg lg:text-xl 2xl:text-2xl rounded-[100px]"><input className="bg-transparent w-full rounded-[100px] p-4 py-2" onChange={(e) => { setBidPrice(parseInt(e.target.value)) }} value={bidprice} min={listedInfo.price} type="number"></input></div>
                              </div>
                              <button className={(bidding || auctionEnding ? "disabled " : "") + "mt-2 w-full primaryBtn mt-2 dark:bg-none dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-900 w-full text-sm lg:text-lg 2xl:text-2xl text-green dark:text-white justify-center p-4 "} onClick={
                                onBid
                              }>{bidding ? "Bidding..." : auctionEnding ? "AuctionEnding..." : "Bid"}</button>
                            </div>
                          </>
                          :
                          <div className="flex pl-6 flex-row min-h-[30px] items-end w-full">
                            <p className="text-lg lg:text-xl 2xl:text-3xl mt-4 text-gray-700 dark:text-gray-300">Price</p>
                            <p className="text-xl lg:text-2xl mx-4 2xl:text-4xl font-bold mt-4 text-gray-700 dark:text-gray-300">{listedInfo.price}AFC</p>
                            <button className={(buying ? "disabled " : "") + "w-full primaryBtn mt-2 dark:bg-none dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-900 w-full text-sm lg:text-lg 2xl:text-2xl text-green dark:text-white justify-center p-4 "} onClick={
                              onBuy
                            }>{buying ? "Buying..." : "Buy now"}</button>
                          </div>
                      }
                    </Row>
                  </Row> : null
            }
          </div>
        </div>
    }
  </>
};

export default NFTDetail;
