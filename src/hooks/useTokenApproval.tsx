
import { useEffect, useState } from 'react'
import { useActiveWeb3React } from '.'
import { zeroAddress } from '../config/constants'
import { getAFCNFTAddress } from '../utils/addressHelpers'
import { useTokenContract } from './useContract'

const useTokenApproval = (token) => {
  const { account } = useActiveWeb3React()
  const nftContractAddress = getAFCNFTAddress()
  const tokenContract = useTokenContract(token)

  const [approved, setApproved ] = useState(false)

  useEffect(() => {
    const fetch = async () => {
      const res = await tokenContract.allowance(account, nftContractAddress)
      setApproved(!res.isZero())
    }

    if(token == zeroAddress) {
      setApproved(true)
    } else {
      if(token && account) {
        fetch()
      }
    }

  }, [token, account])
  
  return approved
}

export default useTokenApproval
