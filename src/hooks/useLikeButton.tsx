import { useState, useEffect } from 'react'
import axios from 'axios'
import Querystring from 'query-string'
import { useWeb3React } from '@web3-react/core'
import { useAuthDispatch, useAuthState, loginUser, getUser } from '../contexts/AuthContext'

const useLikeButton = (item) => {
  const [didLike, setDidLike] = useState(false)
  const [isLiking, setIsLiking] = useState(false)
  const [localLikeCount, setLocalLikeCount] = useState(0)
  const { account, library } = useWeb3React();
  const dispatch = useAuthDispatch();
	const { user, token } = useAuthState();

  useEffect(() => {
    if (item && user){
      if (user?.address) setDidLike(item.likes && item.selfLiked)
      setLocalLikeCount(item?.likes || 0)
    }
  }, [item, user])

  async function like(){
    if (!isLiking){
      if(!account || !library) {
        console.log('connect to wallet to like');
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

      setIsLiking(true)
      setLocalLikeCount(l => l + (didLike ? -1 : 1))
      axios.post("/like", Querystring.stringify({itemId: item.id, owner: item.creator}))
        .then(res => {
          setIsLiking(false)
          setDidLike(res.data.liked)
        })
        .catch(err => {
          setIsLiking(false)
        })
    }
  }

  return { didLike, localLikeCount, like }
}

export default useLikeButton
