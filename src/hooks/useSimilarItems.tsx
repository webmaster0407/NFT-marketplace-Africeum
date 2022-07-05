import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import { TokenPriceContext } from '../contexts/TokenPriceContext'
import { getCurrencyFromAddressOrId } from '../utils/helper'

const useSimilarItems = (id) => {
  const [items, setItems] = useState([])
  const { prices } = useContext(TokenPriceContext)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('item/similar', {
          params: {
            id: id
          },
        })
        let tempItems = response?.data?.items
        for(let i = 0; i < tempItems.length; i++) {
          const currency = getCurrencyFromAddressOrId(tempItems[i].currency);
          if(currency) {
            tempItems[i] = {
              ...tempItems[i],
              currencyObj: {
                ...currency,
                usdPrice: prices[currency.id]?.usd || 0
              }
            }
          }
        }
        
        setItems(tempItems)
      } catch (error) {
        console.error('Unable to fetch similar items data:', error)   
      }
    }

    fetchData()
  }, [setItems, prices])

  return items
}

export default useSimilarItems
