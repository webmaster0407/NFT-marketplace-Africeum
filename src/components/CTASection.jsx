import React ,{useState}from 'react';
import { Link } from 'react-router-dom';
import { useAuthState } from '../contexts/AuthContext';
import { useActiveWeb3React } from '../hooks';
import useAuth from '../hooks/useAuth';
import ConnectModal from "./WalletConnect/ConnectModal";
import Backdrop from "./Utilities/Backdrop";

function CTASection() {

    const { account } = useActiveWeb3React();
    const { login, logout } = useAuth();
    const { user } = useAuthState();
    const [showConnectOptions, setShowConnectOptions] = useState(false);
    return (
        <>
            <div className='relative py-12 trending-auctions lg:py-16 bg-dark'>
                <div className="max-w-[1490px] m-auto px-4">
                    <div className="w-full max-w-2xl headline-bar">
                        <div className="headline">
                            <h2 className='text-white font-bold text-[25px] md:text-[38px] lg:text-[46px] leading-[1.2] '>Building <span className='gradient-text'>trust</span> in the metaverse. The credible <span className='gradient-text'>canvas</span> for NFT <span className='gradient-text'>creators</span> and <span className='gradient-text'>collectors</span></h2>
                        </div>
                        <div className="flex flex-wrap items-center mt-2 link">
                            {!account &&(
                                <button             onClick={() => {
                                    setShowConnectOptions(true);
                                  }} className='px-6 py-2 mr-5 text-base font-medium text-white cursor-pointer special-btn shadow-black hover:text-slate-400'>Connect Wallet</button>
                            )}
                            {
                                user?.image &&(
                                    <Link to='/create'  className='py-1 mb-1 text-white text-base cursor-pointer font-medium mr-5 flex items-center transition ease-in-out delay-150 pb-[1px] border-b border-solid border-transparent hover:border-white'>Create NFT <svg className='ml-2' width="8" height="10" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.53998 6.28955L1.87998 0.639548C1.78702 0.54582 1.67642 0.471426 1.55456 0.420657C1.4327 0.369888 1.30199 0.34375 1.16998 0.34375C1.03797 0.34375 0.907264 0.369888 0.785405 0.420657C0.663546 0.471426 0.552945 0.54582 0.459982 0.639548C0.273731 0.826911 0.169189 1.08036 0.169189 1.34455C0.169189 1.60873 0.273731 1.86219 0.459982 2.04955L5.40998 7.04955L0.459982 11.9995C0.273731 12.1869 0.169189 12.4404 0.169189 12.7045C0.169189 12.9687 0.273731 13.2222 0.459982 13.4095C0.552597 13.504 0.663042 13.5792 0.784917 13.6307C0.906792 13.6822 1.03767 13.709 1.16998 13.7095C1.30229 13.709 1.43317 13.6822 1.55505 13.6307C1.67692 13.5792 1.78737 13.504 1.87998 13.4095L7.53998 7.75955C7.64149 7.66591 7.7225 7.55225 7.7779 7.42576C7.83331 7.29926 7.86191 7.16265 7.86191 7.02455C7.86191 6.88645 7.83331 6.74984 7.7779 6.62334C7.7225 6.49684 7.64149 6.38319 7.53998 6.28955Z" fill="white"></path></svg></Link>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div className="border-br h-[10px] w-full bg-gradient-to-r from-indigo-800 to-rose-600"></div>

            {showConnectOptions && (
                <Backdrop>
                <ConnectModal
                    login={login}
                    onDismiss={() => setShowConnectOptions(false)}
                />
                </Backdrop>
      )}
      
        </>
    )
}

export default CTASection
