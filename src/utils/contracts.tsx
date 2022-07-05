import { BigNumber, errors, ethers } from "ethers"
import MulticallABI from '../config/abi/Multicall.json';
import NFTABI from '../config/abi/AFCNFT.json';
import ERC20ABI from '../config/abi/erc20.json';
import ERC721ABI from '../config/abi/erc721.json';


import { getBigNumber, nFormatter, toWei } from './helper';
import { getMulticallAddress, getAFCNFTAddress } from "./addressHelpers";
import { zeroAddress } from "../config/constants";
import { toEth } from ".";
import multicall from "./multicall";
import { marketplaceContractABI, marketplaceContractAddress } from "../config/abi/common";

export const simpleRpcProvider = new ethers.providers.JsonRpcProvider(process.env.REACT_APP_NODE_1)

export const getContract = (address, abi, signer) => {
  // console.log('getContract: address,',address,abi,signer)
  const signerOrProvider = signer ? signer : simpleRpcProvider
  return new ethers.Contract(address, abi, signerOrProvider)
}

export const getMulticallContract = (provider) => {
  return getContract(getMulticallAddress(), MulticallABI, provider)
}

// Get NFT  Contract Instanse
export const getNFTContract = (provider) => {
  return getContract(
    getAFCNFTAddress(),
    NFTABI,
    provider
  );
};

export const getTokenContract = (currency, provider) => {
  return getContract(
    currency,
    ERC20ABI,
    provider
  )
}

export const isMinter = async(account, provider) => {
  if(!account) {
    return false
  }
  try { 
    const nftContract = getNFTContract(provider)  
    const [isAdmin, owner] = await Promise.all([
        nftContract.isAdmin(account),
        nftContract.owner(),
    ]);

    return isAdmin || (owner?.toLowerCase() == account?.toLowerCase());
  } catch(e) {
    console.log(e)
    return false
  }
}

export const lastBid = async(id, provider = null) => {
  if(!id) {
    return null
  }
  try { 
    const nftContract = getNFTContract(provider || simpleRpcProvider)  
    const [lastBid] = await Promise.all([
        nftContract.lastBid(id),
    ]);

    if(!lastBid) {
      return null
    }
    return {
      bidder: lastBid[0],
      price: toEth(lastBid[1]),
      isActive: lastBid[2]
    };
  } catch(e) {
    console.log(e)
    return null
  }
}

export const mint = async (tokenURI, currency, price, count, auctionable, startTime, endTime, requireAFC, signer) => {
  const nftContract = getNFTContract(signer)
  try {
    const tx = await nftContract
    .createItem(
      tokenURI,
      count,
      price,
      auctionable,
      startTime,
      endTime,
      currency,
      requireAFC,
    );
    const receipt = await tx.wait(1);
    let itemId = ''
    if(receipt.confirmations) {
      const interf = new ethers.utils.Interface(NFTABI);
      const logs = receipt.logs;
      
      for(let index = 0; index < logs.length; index ++) {
        const log = logs[index];
        if(nftContract.address.toLowerCase() == log.address.toLowerCase()) {
          const parsed = interf.parseLog(log)
          if(parsed.name === 'ItemCreated') {
            itemId = parsed.args.itemId.toNumber();
          }
        }
      }
    }

    return {
      transactionHash: receipt.transactionHash,
      itemId: itemId,
      error: null
    }
  } catch(e) {
    console.log(e)
    return {
      transactionHash: null,
      error: e
    }
  }
}

export const importItem = async (collection, tokenId, currency, price, auctionable, startTime, endTime, requireAFC, signer) => {
  const nftContract = getNFTContract(signer)
  try {
    const tx = await nftContract
    .importItem(
      collection,
      tokenId,
      price,
      auctionable,
      startTime,
      endTime,
      currency,
      requireAFC,
    );
    const receipt = await tx.wait(1);
    let itemId = ''
    if(receipt.confirmations) {
      const interf = new ethers.utils.Interface(NFTABI);
      const logs = receipt.logs;
      
      for(let index = 0; index < logs.length; index ++) {
        const log = logs[index];
        if(nftContract.address.toLowerCase() == log.address.toLowerCase()) {
          const parsed = interf.parseLog(log)
          if(parsed.name === 'ItemImported') {
            itemId = parsed.args.itemId.toNumber();
          }
        }
      }
    }

    return {
      itemId: itemId,
      transactionHash: receipt.transactionHash,
      error: null
    }
  } catch(e) {
    console.log(e)
    return {
      transactionHash: null,
      error: e
    }
  }
}

export const isApprovedForAll = async(contract, account, operator, signer) => {
  const nftContract = getContract(contract, ERC721ABI, signer);

  try {
    return await nftContract.isApprovedForAll(account, operator);
  } catch (e) {
    console.log(e)
    return false
  }
}

export const setApprovalForAll = async(contract, operator, signer) => {
  const nftContract = getContract(contract, ERC721ABI, signer);
  try { 
    const tx = await nftContract.setApprovalForAll(operator, true);
    await tx.wait(1)

    return true;
  }catch(e) {
    console.log(e)
    return false;
  }
}


export const isApprovedToken = async(currency, account, signer) => {
  if(currency == zeroAddress) {
    return true;
  }
  const factoryContract = getNFTContract(signer);
  const tokenContract = getTokenContract(currency, signer);

  try {
    const allowance = await tokenContract.allowance(account, factoryContract.address);
    if(allowance.gt(0)) {
      return true;
    }else {
      return false
    }
  } catch(e) {
    console.log(e)
    return false;
  }
}

export const approvedMarketContract = async(currency, account, signer) => {
  const result = await approveToken(currency, account, signer)
  if(!result){
    return result
  }
  const tokenContract = getTokenContract(currency, signer);
  const marketContract = getContract(marketplaceContractAddress, marketplaceContractABI, signer);
  try {
    const allowance = await tokenContract.allowance(account, marketContract.address);
    if(allowance.gt(0)) {
      return true;
    }else {
    }
  } catch(e) {
  }
  try {
    const tx = await tokenContract.approve(marketContract.address,  ethers.constants.MaxUint256);
    await tx.wait(1)

    return true
  } catch(e) {
    console.log(e)
    return false;
  }
}

export const approveToken = async(currency, account, signer) => {
  if(await isApprovedToken(currency, account, signer)) {
    return true;
  }

  const factoryContract = getNFTContract(signer);
  const tokenContract = getTokenContract(currency, signer);

  try {
    const tx = await tokenContract.approve(factoryContract.address,  ethers.constants.MaxUint256);
    await tx.wait(1)

    return true
  } catch(e) {
    console.log(e)
    return false;
  }

}

export const buy = async(nft, price, account, signer) => {
  console.log('buy:')
  const {can, amountToPay, error} = await checkCanBid(nft, price, account, signer)
  console.log('buy:checkCanBid',can, amountToPay, error)

  if(!can) {
    return {
      result: false,
      error: error
    } 
  }

  const factoryContract = getNFTContract(signer);
  
  let result = false;
  try {
    if(nft.currency != zeroAddress) {
      const approved = await isApprovedToken(nft.currency, account, signer);
      if(!approved) {
        return {
          result,
          error: 'Please approve for buying NFT'
        }
      }
    }

    const tx = await factoryContract.buyItem(nft.id, price, {
      value: nft.currency == zeroAddress ? amountToPay : getBigNumber(0)
    })
    await tx.wait(1)

    return {
      result: true,
      error: null
    }
  } catch(e) {
    console.log(e)
    return {
      result,
      error: e
    }
  }
} 


export const acceptWinningBid = async (auctionId, signer) => {
  const auctionContract = getNFTContract(signer)

  let result = false;
  
  try {
    const tx = await auctionContract.acceptWinningBid(auctionId)
    await tx.wait(1)

    return {
      result: true,
      error: null
    }
  } catch(e) {
    console.log(e)
    return  {
      result,
      error: e
    }
  }
}


export const placeABid = async (nft, amount, account, signer) => {
  const {can, amountToPay, error} = await checkCanBid(nft, amount, account, signer)
  if(!can) {
    return {
      result: false,
      error: error
    } 
  }
  const auctionContract = getNFTContract(signer)

  let result = false;

  try {

    if(nft.currency != zeroAddress) {
      const approved = await isApprovedToken(nft.currency, account, signer);
      if(!approved) {
        return {
          result,
          error: 'Please approve for buying NFT'
        }
      }
    }


    const tx = await auctionContract.placeBid(nft.id, amount, {
      value: nft.currency == zeroAddress ? amountToPay : BigNumber.from(0)
    })

    await tx.wait(1)

    return {
      result: true,
      error: null
    }

  } catch(e) {
    console.log('place bid error', e)
    return  {
      result,
      error: 'Failed transaction!'
    }
  }
}


export const checkCanBid = async(nft, amount, account, provider) => {
  const currency = nft.currency;

  const nftContract = getNFTContract(provider);
  const nftInfo = await nftContract.info();
  console.log('checkCanbid nftinfo',nftInfo)


  const calls = [
    // Balance of AFC
    {
      address: nftInfo.afcTokenAddress,
      name: 'balanceOf',
      params: [account],
    },
    // AFC Decimal
    {
      address: nftInfo.afcTokenAddress,
      name: 'decimals',
    },
  ]

  const [[AFCBalance], [AFCDecimals]] =
    await multicall(ERC20ABI, calls)

  if(AFCBalance.lt(ethers.utils.parseUnits(nft.requiredAFC, AFCDecimals.toString()))) {
    return {
      can: false,
      error: `Insufficient $AFC Balance Need ${nFormatter(nft.requiredAFC, 0)} to buy this NFT.`
    }
  }


  let amountToPay = getBigNumber(String(amount));

  let accountBalance = getBigNumber('0')
  if(currency === zeroAddress) {
    accountBalance = await provider.getBalance()
  } else {
    const tokenContract = getTokenContract(currency, provider)
    accountBalance = await tokenContract.balanceOf(account)
  }
 
  if(accountBalance.lt(amountToPay)) {
    return {
      can: false,
      error: 'Low Balance'
    }
  }

  return {
    can: true,
    amountToPay: amountToPay
  }
}


export const checkCanCreate = async(account, provider) => {
  const nftContract = getNFTContract(provider);
  console.log('checkCanCreate:',nftContract)
  const nftInfo = await nftContract.info();
  
  const calls = [
    // Balance of AFC
    {
      address: nftInfo.afcTokenAddress,
      name: 'balanceOf',
      params: [account],
    },
    // AFC Decimal
    {
      address: nftInfo.afcTokenAddress,
      name: 'decimals',
    },
  ]

  const [[AFCBalance], [AFCDecimals]] =
    await multicall(ERC20ABI, calls)

    console.log('nft info:',nftInfo,AFCBalance,AFCDecimals,account,nftInfo.afcTokenAddress)
  
  if(AFCBalance.lt(nftInfo.minAFCToCreate)) {
    return {
      can: false,
      error: `Insufficient $AFC Balance. Need ${ethers.utils.formatUnits(nftInfo.minAFCToCreate, AFCDecimals)} to create NFT.`
    }
  }

  return {
    can: true
  }
}