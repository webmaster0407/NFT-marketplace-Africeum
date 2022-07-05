import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import useItems from "../hooks/useItems";
import CollectionCard from "../components/Utilities/CollectionCard";
import { useLocation, useParams } from "react-router-dom";
import useAuth from '../hooks/useAuth';
import { parseLocation } from '../utils';
import { useActiveWeb3React } from '../hooks';
import { notification } from 'antd';

const Collection = () => {
  const  location  = useLocation()
  const category = parseLocation(location).category || null
  const {account} = useActiveWeb3React()
  const [isLoading, setloading] = useState(true)
  const [fetchParams, setFetchParams] = useState({
    sortBy: "createdAt",
    sortDir: "desc",
    lastVisible: '',
    perPage: 12,
    type: category ? category : 'All',
    url: 'getCollection',
    callback: () => {
      setloading(false)
    }
  })
  const { items, hasMore } = useItems(fetchParams)
  const moreData = () => {
    setFetchParams((prev) => ({ ...prev, lastVisible: (items ? items[items.length - 1].createdAt : '') }))
  }
  const {login} = useAuth()

  // useEffect(()=>{
  //   console.log(account)
  //   if(!account)
  //   notification.warn({
  //     message : "Warning",
  //     description : "Please login for more explore..."
  //   })
  // },[account])
  return (
    <>
      {isLoading ? <div className='flex w-[100vw] h-[100vh] items-center justify-center'>
        <img className="m-auto w-14 h-14" src={"/loading.gif"} alt="loading" />
      </div> :
        <InfiniteScroll
          className={"mt-20"}
          dataLength={items.length}
          next={moreData}
          height={"calc(100vh - 80px)"}
          hasMore={hasMore}
          loader={<p className="text-xs">Loading...</p>}
        >
          <div className={"w-full flex "}>
            <p className="text-3xl lg:text-4xl font-extrabold px-8 pt-6 dark:text-white flex">{category ? category : "All Collections"}</p>
          </div>
          <div className="App w-full mt-4 grid xl:grid-cols-3 2xl:grid-cols-4 md:grid-cols-2   ">
            {items.map((each, idx) => (
              <CollectionCard key = {idx} collection={each}></CollectionCard>
            ))}
          </div>
        </InfiniteScroll>}
    </>
  );
};

export default Collection;
