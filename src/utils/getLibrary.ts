import { ethers } from 'ethers'

export default function getLibrary(provider: any): ethers.providers.Web3Provider {
  const library = new ethers.providers.Web3Provider(provider)
  library.pollingInterval = 15000
  return library
}
