import { useCallback } from 'react';
import { useEffect, useState } from 'react'
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { zeroAddress } from '../../config/constants';
import { useAuthState } from '../../contexts/AuthContext';
import usePaymentMethods from '../../hooks/usePaymentMethods';
import { getContract, isApprovedForAll, setApprovalForAll } from '../../utils/contracts';
import { getCurrencyFromAddressOrId, isSameAddress, nFormatter } from '../../utils/helper';
import ERC721ABI from '../../config/abi/erc721.json'
import { useActiveWeb3React } from '../../hooks';
import { toast } from 'react-toastify';
import axios from 'axios';
import { isAddress, toEth } from '../../utils';
import { getAFCNFTAddress, getAFCTokenAddress } from '../../utils/addressHelpers';
import useCheckAdmin from '../../hooks/useCheckAdmin';
import useNFTInfo from '../../hooks/useNFTInfo';

const NFTImportForm = ({ onSubmit, onChangeData }: NFTImportFormPropsModel) => {
    const { user } = useAuthState();
    const { account, library } = useActiveWeb3React()
    const isAdmin = useCheckAdmin()
    const nftInfo = useNFTInfo()
    const paymentMethods = usePaymentMethods();
    const [paymentToken, setPaymentToken] = useState();
    
    const [approved, setApproved] = useState(false);
    const [enabled, setEnabled] = useState(false);
    const [collection, setCollection] = useState('');
    const [tokenId, setTokenId] = useState('');
     
    const now = new Date()
    const [startTime, setStartTime] = useState(now);
    const [endTime, setEndTime] = useState(now);

    const [requireAFCMap, setrequireAFCMap] = useState([])

    const handlePaymentToken = (address) => {
        handleChange('currency', address);
        const currencyObj = getCurrencyFromAddressOrId(address)
        setPaymentToken(currencyObj.symbol)
    }

    useEffect(() => {
        if(!paymentToken && paymentMethods?.length) {
            setPaymentToken(paymentMethods[0].symbol)
        }
    }, [paymentMethods])

    useEffect(() => {
        if(collection) handleChange('collection', collection)
        if(tokenId) handleChange('tokenId', tokenId)
    }, [collection, tokenId]);

    useEffect(() => {
        handleChange('startTime', Math.floor(startTime.getTime() / 1000))
        handleChange('endTime', Math.floor(endTime.getTime() / 1000))
    }, [startTime, endTime])

    useEffect(() => {
        if(nftInfo) {
            const minAFCToCreate = toEth(nftInfo.minAFCToCreate, 18)
            setrequireAFCMap([
                {value: minAFCToCreate, text: `Default value (${nFormatter(minAFCToCreate, 0)} AFC)`},
                {value: '1000', text: '1K AFC'},
                {value: '10000', text: '10K AFC'},
                {value: '500000', text: '500K AFC'},
                {value: '1000000', text: '1M AFC'},
                {value: '10000000', text: '10M AFC'}
            ])
            setformValue((prev) => ({...prev, ['requireAFC']: minAFCToCreate}));
        }
    }, [nftInfo])

    const importContract = async() => {
        setEnabled(false)
        if(!collection || !isAddress(collection)) {
            toast.error('Invalid Contract address');
            return;
        }
        if(!tokenId) {
            toast.error('Invalid Token Id');
            return;
        }
        try {
            const contract = getContract(collection, ERC721ABI, library)
            const owner = await contract.ownerOf(tokenId)

            if(isSameAddress(owner, account)) {
                const tokenUri = await contract.tokenURI(tokenId)
                if(!tokenUri) {
                    toast.error('Invalid TokenURI');
                    return
                }
                else {
                    const res = await axios.get(tokenUri);
                    const metadata = res.data;
                    if(!metadata || !metadata.image) {
                        toast.error('Invalid Metadata structure. Can not find Image URL');
                        return
                    }
                    if( !metadata.name) {
                        toast.error('Invalid Metadata structure. Can not find Item Name');
                        return
                    }
                    // if(!metadata.description) {
                    //     toast.error('Invalid Metadata structure. Can not find Description');
                    //     return
                    // }

                    handleChange('collection', collection)
                    handleChange('tokenId', tokenId)
                    handleChange('name', metadata.name)
                    handleChange('description', metadata.description || '')
                    handleChange('image', metadata.image)

                    toast.success('Successfully Imported');
                    setEnabled(true)

                    // check approved
                    const tokenApproved = await isApprovedForAll(formValue.collection, account, getAFCNFTAddress(), library.getSigner())
                    setApproved(tokenApproved)
                }
            } else {
                toast.error('Not owned Item');
                return
            }
        }catch(e) {
            console.log(e)
            toast.error('Failed to get TokenURI');
            setEnabled(false)
            setApproved(false)
        } 
    }

    const approve = async() => {
        await setApprovalForAll(formValue.collection, getAFCNFTAddress(), library.getSigner())
        setApproved(true)
    }

    const AFCAddress = getAFCTokenAddress();

    const initalValue = {
        collection: '',
        tokenId: '',
        name: '',
        description: '',
        price: '0.0',
        currency: AFCAddress,
        count: 1,
        auctionable: false,
        startTime: Math.floor(now.getTime() / 1000),
        endTime: Math.floor(now.getTime() / 1000),
        mintable: true,
        requireAFC: '500000000',
        image: null,
        type: 'image/png',
    }

    const [formValue, setformValue] = useState(initalValue);

    const handleChange = (key: any, value: any) => {
        const tempFormValue: any = { ...formValue, [key]: value };
        setformValue((prev) => ({...prev, [key]: value}));
    }

    useEffect(() => {
        onChangeData(formValue)
    }, [formValue])


    return (
        <div className="mb-32 text-br-dark-blue">
            <form className="flex flex-col w-full mt-8" onSubmit={(e) => { console.log(e) }}>
                <div className="flex justify-between mt-8">
                    <label htmlFor="collection" className="font-bold text-left">Contract</label>
                </div>
                <input onBlur={(e) => { setCollection(e.target.value) }} className="px-4 py-3 mt-2 bg-br-gray rounded-3xl" type="text" id="collection" name="collection" defaultValue={formValue.collection} />

                <div className="flex justify-between mt-8">
                    <label htmlFor="tokenId" className="font-bold text-left">TokenId</label>
                </div>
                <input onBlur={(e) => { setTokenId(e.target.value) }} className="px-4 py-3 mt-2 bg-br-gray rounded-3xl" type="text" id="tokenId" name="tokenId" defaultValue={formValue.tokenId} />

                <div className="flex flex-col flex-1 mt-8">
                    <label htmlFor="type" className="font-bold text-left">File Type</label>
                        <div className="w-full mt-2 bg-br-gray rounded-3xl">
                            <select onChange={(e) => { handleChange('type', e.target.value) }} className={"px-4 py-3 pr-6 w-full customSelect rounded-3xl"}>
                                <option value={'image/*'}>Image</option>
                                <option value={'audio/*'}>Audio</option>
                                <option value={'video/*'}>Video</option>
                            </select>
                        </div>
                </div>
                
                <div className="fixed bottom-0 left-0 right-0 z-30 px-4 lg:z-0 lg:px-0 lg:p-0 lg:relative" style={{marginLeft: 'auto'}}>
                    <button type="button" onClick={() => importContract()} className="w-32 px-5 py-3 my-6 font-bold border bg-br-primary main-btn hover:text-blue-900 text-br-primary shadow-white rounded-3xl lg:my-8">Import</button>
                </div>


                {/* <div className="flex justify-between mt-8">
                    <label htmlFor="name" className="font-bold text-left">Title</label>
                    <span className="text-gray-500">50</span>
                </div>
                <input onBlur={(e) => { handleChange('name', e.target.value) }} maxLength={50} className="px-4 py-3 mt-2 bg-br-gray rounded-3xl" type="text" id="title" name="title" defaultValue={formValue.name} />

                <div className="flex justify-between mt-8">
                    <label htmlFor="description" className="font-bold text-left">Description</label>
                    <span className="text-gray-500">250</span>
                </div>
                <textarea onBlur={(e) => { handleChange('description', e.target.value) }} rows={5} onChange={() => { }} maxLength={250} className="px-4 py-3 mt-2 bg-br-gray rounded-3xl" id="description" name="description" defaultValue={formValue.description} /> */}

                <div className="flex items-center mt-8 mb-4 mr-4 font-bold">
                    <input onChange={(e) => { handleChange('auctionable', false) }} checked={formValue.auctionable === false} id="fixedPriceChoice" type="radio" name="radio" className="hidden" />
                    <label htmlFor="fixedPriceChoice" className="flex items-center cursor-pointer">
                        <span className="inline-block w-4 h-4 mr-1 border rounded-full border-grey"></span>
                        Fixed price</label>
                </div>

                <div className="flex items-center mr-4 font-bold">
                    <input onChange={(e) => { handleChange('auctionable', true) }} checked={formValue.auctionable} id="timedAutionChoice" type="radio" name="radio" className="hidden" />
                    <label htmlFor="timedAutionChoice" className="flex items-center cursor-pointer">
                        <span className="inline-block w-4 h-4 mr-1 border rounded-full border-grey"></span>
                        Timed auction</label>
                </div>

                {formValue.auctionable && (<div className="grid grid-cols-1 mt-8">
                    <div className="col-span-1">
                        <div className="flex flex-col mr-2 ">
                            <label htmlFor="startTime" className="font-bold text-left">Start Time <span className="text-br-primary">*</span> </label>
                            <div className="relative flex items-center mt-2 bg-br-gray rounded-3xl">
                                <ReactDatePicker
                                    selected={startTime}
                                    onChange={(date) => setStartTime(date)}
                                    showTimeSelect
                                    dateFormat="Pp"
                                    className={"px-4 py-3 pr-6 w-full customSelect rounded-3xl"}
                                    wrapperClassName={"w-full"}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-span-1">
                        <div className="flex flex-col mt-2 mr-2 ">
                            <label htmlFor="endTime" className="font-bold text-left">End Time <span className="text-br-primary">*</span> </label>
                            <div className="relative flex items-center mt-2 bg-br-gray rounded-3xl">
                                <ReactDatePicker
                                    selected={endTime}
                                    onChange={(date) => setEndTime(date)}
                                    showTimeSelect
                                    dateFormat="Pp"
                                    className={"px-4 py-3 pr-6 w-full customSelect rounded-3xl"}
                                    wrapperClassName={"w-full"}
                                />
                            </div>
                        </div>
                    </div>
                </div>)}

                <div className="grid grid-cols-1 mt-8">
                    <div className="col-span-1">
                        <div className="flex flex-col mr-2 ">
                            <label htmlFor="fixedPrice" className="font-bold text-left">{formValue.auctionable ? 'Start Price' : 'Fixed Price'} <span className="text-br-primary">*</span> </label>
                            <div className="relative flex items-center mt-2 bg-br-gray rounded-3xl">
                                <span className="absolute flex items-center font-bold left-3">{paymentToken}</span>
                                <input onBlur={(e) => { handleChange('price', e.target.value) }} className="pl-20 py-2.5 bg-br-gray rounded-3xl " type="text" id="fixedPrice" name="price" defaultValue={formValue.price} />
                            </div>
                        </div>
                    </div>
                    {/* <div className="col-span-1">
                        <div className="flex flex-col items-start">
                            <span className="font-bold text-left">Paid in</span>
                            <div className="w-full mt-2 bg-br-gray rounded-3xl">
                                <select onChange={(e) => { handlePaymentToken(e.target.value) }} className={"px-4 py-3 pr-6 w-full customSelect rounded-3xl"}>
                                    { paymentMethods.map((item, index) => (
                                        <option value={item.address} key={index}>{item.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div> */}
                </div>
                
                {/* <div className="flex flex-col flex-1 mt-8">
                    <label htmlFor="requireAFC" className="font-bold text-left">$AFC Amount for bid</label>
                    <div className="grid grid-cols-2 mt-8">
                        {requireAFCMap.map((item, index) => (
                            <div className="col-span-1" key={index}>
                                <div className="flex flex-col mr-4 font-bold ">
                                    <input onChange={(e) => { handleChange('requireAFC', item.value) }} checked={String(formValue.requireAFC) == String(item.value)} 
                                        type="radio" name="radio1" id={`requireAFC-${item.value}`} className="hidden" />
                                    <label htmlFor={`requireAFC-${item.value}`} className="flex items-center cursor-pointer">
                                        <span className="inline-block w-4 h-4 mr-1 border rounded-full border-grey"></span>
                                        {item.text}</label>
                                </div>
                            </div>
                        ))}
                    </div>
                </div> */}


                <div className="fixed bottom-0 left-0 right-0 z-30 px-4 lg:z-0 lg:px-0 lg:p-0 lg:relative">
                    {approved ? <button type="button" onClick={() => onSubmit(formValue)} disabled={!enabled}
                        className="w-full px-5 py-3 my-6 font-bold border cursor-pointer bg-br-primary rounded-3xl lg:my-8 main-btn shadow-white">
                            Import
                    </button> : <button type="button" onClick={() => approve()} 
                        className="w-full px-5 py-3 my-6 font-bold border cursor-pointer bg-br-primary rounded-3xl lg:my-8 main-btn shadow-white hover:text-blue-900 text-br-primary">
                            Approve
                    </button>}
                </div>
            </form>
        </div>
    )
}

interface NFTImportFormPropsModel {
    onSubmit: Function;
    onChangeData: Function;
}


export default NFTImportForm
