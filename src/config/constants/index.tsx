export const zeroAddress = '0x0000000000000000000000000000000000000000'

export const DefaultChainID = parseInt(process.env.REACT_APP_NETWORK_ID || '0', 10)


export const ChainList = {
  56: 'BSC mainnet',
  97: 'BSC Testnet',
};

export const BSC_API = "ANFMS25BNGG9JQZGVJ165Q9N8IMNJFHA5Y"

export const GRAPHQL_URL = process.env.REACT_APP_SUBGRAPH_URL
export const BASE_URL = process.env.REACT_APP_BASE_URL

export const DefaultAvatar =
  '/default.webp';
export const DefaultBanner = '/DefaultBanner.svg'
export const DefaultArt =
  '/defaultArt.jpg';
export const DefaultLogo = "/DefaultLogo.png"
export const Currencies = {
  56: [
    // {
    //   id: 'binancecoin',
    //   name: 'BNB',
    //   address: zeroAddress,
    //   symbol: 'BNB',
    //   chainId: 56,
    //   decimals: 18,
    //   icon: '',
    // },
    // {
    //   id: 'binance-usd',
    //   name: 'BUSD',
    //   address: '0xe9e7cea3dedca5984780bafc599bd69add087d56',
    //   symbol: 'BUSD',
    //   chainId: 56,
    //   decimals: 18,
    //   icon: '',
    // },
    {
      id: 'requireAFC',
      name: 'AFC',
      address: '0xb9bFE9241aCFFBe7f5B06C4e668c4a43b8431D3a',
      symbol: 'AFC',
      chainId: 56,
      decimals: 18,
      icon: '',
    },
  ],
  1: [
    {
      id: 'eth',
      name: 'ETH',
      address: zeroAddress,
      symbol: 'ETH',
      chainId: 4,
      decimals: 18,
      icon: '',
    },
    {
      id: 'AFC',
      name: 'Africeum',
      address: '0xc4dc80eafb85c1503af64c5bffaf911121acfa57',
      symbol: 'AFC',
      chainId: 4,
      decimals: 18,
      icon: '',
    },
  ],
  4: [
    // {
    //   id: 'eth',
    //   name: 'ETH',
    //   address: zeroAddress,
    //   symbol: 'ETH',
    //   chainId: 4,
    //   decimals: 18,
    //   icon: '',
    // },
    {
      id: 'AFC',
      name: 'AFC',
      address: '0xcea04740912BfD949f582CA890080C3d92417Abd',
      symbol: 'AFC',
      chainId: 4,
      decimals: 18,
      icon: '',
    },
  ],
}