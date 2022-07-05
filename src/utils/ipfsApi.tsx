//using the infura.io node, otherwise ipfs requires you to run a daemon on your own computer/server. See IPFS.io docs
import { create } from 'ipfs-http-client'

const ipfs = create({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' })


export default ipfs; 
