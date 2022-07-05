import React, { lazy } from 'react'
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from 'framer-motion';
import Creators from './pages/creators/index';
import Collectors from './pages/collectors/index';
import CreatorsArchive from './pages/creators/Archive';
import CollectorsArchive from './pages/collectors/Archive';
import NFTsSinglePage from './pages/explorer/single';
import CreateNFT from './pages/createNFT';
import ImportNFT from './pages/importNFT';
import EditProfile from './pages/editProfile';
import CreateNFTs from './pages/CreateNFTs';
import Footer from "./components/Home/components/Footer/index";
import Header from "./components/Header";

import "@splidejs/splide/dist/css/splide.min.css";

import { useAxios } from './hooks/useAxios';
import Search from './pages/search';
import Home  from './pages/home';
import Explore  from './pages/explore';
import Collection  from './pages/collections';
import NFTDetail  from './pages/NFTDetail';
import Profile  from './pages/profile';
import Create  from './pages/Create';
import ImportCollection  from './pages/ImportCollection';
import SearchResult from './pages/SearchResult';
import ExploreCollection from './pages/exploreCollection';
import CreatedDetail from './pages/CreatedDetail';
function App() {
    const location = useLocation();
    useAxios()
    return (
            <div className="page-container">
                <Header />
                <AnimatePresence exitBeforeEnter>
                    <Routes location={location}>
                        <Route path="/"  element={<Home/>} />
                        <Route path="/explore" element={ <Explore/> } />
                        <Route path="/exploreCollection" element={ <ExploreCollection/> } />
                        <Route path="/explore/:collectionid" element={ <Explore/> } />
                        <Route path="/collections" element={ <Collection/> } />
                        <Route path="/collections/:category" element={ <Collection/> } />
                        <Route path="/items/:collectionid/:token" element={ <NFTDetail/> } />
                        <Route path="/items" element={ <NFTDetail/> } />
                        <Route path="/createdItem" element={ <CreatedDetail/> } />
                        <Route path="/profile" element = {<Profile/>}></Route>
                        <Route path="/create" element = {<Create/>}></Route>
                        <Route path="/import-collection" element = {<ImportCollection/>}></Route>
                        <Route path="/search" element={ <SearchResult/> } />
                        <Route path="/create-item"  element={ <CreateNFT/> }/>

                        <Route path="/import"  element={ <ImportNFT/> }/>

                        <Route path="/creators" element={ <Creators/> } />
                        <Route path="/profile/dfd" element={ <CreatorsArchive/> } />
                        <Route path="/collectors" element={ <Collectors/> } />
                        <Route path="/collectors/archive" element={ <CollectorsArchive/> } />
                        <Route path="/profile/settings" element={ <EditProfile/> } />
                        <Route path="/create-nfts" element={ <CreateNFTs/> } />
                        <Route path="/search11" element={ <Search/> } />
                        <Route path="/discover/:id" element={ <NFTsSinglePage/> } />
                    </Routes>
                </AnimatePresence>
                <Footer />
            </div>
    )
}

export default React.memo(App)
