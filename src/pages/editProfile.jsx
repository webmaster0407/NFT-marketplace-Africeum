import { useState, useEffect } from "react";
import axios from 'axios';
import useAuth from '../hooks/useAuth';
import { useCoverBg } from '../hooks/useCoverBg';
import { useActiveWeb3React } from '../hooks';
import { DefaultAvatar, DefaultLogo } from '../config/constants';
import { Modal, notification } from 'antd';
import { useNavigate } from "react-router-dom";
import { proxy1 } from "../config/abi/common";

function EditProfile() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [user, setUser] = useState(null)
  const { account } = useActiveWeb3React()
  // useEffect(()=>{
  //   if(!account)
  //   notification.warn({
  //     message : "Warning",
  //     description : "Please login for more explore..."
  //   })
  // },[account])
  useEffect(() => {
    if (account) {
      axios.post(proxy1 +"/api/getUserInfo", {
        payload: { wallet: account }
      }).then((resp) => {
        setUser({ ...resp.data[0] })
      })
    }
  }, [account])
  const bg = useCoverBg(user?.bannerURL || DefaultLogo)
  const changeBanner = (e) => {
    const files = e.target.files
    setUser((prev) => ({
      ...prev, bannerFile: files[0]
    }))

    const objectUrl = URL.createObjectURL(files[0])

    setUser((prev) => ({ ...prev, bannerURL: objectUrl }))
  }

  const changeLogo = (e) => {
    const files = e.target.files
    setUser((prev) => ({
      ...prev, logoFile: files[0]
    }))

    const objectUrl = URL.createObjectURL(files[0])

    setUser((prev) => ({ ...prev, logoURL: objectUrl }))
  }
  const convert = (temp) => {
    if(!temp) return ''
    const res1 = temp.at(0).toUpperCase()
    temp = temp.substring(1)
    return res1 + temp.split("-").join(" ")
  }
  const [saving, setSaving] = useState(false)
  const [buttonDisable, setDisable] = useState(false)
  const submit = async (e) => {
    e.preventDefault()
    setDisable(true)
    setSaving(true)
    const formData = new FormData()
    formData.append("logoFile", user?.logoFile)
    formData.append("bannerFile", user?.bannerFile)
    formData.append("payload", JSON.stringify({...user, address : account}))
    axios.post(proxy1+'/api/saveUserInfo', formData, { headers: { "Content-Type": 'multipart/form-data' } }).then((resp) => {
      notification[resp.data.type]({
        message: convert(resp.data.type),
        description: resp.data.msg,
        placement: "bottonRight"
      })
      if (resp.data.type == "success") navigate("/profile")
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
  return (
    <div className="w-full flex items-center justify-center">
      <Modal visible={saving} title='Importing...' footer={null} closable={false}>
        <p>Just a minute...</p>
      </Modal>
      <div className="w-[94vw] mt-[100px] items-center justify-center flex flex-col max-w-[800px] 2xl:max-w-[1200px]">
        <div className="flex w-full text-5xl font-bold dark:text-white 2xl:text-7xl">Edit Profile</div>
        <div className="flex w-full text-xl mt-6 2xl:text-3xl text-gray-700 dark:text-gray-300">You can set your own logo, banner, display name and so on...</div>
        <form onSubmit={submit} className='flex w-full flex-col mt-8'>
          <div className="flex w-full flex-col">
            <div className='flex text-lg dark:text-white lg:text-2xl mb-2 text-left'>
              Banner and Logo Image
            </div>
            <div className='w-full flex rounded-lg h-[200px] border border-gray'>
              <input type="file" accept="image/*" onChange={changeBanner} className='w-full h-full cursor-pointer'></input>
              <div className='w-full h-full rounded-lg  border border-gray pointer-events-none !bg-white -ml-[100%]' style={bg}></div>
            </div>
            <div className='w-full flex justify-center'>
              <input type={"file"} accept="image/*" onChange={changeLogo} className='border !cursor-pointer border-solid bg-white border-black rounded-[9999px] w-[6vw] -mt-[3vw]'></input>
              <img src={user?.logoURL || DefaultAvatar} className="border pointer-events-none border-solid bg-white border-black rounded-[9999px] -ml-[6vw] w-[6vw] h-[6vw] -mt-[3vw]"></img>
            </div>
          </div>


          <div className='flex w-full flex-col mt-8'>
            <div className='flex text-lg lg:text-2xl dark:text-white mb-2 text-left'>
              Wallet Address
            </div>
            <input required className='w-full disabled rounded-[100px] text-xl lg:text-3xl p-2 pl-10 ' disabled readonly defaultValue={account}></input>
          </div>


          <div className='flex w-full flex-col mt-8'>
            <div className='flex text-lg lg:text-2xl dark:text-white mb-2 text-left'>
              Display Name
            </div>
            <input required className='w-full rounded-[100px] text-xl lg:text-3xl p-2 pl-10' value={user?.name} onChange={(e) => {
              setUser((prev) => ({ ...prev, name: e.target.value }))
            }}></input>
          </div>
          <div className='flex w-full flex-col mt-8'>
            <div className='flex text-lg lg:text-2xl dark:text-white mb-2 text-left'>
              Email
            </div>
            <input required className='w-full rounded-[100px] text-xl lg:text-3xl p-2 pl-10' value={user?.email} onChange={(e) => {
              setUser((prev) => ({ ...prev, email: e.target.value }))
            }}></input>
          </div>
          <div className='flex w-full flex-col mt-8'>
            <div className='flex text-lg lg:text-2xl dark:text-white mb-2 text-left'>
              Bio
            </div>
            <input required className='w-full rounded-[100px] text-xl lg:text-3xl p-2 pl-10' value={user?.bio} onChange={(e) => {
              setUser((prev) => ({ ...prev, bio: e.target.value }))
            }}></input>
          </div>
          <div className='flex w-full flex-col mt-8'>
            <div className='flex text-lg lg:text-2xl dark:text-white mb-2 text-left'>
              Discord
            </div>
            <input required className='w-full rounded-[100px] text-xl lg:text-3xl p-2 pl-10' value={user?.discord} onChange={(e) => {
              setUser((prev) => ({ ...prev, discord: e.target.value }))
            }}></input>
          </div>
          <div className='flex w-full flex-col mt-8'>
            <div className='flex text-lg lg:text-2xl dark:text-white mb-2 text-left'>
              Twitter
            </div>
            <input required className='w-full rounded-[100px] text-xl lg:text-3xl p-2 pl-10' value={user?.twitter} onChange={(e) => {
              setUser((prev) => ({ ...prev, twitter: e.target.value }))
            }}></input>
          </div>
          <div className='flex w-full flex-col mt-8'>
            <div className='flex text-lg lg:text-2xl dark:text-white mb-2 text-left'>
              Instagram
            </div>
            <input required className='w-full rounded-[100px] text-xl lg:text-3xl p-2 pl-10' value={user?.instagram} onChange={(e) => {
              setUser((prev) => ({ ...prev, instagram: e.target.value }))
            }}></input>
          </div>
          <div className='flex w-full flex-col mt-8 mb-16'>
            <button type="submit" className={'primaryBtn !text-lg lg:!text-2xl py-2 dark:bg-none dark:hover:bg-gray-900 dark:bg-gray-800 ' + (buttonDisable ? " disabled" : "")}>Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditProfile
