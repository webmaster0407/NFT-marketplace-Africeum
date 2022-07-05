import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import { placeholderContractABI } from '../config/abi/common'
import { TokenPriceContext } from '../contexts/TokenPriceContext'
import { getContract } from '../utils/contracts'
import { BigNumber, ethers } from 'ethers'
import { convertJsonLinks, getObjectType } from '../utils'
import { proxy1 } from "../config/abi/common";


const useItems = (props) => {
  const [items, setItems] = useState([])
  const [sales, setSales] = useState([])
  const [itemsPerPage, setItemsPerPage] = useState(new Map())
  const [hasMore, setHasMore] = useState(true)

  // const { prices } = useContext(TokenPriceContext)

  const { sortBy, sortDir, lastVisible, perPage,
    type, url, callback, contractAddress, page, collectionInfo, collectionid, totalSupply, collectioninfos, restriction = [] } = props

  const getAllNFTs = async () => {
    setHasMore(true)
    if (!collectioninfos) return
    let count = 0
    let temp = {}
    for (let i = 0; i < collectioninfos.length; i++) {
      if (temp[collectioninfos[i].contractAddress]) continue
      temp = { ...temp, [collectioninfos[i].contractAddress]: true }
      count++
    }
    const indexrange = Math.ceil(perPage / count)
    const startIndex = (page) * indexrange
    let endIndex = startIndex + indexrange
    let result = []
    let temp1 = false
    let more = false
    for (let j = 0; j < collectioninfos.length; j++) {
      const each = collectioninfos[j]
      if (temp1 && each.creator) continue
      if (each.creator) temp1 = true
      const contract = getContract(each.contractAddress, placeholderContractABI, new ethers.providers.Web3Provider(window.ethereum).getSigner())
      const totalSupply = await contract.totalSupply()
      let end = endIndex
      if (endIndex > Number(totalSupply.hex)) {
        end = Number(totalSupply.hex)
      } else {
        more = true
      }
      for (let i = startIndex; i < end; i++) {
        try {
          if (result.length >= perPage) {
            setHasMore(more)
            return result
          }
          let token = await contract.tokenByIndex(i)
          const temptoken = token
          token = Number(token)
          const jsonLink = await contract.tokenURI(token)
          const owner = await contract.ownerOf(token)
          const newLink = convertJsonLinks(jsonLink)
          if (getObjectType(newLink) == "string") {
            try {
              const { data } = await axios.get(newLink)
              data.tokenID = token
              data.tokenIndex = i
              data.owner = owner
              data.logoURL = each.logoURL
              if (each.creator) {
                const res = await axios.post(proxy1 + '/api/getCollectionInfoByToken', {
                  params: { tokenId: temptoken }
                })
                if (!res?.data) continue
                data.id = "collectionid=" + res?.data?.id + "&token=" + token
                data.logoURL = res?.data?.logoURL
                result.push(data)
              } else if (data.logoURL) {
                data.id = "collectionid=" + each.id + "&token=" + token
                result.push(data)
              }
            } catch (e) {
              if (e.toString().search('Network Error') == -1) continue
              const { data } = await axios.post(proxy1 + '/api/getCorsURLs', { payload: newLink })
              data.tokenID = token
              data.tokenIndex = i
              data.logoURL = each.logoURL
              data.owner = owner
              if (each.creator) {
                const res = await axios.post(proxy1 + '/api/getCollectionInfoByToken', {
                  params: { tokenId: temptoken }
                })
                if (!res?.data) continue
                data.id = "collectionid=" + res?.data?.id + "&token=" + token
                data.logoURL = res?.data?.logoURL
                result.push(data)
              } else if (data.logoURL)
                data.id = "collectionid=" + each.id + "&token=" + token
              result.push(data)
            }
          } else {
            newLink.tokenID = token
            newLink.tokenIndex = i
            newLink.owner = owner
            newLink.logoURL = each.logoURL
            if (each.creator) {
              const res = await axios.post(proxy1 + '/api/getCollectionInfoByToken', {
                params: { tokenId: temptoken }
              })
              if (!res?.data) continue
              newLink.id = "collectionid=" + res?.data?.id + "&token=" + token
              newLink.logoURL = res?.data?.logoURL
              result.push(newLink)
            } else if (newLink.logoURL) {
              newLink.id = "collectionid=" + each.id + "&token=" + token

              result.push(newLink)
            }
          }
        } catch (e) {
          console.log("3", each)
          continue
        }
      }
    }
    setHasMore(more)
    return result
  }

  const getAllNFTsByContractAddress = async () => {
    return getAllNFTs()
    const contract = getContract(contractAddress, placeholderContractABI, new ethers.providers.Web3Provider(window.ethereum).getSigner())
    const startIndex = (page) * perPage - perPage
    let endIndex = startIndex + perPage
    setHasMore(true)
    if (totalSupply != 'NaN' && endIndex > totalSupply) {
      endIndex = totalSupply - 1
      setHasMore(true)
    }
    let result = []
    for (let i = startIndex; i < endIndex; i++) {
      try {
        let token = await contract.tokenByIndex(i)
        token = Number(token)
        const jsonLink = await contract.tokenURI(token)
        const owner = await contract.ownerOf(token)
        const newLink = convertJsonLinks(jsonLink)
        if (getObjectType(newLink) == "string") {
          try {
            const { data } = await axios.get(newLink)
            data.tokenID = token
            data.tokenIndex = i
            data.owner = owner
            data.id = "collectionid=" + collectionid + "&token=" + token
            result.push(data)
          } catch (e) {
            try {
              if (e.toString().search('Network Error') == -1) continue
              else {
                const { data } = await axios.post(proxy1 + '/api/getCorsURLs', { payload: newLink })
                data.tokenID = token
                data.tokenIndex = i
                data.owner = owner
                data.id = "collectionid=" + collectionid + "&token=" + token
                result.push(data)
              }
            }
            catch (e) {
              continue
            }
          }
        } else {
          newLink.tokenID = token
          newLink.tokenIndex = i
          newLink.owner = owner
          newLink.id = "collectionid=" + collectionid + "&token=" + token
          result.push(newLink)
        }
      } catch (e) {
        continue
      }
    }
    return result
  }

  useEffect(() => {
    const fetchData = async () => {

      try {
        let resItems = null
        if (url == 'getNFTs') {
          if (type == 'All') { resItems = await getAllNFTsByContractAddress() }
          else {
            resItems = await axios.post(proxy1 + '/api/getListedData', {
              payload: {
                contractAddress: contractAddress,
                status: "listed",
                perPage: perPage || 12,
                lastVisible: (items.length == 0 ? '' : items[items.length - 1].createdAt),
                sortDir: sortDir || 'desc',
                sortBy: sortBy || 'createdAt',
              }
            })
          }
        }
        else {
          resItems = await axios.post(proxy1 + '/api/' + url, {
            params: {
              sortDir: sortDir || 'desc',
              sortBy: sortBy || 'createdAt',
              lastVisible: lastVisible || '',
              limit: perPage || 12,
              type: type || 'None',
              restriction: restriction || []
            }
          })
        }
        if (!(url == 'getNFTs' && type == 'All'))
          resItems = resItems?.data
        if (resItems && resItems.length > 0) {
          if (resItems.length < (perPage || 12)) {
            if (!(url == 'getNFTs' && type == 'All'))
              setHasMore(false)
          } else {
            setHasMore(true)
          }
          if (!(url == 'getNFTs' && type == 'sale')) {
            setItems(items.concat(resItems))
            setSales([])
          }
          else {
            setItems([])
            setSales(sales.concat(resItems))
          }
        }
        if (callback) callback()
      } catch (error) {
        console.error(error)
      }
    }

    fetchData()
  }, [setItems, props, setSales])

  return {
    sales,
    items,
    hasMore
  }
}

export default useItems
