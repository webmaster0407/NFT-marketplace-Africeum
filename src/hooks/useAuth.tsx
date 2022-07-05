import { useCallback } from 'react'
import { useWeb3React, UnsupportedChainIdError } from '@web3-react/core'
import {
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected,
} from '@web3-react/injected-connector'
import {
  UserRejectedRequestError as UserRejectedRequestErrorWalletConnect,
  WalletConnectConnector,
} from '@web3-react/walletconnect-connector'
import { connectorsByName, ConnectorNames } from '../utils/web3React'
import { connectorLocalStorageKey } from '.'
import { toast } from "react-toastify";

const useAuth = () => {
  const { activate, deactivate } = useWeb3React()

  const insertChain = async(callback) =>{
    const networks = {
      BNB: {
        chainId: `0x${Number(56).toString(16)}`,
        chainName: "BNB Smart Chain Mainnet",
        nativeCurrency: {
          name: "bnb",
          symbol: "bnb",
          decimals: 18,
        },  
        rpcUrls: ["https://bsc-dataseed1.ninicoin.io"],
        blockExplorerUrls: ["https://bscscan.com/"],
      },
    };
    
    // const networks = {
    //   multivac: {
    //     chainId: `0x${Number(62621).toString(16)}`,
    //     chainName: "MultiVAC Mainnet",
    //     nativeCurrency: {
    //       name: "MTV",
    //       symbol: "MTV",
    //       decimals: 18,
    //     },
    //     rpcUrls: ["https://rpc.mtv.ac"],
    //     blockExplorerUrls: ["https://e.mtv.ac"],
    //   },
    // };
    await window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: [
        {
          ...networks["BNB"],
        },
      ],
    });
  }

  const login = useCallback((connectorID: any) => {
    window.localStorage.setItem(connectorLocalStorageKey, connectorID);
    const connector = connectorsByName[connectorID]
    if (connector) {
      activate(connector, async (error: Error) => {
        if (error instanceof UnsupportedChainIdError) {
          //toast.error('Unsupported Chain Id Error. Check your chain Id!')
          insertChain(login);
        } else if (error instanceof NoEthereumProviderError ) {
          window.localStorage.removeItem(connectorLocalStorageKey)
          // toast.error('No provider was found!')
          window.open("https://metamask.io/download/", "_blank").focus();
        } else if (
          error instanceof UserRejectedRequestErrorInjected ||
          error instanceof UserRejectedRequestErrorWalletConnect
        ) {
          window.localStorage.removeItem(connectorLocalStorageKey)
          if (connector instanceof WalletConnectConnector) {
            const walletConnector = connector as WalletConnectConnector
            walletConnector.walletConnectProvider = null
          }
          // toast.error('Authorization Error, Please authorize to access your account')
          console.log('Authorization Error, Please authorize to access your account')
        } else {
          // toast.error(error.message)
          console.log(error.name, error.message)
        }
      })
    } else {
      // toast.error("Can't find connector, The connector config is wrong")
      console.log("Can't find connector", 'The connector config is wrong')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { login, logout: deactivate }
}

export default useAuth
