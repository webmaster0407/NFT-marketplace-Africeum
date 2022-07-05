
import { useEffect, useState } from 'react'
import { useActiveWeb3React } from '.'
import { getNFTContract } from '../utils/contracts'

const useCheckAdmin = () => {
  const { account, library } = useActiveWeb3React()
  const [isAdmin, setIsAdmin ] = useState(false)

  useEffect(() => {
    const fetch = async () => {
      const contract = getNFTContract(library)
      const tempAdmin = await contract.isAdmin(account)
      
      setIsAdmin(tempAdmin)
    }

    if(account) {
      fetch()
    }

  }, [account])
  
  return isAdmin
}

export default useCheckAdmin
