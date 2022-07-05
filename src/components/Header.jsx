import SearchIcon from "./SVGIcon/SearchIcon";
import { Popover, Transition } from "@headlessui/react";
import MobileMenu from "./MobileMenu";
import HamburgerIcon from "./SVGIcon/HamburgerIcon";
import CloseIcon from "./SVGIcon/CloseIcon";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useActiveWeb3React,useEagerConnect } from "../hooks";
import useAuth from "../hooks/useAuth";
import useLink from "../hooks/useLink";
import { BsFillHddStackFill, BsClockHistory } from "react-icons/bs";
import { FaMoon } from "react-icons/fa";
import { placeholderContractABI, proxy1 } from '../config/abi/common';
import { getContract } from '../utils/contracts';
import ConnectModal from "./WalletConnect/ConnectModal";
import Backdrop from "./Utilities/Backdrop";
import { parseLocation, getBigNumber } from "../utils";
import styles from "./Home/components/Hero/index.module.css"
import { notification } from "antd";
import { ethers } from "ethers";

const Header = () => {
  const location = useLocation();
  const [query, setQuery] = useState(parseLocation(location).q || '');
  const navigate = useNavigate();
  const [showMobileNavbar, setShowMobileNavbar] = useState(false);
  const [showConnectOptions, setShowConnectOptions] = useState(false);
  const theme = window.localStorage.getItem('themeAfriceum')
  const [toggle, setToggle] = useState(theme == "dark");

  const toggleClass = " transform translate-x-4";
  const { account } = useActiveWeb3React();
  // alert(account)
  const { login, logout } = useAuth();

  const { linkToUser } = useLink();
  //this values are fetched from Backend,
  const ExploreMenu = require('../config/constants/datamodel/ExploreMenuData.json')

  const handleSearch = (value) => {
    navigate(`/search?q=${value}`);
  };
  useEffect(() => {
    if (toggle) {
      document.documentElement.classList.add("dark")
      window.localStorage.setItem("themeAfriceum", "dark")
    } else {
      document.documentElement.classList.remove("dark")
      window.localStorage.setItem("themeAfriceum", "light")
    }
  }, [])
  useEffect(() => {
    // login("Injected")
    try {
      window.ethereum.on("chainChanged", async () => {
        const chainID = await window.ethereum.request({
          method: "net_version",
        });
        window.localStorage.removeItem("loginInfoAfriceum")
        console.log(proxy1)
        window.location.reload()
      }).on("notification", (msg) => {
      }).on("disconnect", () => {
        console.log(proxy1)
        window.localStorage.removeItem("loginInfoAfriceum")
        window.location.reload()
      }).on("accountsChanged", () => {
        console.log(proxy1)
        window.localStorage.removeItem("loginInfoAfriceum")
        window.location.reload()
      });
    } catch (e) { }
  }, [])
  useEffect(() => {
    if (location.pathname !== "/search") {
      setQuery("");
    }
    if(location.pathname.search("rank") != -1 || location.pathname.search("activi") != -1)
    {
      notification.info({message:"Info", description:"Coming soon!!"})
      navigate("/")
    }
  }, [location]);

  useEffect(() => {
    if (
      query !== ""
    ) {
      handleSearch(query);
    } else {
      if (location.pathname == "/search")
        navigate("/")
    }
  }, []);

  const handleKeypress = (e) => {
    if (e.charCode === 13) {
      if (
        query !== ""
      ) {
        handleSearch(query);
      } else {
        if (location.pathname == "/search")
          navigate("/")
        else window.location.reload()
      }
    }
  };

  const [menuExpanded, setMenuExpanded] = useState(false);
  const [searchExpanded, setSearchExpanded] = useState(false);
  const [loginNav, setLoginNav] = useState(false);

  return (
    <>
      <header className="App-header bg-opacity-70 fixed top-0 w-full h-[70px] md:h-[82px] px-4 md:px-7 flex items-center justify-between shadow-lg bg-white dark:bg-gray-700 z-[20]">
        <a href="/" className="flex items-center justify-start pr-16 text-2xl font-bold logo xl:pr-16 text-Dark dark:text-white">
          <img className="lg:w-14 w-10 mr-2" src="/logos.png" />
          <span className="ml-1 lg:text-3xl text-lg uppercase color-black">Africeum</span>
          {/* <img src="https://opensea.io/static/images/logos/opensea.svg" alt="logo" className="w-10 mr-2" /> */}
          {/* Africeum */}
        </a>
        <div className="search-wrap hidden dark:text-gray-400 dark:hover:text-white md:inline-block relative w-full xl:mr-10 h-[55px] ">
          <div className="dark:text-gray-400 dark:hover:text-white icon absolute top-[18px] left-4 pointer-events-none ">
            <SearchIcon mode={toggle} />
          </div>
          <input
            type="search"
            onChange={(e) => {
              setQuery(e.target.value);
            }}
            value={query}
            onKeyPress={(e) => handleKeypress(e)}
            className="w-full h-full pl-12 border border-solid text-xl rounded-3xl outline-none border-Grey/40 dark:focus:border-Grey/100 dark:bg-gray-800 dark:text-gray-400 dark:hover:text-white"
            name="search"
            id="search"
            placeholder="Search items, collections, and accounts"
          />
        </div>
        <div className="hidden  menu-wrap md:flex dark:bg-gray-700 dark:text-gray-400 dark:hover:text-white">
          <div className="flex">
            <ul className="flex items-center justify-end  dark:bg-gray-700 dark:text-gray-400 dark:hover:text-white">
              <li className="ml-5 xl:ml-10  dark:bg-gray-700 dark:text-gray-400 dark:hover:text-white">
                <a href="/exploreCollection"
                  className="relative cursor-pointer text-md font-semibold group md:text-base  dark:bg-gray-700 dark:text-gray-400 dark:hover:text-white"
                >
                  <span className="h-[72px] dark:text-gray-400 dark:hover:text-white inline-flex items-center transition ease-in text-black/70 hover:text-black">
                    Explore
                  </span>
                </a>
              </li>
              <li className="ml-5 xl:ml-10  dark:bg-gray-700 dark:text-gray-400 dark:hover:text-white">
                <a
                  className="relative cursor-pointer text-md font-semibold group md:text-base  dark:bg-gray-700 dark:text-gray-400 dark:hover:text-white"
                >
                  <span className="h-[72px] dark:text-gray-400 dark:hover:text-white inline-flex items-center transition ease-in text-black/70 hover:text-black">
                    Collections
                  </span>
                  <ul className="absolute  dark:bg-gray-700 dark:text-gray-400 top-[45px] -left-4 w-60 bg-white shadow-NFT opacity-0 invisible overflow-hidden rounded-lg transition ease-in group-hover:opacity-100 group-hover:visible">
                    <li className="dark:hover:bg-gray-800  dark:hover:text-white">
                      <a
                        href="/collections"
                        className="  flex items-center w-full p-3 transition ease-in border-b border-solid border-Grey/30 hover:shadow-lg"
                      >
                        <img
                          src={!toggle ? "https://opensea.io/static/images/icons/allnfts-light.svg" : "https://opensea.io/static/images/icons/allnfts-dark.svg"}
                          alt="logo"
                          className="w-8 h-8 mr-2"
                        />{" "}
                        All Collections
                      </a>
                    </li>
                    {ExploreMenu.map((each) => (
                      <li key={each.label} className="dark:hover:bg-gray-800 dark:hover:text-white">
                        <a href={"/collections?category=" + each.label} className="flex items-center w-full p-3 transition ease-in border-b border-solid border-Grey/30 hover:shadow-lg"><img src={!toggle ? each.icon : each["dark-icon"]} alt="logo" className="w-8 h-8 mr-2" /> {each.label}</a>
                      </li>
                    ))}
                  </ul>
                </a>
              </li>
              <li className="ml-5 xl:ml-10 dark:text-gray-400 dark:hover:text-white">
                <a
                  className="relative text-md font-semibold group md:text-base dark:text-gray-400 dark:hover:text-white"
                >
                  <span className="dark:text-gray-400 dark:hover:text-white cursor-pointer h-[72px] inline-flex items-center transition ease-in text-black/70 hover:text-black">
                    Others
                  </span>
                  <ul className="absolute  dark:bg-gray-700 dark:text-gray-400 top-[45px] -left-4 w-60 bg-white shadow-NFT opacity-0 invisible overflow-hidden rounded-lg transition ease-in group-hover:opacity-100 group-hover:visible">
                    <li className="dark:hover:bg-gray-800  dark:hover:text-white">
                      <a
                        href="/ranking"
                        className="  flex items-center w-full p-3 transition ease-in border-b border-solid border-Grey/30 hover:shadow-lg"
                      >
                        <BsFillHddStackFill></BsFillHddStackFill>
                        <div className="ml-2">Ranking</div>
                      </a>
                    </li>
                    <li className="dark:hover:bg-gray-800  dark:hover:text-white">
                      <a
                        href="/activities"
                        className="  flex items-center w-full p-3 transition ease-in border-b border-solid border-Grey/30 hover:shadow-lg"
                      >
                        <BsClockHistory></BsClockHistory>
                        <div className="ml-2">Activities</div>
                      </a>
                    </li>
                    <li className="dark:hover:bg-gray-800 cursor-pointer dark:hover:text-white">
                      <a
                        className="flex flex-row items-center w-full p-3 transition ease-in border-b border-solid border-Grey/30 hover:shadow-lg"
                        onClick={
                          (e) => {
                            setToggle(!toggle);
                            if (!toggle) {
                              document.documentElement.classList.add("dark")
                              window.localStorage.setItem("themeAfriceum", "dark")
                            } else {
                              document.documentElement.classList.remove("dark")
                              window.localStorage.setItem("themeAfriceum", "light")
                            }
                          }
                        }>
                        <FaMoon></FaMoon>
                        <div className="ml-2 w-full">Dark Mode
                          <div
                            className={"float-right mr-2 md:w-10 md:h-5 w-10 h-4 flex items-center rounded-full p-1 cursor-pointer" + (toggle ? " bg-gray-400" : " bg-blue-400")}
                            onClick={() => {
                              setToggle(!toggle);
                              if (!toggle) {
                                document.documentElement.classList.add("dark")
                                window.localStorage.setItem("themeAfriceum", "dark")
                              } else {
                                document.documentElement.classList.remove("dark")
                                window.localStorage.setItem("themeAfriceum", "light")
                              }
                            }}
                          >
                            {/* Switch */}
                            <div
                              className={
                                "bg-white md:w-4 md:h-4 h-4 w-4 rounded-full shadow-md transform duration-300 ease-in-out" +
                                (toggle ? null : toggleClass)
                              }
                            ></div>
                          </div>
                        </div></a>
                    </li>
                  </ul>
                </a>
              </li>
            </ul>

          </div>
          <div className="flex" >
            <button className={styles.explore + " !w-28 h-12 my-4 mx-4 dark:bg-none dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-900"}
              onClick={() => {
                if (account) {
                  navigate("/create");
                } else {
                  login("Injected");
                }
              }}
            > Create
            </button>
            {account ? (<button className={styles.create + " !w-28 h-12 my-4 dark:bg-gray-600 dark:bg-opacity-40 dark:border-gray-300 dark:hover:bg-gray-800 dark:hover:bg-opacity-100 dark:text-gray-300"}
              onClick={() => {
                setLoginNav(!loginNav);
                if (account) {
                  navigate("/profile")
                } else {
                  login("Injected");
                }
              }}
            >
              Profile

            </button>
            ) : (
              <button className={styles.create + "  !w-28 h-12 my-4 dark:bg-gray-600 dark:bg-opacity-40 dark:border-gray-300 dark:hover:bg-gray-800 dark:hover:bg-opacity-100 dark:text-gray-300"}
                onClick={() => {
                  login("Injected")
                }}
              >
                Log In
              </button>
            )}
          </div>

        </div>
        <div className="relative hamburger-nav md:hidden">
          <Popover>
            {({ open }) => (
              <>
                <Popover.Button className="outline-none">
                  {open ? <CloseIcon /> : <HamburgerIcon />}
                </Popover.Button>
                <Transition
                  show={open}
                  className="fixed border-t border-solid border-Grey/40 top-[60px] w-full bg-white left-0"
                  enter="transition duration-300 ease-out"
                  enterFrom="transform translate-x-full opacity-0"
                  enterTo="transform translate-x-0 opacity-100"
                  leave="transition duration-300 ease-in"
                  leaveFrom="transform translate-x-0 opacity-100"
                  leaveTo="transform -translate-x-full opacity-0"
                >
                  <Popover.Panel>
                    <MobileMenu
                      clickWallet={() => {
                        setShowConnectOptions(true);
                      }}

                      onChange={(e) => {
                        setQuery(e.target.value);
                      }}
                      onKeyPress={(e) => handleKeypress(e)}
                    />
                  </Popover.Panel>
                </Transition>
              </>
            )}
          </Popover>
        </div>

        {showConnectOptions && (
          <Backdrop>
            <ConnectModal
              login={login}
              onDismiss={() => setShowConnectOptions(false)}
            />
          </Backdrop>
        )}
      </header>
    </>
  );
};

export default Header;
