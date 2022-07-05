import { BigNumber, ethers } from "ethers";
import { Currencies, DefaultChainID } from "../config/constants";
import { AssetType } from "../types/types";


export function shortenHex(hex, length = 4) {
  if(!hex) return ''
  return `${hex.substring(0, length + 2)}…${hex.substring(
    hex.length - length
  )}`;
}

/**
 * @name parseBalance
 *
 * @param {import("@ethersproject/bignumber").BigNumberish} balance
 * @param {number} decimals
 * @param {number} decimalsToDisplay
 *
 * @returns {string}
 */
export const parseBalance = (balance, decimals = 18, decimalsToDisplay = 3) =>
  Number(ethers.utils.formatUnits(balance, decimals)).toFixed(decimalsToDisplay);

export const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const nFormatter = (num, digits) => {
  var si = [
    {value: 1, symbol: ''},
    {value: 1e3, symbol: 'k'},
    {value: 1e6, symbol: 'M'},
    {value: 1e9, symbol: 'B'},
    {value: 1e12, symbol: 'T'},
    {value: 1e15, symbol: 'P'},
    {value: 1e18, symbol: 'E'},
  ];
  var rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  var i;
  for (i = si.length - 1; i > 0; i--) {
    if (num >= si[i].value) {
      break;
    }
  }
  return (num / si[i].value).toFixed(digits).replace(rx, '$1') + si[i].symbol;
};

export const assetType = (type) => {
  if(!type) return AssetType.NONE;

  if(type.includes('image/')) return AssetType.IMAGE;
  if(type.includes('video/')) return AssetType.VIDEO;
  if(type.includes('audio/')) return AssetType.AUDIO;

  return AssetType.NONE
}

export function toWei(ether) {
  return ethers.utils.parseEther(String(ether));
}

export function toEth(ether) {
  return ethers.utils.formatEther(ether);
}

export function isSameAddress(addr1, addr2) {
  return ethers.utils.isAddress(addr1) 
    && ethers.utils.isAddress(addr2)
    && addr1?.toLowerCase() === addr2?.toLowerCase()
}

export function getBigNumber(value) {
  return ethers.BigNumber.from(String(value))
} 

export function getCurrencyFromAddressOrId (idOrAddress){
  
  const currencies = Currencies[DefaultChainID];

  if(currencies && idOrAddress) {
      const currency = currencies.find(item => (item.id === idOrAddress 
        || item.address.toLowerCase() === idOrAddress.toLowerCase()
        || item.name.toLowerCase() === idOrAddress.toLowerCase()));
      if(!currency){
        console.log('getCurrencyFromAddressOrId idOrAddress:',idOrAddress,currencies,DefaultChainID)
      }  
        
      return currency;
  }

  return null;
}

export function getSymbolFromAddressOrId (idOrAddress) {
  const currencyObj = getCurrencyFromAddressOrId(idOrAddress)
  if(currencyObj) {
    return currencyObj.name
  }
  return '';
}

export function formatPrice(price, currency) {
  const currencyObj = getCurrencyFromAddressOrId(currency)
  const priceStr = (+price * (10 **(18 - currencyObj?.decimals))).toString()

  return `${nFormatter(priceStr, 4)} ${currencyObj?.symbol}`
}

export function formatPriceUsd(price, currency, usd) {
  const currencyObj = getCurrencyFromAddressOrId(currency)
  const priceStr = (+price * (10 **(18 - currencyObj.decimals)) * usd).toString()

  return `${nFormatter(priceStr, 4)} USD`
}

export function getChainExplorerLink(data, type) {
  const prefix = DefaultChainID == 4 ? `https://rinkeby.etherscan.io` : `https://etherscan.io/`

  switch (type) {
    case 'transaction': {
      return `${prefix}/tx/${data}`
    }
    case 'token': {
      return `${prefix}/token/${data}`
    }
    case 'address':
    default: {
      return `${prefix}/address/${data}`
    }
  }
}

const download = (link, type, name) => {
  var element = document.createElement("a");
  var file = new Blob(
    [
      link
    ],
    { type: "image/*" }
  );
  element.href = URL.createObjectURL(file);
  element.download = "image.jpg";
  element.click();
};