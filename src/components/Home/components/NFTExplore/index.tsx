import styles from "./index.module.css";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import useLink from "../../../../hooks/useLink";
import TrendingItem from './TrendingItem'
import ItemCard from "../../../Utilities/ItemCard";
import { notification } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";
import useItems from "../../../../hooks/useItems";
import { useActiveWeb3React } from "../../../../hooks";
import { proxy1 } from "../../../../config/abi/common";
import { getNFTContract } from "../../../../utils/contracts";
import { ethers } from "ethers";
import { getBigNumber } from "../../../../utils";

const NFTExplore = (props: any) => {
  const {account} = useActiveWeb3React()
  const [items, setData] = useState([])
  useEffect(() => {
    setTimeout(async()=>{
      if(!account){
        const {data} = await axios.post(proxy1 + "/api/getAllNFTs",{
          payload : {
            restriction : [],
            lastVisible : '',
            limit : 12 * props.page+12
          }
        })
        for(let i = data.length - 1 ; i > 0 && i > data.length -12; i--){
          setData((prev) => ([...prev, {...data[i], tokenID:Number(data[i].tokenId.hex),id:"collectionid=" + data[i].collectionId+"&token="+Number(data[i].tokenId.hex)}]))
        }
        return
      }
      const contract = getNFTContract(new ethers.providers.Web3Provider(window.ethereum).getSigner())
      const totalSupply = await contract.totalSupply()
      const start = (props.page>5?totalSupply -12:props.page * 12 % totalSupply + 1)
      for (let j = start; j < start + 12 ; j++) {
        const i = (j>totalSupply?j-totalSupply:j<0?0:j)
        if(j<0) j = 1
          contract.tokenURI(i).then(async (tokenURI) => {
            const owner = await contract.ownerOf(i)
            let returnData
            try {
              const json = await axios.get(tokenURI)
              const { data } = await axios.post(proxy1 + '/api/getCollectionInfoByToken', {
                params: { tokenId: getBigNumber(i) }
              })
              returnData = { owner, tokenID: i, ...json.data, logoURL: data.logoURL, id: "collectionid=" + data.id + "&token=" + i }
              setData((prev) => ([ ...prev, ...[returnData] ]))
            } catch (e) {
              if (e.toString().search('Network Error') == -1) {
                // notification.error({
                //   message: 'Error',
                //   description: "Data fetch error!!!!"
                // })
              }
              const json = await axios.post(proxy1 + '/api/getCorsURLs', { payload: tokenURI })
              const { data } = await axios.post(proxy1 + '/api/getCollectionInfoByToken', {
                params: { tokenId: getBigNumber(i) }
              })
              returnData = { owner, tokenID: i, logoURL: data.logoURL, ...json.data, id: "collectionid=" + data.id + "&token=" + i }
              setData((prev) => ([ ...prev, ...[returnData] ]))
            }
          })
        }
      },0)
  }, [])
  return (
    <div className={styles.container}>
          <div className={styles.temp}>
      <p className={styles.trending + " lg:!text-4xl dark:text-white"}>{props.page == 0?"Explore NFTs":props.page == 3?"Hot NFTs":"New NFTs"}</p>
        <a className={styles.button +" !hidden"}>
          <button className="lg:text-xl primaryBtn dark:bg-none dark:bg-gray-800 dark:hover:bg-gray-900">More...</button>
          </a>
      </div>
      {account ||!account ?items?.length > 0?<Splide
        className={styles.splide}
        options={{
          rewind: true,
          gap: "0.5rem",
          perPage: 6,
          perMove: 1,
          type: "loop",
          drag : false,
          
          autoplay : true,
          interval : 1000,
          arrows : false,
          breakpoints: {
            1600 :{
              perPage : 5
            },
            1366 :{
              perPage : 4
            },
            1200: {
              perPage: 3,
            },
            815: {
              perPage: 2,
            },
          },
          classes: {
            pagination: `splide__pagination !hidden ${styles.pagination}`,
            prev  : 'splide__arrow--prev !z-[1] dark:!bg-gray-600 dark:!text-white',
            next  : 'splide__arrow--next !z-[1] dark:!bg-gray-600 dark:!text-white',
          },
        }}
      >
        {items.map((each) =>(<SplideSlide>
          <ItemCard nft = {each}></ItemCard>
        </SplideSlide>))}
      </Splide>:<div className='flex w-[100vw] h-[150px] mb-10 items-center justify-center'>
                     <img className="m-auto w-14 h-14" src={"/loading.gif"} alt="loading" />
       </div>:<div  className='flex w-[100vw] h-[150px] mb-10 font-bold items-center justify-center text-2xl text-gray-800 dark:text-white'>
       Please login to see NFT’s...
         </div>}
    </div>
  );
};

export default NFTExplore;
