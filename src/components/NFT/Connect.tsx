const Connect = ({ onCancel }: any) => {
    return (
        <div className="relative max-w-lg p-10 mx-4 bg-black border-2 rounded-2xl shadow-btnShadow border-br-primary">
            <button onClick={() => onCancel()} className="absolute top-5 right-5">
                <img src="/close.svg" alt="close" width="24px" height="24px" />
            </button>
            <h1 className="text-2xl font-bold">Connect your wallet</h1>
            <h2 className="mt-3 text-lg font-medium">Connect with one of our available wallet providers below.</h2>

            <ul className="mt-8 text-sm lg:text-lg">
                <li >
                    <button className="flex items-center w-full px-8 py-4 border border-gray-200 shadow-btnShadow rounded-2xl">
                        <span className="mr-4"><img src="/metamask.png" alt="metamask" width="40px" height="40px" /></span>
                        <span className="text-lg font-extrabold text-left lg:text-xl">METAMASK</span>
                    </button>
                </li>
                <li className="mt-4 lg:mt-6">
                    <button className="flex items-center w-full px-8 py-4 border shadow-btnShadow rounded-2xl border-gray2400">
                        <span className="mr-4"><img src="/twt.svg" alt="trust wallet" width="40px" height="40px" /></span>
                        <span className="text-lg font-extrabold text-left lg:text-xl">TRUST WALLET</span>
                    </button>
                </li>
            </ul>
            <p className="mt-8 text-gray-500">We do not own your private keys and cannot access your funds without your confirmation</p>
        </div>
    )
}

export default Connect
