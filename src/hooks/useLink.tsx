import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { getChainExplorerLink } from '../utils/helper'

const useLink = () => {

  const navigate  = useNavigate()

  const linkToUser = useCallback((user) => {
      if(user && user?.username) {
        navigate("/empty");
        setTimeout(() => {
          navigate(`/profile/${user?.username}`,{replace:true});
        });
      }
  }, [navigate])

  const linkToItem = useCallback((item) => {
    if(item) {
      navigate("/empty");
      setTimeout(() => {
        navigate( `/item/${item?.id?.split(" ").join("-")}` ,{replace:true});
      });
    }
  }, [navigate])

  const linkToCollection = useCallback((item) => {
    if(item) {
      navigate("/empty");
      setTimeout(() => {
        navigate( `/explore/${item?.id?.split(" ").join("-")}` ,{replace:true});
      });
    }
  }, [navigate])

  const linkToIPFS = useCallback((item) => {
    if(item) {
      window.open(item?.uri, '_blank')
    }
  }, [navigate])

  return { linkToUser, linkToItem, linkToCollection,linkToIPFS }
}

export default useLink
