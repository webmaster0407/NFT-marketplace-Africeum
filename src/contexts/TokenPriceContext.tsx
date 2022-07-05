import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Currencies, DefaultChainID } from '../config/constants'
import useRefresh from '../hooks/useRefresh'

const TokenPriceContext = React.createContext({ prices: [] })

const TokenPriceContextProvider = ({ children }) => {
  const [prices, setPrices] = useState([])
  const { slowRefresh } = useRefresh();
  
  useEffect(() => {
    const currencies = Currencies[DefaultChainID].map(item => item.id).join(',');
    axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${currencies}&vs_currencies=usd`)
    .then(res => {
      setPrices(res.data);
    })
  }, [slowRefresh])

  

  return <TokenPriceContext.Provider value={{ prices: prices }}>{children}</TokenPriceContext.Provider>
}

export { TokenPriceContext, TokenPriceContextProvider }
