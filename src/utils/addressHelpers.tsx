import addresses from '../config/constants/contracts'

export const getAddress = (address) => {
  const chainId = process.env.REACT_APP_NETWORK_ID
  return address[chainId] ? address[chainId] : address[97]
}

export const getMulticallAddress = () => {
  return getAddress(addresses.multiCall)
}

export const getAFCNFTAddress = () => {
  return getAddress(addresses.AFCNFT)
}

export const getAFCTokenAddress = () => {
  return getAddress(addresses.AFC)
}

