import React from "react"
import { connectorLocalStorageKey } from '../../hooks';
import { connectors } from '../../utils/web3React';


export default function ConnectModal({ login, onDismiss }) {
    return (
        <div className="dark:bg-gray-700 dark:text-white relative max-w-lg p-10 mx-4 bg-white border-2 rounded-2xl shadow-btnShadow border-br-primary">
            <button onClick={() => onDismiss()} className="absolute top-5 right-5">
                <img src="/close.svg" alt="close" width="24px" height="24px" />
            </button>
            <h1 className="text-2xl font-bold">Connect your wallet</h1>
            <h2 className="mt-3 text-lg font-medium">Connect with one of our available wallet providers below.</h2>

            <ul className="mt-8 text-sm lg:text-lg">
                {connectors.map((entry, index) => (
                    <li key={index} className="py-2">
                        <button className="flex items-center w-full px-8 py-4 border border-gray-200 shadow-btnShadow rounded-2xl"
                            onClick={() => {
                                login(entry.connectorId);
                                window.localStorage.setItem(connectorLocalStorageKey, entry.connectorId);
                                onDismiss()
                            }}>
                            <span className="mr-4"><entry.icon width="30"/></span>
                            <span className="text-lg font-extrabold text-left lg:text-xl">{entry.title}</span>
                        </button>
                    </li>
                ))}
            </ul>
            <p className="mt-8 text-gray-500">We do not own your private keys and cannot access your funds without your confirmation</p>
        </div>
    )
}
