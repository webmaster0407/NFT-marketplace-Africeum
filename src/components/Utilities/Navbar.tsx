import { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuthState } from '../../contexts/AuthContext';
import { useActiveWeb3React } from '../../hooks';
import useAuth from '../../hooks/useAuth';
import useLink from '../../hooks/useLink';
import { shortenHex } from '../../utils/helper';
import ConnectModal from '../WalletConnect/ConnectModal';
import Backdrop from './Backdrop';
import TopNav from './TopNav';

const Navbar = () => {

    const [showMobileNavbar, setShowMobileNavbar] = useState(false);
    const [showConnectOptions, setShowConnectOptions] = useState(false);

    const navigate  = useNavigate();
    const { account } = useActiveWeb3React()
    const { login, logout } = useAuth()
    const { user } = useAuthState()
    const { linkToUser } = useLink()

    const handleSearch = (value: string) => {
        navigate(`/search?q=${value}`)
    }

    const [query, setQuery] = useState('');

    const location = useLocation();

    useEffect(() => {
        if (location.pathname !== '/search') {
            setQuery('');
        }
    }, [location]);


    useEffect(() => {
        if (location.pathname === '/search' || (location.pathname !== '/search' && query !== '')) {
            //handleSearch(query);
        }
    }, [query])

    const handleKeypress = (e) => {
        if (e.charCode === 13) {
            if (location.pathname === '/search' || (location.pathname !== '/search' && query !== '')) {
                handleSearch(query);
            }
        }
    }; 

    return (
        <>
            {/* {!showMobileNavbar && <TopNav />} */}
            <nav className="relative flex items-center justify-between p-4 lg:px-12 lg:py-8 bg-dark">
                <Link to="/" className="relative z-10 flex flex-row items-center justify-center">
                    <img src="/logo.png" width="56px" height="48px" alt="AFC logo" />
                    <p className="logoText wit">VOXEL X</p>
                </Link>
                <div className="flex items-center lg:flex-1 lg:justify-between bg-dark">
                    <div className={"flex-col lg:flex-row font-bold lg:flex-1 lg:items-center absolute lg:relative inset-0 pt-24 lg:pt-0 px-10 h-screen lg:h-auto pb-10 lg:pb-0 " +
                        (showMobileNavbar ? 'flex' : 'hidden lg:flex')}>
                        <div className="relative flex items-center order-1 border-2 bg-br-gray lg:flex-1 lg:mx-36 lg:order-2 rounded-3xl border-br-primary">
                            <input onChange={(e) => { setQuery(e.target.value) }} onKeyPress={(e) => handleKeypress(e)} value={query} type="text"
                                placeholder="Search all NFT's" className="bg-br-gray pl-10 w-full rounded-3xl py-2 outline-none focus:ring-.5 ring-white" />
                            <img className="absolute left-3" src="/search.svg" alt="search icon" width="17px" height="17px" />

                        </div>
                        <div className="flex justify-center order-2 mt-12 text-2xl lg:text-base lg:order-1 lg:mt-0 bg-w">
                            <Link to="/" onClick={() => { setShowMobileNavbar(false) }} className="mx-4 hover:text-br-primary">Explore</Link>
                            <Link to="/artists" onClick={() => { setShowMobileNavbar(false) }} className="mx-4 hover:text-br-primary">Artists</Link>
                        </div>
                        {!account ? <button onClick={() => {setShowMobileNavbar(false);  setShowConnectOptions(true) }} className="order-3 w-full py-3 mt-auto font-bold bg-br-primary lg:hidden rounded-3xl">Connect</button>
                        : <button onClick={() => {setShowMobileNavbar(false);  linkToUser(user) }} className="order-3 w-full py-3 mt-auto font-bold bg-br-primary lg:hidden rounded-3xl">{shortenHex(account)}</button> }
                        
                    </div>

                    <Link to="/create" className="relative z-10 px-4 py-2 mr-4 font-bold bg-br-primary rounded-3xl">Create</Link>
                    {!account ? <button onClick={() => { setShowConnectOptions(true) }} className="relative z-10 px-4 py-2 font-bold bg-br-primary rounded-3xl">Connect</button>
                        : <button onClick={() => { linkToUser(user) }} className="relative z-10 px-4 py-2 font-bold bg-br-primary rounded-3xl">{shortenHex(account)}</button> }

                    <button onClick={() => { setShowMobileNavbar(!showMobileNavbar) }} className="lg:hidden relative  flex items-center border rounded-full ml-4 p-1.5 border-gray-300">
                        <img src={showMobileNavbar ? "/close.svg" : "/hamburger.svg"} alt="menu" width="24px" height="24px" />
                    </button>
                </div>
                {showConnectOptions && <Backdrop>
                    <ConnectModal login={login} onDismiss={() => setShowConnectOptions(false)} />
                </Backdrop>}
            </nav >
        </>
    )
}

export default Navbar
