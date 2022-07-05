
import { useEffect, useState } from 'react'
import { getNFTContract, simpleRpcProvider } from '../utils/contracts'


const useNFTInfo = () => {
  const [info, setInfo ] = useState(null)

  useEffect(() => {
    const fetch = async () => {
      const nftContract = getNFTContract(simpleRpcProvider)
      const nftInfo = await nftContract.info();
      setInfo(nftInfo)
    }

    fetch()

  }, [])
  
  return info
}

export default useNFTInfo
