
import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import { useActiveWeb3React } from '.'
import { zeroAddress } from '../config/constants'
import { getBigNumber } from '../utils/helper'
import { useTokenContract } from './useContract'

const useTokenBalance = (token) => {
  const { account, library } = useActiveWeb3React()
  const tokenContract = useTokenContract(token)

  const [balance, setBalance ] = useState(getBigNumber('0'))

  useEffect(() => {
    const fetch = async () => {
      let tempBalance = ethers.BigNumber.from('0')
      if(token === zeroAddress) {
        tempBalance = await library.getBalance(account)
      } else {
        tempBalance = await tokenContract.balanceOf(account)
      }
      
      setBalance(tempBalance)
    }

    if(token && account) {
      fetch()
    }

  }, [token, account])
  
  return balance
}

export default useTokenBalance
