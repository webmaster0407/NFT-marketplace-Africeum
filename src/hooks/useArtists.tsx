import axios from 'axios'
import { useContext, useEffect, useState } from 'react'

const useArtists = (props) => {
  const [items, setItems] = useState([])
  const [itemsPerPage, setItemsPerPage] = useState(new Map())
  const [hasMore, setHasMore] = useState(true)

  const {sortBy, sortDir, page, search, perPage ,verified} = props

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('user/all', {
          params: {
            sortDir: sortDir || 'created_at',
            sortBy: sortBy || 'desc',
            search: search || '',
            page: page || 0,
            limit: perPage || 24,
            verified:verified
          },
        })
        let tempItems = response?.data?.users
        if(tempItems.length < (perPage || 24)) {
          setHasMore(false)
        }else {
          setHasMore(true)
        }

        let tempMap = page == 0 ? new Map() : itemsPerPage
        tempMap.set(page, tempItems)
        const sortedByPage = Array.from(tempMap.entries()).sort((a, b) => a[0] - b[0])
        let tempItems2 = []
        for(const elem of sortedByPage) {
          tempItems2 = tempItems2.concat(elem[1])
        }
        setItemsPerPage(tempMap)
        setItems(tempItems2)
      } catch (error) {
        console.error('Unable to fetch users data:', error)   
      }
    }

    fetchData()
  }, [setItems, props])

  return {
    items,
    hasMore
  }
}

export default useArtists
