import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ProfileEdit from '../components/Profile/ProfileEdit';
import Backdrop from '../components/Utilities/Backdrop';
import ItemCard from '../components/Utilities/ItemCard';
import Share from '../components/Utilities/Share';
import { DefaultAvatar, DefaultLogo, GRAPHQL_URL } from '../config/constants';
import { useActiveWeb3React } from '../hooks';
import { useCoverBg } from '../hooks/useCoverBg';
import useFollowButton from '../hooks/useFollowButton';
import { getAFCNFTAddress } from '../utils/addressHelpers';
import { nFormatter } from '../utils/helper';
import multicall from '../utils/multicall';
import NFTABI from '../config/abi/AFCNFT.json';
import { loginUser } from '../contexts/AuthContext';
import useAuth from '../hooks/useAuth';
import { notification } from 'antd';
import CollectionCard from '../components/Utilities/CollectionCard';
import { BsFillPencilFill, BsPencilSquare } from 'react-icons/bs';
import { BsDiscord, BsGlobe2, BsInstagram, BsTwitter, BsEnvelope } from 'react-icons/bs';
import { getContract } from '../utils/contracts';
import { placeholderContractABI } from '../config/abi/common';
import { ethers } from 'ethers';
import InfiniteScroll from 'react-infinite-scroll-component';
import { convertJsonLinks, getBigNumber, getObjectType } from '../utils';
import { proxy1 } from "../config/abi/common";
import CreatedCard from '../components/Utilities/CreatedCard';


const Profile = () => {

    const { account, library } = useActiveWeb3React()
    const { login } = useAuth()
    const navigate = useNavigate()
    const [user, setUser] = useState(null)
    const [active, setActive] = useState("own")
    const bg = useCoverBg(user?.bannerURL || DefaultLogo)
    const [data, setData] = useState({})
    const [hasMore, setHasMore] = useState({ own: false })

    // useEffect(()=>{
    //     if(!account)
    //     notification.warn({
    //       message : "Warning",
    //       description : "Please login for more explore..."
    //     })
    //   },[account])

    useEffect(() => {
        if (account) {
            axios.post(proxy1 + "/api/getUserInfo", {
                payload: { wallet: account }
            }).then((resp) => {
                setUser({ ...resp.data[0] })
            })
        }
    }, [account])

    const getNext = () => {
        switch (active) {
            case "own":
                getOwnNFT()
                break
            case "collection":
                getCollection()
                break
            case "sale":
                getSale()
                break
            case "created":
                getCreated()
                break;
        }
    }

    const countPerPage = 12

    const getSale = async () => {
        const resp = await axios.post(proxy1 + '/api/getListedData', {
            payload: {
                seller: account,
                status: "listed",
                perPage: 12,
                lastVisible: (!data['sale'] || data['sale']?.length == 0 ? '' : data['sale'][data['sale'].length - 1].createdAt),
            }
        })
        if (resp.data.length == 12) setHasMore((prev) => ({ ...prev, sale: true }))
        else setHasMore((prev) => ({ ...prev, sale: false }))
        setData((prev) => ({ ...prev, sale: [...prev["sale"], ...resp.data] }))
    }

    const getCreated = async () => {
        const resp = await axios.post(proxy1 + '/api/getCreatedNFT', {
            payload: {
                creator: account,
                perPage: 12,
                lastVisible: (!data['created'] || data['created']?.length == 0 ? '' : data['created'][data['created'].length - 1].createdAt),
            }
        })
        if (resp.data.length == 12) setHasMore((prev) => ({ ...prev, created: true }))
        else setHasMore((prev) => ({ ...prev, created: false }))
        setData((prev) => ({ ...prev, created: [...prev["created"], ...resp.data] }))
    }

    const getCollection = () => {
        axios.post(proxy1 + '/api/getCollection', {
            params: { restriction: [{ field: "register", oper: "==", value: account }] }
        }).then((resp) => {
            const { data } = resp
            setData((prev) => ({ ...prev, collection: data }))
        }).catch((e) => {
            notification.error({
                message: "Error",
                description: "Some error fetched!!"
            })
        })
    }

    const getOwnNFT = () => {
        axios.post(proxy1 + '/api/getCollectionById', {
            params: {}
        }).then(async (resp) => {
            const collectionInfo = resp.data
            let fetched = 0
            let full = false
            let prevOwns = 0
            let temp1 = false
            const curCount = (!data["own"] ? 0 : data["own"].length)
            for (let i = 0; i < collectionInfo.length; i++) {
                try {
                    const each = collectionInfo[i]
                    if (temp1 && each.creator) continue
                    if (each.creator) {
                        temp1 = true
                    }
                    const contract = getContract(each.contractAddress, placeholderContractABI, new ethers.providers.Web3Provider(window.ethereum).getSigner())
                    const bcount = await contract.balanceOf(account)
                    if (bcount == 0) return
                    if (fetched == countPerPage) {
                        setHasMore((prev) => ({ ...prev, own: true }))
                        full = true
                        i = collectionInfo.length
                        continue
                    }
                    prevOwns += bcount
                    if (prevOwns < curCount) continue
                    const startVal = (fetched == 0 ? bcount - (prevOwns - curCount) : 0)
                    for (let j = startVal; j < bcount && fetched < countPerPage; j++) {
                        try {
                            let token = await contract.tokenOfOwnerByIndex(account, j)
                            token = Number(token)
                            const jsonLink = await contract.tokenURI(token)
                            const newLink = convertJsonLinks(jsonLink)
                            if (getObjectType(newLink) == "string") {
                                try {
                                    const { data } = await axios.get(newLink)
                                    data.tokenID = token
                                    data.owner = account
                                    data.logoURL = each.logoURL
                                    if (each.creator) {
                                        const res = await axios.post(proxy1 + '/api/getCollectionInfoByToken', {
                                            params: { tokenId: getBigNumber(token) }
                                        })
                                        if (!res?.data) continue
                                        data.id = "collectionid=" + res?.data?.id + "&token=" + token
                                        data.logoURL = res?.data?.logoURL
                                        setData((prev) => {
                                            if (prev["own"])
                                                return { ...prev, own: [...prev["own"], data] }
                                            else return { ...prev, own: [data] }
                                        })
                                        fetched++
                                    } else if (data.logoURL) {
                                        data.id = "collectionid=" + each.id + "&token=" + token
                                        setData((prev) => {
                                            if (prev["own"])
                                                return { ...prev, own: [...prev["own"], data] }
                                            else return { ...prev, own: [data] }
                                        })
                                        fetched++
                                    }
                                    if (fetched == countPerPage && i < bcount - 1) {
                                        setHasMore((prev) => ({ ...prev, own: true }))
                                        full = true
                                    }
                                } catch (e) {
                                    console.log(e)
                                    if (e.toString().search('Network Error') == -1) {
                                        // notification.error({
                                        //     message: 'Error',
                                        //     description: "Data fetch error!!!"
                                        // })
                                        continue
                                    }
                                    const { data } = await axios.post(proxy1 + '/api/getCorsURLs', { payload: newLink })
                                    data.tokenID = token
                                    data.id = "collectionid=" + each.id + "&token=" + token
                                    data.owner = account
                                    data.logoURL = each.logURL
                                    if (each.creator) {
                                        const res = await axios.post(proxy1 + '/api/getCollectionInfoByToken', {
                                            params: { tokenId: getBigNumber(token) }
                                        })
                                        if (!res?.data) continue
                                        data.id = "collectionid=" + res?.data?.id + "&token=" + token
                                        data.logoURL = res?.data?.logoURL
                                        setData((prev) => {
                                            if (prev["own"])
                                                return { ...prev, own: [...prev["own"], data] }
                                            else return { ...prev, own: [data] }
                                        })
                                        fetched++
                                    } else if (data.logoURL) {
                                        data.id = "collectionid=" + each.id + "&token=" + token
                                        setData((prev) => {
                                            if (prev["own"])
                                                return { ...prev, own: [...prev["own"], data] }
                                            else return { ...prev, own: [data] }
                                        })
                                        fetched++
                                    }
                                    if (fetched == countPerPage && i < bcount - 1) {
                                        setHasMore((prev) => ({ ...prev, own: true }))
                                        full = true
                                    }
                                }
                            } else {
                                newLink.tokenID = token
                                newLink.id = "collectionid=" + each.id + "&token=" + token
                                newLink.owner = account
                                newLink.logURL = each.logURL
                                if (each.creator) {
                                    const res = await axios.post(proxy1 + '/api/getCollectionInfoByToken', {
                                        params: { tokenId: getBigNumber(token) }
                                    })
                                    if (!res?.data) continue
                                    newLink.id = "collectionid=" + res?.data?.id + "&token=" + token
                                    newLink.logoURL = res?.data?.logoURL
                                    setData((prev) => {
                                        if (prev["own"])
                                            return { ...prev, own: [...prev["own"], newLink] }
                                        else return { ...prev, own: [newLink] }
                                    })
                                    fetched++
                                } else if (newLink.logoURL) {
                                    newLink.id = "collectionid=" + each.id + "&token=" + token
                                    setData((prev) => {
                                        if (prev["own"])
                                            return { ...prev, own: [...prev["own"], newLink] }
                                        else return { ...prev, own: [newLink] }
                                    })
                                    fetched++
                                }
                                if (fetched == countPerPage && i < bcount - 1) {
                                    setHasMore((prev) => ({ ...prev, own: true }))
                                    full = true
                                }
                            }
                        } catch (e) {
                            i = bcount - 1
                            contract.walletOfOwner(account).then(async (result) => {
                                if (result.length > 0) {
                                    for (let k = startVal; k < result.length && fetched < countPerPage; k++) {
                                        const token = result[k]
                                        const jsonLink = await contract.tokenURI(token)
                                        const newLink = convertJsonLinks(jsonLink)
                                        if (getObjectType(newLink) == "string") {
                                            try {
                                                const { data } = await axios.get(newLink)
                                                data.tokenID = token
                                                data.logoURL = each.logURL
                                                data.id = "collectionid=" + each.id + "&token=" + token
                                                if (each.creator) {
                                                    const res = await axios.post(proxy1 + '/api/getCollectionInfoByToken', {
                                                        params: { tokenId: getBigNumber(token) }
                                                    })
                                                    if (!res?.data) continue
                                                    data.id = "collectionid=" + res?.data?.id + "&token=" + token
                                                    data.logoURL = res?.data?.logoURL
                                                    setData((prev) => {
                                                        if (prev["own"])
                                                            return { ...prev, own: [...prev["own"], data] }
                                                        else return { ...prev, own: [data] }
                                                    })
                                                    fetched++
                                                } else if (data.logoURL) {
                                                    data.id = "collectionid=" + each.id + "&token=" + token
                                                    setData((prev) => {
                                                        if (prev["own"])
                                                            return { ...prev, own: [...prev["own"], data] }
                                                        else return { ...prev, own: [data] }
                                                    })
                                                    fetched++
                                                }
                                                if (fetched == countPerPage && i < result.length - 1) {
                                                    setHasMore((prev) => ({ ...prev, own: true }))
                                                    full = true
                                                }
                                            } catch (e) {
                                                if (e.toString().search('Network Error') == -1) {
                                                    // notification.error({
                                                    //     message: 'Error',
                                                    //     description: "Data fetch error!!!"
                                                    // })
                                                    continue
                                                }
                                                const { data } = await axios.post(proxy1 + '/api/getCorsURLs', { payload: newLink })
                                                data.tokenID = token
                                                data.id = "collectionid=" + each.id + "&token=" + token
                                                if (each.creator) {
                                                    const res = await axios.post(proxy1 + '/api/getCollectionInfoByToken', {
                                                        params: { tokenId: getBigNumber(token) }
                                                    })
                                                    if (!res?.data) continue
                                                    data.id = "collectionid=" + res?.data?.id + "&token=" + token
                                                    data.logoURL = res?.data?.logoURL
                                                    setData((prev) => {
                                                        if (prev["own"])
                                                            return { ...prev, own: [...prev["own"], data] }
                                                        else return { ...prev, own: [data] }
                                                    })
                                                    fetched++
                                                } else if (data.logoURL) {
                                                    data.id = "collectionid=" + each.id + "&token=" + token
                                                    setData((prev) => {
                                                        if (prev["own"])
                                                            return { ...prev, own: [...prev["own"], data] }
                                                        else return { ...prev, own: [data] }
                                                    })
                                                    fetched++
                                                }
                                                if (fetched == countPerPage && i < result.length - 1) {
                                                    setHasMore((prev) => ({ ...prev, own: true }))
                                                    full = true
                                                }
                                            }
                                        } else {
                                            newLink.tokenID = token
                                            newLink.id = "collectionid=" + each.id + "&token=" + token
                                            if (each.creator) {
                                                const res = await axios.post(proxy1 + '/api/getCollectionInfoByToken', {
                                                    params: { tokenId: getBigNumber(token) }
                                                })
                                                if (!res?.data) continue
                                                newLink.id = "collectionid=" + res?.data?.id + "&token=" + token
                                                newLink.logoURL = res?.data?.logoURL
                                                setData((prev) => {
                                                    if (prev["own"])
                                                        return { ...prev, own: [...prev["own"], newLink] }
                                                    else return { ...prev, own: [newLink] }
                                                })
                                                fetched++
                                            } else if (newLink.logoURL) {
                                                newLink.id = "collectionid=" + each.id + "&token=" + token
                                                setData((prev) => {
                                                    if (prev["own"])
                                                        return { ...prev, own: [...prev["own"], newLink] }
                                                    else return { ...prev, own: [newLink] }
                                                })
                                                fetched++
                                            }
                                            setData((prev) => {
                                                if (prev["own"])
                                                    return { ...prev, own: [...prev["own"], data] }
                                                else return { ...prev, own: [data] }
                                            })
                                            fetched++
                                            if (fetched == countPerPage && i < result.length - 1) {
                                                setHasMore((prev) => ({ ...prev, own: true }))
                                                full = true
                                            }
                                        }
                                    }
                                }
                            })
                        }
                    }
                }
                catch (ee) {
                    console.log(ee)
                    continue
                }
            }
            if (!full)
                setHasMore((prev) => ({ ...prev, own: false }))
            else setHasMore((prev) => ({ ...prev, own: true }))
        }).catch((e) => {
            notification.error({
                message: "Error",
                description: "Some error catched on fetching collection information!!"
            })
        });
    }

    useEffect(() => {
        getNext()
    }, [active, account])
    return (
        <>
            {account ?
                (<div className='w-full flex flex-col justify-center items-center mt-[70px]'>
                    <div className='w-[94vw] flex rounded-lg h-[200px] border border-gray' style={bg}></div>
                    <div className='w-[94vw] flex justify-center'>
                        <img src={user?.logoURL || DefaultAvatar} className="border border-solid bg-white border-black rounded-[9999px] max-w-[8vw] max-h-[8vw] w-[8vw] h-[8vw] -mt-[4vw]"></img>
                    </div>
                    <div className='w-94[vw] flex flex-col justify-center items-center mt-2'>
                        <p className='flex text-lg md:text-xl lg:text-2xl ml-16 xl:text-3xl 2xl:text-4xl font-bold dark:text-white'>{user?.name || "Unnamed"}<span onClick={() => { navigate("/profile/settings") }} className='ml-10 hover:text-blue-600 dark:hover:text-gray-800 cursor-pointer'><BsPencilSquare /></span></p>
                        <p className='border bg-gray-400 dark:bg-gray-800 cursor-pointer rounded-[30px] mt-2 p-2 flex text-[12px] md:text-[1rem] lg:text-lg xl:text-xl 2xl:text-2xl text-gray-800 dark:text-gray-300'>{account}</p>
                        {
                            user ?
                                <div className='grid grid-cols-5 mt-2 px-4 items-center h-[40px] justify-center w-full'>
                                    <div className='flex justify-center items-center'>
                                        <a href={user?.email} target={"_blank"} className="text-[rgba(32,129,226)] hover:!text-[rgba(32,129,226)] dark:text-white text-3xl hover:text-4xl  w-[40px]">
                                            <BsEnvelope />
                                        </a>
                                    </div>
                                    <div className='flex justify-center items-center'>
                                        <a href={user?.bio} target={"_blank"} className="text-[rgba(32,129,226)] hover:!text-[rgba(32,129,226)] dark:text-white  text-3xl hover:text-4xl w-[40px]">
                                            <BsGlobe2 />
                                        </a>
                                    </div>
                                    <div className='flex justify-center items-center'>
                                        <a href={user?.twitter} target={"_blank"} className="text-[rgba(32,129,226)] hover:!text-[rgba(32,129,226)] dark:text-white  text-3xl hover:text-4xl  w-[40px]">
                                            <BsTwitter />
                                        </a>
                                    </div>
                                    <div className='flex justify-center items-center'>
                                        <a href={user?.discord} target={"_blank"} className="text-[rgba(32,129,226)] hover:!text-[rgba(32,129,226)] dark:text-white  text-3xl hover:text-4xl w-[40px]">
                                            <BsDiscord />
                                        </a>
                                    </div>
                                    <div className='flex justify-center items-center'>
                                        <a href={user?.instagram} target={"_blank"} className="text-[rgba(32,129,226)] hover:!text-[rgba(32,129,226)] dark:text-white text-3xl hover:text-4xl w-[40px]">
                                            <BsInstagram />
                                        </a>
                                    </div>
                                </div> : null
                        }
                    </div>
                    <div className='w-[94vw] flex flex-col justify-center items-center my-2'>
                        <div className='flex flex-row tabs-div w-[90vw] justify-center items-center border-b border-gray-300'>
                            <button className={active == "own" ? "active" : ""} onClick={() => {
                                if (active != "own") {
                                    setData((prev) => ({ ...prev, own: [] }))
                                    setHasMore((prev) => ({ ...prev, own: false }))
                                    setActive("own")
                                }
                            }}>My NFTs</button>
                            <button className={active == "sale" ? "active" : ""} onClick={() => {
                                if (active != "sale") {
                                    setData((prev) => ({ ...prev, sale: [] }))
                                    setHasMore((prev) => ({ ...prev, sale: false }))
                                    setActive("sale")
                                }
                            }}>On sale</button>
                            <button className={active == "created" ? "active" : ""} onClick={() => {
                                if (active != "created") {
                                    setData((prev) => ({ ...prev, created: [] }))
                                    setHasMore((prev) => ({ ...prev, created: false }))
                                    setActive("created")
                                }
                            }}>Created</button>
                            <button className={active == "collection" ? "active" : ""} onClick={() => {
                                if (active != "collection") {
                                    setData((prev) => ({ ...prev, collection: [] }))
                                    setHasMore((prev) => ({ ...prev, collection: false }))
                                    setActive("collection")
                                }
                            }}>Collections</button>
                        </div>
                        <InfiniteScroll
                            className={"mt-00"}
                            dataLength={data[active] ? data[active].length : 0}
                            next={getNext}
                            hasMore={hasMore[active]}
                            loader={
                                <></>
                                // <div className='flex w-[100vw] h-[150px] items-center justify-center'>
                                //     <img className="m-auto w-14 h-14" src={"/loading.gif"} alt="loading" />
                                // </div>
                            }>
                            <div className='flex flex-row panes-div w-[90vw] justify-center items-center mt-2'>
                                {
                                    data['own'] && data["own"]?.length > 0 ?
                                        <div className={"max-h-[80vh] overflow-auto flex " + (active == "own" ? "active " : "")} >
                                            {data["own"]?.map((each) =>
                                                <ItemCard nft={each} ></ItemCard>
                                            )}
                                        </div>
                                        : <div className={'justify-center dark:text-white h-[200px] font-bold items-center w-full text-3xl ' + (active == "own" ? "active  !flex" : "")}>
                                            No items founded...
                                        </div>
                                }
                                {
                                    data['sale'] && data["sale"]?.length > 0 ?
                                        <div className={"max-h-[80vh] overflow-auto flex " + (active == "sale" ? "active " : "")} >
                                            {data["sale"]?.map((each) =>
                                                <ItemCard nft={each} Onsale={true} ></ItemCard>
                                            )}
                                        </div>
                                        : <div className={'justify-center dark:text-white h-[200px] font-bold items-center w-full text-3xl ' + (active == "sale" ? "active  !flex" : "")}>
                                            No items founded...
                                        </div>
                                }
                                {
                                    data['created'] && data["created"]?.length > 0 ?
                                        <div className={"max-h-[80vh] dark:text-white overflow-auto flex " + (active == "created" ? "active " : "")} >
                                            {data["created"]?.map((each) =>
                                                <ItemCard nft={each} created={true}></ItemCard>
                                            )}
                                        </div>
                                        : <div className={'justify-center dark:text-white h-[200px] font-bold  items-center w-full text-3xl ' + (active == "created" ? "active  !flex" : "")}>
                                            No items founded...
                                        </div>
                                }
                                {
                                    data['collection'] && data["collection"]?.length > 0 ?
                                        <div className={"max-h-[80vh] dark:text-white overflow-auto flex cols " + (active == "collection" ? "active " : "")} >
                                            {data["collection"]?.map((each) =>
                                                <CollectionCard collection={each} ></CollectionCard>
                                            )}
                                        </div>
                                        : <div className={'justify-center dark:text-white h-[200px] font-bold items-center w-full text-3xl ' + (active == "collection" ? "active !flex" : "")}>
                                            No items founded...
                                        </div>
                                }
                            </div>
                        </InfiniteScroll>
                    </div>
                </div>) : (null)}
        </>
    )
}


export default Profile
