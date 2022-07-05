import React, { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/images/logos.png";
import { useAuthState } from "../contexts/AuthContext";
import { useActiveWeb3React } from "../hooks";
import useAuth from "../hooks/useAuth";
import useLink from "../hooks/useLink";

import ConnectModal from "./WalletConnect/ConnectModal";
import Backdrop from "./Utilities/Backdrop";
import { shortenHex } from "../utils/helper";
import { DefaultAvatar } from "../config/constants";

function Header() {
  const [query, setQuery] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  const [showMobileNavbar, setShowMobileNavbar] = useState(false);
  const [showConnectOptions, setShowConnectOptions] = useState(false);

  const { account } = useActiveWeb3React();
  const { login, logout } = useAuth();
  const { user } = useAuthState();
  const { linkToUser } = useLink();

  const handleSearch = (value) => {
    navigate(`/search?q=${value}`);
  };

  useEffect(() => {
    if (location.pathname !== "/search") {
      setQuery("");
    }
  }, [location]);

  useEffect(() => {
    if (
      location.pathname === "/search" ||
      (location.pathname !== "/search" && query !== "")
    ) {
      //handleSearch(query);
    }
  }, [query]);

  const handleKeypress = (e) => {
    if (e.charCode === 13) {
      if (
        location.pathname === "/search" ||
        (location.pathname !== "/search" && query !== "")
      ) {
        handleSearch(query);
        setTimeout(() => {
          // window.location.reload()
        }, 500);
      }
    }
  };

  useEffect(() => {
    // Header Reveal Animation
    let header = document.getElementById("main-header");
    let scrollLastPoint = 0;

    // window.addEventListener("scroll", () => {
    //   let currentScrollPoint = window.pageYOffset;
    //   // console.log(currentScrollPoint);
    //   if (currentScrollPoint <= 0) {
    //     header.classList.remove("scroll-up");
    //     return;
    //   }

    //   if (
    //     currentScrollPoint > scrollLastPoint &&
    //     !header.classList.contains("scroll-down")
    //   ) {
    //     header.classList.remove("scroll-up");
    //     header.classList.add("scroll-down");
    //   } else if (
    //     currentScrollPoint < scrollLastPoint &&
    //     header.classList.contains("scroll-down")
    //   ) {
    //     header.classList.remove("scroll-down");
    //     header.classList.add("scroll-up");
    //   }

    //   scrollLastPoint = currentScrollPoint;
    // });
  }, []);
  const [menuExpanded, setMenuExpanded] = useState(false);
  const [searchExpanded, setSearchExpanded] = useState(false);
  const [loginNav, setLoginNav] = useState(false);

  return (
    <header
      id="main-header"
      className="fixed top-0 left-0 w-full z-[99] transition-all ease-in delay-300 flex justify-between items-center py-3 xl:px-10 px-4 bg-[rgb(239,238,234)]"
    >
      <div className="flex items-center ">
        <div className="mr-3 mobile-btn lg:hidden">
          <button
            type="button"
            onClick={() => {
              setMenuExpanded(!menuExpanded);
            }}
            className={`border-solid border-2 border-black w-10 h-8 p-1 relative lg:hidden inline-block`}
          >
            <span
              className={`absolute left-0 w-full inline-block h-[2px] bg-black transition-all ${
                menuExpanded ? "rotate-45 top-[12px]" : "top-[6px]"
              }`}
            ></span>
            <span
              className={`absolute top-[13px] left-0 w-full inline-block h-[2px] bg-black transition-all ${
                menuExpanded ? "-rotate-45" : ""
              }`}
            ></span>
            <span
              className={`absolute top-[20px] left-0 w-full inline-block h-[2px] bg-black transition-all ${
                menuExpanded ? "opacity-0" : ""
              }`}
            ></span>
          </button>
        </div>
        <div className="mr-14">
          <NavLink to="/" className="flex flex-row items-center logo">
            {/* <img width={"300"} height={"80"} src={logo} alt="logo" /> */}

            <img className="w-[50px]" width={"200px"} src={logo} alt="logo" />
            <span className="ml-4 text-lg font-bold text-black uppercase">
              {" "}
              Africeum
            </span>
          </NavLink>
        </div>
        <div className="hidden menu-wrap lg:flex">
          <ul className="flex">
            <li>
              <NavLink
                className="text-sm border border-solid border-transparent rounded-3xl transition ease-in text-black px-[25px] py-[8px] mr-3"
                to="/discover"
              >
                Discover
              </NavLink>
            </li>
            <li>
              <NavLink
                className="text-sm border border-solid border-transparent rounded-3xl transition ease-in text-black px-[25px] py-[8px] mr-3"
                to="/explore"
              >
                Explore
              </NavLink>
            </li>
            <li>
              <NavLink
                className="text-sm border border-solid border-transparent rounded-3xl transition ease-in text-black px-[25px] py-[8px] mr-3"
                to="/creators"
              >
                Creators
              </NavLink>
            </li>
            <li>
              <NavLink
                className="text-sm border border-solid border-transparent rounded-3xl transition ease-in text-black px-[25px] py-[8px] mr-3"
                to="/collectors"
              >
                Collectors
              </NavLink>
            </li>

            {account && user && user.image && (
              <li>
                <NavLink
                  onClick={() => {
                    if (user && user.image) {
                      navigate("create");
                    } else {
                    }
                  }}
                  to="/create"
                  className="text-sm border border-solid border-transparent rounded-3xl transition ease-in text-black px-[25px] py-[8px] mr-3"
                >
                  Create
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      </div>
      <div className="header-right lg:w-[calc(100%-500px)] w-[calc(100%-190px)] text-right flex items-center justify-end">
        <div className="search-header lg:w-[calc(100%-290px)] w-full">
          <div
            className={`search-form transition ease-in relative ml-auto mr-0 flex items-center overflow-hidden border border-solid border-black h-[44px] bg-[rgb(255,255,255)] rounded-3xl ${
              searchExpanded ? "w-full" : "w-[45px]"
            }`}
          >
            <label
              onClick={() => {
                setSearchExpanded(!searchExpanded);
              }}
              className="absolute top-0 left-0 w-[45px] h-[45px] inline-flex justify-center"
              htmlFor="searchInput"
            >
              <svg
                id="Capa_1"
                className="w-4"
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                viewBox="0 0 56.966 56.966"
              >
                <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23 s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92 c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17 s-17-7.626-17-17S14.61,6,23.984,6z"></path>
              </svg>
            </label>
            <input
              className="w-full h-full pl-10 bg-transparent outline-none rounded-3xl"
              type="search"
              name="searchInput"
              id="searchInput"
              onChange={(e) => {
                setQuery(e.target.value);
              }}
              onKeyPress={(e) => handleKeypress(e)}
              value={query}
            />
          </div>
        </div>
        {!account ? (
          <button
            type="button"
            onClick={() => {
              setShowConnectOptions(true);
            }}
            className="special-btn lg:inline-block hidden shadow-white px-6 py-2 text-black w-[170px] ml-5 text-base cursor-pointer font-medium"
          >
            Connect Wallet
          </button>
        ) : (
          <button
            type="button"
            onClick={() => {
              setLoginNav(!loginNav);
            }}
            className="flex items-center px-2 py-1 ml-2 text-sm font-medium text-black cursor-pointer special-btn shadow-white"
          >
            <span className="pr-1">{shortenHex(account)}</span>{" "}
            <p className="flex w-8 h-8 overflow-hidden rounded-full">
              <img
                className="object-cover w-full"
                src={user?.image || DefaultAvatar}
                alt="head"
              />
            </p>
          </button>
        )}

        <div className="relative login-header">
          <nav
            className={`login-nav absolute top-12 bg-white p-3 rounded-xl w-44 right-0 transition ease-in ${
              loginNav ? "opacity-1 visible" : "opacity-0 invisible"
            }`}
          >
            <li className="list-none">
              <button
                className="block px-1 py-2 text-sm text-left text-black transition ease-in"
                onClick={() => {
                  setLoginNav(!loginNav);
                  if (user?.username) {
                    navigate(`/profile/${user.username}`);
                  }
                }}
                type="button"
              >
                Profile {shortenHex(account)}
              </button>{" "}
            </li>
            <li className="list-none">
              <button
                className="block px-1 py-2 text-sm text-left text-black transition ease-in"
                onClick={() => {
                  setLoginNav(!loginNav);
                  navigate("/edit-profile");
                }}
                type="button"
              >
                Edit Profile
              </button>{" "}
            </li>

            <li className="list-none">
              <button
                onClick={() => {
                  if (user?.image) {
                    setLoginNav(!loginNav);
                    navigate("/create");
                  } else {
                    setLoginNav(!loginNav);
                    navigate("/edit-profile");
                  }
                }}
                type="button"
                className="block px-1 py-2 text-sm text-left text-black transition ease-in"
              >
                Create NFT
              </button>{" "}
            </li>

            {/* <li className='list-none'><NavLink className='block px-1 py-2 text-sm text-left text-black transition ease-in' to="/my">My bids</NavLink> </li> */}
            {/* <li className="list-none">
              <NavLink
                className="block px-1 py-2 text-sm text-left text-black transition ease-in"
                to="/become"
              >
                Become a creator
              </NavLink>{" "}
            </li> */}
            {/* <li className='list-none'><NavLink className='block px-1 py-2 text-sm text-left text-black transition ease-in' to="/buy">Buy crypto with fiat</NavLink> </li> */}
            <li className="list-none">
              <button
                onClick={() => {
                  setLoginNav(!loginNav);
                  logout();
                }}
                type="button"
                className="block px-1 py-2 text-sm text-left text-black transition ease-in"
              >
                Disconnect
              </button>{" "}
            </li>
          </nav>
        </div>
      </div>
      {/* {menuExpanded && (
        <div
          className={`mobile-menu-wrapper lg:hidden absolute top-[58px] px-4 py-10 left-0 w-full transition ease-in bg-[rgb(239,238,234)] ${
            menuExpanded
              ? "m-menu-activated opacity-1 visible h-screen"
              : "opacity-0 invisible h-0"
          }`}
        >
          <ul className="flex flex-wrap">
            <li
              className="w-full mb-5"
              onClick={() => {
                setMenuExpanded(!menuExpanded);
              }}
            >
              <NavLink
                className="text-sm text-black px-[15px] py-[5px] mr-3"
                to="/discover"
              >
                Discover
              </NavLink>
            </li>
            <li
              className="w-full mb-5"
              onClick={() => {
                setMenuExpanded(!menuExpanded);
              }}
            >
              <NavLink
                className="text-sm text-black px-[15px] py-[5px] mr-3"
                to="/creators"
              >
                Creators
              </NavLink>
            </li>
            <li
              className="w-full mb-5"
              onClick={() => {
                setMenuExpanded(!menuExpanded);
              }}
            >
              <NavLink
                className="text-sm text-black px-[15px] py-[5px] mr-3"
                to="/collectors"
              >
                Collectors
              </NavLink>
            </li>

            {account && user && user.image && (
              <li
                className="w-full mb-5"
                onClick={() => {
                  setMenuExpanded(!menuExpanded);
                }}
              >
                <NavLink
                  className="text-sm text-black px-[15px] py-[5px] mr-3"
                  to="/create"
                >
                  Create
                </NavLink>
              </li>
            )}
          </ul>
          {!account ? (
            <button
              onClick={() => {
                setShowConnectOptions(true);
              }}
              type="button"
              className="px-6 py-2 mt-10 text-base font-medium text-black cursor-pointer special-btn shadow-white"
            >
              Connect Wallet
            </button>
          ) : (
            <button
              onClick={() => {
                setLoginNav(!loginNav);
              }}
              type="button"
              className="px-6 py-2 mt-10 text-base font-medium text-black cursor-pointer special-btn shadow-white"
            >
              {shortenHex(account)}
            </button>
          )}
        </div>
      )} */}

      {showConnectOptions && (
        <Backdrop>
          <ConnectModal
            login={login}
            onDismiss={() => setShowConnectOptions(false)}
          />
        </Backdrop>
      )}
    </header>
  );
}

export default Header;
