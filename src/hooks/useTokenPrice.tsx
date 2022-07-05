import { useContext } from 'react'
import { TokenPriceContext } from '../contexts/TokenPriceContext'
import { getCurrencyFromAddressOrId } from '../utils/helper'

const useTokenPrice = (id) => {
  const { prices } = useContext(TokenPriceContext)
  const currencyObj = getCurrencyFromAddressOrId(id)

  // {
  //   id: 'binancecoin',
  //   name: 'BNB',
  //   address: zeroAddress,
  //   symbol: 'BNB',
  //   chainId: 56,
  //   decimals: 18,
  //   icon: '',
  // }

  if(id && currencyObj) {
      return {
        ...currencyObj,
        usdPrice: prices[id]?.usd || 0
      }
  }

  return prices
}

export default useTokenPrice
