import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import { GRAPHQL_URL } from '../config/constants'
import { TokenPriceContext } from '../contexts/TokenPriceContext'
import { getCurrencyFromAddressOrId } from '../utils/helper'

const usePaymentMethods = () => {
  const [acceptedTokens, setAcceptedTokens] = useState([])
  const { prices } = useContext(TokenPriceContext)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          GRAPHQL_URL,
          {
            query: `{
              paymentCurrencies(first: 100, where: {acceptable: true}) {
                id
                acceptable
              }
            }`
          }
        )
        const tokens = response?.data?.data?.paymentCurrencies
        let accepted = [];
        for(const token of tokens) {
            const currency = getCurrencyFromAddressOrId(token.id);
            if(currency) {
                accepted.push({
                  ...currency,
                  usdPrice: prices[currency.id]?.usd || 0
                })
            }
        }

        setAcceptedTokens(accepted)
      } catch (error) {
        console.error('Unable to fetch price data:', error)   
      }
    }

    fetchData()
  }, [setAcceptedTokens])
  
  return acceptedTokens
}

export default usePaymentMethods
