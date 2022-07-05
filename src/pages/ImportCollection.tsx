import axios from 'axios';
import { useEffect, useState } from 'react';
import { Modal, notification, Select } from 'antd';
import { useNavigate } from 'react-router-dom';
import { DefaultBanner, DefaultLogo } from '../config/constants';
import { useActiveWeb3React } from '../hooks';
import { useCoverBg } from '../hooks/useCoverBg';
import useAuth from '../hooks/useAuth';
import { getContract } from '../utils/contracts';
import { placeholderContractABI } from '../config/abi/common';
import { ethers } from 'ethers';
import { proxy1 } from "../config/abi/common";
import { getAFCNFTAddress } from '../utils/addressHelpers';
import { getBigNumber } from '../utils/helper';

const ImportCollection = (props) => {
  const { mode = false } = props
  const { account } = useActiveWeb3React()
  const { login } = useAuth()
  // this is fetched from backend
  const category = require('../config/constants/datamodel/ExploreMenuData.json')
  const navigate = useNavigate()
  const [importData, setImportData] = useState({
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
    category: category[0].label,
    register: ''
  })
  const [saving, setSaving] = useState(false)
  const [buttonDisable, setDisable] = useState(false)
  // useEffect(() => {
  //   if (!account)
  //     notification.warn({
  //       message: "Warning",
  //       description: "Please login for more explore..."
  //     })
  // }, [account])
  useEffect(() => {
    if (!account) {
      // notification.warn({
      //   message: "Warning",
      //   description: "Please login for more explore..."
      // })
    } else {
      setImportData((prev) => ({ ...prev, register: account }))
    }
  }, [account])
  const bg = useCoverBg(importData?.bannerURL || DefaultBanner, importData?.bannerURL == ''?"auto":"cover")

  const convert = (temp) => {
    const res1 = temp.at(0).toUpperCase()
    temp = temp.substring(1)
    return res1 + temp.split("-").join(" ")
  }

  const changeBanner = (e) => {
    const files = e.target.files
    setImportData((prev) => ({
      ...prev, bannerFile: files[0]
    }))

    const objectUrl = URL.createObjectURL(files[0])

    setImportData((prev) => ({ ...prev, bannerURL: objectUrl }))
  }

  const changeLogo = (e) => {
    const files = e.target.files
    setImportData((prev) => ({
      ...prev, logoFile: files[0]
    }))

    const objectUrl = URL.createObjectURL(files[0])

    setImportData((prev) => ({ ...prev, logoURL: objectUrl }))
  }

  const process = async (owner) => {
    if (!mode && owner != account) {
      setDisable(false)
      notification.warning({
        message: "Warning",
        description: "You are not an owner of this collection. \n\n You must be an owner of importing collection..",
        placement: "bottomRight"
      })
    } else {
      setSaving(true)
      const formData = new FormData()
      let payload
      if (!mode) {
        const contract = getContract(importData.contractAddress, placeholderContractABI, new ethers.providers.Web3Provider(window.ethereum).getSigner())
        const totalSupply = await contract.totalSupply()
        payload = { ...importData, totalSupply: totalSupply, register: account }
      } else {
        payload = { ...importData, totalSupply: getBigNumber(0), royalty:20, register: account, creator: account, contractAddress: getAFCNFTAddress() }
      }
      formData.append("logoFile", importData.logoFile)
      formData.append("bannerFile", importData.bannerFile)
      formData.append("payload", JSON.stringify(payload))
      axios.post(proxy1 + '/api/importCollection', formData, { headers: { "Content-Type": 'multipart/form-data' } }).then((resp) => {
        notification[resp.data.type]({
          message: convert(resp.data.type),
          description: resp.data.msg,
          placement: "bottonRight"
        })
        if (resp.data.type == "success" && !mode) navigate("/collections")
        if (resp.data.type == "success" && mode) window.location.reload()
        else {
          setSaving(false)
          setDisable(false)
        }
      }).catch((e) => {
        setSaving(false)
        setDisable(false)
        notification.error({
          message: "Error",
          description: "Some error is catched!!!",
          placement: "bottomRight"
        })
      })
    }
  }

  const submitData = async (e) => {
    if(!importData.bannerURL || importData.bannerURL == ''){
      notification.warn({
        message : "Warning",
        description : "Please select an image for banner!!"
      })
      return
    }
    if(!importData.logoURL || importData.logoURL == ''){
      notification.warn({
        message : "Warning",
        description : "Please select an image for logo!!"
      })
      return
    }
    if(!importData.category || importData.category == ''){
      notification.warn({
        message : "Warning",
        description : "Please select a category!!"
      })
      return
    }
    if(!mode && (!importData.contractAddress || importData.contractAddress == '')){
      notification.warn({
        message : "Warning",
        description : "Please insert smart contract address!!"
      })
      return
    }
    if(!importData.title || importData.title == ''){
      notification.warn({
        message : "Warning",
        description : "Please insert title!!"
      })
      return
    }
    if(!importData.description || importData.description == ''){
      notification.warn({
        message : "Warning",
        description : "Please insert description!!"
      })
      return
    }
    if(!importData.website || importData.website == ''){
      notification.warn({
        message : "Warning",
        description : "Please insert website!!"
      })
      return
    }
    if(!importData.discord || importData.discord == ''){
      notification.warn({
        message : "Warning",
        description : "Please insert discord!!"
      })
      return
    }
    if(!importData.twitter || importData.twitter == ''){
      notification.warn({
        message : "Warning",
        description : "Please insert twitter!!"
      })
      return
    }
    if(!importData.instagram || importData.instagram == ''){
      notification.warn({
        message : "Warning",
        description : "Please insert instagram!!"
      })
      return
    }
    if(!mode && (!importData.royalty || importData.royalty == '')){
      notification.warn({
        message : "Warning",
        description : "Please insert royalty!!"
      })
      return
    }
    // e.preventDefault()
    setDisable(true)
    if (!mode) {
      try {
        const contract = getContract(importData.contractAddress, placeholderContractABI, new ethers.providers.Web3Provider(window.ethereum).getSigner())
        const owner = await contract.owner()
        process(owner)
      } catch (e) {
        const { data } = await axios.post(proxy1 + '/api/getCorsURLs', { payload: `https://bscscan.com/address/${importData.contractAddress}` })
        const temp1 = data.split("Creator Address")[1].substring(1, 60)
        const owner = temp1.substring(temp1.search("0x"), temp1.search("</a>"))
        process(owner)
      }
    } else {
      process(null)
    }
  }
  return (
    <>
      {
        account ? <div className={(mode ? ' -mt-[70px] ' : 'mt-[100px] ') + 'flex flex-col md:flex-row w-full justify-center items-center'}>
          <Modal visible={saving} title='Importing...' footer={null} closable={false}>
            <p>Just a minute...</p>
          </Modal>
          <form onSubmit={submitData} className='w-[94vw] max-w-[800px] 2xl:max-w-[1200px] flex flex-col justify-center items-center'>
            <div className='flex w-full flex-col'>
              <h1 className='text-5xl font-bold lg:text-7xl dark:text-white'>{mode ? "Create" : "Import"} collection</h1>
              <p className='text-xl lg:text-3xl mt-6 text-gray-400'>You can set preferred collection name and manage
                other collection settings</p>
            </div>

            <div className='flex w-full flex-col mt-8'>
              <div className='flex text-lg dark:text-white lg:text-2xl mb-2 text-left'>
                Banner and Logo Image
              </div>
              <div className='w-full flex rounded-lg h-[200px] border border-gray'>
                <input type="file" accept="image/*" onChange={changeBanner}  className='w-full h-full cursor-pointer'></input>
                <div className='w-full h-full rounded-lg  border border-gray pointer-events-none !bg-white -ml-[100%]' style={bg}></div>
              </div>
              <div className='w-full flex justify-center'>
                <input type={"file"} accept="image/*" onChange={changeLogo}  className='border cursor-pointer border-solid bg-white border-black rounded-[9999px] w-[6vw] -mt-[3vw]'></input>
                <img src={importData?.logoURL || DefaultLogo} className="border pointer-events-none border-solid bg-white border-black rounded-[9999px] -ml-[6vw] w-[6vw] h-[6vw] -mt-[3vw]"></img>
              </div>
            </div>


            <div className='flex w-full flex-col mt-8'>
              <div className='flex text-lg lg:text-2xl dark:text-white mb-2 text-left'>
                Collection Category
              </div>
              <Select defaultValue={category[0].label} className='bg-white !rounded-[100px] !text-xl lg:!text-3xl' aria- onChange={(value) => {
                setImportData((prev) => ({ ...prev, category: value }))
              }}>
                {
                  category.map((each) => (
                    <Select.Option className="!text-xl lg:!text-3xl" value={each.label}>{each.label}</Select.Option>
                  ))
                }
              </Select>
            </div>


            {!mode && <div className='flex w-full flex-col mt-8'>
              <div className='flex text-lg lg:text-2xl dark:text-white mb-2 text-left'>
                Contract Address
              </div>
              <input className='w-full rounded-[100px] text-xl lg:text-3xl p-2 pl-10'
                value={importData.contractAddress}
                
                onChange={(e) => {
                  setImportData((prev) => ({ ...prev, contractAddress: e.target.value.trim() }))
                }}
              ></input>
            </div>}


            <div className='flex w-full flex-col mt-8'>
              <div className='flex text-lg lg:text-2xl dark:text-white mb-2 text-left'>
                Title
              </div>
              <input className='w-full rounded-3xl text-xl lg:text-3xl p-2 pl-10' 
                onChange={(e) => {
                  setImportData((prev) => ({ ...prev, title: e.target.value }))
                }}                            ></input>
            </div>

            <div className='flex w-full flex-col mt-8'>
              <div className='flex text-lg lg:text-2xl dark:text-white mb-2 text-left'>
                Description
              </div>
              <textarea className='w-full rounded-3xl text-xl lg:text-3xl p-2 pl-10 h-[400px]' 
                onChange={(e) => {
                  setImportData((prev) => ({ ...prev, description: e.target.value }))
                }} />
            </div>
            <div className='flex w-full flex-col mt-8'>
              <div className='flex text-lg lg:text-2xl dark:text-white mb-2 text-left'>
                Website
              </div>
              <input className='w-full rounded-[100px] text-xl lg:text-3xl p-2 pl-10' 
                onChange={(e) => {
                  setImportData((prev) => ({ ...prev, website: e.target.value }))
                }}                            ></input>
            </div>
            <div className='flex w-full flex-col mt-8'>
              <div className='flex text-lg lg:text-2xl dark:text-white mb-2 text-left'>
                {mode?"Fee":"Royalty(%, 1 ~ 25)"}
              </div>
              <input type="number" defaultValue={mode?20:''} min={1} max={25} className={'w-full rounded-[100px] text-xl lg:text-3xl p-2 pl-10'} 
              disabled = {mode}
                onChange={(e) => {
                  setImportData((prev) => ({ ...prev, royalty: e.target.value }))
                }}                            ></input>
            </div>
            <div className='flex w-full flex-col mt-8'>
              <div className='flex text-lg lg:text-2xl dark:text-white mb-2 text-left'>
                Discord
              </div>
              <input className='w-full rounded-[100px] text-xl lg:text-3xl p-2 pl-10' 
                onChange={(e) => {
                  setImportData((prev) => ({ ...prev, discord: e.target.value }))
                }}                            ></input>
            </div>
            <div className='flex w-full flex-col mt-8'>
              <div className='flex text-lg lg:text-2xl dark:text-white mb-2 text-left'>
                Twitter
              </div>
              <input className='w-full rounded-[100px] text-xl lg:text-3xl p-2 pl-10' 
                onChange={(e) => {
                  setImportData((prev) => ({ ...prev, twitter: e.target.value }))
                }}                            ></input>
            </div>
            <div className='flex w-full flex-col mt-8'>
              <div className='flex text-lg lg:text-2xl dark:text-white mb-2 text-left'>
                Instagram
              </div>
              <input className='w-full rounded-[100px] text-xl lg:text-3xl p-2 pl-10' 
                onChange={(e) => {
                  setImportData((prev) => ({ ...prev, instagram: e.target.value }))
                }}                            ></input>
            </div>
            <div className='flex w-full flex-col mt-8 mb-16'>
              <span onClick={submitData} className={'text-center justify-cnter rounded-[100px] cursor-pointer item-center primaryBtn !text-lg lg:!text-2xl py-2 dark:bg-none dark:hover:bg-gray-900 dark:bg-gray-800' + (buttonDisable ? " disabled" : "")}>{mode ? "Create" : "Import"} Collection</span>
            </div>
          </form>
        </div> : null
      }
    </>
  )
}


export default ImportCollection
