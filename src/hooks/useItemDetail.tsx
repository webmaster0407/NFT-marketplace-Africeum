import axios from 'axios'
import { ethers } from 'ethers'
import { useContext, useEffect, useState } from 'react'
import { TokenPriceContext } from '../contexts/TokenPriceContext'
import { lastBid } from '../utils/contracts'
import { getCurrencyFromAddressOrId } from '../utils/helper'

const useItemDetail = (id) => {
  const [item, setItem] = useState(null)
  const { prices } = useContext(TokenPriceContext)
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`item/detail/${id}`)
        let tempItem = response?.data?.item
        const currency = getCurrencyFromAddressOrId(tempItem.currency);
        if(currency) {
          tempItem = {
            ...tempItem,
            currencyObj: {
              ...currency,
              usdPrice: prices[currency.id]?.usd || 0
            }
          }
        }

        // get current bids
        const highBid = await lastBid(id);
        tempItem = {
          ...tempItem,
          lastBid: highBid
        }
        setItem(tempItem)
      } catch (error) {
        console.error('Unable to fetch price data:', error)   
      }
    }

    fetchData()
  }, [setItem, prices])

  return item
}

export default useItemDetail
