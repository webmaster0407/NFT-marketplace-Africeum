import { BigNumber, ethers, utils } from 'ethers'
import { getAddress } from 'ethers/lib/utils'

const commaNumber = require('comma-number');

const format = commaNumber.bindWith(',', '.');

// returns the checksummed address if the address is valid, otherwise returns false
export function isAddress(value: any): string | false {
  try {
    return getAddress(value)
  } catch {
    return false
  } 
}

export function parseLocation(location : any) : any{
  const temp = location.search?.substring(1)
  if (temp == '')
    return {}
  else{
    const querys = temp.split('&')
    const res = querys.reduce( (result, each) => {
      if(each.search("=") == -1) return result
      const key = each.substring(0, each.search("="))
      const value = each.substring(each.search("=")+1)
      return {...result, [key] : value}
    },{})
    return res
  }
}

export const convertJsonLinks = (originLink) => {
  if(!originLink) return ''
  if(originLink.search("base64") !== -1){
      return JSON.parse(Buffer.from(originLink.split("base64,")[1].trim(),"base64").toString("ascii"))
  }else{
      if(originLink.startsWith("http")){
          return originLink
      } else {
          const appendData = originLink.substring(7)
          const newJsonLink = "https://ipfs.io/ipfs/"
          return newJsonLink + appendData
      }
  }
}

export const convertIamgeURL = (origin) => {
  return convertJsonLinks(origin)
}

export const getObjectType = (obj) => {
  return typeof obj
}

export function getFtmScanLink(data: string, type: 'transaction' | 'token' | 'address'): string {
  const prefix = `https://etherscan.io`

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

// shorten the checksummed version of the input address to have 0x + 4 characters at start and end
export function shortenAddress(address: string, chars = 4): string {
  const parsed = isAddress(address)
  if (!parsed) {
    throw Error(`Invalid 'address' parameter '${address}'.`)
  }
  return `${parsed.substring(0, chars + 2)}...${parsed.substring(42 - chars)}`
}

// add 10%
export function calculateGasMargin(value: BigNumber): BigNumber {
  return value.mul(BigNumber.from(10000).add(BigNumber.from(1000))).div(BigNumber.from(10000))
}


export function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') // $& means the whole matched string
}

export function toWei(ether: string, decimals = 18): BigNumber {
  return utils.parseUnits(ether, decimals);
}

export function toEth(ether: ethers.BigNumberish, decimals = 18): string {
  return utils.formatUnits(ether, decimals);
}

export const getBigNumber = value => {
  if (!value) {
    return BigNumber.from(0);
  }
  if (BigNumber.isBigNumber(value)) {
    return value;
  }
  return BigNumber.from(value);
};

export const currencyFormatter = labelValue => {
  let suffix = '';
  let unit = 1;
  const abs = Math.abs(Number(labelValue));
  if (abs >= 1.0e9) {
    // Nine Zeroes for Billions
    suffix = 'B';
    unit = 1.0e9;
  } else if (abs >= 1.0e6) {
    // Six Zeroes for Millions
    suffix = 'M';
    unit = 1.0e6;
  } else if (abs >= 1.0e3) {
    // Three Zeroes for Thousands
    suffix = 'K';
    unit = 1.0e3;
  }
  return `${format(Math.floor(abs / unit * 100) / 100)}${suffix}`;
  // return Math.abs(Number(labelValue)) >= 1.0e9
  //   ? `$${format(
  //       new BigNumber(`${Math.abs(Number(labelValue)) / 1.0e9}`).dp(2, 1)
  //     )}B`
  //   : Math.abs(Number(labelValue)) >= 1.0e6
  //   ? `$${format(
  //       new BigNumber(`${Math.abs(Number(labelValue)) / 1.0e6}`).dp(2, 1)
  //     )}M`
  //   : Math.abs(Number(labelValue)) >= 1.0e3
  //   ? `$${format(
  //       new BigNumber(`${Math.abs(Number(labelValue)) / 1.0e3}`).dp(2, 1)
  //     )}K`
  //   : `$${format(new BigNumber(`${Math.abs(Number(labelValue))}`).dp(2, 1))}`;
};



export const formatter = (value, decimals = 2, suffixStr = '') => {
  let suffix = '';
  let unit = 1;
  if(isNaN(parseFloat(value))) {
    return null;
  }
  const abs = Number(value) || 0;

  if (abs >= 1.0e9) {
    // Nine Zeroes for Billions
    suffix = 'B';
    unit = 1.0e9;
  } else if (abs >= 1.0e6) {
    // Six Zeroes for Millions
    suffix = 'M';
    unit = 1.0e6;
  } else if (abs >= 1.0e3) {
    // Three Zeroes for Thousands
    suffix = 'K';
    unit = 1.0e3;
  }

  return `${format(Math.floor(abs / unit * Math.pow(10, decimals)) / Math.pow(10, decimals))}${suffix} ${suffixStr || ''}`;
};