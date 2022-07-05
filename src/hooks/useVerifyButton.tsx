import { useState, useEffect } from 'react'
import axios from 'axios'
import Querystring from 'query-string'
import { useWeb3React } from '@web3-react/core'
import { useAuthDispatch, useAuthState, loginUser, getUser } from '../contexts/AuthContext'
import { toast } from 'react-toastify'

const useVerfiyButton = (item) => {
  const [didVerify, setDidVerify] = useState(false)
  const [isProcessing, setisProcessing] = useState(false)
  const { account, library } = useWeb3React();
  const dispatch = useAuthDispatch();
	const { user, token } = useAuthState();

  useEffect(() => {
    if (item && user){
      if (user?.address) setDidVerify(item.verified)
    }
  }, [item, user])

  async function verify(){

    console.log('verify button click',item)

    if(!item) {
      console.log('invalid user', user, account)
      return
    }

    if(item && item?.address == account?.toLowerCase()) {
      console.log('invalid user', user, account)
      return
    }

    if (!isProcessing){
      if(!account || !library) {
        toast.error('Pleae Connect to wallet to follow');
        return;
      }
  
      if(!user) {
        console.log('fetching user')
        await getUser(dispatch, account);
      }
      if(!user?.nonce) {
        console.log('nonce is invalid')
        return;
      }

      if(!token) {
        await loginUser(dispatch, account, user?.nonce, library)
      }

      setisProcessing(true)
      axios.post("/artist", Querystring.stringify({address: item.address}))
        .then(res => {
          setisProcessing(false)
          setDidVerify(res.data.verified)
        })
        .catch(err => {
          setisProcessing(false)
        })
    }
  }

  return { didVerify, verify }
}

export default useVerfiyButton
