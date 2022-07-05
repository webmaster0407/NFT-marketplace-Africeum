import { Disclosure, Transition } from '@headlessui/react';
import AngleRightIcon from './SVGIcon/AngleRightIcon';
import ExploreIcon from './SVGIcon/ExploreIcon';
import ResourcesIcon from './SVGIcon/ResourcesIcon';
import SearchIcon from './SVGIcon/SearchIcon';
import StatsIcon from './SVGIcon/StatsIcon';


const MobileMenu = ({clickWallet,onChange,onKeyPress}) => {
    return (
        <div className='menu-wrap-inner w-full h-[calc(100vh-60px)] overflow-auto'>
            <div className="search-wrap relative w-full h-[50px] border-b border-solid border-Grey/40 mb-5">
                <div className="icon absolute top-[13px] left-4 pointer-events-none"><SearchIcon /></div>
                <input type="search" onChange={onChange} onKeyPress={onKeyPress} className='w-full h-full pl-12 rounded-lg outline-none' name="search" id="search" placeholder='Search OpenSea' />
            </div>
            <div className="px-4 pb-4">
                <Disclosure className="block w-full">
                    {({ open }) => (
                        <>
                            <Disclosure.Button className='flex items-center justify-between w-full py-4 text-lg font-semibold outline-none'>
                                <p className='flex items-center'><ExploreIcon /> <span className='inline-block ml-3'>Explore</span></p>
                                <p className={`angle transition ease-in transform ${open ? 'rotate-90' : ''}`}><AngleRightIcon /></p>
                            </Disclosure.Button>
                            <Transition
                                className='w-full'
                                enter="transition duration-100 ease-out"
                                enterFrom="transform scale-95 opacity-0"
                                enterTo="transform scale-100 opacity-100"
                                leave="transition duration-75 ease-out"
                                leaveFrom="transform scale-100 opacity-100"
                                leaveTo="transform scale-95 opacity-0"
                            >
                                <Disclosure.Panel>
                                    <ul className="pl-3">
                                        <li><a href="/explore" className="flex items-center w-full py-3 transition ease-in border-b border-solid border-Grey/30 hover:shadow-lg"><img src="https://opensea.io/static/images/icons/allnfts-light.svg" alt="logo" className="w-8 h-8 mr-2" /> All NFTs</a></li>
                                        {/* <li><a href="/" className="flex items-center w-full py-3 transition ease-in border-b border-solid border-Grey/30 hover:shadow-lg"><img src="https://opensea.io/static/images/icons/allnfts-light.svg" alt="logo" className="w-8 h-8 mr-2" /> Arts</a></li>
                                        <li><a href="/" className="flex items-center w-full py-3 transition ease-in border-b border-solid border-Grey/30 hover:shadow-lg"><img src="https://opensea.io/static/images/icons/allnfts-light.svg" alt="logo" className="w-8 h-8 mr-2" /> Collectibles</a></li>
                                        <li><a href="/" className="flex items-center w-full py-3 transition ease-in border-b border-solid border-Grey/30 hover:shadow-lg"><img src="https://opensea.io/static/images/icons/allnfts-light.svg" alt="logo" className="w-8 h-8 mr-2" /> Domain Names</a></li>
                                        <li><a href="/" className="flex items-center w-full py-3 transition ease-in border-b border-solid border-Grey/30 hover:shadow-lg"><img src="https://opensea.io/static/images/icons/allnfts-light.svg" alt="logo" className="w-8 h-8 mr-2" /> Music</a></li>
                                        <li><a href="/" className="flex items-center w-full py-3 transition ease-in border-b border-solid border-Grey/30 hover:shadow-lg"><img src="https://opensea.io/static/images/icons/allnfts-light.svg" alt="logo" className="w-8 h-8 mr-2" /> Photography</a></li>
                                        <li><a href="/" className="flex items-center w-full py-3 transition ease-in border-b border-solid border-Grey/30 hover:shadow-lg"><img src="https://opensea.io/static/images/icons/allnfts-light.svg" alt="logo" className="w-8 h-8 mr-2" /> Sports</a></li>
                                        <li><a href="/" className="flex items-center w-full py-3 transition ease-in border-b border-solid border-Grey/30 hover:shadow-lg"><img src="https://opensea.io/static/images/icons/allnfts-light.svg" alt="logo" className="w-8 h-8 mr-2" /> Trading Cards</a></li>
                                        <li><a href="/" className="flex items-center w-full py-3 transition ease-in border-b border-solid border-Grey/30 hover:shadow-lg"><img src="https://opensea.io/static/images/icons/allnfts-light.svg" alt="logo" className="w-8 h-8 mr-2" /> Utility</a></li>
                                        <li><a href="/" className="flex items-center w-full py-3 transition ease-in border-b border-solid border-Grey/30 hover:shadow-lg"><img src="https://opensea.io/static/images/icons/allnfts-light.svg" alt="logo" className="w-8 h-8 mr-2" /> Virtual Worlds</a></li> */}
                                    </ul>
                                </Disclosure.Panel>
                            </Transition>
                        </>
                    )}
                </Disclosure>
                {/* <Disclosure className="block w-full">
                    {({ open }) => (
                        <>
                            <Disclosure.Button className='flex items-center justify-between w-full py-4 text-lg font-semibold outline-none'>
                                <p className='flex items-center'><StatsIcon /> <span className='inline-block ml-3'>Stats</span></p>
                                <p className={`angle transition ease-in transform ${open ? 'rotate-90' : ''}`}><AngleRightIcon /></p>
                            </Disclosure.Button>
                            <Transition
                                className='w-full'
                                enter="transition duration-100 ease-out"
                                enterFrom="transform scale-95 opacity-0"
                                enterTo="transform scale-100 opacity-100"
                                leave="transition duration-75 ease-out"
                                leaveFrom="transform scale-100 opacity-100"
                                leaveTo="transform scale-95 opacity-0"
                            >
                                <Disclosure.Panel>
                                    <ul className="pl-3">
                                        <li><a href="/" className="inline-block w-full py-3 transition ease-in border-b border-solid border-Grey/30 hover:shadow-lg">Rankings</a></li>
                                        <li><a href="/" className="inline-block w-full py-3 transition ease-in border-b border-solid border-Grey/30 hover:shadow-lg">Activity</a></li>
                                    </ul>
                                </Disclosure.Panel>
                            </Transition>
                        </>
                    )}
                </Disclosure> */}
                {/* <Disclosure className="block w-full">
                    {({ open }) => (
                        <>
                            <Disclosure.Button className='flex items-center justify-between w-full py-4 text-lg font-semibold outline-none'>
                                <p className='flex items-center'><ResourcesIcon /> <span className='inline-block ml-3'>Resources</span></p>
                                <p className={`angle transition ease-in transform ${open ? 'rotate-90' : ''}`}><AngleRightIcon /></p>
                            </Disclosure.Button>
                            <Transition
                                className='w-full'
                                enter="transition duration-100 ease-out"
                                enterFrom="transform scale-95 opacity-0"
                                enterTo="transform scale-100 opacity-100"
                                leave="transition duration-75 ease-out"
                                leaveFrom="transform scale-100 opacity-100"
                                leaveTo="transform scale-95 opacity-0"
                            >
                                <Disclosure.Panel>
                                    <ul className="pl-3">
                                        <li><a href="/" className="inline-block w-full py-3 transition ease-in border-b border-solid border-Grey/30 hover:shadow-lg">Help Center</a></li>
                                        <li><a href="/" className="inline-block w-full py-3 transition ease-in border-b border-solid border-Grey/30 hover:shadow-lg">Platform Status</a></li>
                                        <li><a href="/" className="inline-block w-full py-3 transition ease-in border-b border-solid border-Grey/30 hover:shadow-lg">Partners</a></li>
                                        <li><a href="/" className="inline-block w-full py-3 transition ease-in border-b border-solid border-Grey/30 hover:shadow-lg">Gas-free Marketplace</a></li>
                                        <li><a href="/" className="inline-block w-full py-3 transition ease-in border-b border-solid border-Grey/30 hover:shadow-lg">Taxes</a></li>
                                        <li><a href="/" className="inline-block w-full py-3 transition ease-in border-b border-solid border-Grey/30 hover:shadow-lg">Blog</a></li>
                                        <li><a href="/" className="inline-block w-full py-3 transition ease-in border-b border-solid border-Grey/30 hover:shadow-lg">Docs</a></li>
                                        <li><a href="/" className="inline-block w-full py-3 transition ease-in border-b border-solid border-Grey/30 hover:shadow-lg">Newsletter</a></li>
                                    </ul>
                                </Disclosure.Panel>
                            </Transition>
                        </>
                    )}
                </Disclosure> */}
            </div>
            <div className="bottom">
                <div className="px-4 connect-btn">
                    <button type='button' onClick={clickWallet} className='flex items-center justify-center w-full h-12 text-base font-semibold text-white bg-Blue rounded-xl'>Connect wallet</button>
                </div>
                <ul className="flex items-center justify-center py-4 mt-5 border-t border-solid social-icon border-Grey/40">
                    <li className='px-4 twitter'><a href="/"><svg height="20" width="30" fill="#8A939B" viewBox="0 0 18 16"><path d="M.09 13.791c1.992.14 3.728-.344 5.327-1.571-.816-.098-1.527-.311-2.127-.786-.584-.466-1.032-1.047-1.272-1.841h1.48c.008-.033.016-.066.024-.107-.816-.237-1.512-.663-2.032-1.342-.52-.67-.775-1.448-.8-2.3.52.148 1.016.295 1.52.434.016-.033.04-.065.056-.098-.72-.606-1.24-1.334-1.431-2.275a3.92 3.92 0 01.391-2.7c2 2.389 4.511 3.715 7.598 3.936-.096-.778-.104-1.498.16-2.202.912-2.463 3.983-3.249 5.894-1.481.216.196.4.229.632.147.632-.229 1.255-.474 1.903-.72-.248.81-.784 1.408-1.415 1.989.615-.164 1.231-.336 1.839-.5.024.025.048.041.072.066-.464.491-.912 1.007-1.415 1.449-.272.237-.36.458-.376.818-.144 4.01-1.752 7.25-5.175 9.289-3.487 2.07-7.077 1.947-10.612-.025-.064-.04-.12-.09-.24-.18z"></path></svg></a></li>
                    <li className='px-4 instagram'><a href="/"><svg height="20" width="30" fill="#8A939B" viewBox="0 0 24 24"><path d="M15.75 2H8.25C4.79875 2 2 4.79875 2 8.25V15.75C2 19.2012 4.79875 22 8.25 22H15.75C19.2012 22 22 19.2012 22 15.75V8.25C22 4.79875 19.2012 2 15.75 2ZM20.125 15.75C20.125 18.1625 18.1625 20.125 15.75 20.125H8.25C5.8375 20.125 3.875 18.1625 3.875 15.75V8.25C3.875 5.8375 5.8375 3.875 8.25 3.875H15.75C18.1625 3.875 20.125 5.8375 20.125 8.25V15.75Z"></path><path d="M12 7C9.23875 7 7 9.23875 7 12C7 14.7613 9.23875 17 12 17C14.7613 17 17 14.7613 17 12C17 9.23875 14.7613 7 12 7ZM12 15.125C10.2775 15.125 8.875 13.7225 8.875 12C8.875 10.2763 10.2775 8.875 12 8.875C13.7225 8.875 15.125 10.2763 15.125 12C15.125 13.7225 13.7225 15.125 12 15.125Z"></path><path d="M17.375 7.29124C17.743 7.29124 18.0413 6.99295 18.0413 6.62499C18.0413 6.25703 17.743 5.95874 17.375 5.95874C17.0071 5.95874 16.7088 6.25703 16.7088 6.62499C16.7088 6.99295 17.0071 7.29124 17.375 7.29124Z"></path></svg></a></li>
                    <li className='px-4 discord'><a href="/"><svg height="20" width="30" fill="#8A939B" viewBox="0 0 24 24"><path d="m21.325 9.308c-.758 0-1.425.319-1.916.816-1.805-1.268-4.239-2.084-6.936-2.171l1.401-6.406 4.461 1.016c0 1.108.89 2.013 1.982 2.013 1.113 0 2.008-.929 2.008-2.038s-.889-2.038-2.007-2.038c-.779 0-1.451.477-1.786 1.129l-4.927-1.108c-.248-.067-.491.113-.557.365l-1.538 7.062c-2.676.113-5.084.928-6.895 2.197-.491-.518-1.184-.837-1.942-.837-2.812 0-3.733 3.829-1.158 5.138-.091.405-.132.837-.132 1.268 0 4.301 4.775 7.786 10.638 7.786 5.888 0 10.663-3.485 10.663-7.786 0-.431-.045-.883-.156-1.289 2.523-1.314 1.594-5.115-1.203-5.117zm-15.724 5.41c0-1.129.89-2.038 2.008-2.038 1.092 0 1.983.903 1.983 2.038 0 1.109-.89 2.013-1.983 2.013-1.113.005-2.008-.904-2.008-2.013zm10.839 4.798c-1.841 1.868-7.036 1.868-8.878 0-.203-.18-.203-.498 0-.703.177-.18.491-.18.668 0 1.406 1.463 6.07 1.488 7.537 0 .177-.18.491-.18.668 0 .207.206.207.524.005.703zm-.041-2.781c-1.092 0-1.982-.903-1.982-2.011 0-1.129.89-2.038 1.982-2.038 1.113 0 2.008.903 2.008 2.038-.005 1.103-.895 2.011-2.008 2.011z"></path></svg></a></li>
                    <li className='px-4 reddit'><a href="/"><svg height="20" width="30" fill="#8A939B" viewBox="0 0 24 24"><path d="m21.325 9.308c-.758 0-1.425.319-1.916.816-1.805-1.268-4.239-2.084-6.936-2.171l1.401-6.406 4.461 1.016c0 1.108.89 2.013 1.982 2.013 1.113 0 2.008-.929 2.008-2.038s-.889-2.038-2.007-2.038c-.779 0-1.451.477-1.786 1.129l-4.927-1.108c-.248-.067-.491.113-.557.365l-1.538 7.062c-2.676.113-5.084.928-6.895 2.197-.491-.518-1.184-.837-1.942-.837-2.812 0-3.733 3.829-1.158 5.138-.091.405-.132.837-.132 1.268 0 4.301 4.775 7.786 10.638 7.786 5.888 0 10.663-3.485 10.663-7.786 0-.431-.045-.883-.156-1.289 2.523-1.314 1.594-5.115-1.203-5.117zm-15.724 5.41c0-1.129.89-2.038 2.008-2.038 1.092 0 1.983.903 1.983 2.038 0 1.109-.89 2.013-1.983 2.013-1.113.005-2.008-.904-2.008-2.013zm10.839 4.798c-1.841 1.868-7.036 1.868-8.878 0-.203-.18-.203-.498 0-.703.177-.18.491-.18.668 0 1.406 1.463 6.07 1.488 7.537 0 .177-.18.491-.18.668 0 .207.206.207.524.005.703zm-.041-2.781c-1.092 0-1.982-.903-1.982-2.011 0-1.129.89-2.038 1.982-2.038 1.113 0 2.008.903 2.008 2.038-.005 1.103-.895 2.011-2.008 2.011z"></path></svg></a></li>
                    <li className='px-4 youtube'><a href="/"><svg height="20" width="30" fill="#8A939B" viewBox="0 0 20 18"><path d="M9.99433 3.33325C9.99433 3.33325 4.26441 3.33326 2.82628 3.70695C2.05625 3.9221 1.4222 4.55617 1.20704 5.33752C0.833352 6.77565 0.833344 9.75391 0.833344 9.75391C0.833344 9.75391 0.833352 12.7435 1.20704 14.159C1.4222 14.9403 2.04493 15.563 2.82628 15.7782C4.27574 16.1632 9.99433 16.1632 9.99433 16.1632C9.99433 16.1632 15.7356 16.1632 17.1737 15.7895C17.9551 15.5744 18.5778 14.963 18.7816 14.1703C19.1666 12.7435 19.1666 9.76524 19.1666 9.76524C19.1666 9.76524 19.178 6.77565 18.7816 5.33752C18.5778 4.55617 17.9551 3.93344 17.1737 3.72961C15.7356 3.33327 9.99433 3.33325 9.99433 3.33325ZM8.17116 7.00225L12.9386 9.75391L8.17116 12.4942V7.00225Z"></path></svg></a></li>
                </ul>
            </div>
        </div>
    );
}

export default MobileMenu;
