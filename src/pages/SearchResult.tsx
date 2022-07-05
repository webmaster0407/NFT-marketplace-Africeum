import React, { useState } from "react";
import { Transition } from "@headlessui/react";
import NFTItem from "../components/NFTItem";
import FilterIcon from "../components/SVGIcon/FilterIcon";
import LeftArrowIcon from "../components/SVGIcon/LeftArrowIcon";
import Sidebar from "../components/SideBar";
import TopFilter from "../components/TopFilter";
import InfiniteScroll from 'react-infinite-scroll-component';
import useItems from "../hooks/useItems";
import { classNames } from "../utils/styles";
import ItemCard from "../components/Utilities/ItemCard";
import { useParams } from "react-router-dom";
import { useCoverBg } from '../hooks/useCoverBg'
import { useLocation } from "react-router-dom";
import { parseLocation } from "../utils";
import Explore from "./explore";
import Collection from "./collections";
const SearchResult = () => {
  const location = useLocation()
  const query = parseLocation(location).q || ''
  const [fetchParams, setFetchParams] = useState({
    sortBy: "createdAt",
    sortDir: "desc",
    page: 0,
    perPage: 24,
    type : 'All',
    url : "getNFTs"
  });
  
    const moreData = () =>{
      setFetchParams((prev)=>({...prev, page : (prev?.page || 0) + 1}))
    }
  const { items, hasMore } = useItems(fetchParams);
  const {id} = useParams()
  //this is fetched backend
  const {colid = id, total = 1000, bannerURL = "https://lh3.googleusercontent.com/rLkzGqVwAhXHOTj8FPA9VlJut2ZhcxCaKf3koBH3knHPXU-IyTRKb9DHLFGnHoycIAGZiloBWZXe7jvX0FtDvKkU1NyeAFx9nsPAGA=h200"
  , logoURL = "https://lh3.googleusercontent.com/XHZY9623keDQqFSDHKqOdcjD99Y7N82K1egYRM2Mm1Z-Jxn5myrkKiC5NBktWKStVtTzDzwELy9dNpzTWJTIkLsdMIxUHI86jduQ=s100"} = {};

  const convert = (temp) => {
    const res1 = temp.at(0).toUpperCase();
    return res1 + temp.substring(1).split("-").join(" ")
  }
  const coverBg = useCoverBg(bannerURL);
  return (
    <div className="flex flex-col w-full justify-center mt-[100px] items-center">
      <div className="flex w-[98vw] text-4xl 2xl:text-5xl font-bold dark:text-white">{`Search Result for "${query.toString()}"...`}</div>
      <div className="flex flex-col w-[98vw]">
        <div className="flex w-full text-2xl mt-10 -mb-10 2xl:text-3xl dark:text-white">Collections</div>
        <Collection ></Collection>
      </div>
      <div className="flex w-[98vw] flex-col">
        <div className="flex w-full text-2xl -mt-10 -mb-10 2xl:text-3xl dark:text-white">NFTs</div>
        <Explore  ></Explore>
      </div>
    </div>
      );
};

export default SearchResult;
