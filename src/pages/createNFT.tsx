import { notification, Select } from "antd"
import axios from "axios"
import { ethers } from "ethers"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { proxy1 } from "../config/abi/common"
import { DefaultAvatar, DefaultLogo } from "../config/constants"
import { useActiveWeb3React } from "../hooks"
import { toWei } from "../utils"
import { getAFCTokenAddress } from "../utils/addressHelpers"
import { getNFTContract } from "../utils/contracts"
import ImportCollection from "./ImportCollection"

const CreateNFT = () => {
    const { account, library } = useActiveWeb3React()
    const navigate = useNavigate()
    const [myCollection, setMyCollection] = useState([])
    const [isCollection, setIsCollection] = useState(false)
    const [isLoading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [nftData, setNftData] = useState(null)
    const [buttonDisable, setDisable] = useState(false)

    useEffect(() => {
        if(account)
        axios.post(proxy1 + '/api/getCollection', {
            params: {
                restriction: [{ field: 'creator', oper: "==", value: account }],
                limit: 10000
            }
        }).then((resp) => {
            const { data } = resp
            setMyCollection(data)
            if (data.length > 0)
                setNftData({ collectionId: data[0].id })
            setLoading(false)
        })
    }, [account])


    const changeImage = (e) => {
        const files = e.target.files
        setNftData((prev) => ({
            ...prev, imageFile: files[0]
        }))

        const objectUrl = URL.createObjectURL(files[0])

        setNftData((prev) => ({ ...prev, image: objectUrl }))
    }

    const convert = (temp) => {
        const res1 = temp.at(0).toUpperCase()
        temp = temp.substring(1)
        return res1 + temp.split("-").join(" ")
    }
    const submitData = (e) => {
        if(!nftData){
            notification.warn({
                message : "Warning",
                description : "Please insert data!!"
              })
              return
        }
        if(!nftData.image || nftData.image == ''){
            notification.warn({
              message : "Warning",
              description : "Please select image!!"
            })
            return
          }
          if(!nftData.name || nftData.name == ''){
            notification.warn({
              message : "Warning",
              description : "Please input name!!"
            })
            return
          }
          
          if(!nftData.description || nftData.description == ''){
            notification.warn({
              message : "Warning",
              description : "Please input description!!"
            })
            return
          }
          
        //   if(!nftData.count || nftData.count == ''){
        //     notification.warn({
        //       message : "Warning",
        //       description : "Please input count!!"
        //     })
        //     return
        //   }
          
        //   if(!nftData.price || nftData.price == ''){
        //     notification.warn({
        //       message : "Warning",
        //       description : "Please input price!!"
        //     })
        //     return
        //   }
        // e.preventDefault()
        setDisable(true)
        setSaving(true)
        const formData = new FormData()
        formData.append("imageFile", nftData.imageFile)
        formData.append("payload", JSON.stringify({ ...nftData, account }))
        axios.post(proxy1 + '/api/uploadMetadata', formData, { headers: { "Content-Type": 'multipart/form-data' } }).then(async (resp) => {
            const { data } = resp
            try {
                const nftContract = getNFTContract(new ethers.providers.Web3Provider(window.ethereum).getSigner())
                // const tx = await nftContract
                //     .createItem(
                //         data.tokenURI,
                //         data.count,
                //         toWei(data.price),
                //         false,
                //         0,
                //         0,
                //         getAFCTokenAddress(),
                //         toWei(String(0), 18),
                //     );
                // nftContract.on("ItemCreated", async (itemId) => {
                //     await axios.post(proxy1 + "/api/createdItem", { payload: { ...data, itemId } })
                //     notification.success({
                //         message: "Item created",
                //         description: 'Created Success!!'
                //     })
                //     navigate("/profile")
                // })
                const tx = await nftContract
                    .createItem(
                        data.tokenURI
                    )
                nftContract.on("TokenMinted", async (owner,tokenId) => {
                    await axios.post(proxy1 + "/api/createdItem", { payload: { ...data, tokenId, owner:account } })
                    notification.success({
                        message: "NFT created",
                        description: 'Created Success!!'
                    })
                    navigate("/profile")
                })
            } catch (e) {
                console.log(e)
                await axios.post(proxy1 + "/api/createdItem", { payload: { ...data, delete: true } })
                notification.error({
                    message: "Creat Item Error",
                    description: 'Error catched on creating item...'
                })
                setDisable(false)
                setSaving(false)
            }
        })
    }

    return (<>
        {
            isLoading || !account ?
                <div className='flex w-[100vw] h-[100vh] items-center justify-center'>
                    <img className="m-auto w-14 h-14" src={"/loading.gif"} alt="loading" />
                </div>
                :
                <div className={"flex flex-col px-4 lg:mx-auto w-full  " + (myCollection.length == 0 ? " mt-[200px] " : " mt-[100px]")}>
                    {
                        myCollection.length > 0 && <div className="flex justify-end my-2 z-[10]">
                            <button onClick={() => {
                                setIsCollection(!isCollection)
                            }} className="primaryBtn p-4 !text-lg lg:!text-2xl py-2 dark:bg-none dark:hover:bg-gray-900 dark:bg-gray-800">{isCollection ? "Create NFT" : "Create Collection"}</button>
                        </div>
                    }
                    {
                        myCollection.length == 0 || isCollection ?
                            <ImportCollection mode={true}></ImportCollection>
                            :
                            <div className="createNFT flex flex-col w-full justify-center items-center">
                                <form onSubmit={submitData} className='w-[94vw] max-w-[800px] 2xl:max-w-[1200px] flex flex-col justify-center items-center'>
                                    <div className='flex w-full flex-col'>
                                        <h1 className='text-5xl font-bold lg:text-7xl dark:text-white'>Create New NFT</h1>
                                        <p className='text-xl lg:text-3xl mt-6 text-gray-400'>You can set preferred NFT name and manage
                                            other NFT settings</p>
                                    </div>

                                    <div className='flex w-full flex-col mt-8'>
                                        <div className='flex text-lg dark:text-white lg:text-2xl mb-2 text-left'>
                                            Select Image...
                                        </div>
                                        <div className='w-full flex justify-start'>
                                            <input type={"file"} accept="image/*" onChange={changeImage} required className='border cursor-pointer border-solid bg-white border-black rounded-[20px] w-3/6 h-auto'></input>
                                            <img src={nftData?.image || DefaultLogo} className="border pointer-events-none border-solid bg-white border-black rounded-[20px]  w-3/6 -ml-[50%]"></img>
                                        </div>
                                    </div>


                                    <div className='flex w-full flex-col mt-8'>
                                        <div className='flex text-lg lg:text-2xl dark:text-white mb-2 text-left'>
                                            Collection
                                        </div>
                                        <Select defaultValue={myCollection[0].id} className='bg-white !rounded-[100px] !text-xl lg:!text-3xl' onChange={(value) => {
                                            setNftData((prev) => ({ ...prev, collectionId: value }))
                                        }}>
                                            {
                                                myCollection.map((each, idx) => (
                                                    <Select.Option key = {idx} className="!text-xl lg:!text-3xl" value={each.id}><span className="flex flex-row gap-3 leading-[36px]"><img src={each.logoURL} className="h-10 w-10 rounded-[9999px] mr-3 p-1 border border-solid border-gray-700" />{each.title}</span></Select.Option>
                                                ))
                                            }
                                        </Select>
                                    </div>

                                    <div className='flex w-full flex-col mt-8'>
                                        <div className='flex text-lg lg:text-2xl dark:text-white mb-2 text-left'>
                                            Name
                                        </div>
                                        <input className='w-full rounded-[100px] text-xl lg:text-3xl p-2 pl-10' required
                                            onChange={(e) => {
                                                setNftData((prev) => ({ ...prev, name: e.target.value }))
                                            }}                            ></input>
                                    </div>

                                    <div className='flex w-full flex-col mt-8'>
                                        <div className='flex text-lg lg:text-2xl dark:text-white mb-2 text-left'>
                                            Description
                                        </div>
                                        <textarea className='w-full rounded-3xl text-xl lg:text-3xl p-2 pl-10 h-[400px]' required
                                            onChange={(e) => {
                                                setNftData((prev) => ({ ...prev, description: e.target.value }))
                                            }} />
                                    </div>
                                    <div className='flex w-full flex-col mt-8 !hidden'>
                                        <div className='flex text-lg lg:text-2xl dark:text-white mb-2 text-left'>
                                            Number of Items
                                        </div>
                                        <input type="number" className='w-full rounded-[100px] text-xl lg:text-3xl p-2 pl-10' required
                                            onChange={(e) => {
                                                setNftData((prev) => ({ ...prev, count: e.target.value }))
                                            }}                            ></input>
                                    </div>
                                    <div className='flex w-full flex-col mt-8 !hidden'>
                                        <div className='flex text-lg lg:text-2xl dark:text-white mb-2 text-left'>
                                            Price(AFC)
                                        </div>
                                        <input type="number" className='w-full rounded-[100px] text-xl lg:text-3xl p-2 pl-10' required
                                            onChange={(e) => {
                                                setNftData((prev) => ({ ...prev, price: e.target.value }))
                                            }}                            ></input>
                                    </div>
                                    <div className='flex w-full flex-col mt-8 mb-16'>
                                        
                                        <span onClick={submitData} className={'text-center justify-cnter rounded-[100px]  primaryBtn !text-lg lg:!text-2xl py-2 dark:bg-none dark:hover:bg-gray-900 dark:bg-gray-800' + (buttonDisable ? " disabled" : "")}>{saving ? "Creating NFT...":"Create NFT"}</span>
                                    </div>
                                </form>
                            </div>
                    }
                </div>
        }
    </>
    )
}

export default CreateNFT
