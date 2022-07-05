import { useState, useEffect } from 'react'
import axios from 'axios'
import Querystring from 'query-string'
import { useWeb3React } from '@web3-react/core'
import { useAuthDispatch, useAuthState, loginUser, getUser } from '../contexts/AuthContext'
import { toast } from 'react-toastify'

const useFollowButton = (item) => {
  const [didFollow, setDidFollow] = useState(false)
  const [isFollowing, setIsFollowing] = useState(false)
  const { account, library } = useWeb3React();
  const dispatch = useAuthDispatch();
	const { user, token } = useAuthState();

  useEffect(() => {
    if (item && user){
      if (user?.address) setDidFollow(item.selfFollowed)
    }
  }, [item, user])

  async function follow(){
    if(item && item?.address == account?.toLowerCase()) {
      console.log('invalid user', user, account)
      return
    }

    if (!isFollowing){
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

      setIsFollowing(true)
      axios.post("/follow", Querystring.stringify({address: item.address}))
        .then(res => {
          setIsFollowing(false)
          setDidFollow(res.data.followed)
        })
        .catch(err => {
          setIsFollowing(false)
        })
    }
  }

  return { didFollow, follow }
}

export default useFollowButton
