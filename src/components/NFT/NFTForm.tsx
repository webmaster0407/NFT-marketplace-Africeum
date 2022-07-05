import { useCallback } from 'react';
import { useEffect, useState } from 'react'
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { zeroAddress } from '../../config/constants';
import { useAuthState } from '../../contexts/AuthContext';
import useCheckAdmin from '../../hooks/useCheckAdmin';
import useNFTInfo from '../../hooks/useNFTInfo';
import usePaymentMethods from '../../hooks/usePaymentMethods';
import { getCurrencyFromAddressOrId, nFormatter } from '../../utils/helper';
import FileUploader from '../Utilities/FileUploader';
import { isAddress, toEth } from '../../utils';
import { ethers } from 'ethers';

import { classNames } from '../../utils/styles';
import { getAFCTokenAddress } from '../../utils/addressHelpers';

const NFTForm = ({ onSubmit, onChangeData,isProcessing }: NFTFormPropsModel) => {
    const { user } = useAuthState();
    const paymentMethods = usePaymentMethods();
    const isAdmin = useCheckAdmin()
    const nftInfo = useNFTInfo()
    const [paymentToken, setPaymentToken] = useState();
    
    const [imageBuffer, setImageBuffer] = useState<any>(null);
    
    const now = new Date()
    const [startTime, setStartTime] = useState(now);
    const [endTime, setEndTime] = useState(now);

    const [requireAFCMap, setrequireAFCMap] = useState([])

    const AFCAddress = getAFCTokenAddress();


    const onFileUpload = useCallback((e: any) => {
        const file = e.target.files[0]
        handleChange('image', URL.createObjectURL(file));
        handleChange('imageObject', file.name)
        handleChange('type', file.type)
        console.log('onFileUpload:',file.type,file)
        var reader = new FileReader();
        reader.onload = function () {
            setImageBuffer(reader.result)
        };
        reader.readAsArrayBuffer(file);
    }, [])

    const handlePaymentToken = (address) => {
        handleChange('currency', address);
        const currencyObj = getCurrencyFromAddressOrId(address)
        setPaymentToken(currencyObj.symbol)
    }

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

    useEffect(() => {
        if(!paymentToken && paymentMethods?.length) {
            setPaymentToken(paymentMethods[0].symbol)
        }
    }, [paymentMethods])

    useEffect(() => {
        handleChange('imageBuffer', imageBuffer)
    }, [imageBuffer]);

    useEffect(() => {
        handleChange('startTime', Math.floor(startTime.getTime() / 1000))
        handleChange('endTime', Math.floor(endTime.getTime() / 1000))
    }, [startTime, endTime])

    const initalValue = {
        name: '',
        description: '',
        price: '0.0',
        currency: AFCAddress,
        count: 1,
        auctionable: false,
        startTime: Math.floor(now.getTime() / 1000),
        endTime: Math.floor(now.getTime() / 1000),
        mintable: true,
        requireAFC: '0',
        image: null,
        imageBuffer: null,
        type: '',
        imageObject: null
    }

    const [formValue, setformValue] = useState(initalValue);

    const handleChange = (key: any, value: any) => {
        const tempFormValue: any = { ...formValue, [key]: value };
        setformValue((prev) => ({...prev, [key]: value}));
        onChangeData(tempFormValue)
    }


    return (
        <div className="mb-32 text-br-dark-blue">
            <form className="flex flex-col w-full mt-8" onSubmit={(e) => { console.log(e) }}>
                <label htmlFor="imageUpload" className="font-bold text-left  dark:text-white ">Upload file <span className="text-br-primary  dark:text-white ">*</span></label>
                <div className="relative p-10 mt-2 border-2 border-gray-800 border-dashed rounded-3xl">
                    {formValue?.image !== null && <button onClick={() => { handleChange('image', null) }} className="absolute top-5 right-5 flex items-center border rounded-full  p-1.5 border-gray-900">
                        <img src="/close.svg" alt="close button" width="16px" height="16px" />
                    </button>}
                    {formValue?.image !== null && <div className="h-16 mx-auto w-52 rounded-3xl">{formValue.imageObject}</div>}
                    {formValue?.image === null && <><p className=' dark:text-white '>JPG, PNG, OGG, WEBM, GIF (Max 5MB)</p>
                        <FileUploader onUpload={(e: Event) => { onFileUpload(e) }} />
                    </>}
                </div>


                <div className="flex justify-between mt-8">
                    <label htmlFor="name" className="font-bold text-left  dark:text-white ">Title</label>
                    <span className="text-gray-800  dark:text-white ">50</span>
                </div>
                <input onBlur={(e) => { handleChange('name', e.target.value) }} maxLength={50} className="px-4 py-3 mt-2 border  border-gray-800 rounded-full bg-br-gray" type="text" id="title" name="title" defaultValue={formValue.name} />

                <div className="flex justify-between mt-8">
                    <label htmlFor="description" className="font-bold text-left dark:text-white ">Description</label>
                    <span className="text-gray-800  dark:text-white ">250</span>
                </div>
                <textarea onBlur={(e) => { handleChange('description', e.target.value) }} rows={5} onChange={() => { }} maxLength={250} className=" px-4 py-3 mt-2 border border-gray-800 bg-br-gray rounded-3xl" id="description" name="description" defaultValue={formValue.description} />

                <div className="flex items-center mt-8 mb-4 mr-4 font-bold ">
                    <input onChange={(e) => { handleChange('auctionable', false) }} checked={formValue.auctionable === false} id="fixedPriceChoice" type="radio" name="radio" className="hidden" />
                    <label htmlFor="fixedPriceChoice" className="flex dark:!text-white  items-center cursor-pointer">
                        <span className="inline-block w-4 h-4 mr-1  dark:!text-white  border border-black rounded-full"></span>
                        Fixed price</label>
                </div>

                <div className="flex items-center mr-4 font-bold">
                    <input onChange={(e) => { handleChange('auctionable', true) }} checked={formValue.auctionable} id="timedAutionChoice" type="radio" name="radio" className="hidden" />
                    <label htmlFor="timedAutionChoice" className="flex dark:!text-white  items-center cursor-pointer">
                        <span className="inline-block dark:!text-white  w-4 h-4 mr-1 border border-black rounded-full"></span>
                        Timed auction</label>
                </div>

                {formValue.auctionable && (<div className="grid grid-cols-1 mt-8">
                    <div className="col-span-1">
                        <div className="flex flex-col mr-2 ">
                            <label htmlFor="startTime" className="font-bold text-left dark:text-white ">Start Time <span className="text-br-primary  dark:text-white ">*</span> </label>
                            <div className="relative flex items-center mt-2 border border-gray-800 rounded-full bg-br-gray">
                                <ReactDatePicker
                                    selected={startTime}
                                    onChange={(date) => {
                                        setStartTime(date)
                                        const tempValue = new Date(date.getTime())
                                        tempValue.setDate(tempValue.getDate() + 1)

                                        setEndTime(tempValue)}}
                                    showTimeSelect
                                    dateFormat="Pp"
                                    className={"px-4 py-3 pr-6 w-full customSelect rounded-3xl"}
                                    wrapperClassName={"w-full"}
                                    minDate={ new Date()}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-span-1">
                        <div className="flex flex-col mt-2 mr-2 ">
                            <label htmlFor="endTime" className="font-bold text-left dark:text-white ">End Time <span className="text-br-primary  dark:text-white ">*</span> </label>
                            <div className="relative flex items-center mt-2 border border-gray-800 rounded-full bg-br-gray">
                                <ReactDatePicker
                                    selected={endTime}
                                    onChange={(date) => setEndTime(date)}
                                    showTimeSelect
                                    dateFormat="Pp"
                                    className={"px-4 py-3 pr-6 w-full customSelect rounded-3xl"}
                                    wrapperClassName={"w-full"}
                                    minDate={startTime}
                                />
                            </div>
                        </div>
                    </div>
                </div>)}

                <div className="grid grid-cols-1 mt-8">
                    <div className="col-span-1">
                        <div className="flex flex-col mr-2 ">
                            <label htmlFor="fixedPrice" className="font-bold text-left dark:text-white ">{formValue.auctionable ? 'Start Price' : 'Fixed Price'} <span className="text-br-primary dark:text-white ">*</span> </label>
                            <div className="relative flex items-center mt-2 rounded-3xl">
                                <span className="absolute flex items-center font-bold left-3  ">{paymentToken}</span>
                                <input onBlur={(e) => { handleChange('price', e.target.value) }} className="pl-20 py-2.5 bg-br-gray rounded-3xl border border-gray-800 " type="text" id="fixedPrice" name="price" defaultValue={formValue.price} />
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
                

                {!formValue.auctionable && <div className="flex flex-col flex-1 mt-8">
                    <label htmlFor="count" className="font-bold text-left dark:text-white ">Number of editions <span className="text-br-primary dark:text-white ">*</span> </label>
                    <div className="relative flex items-center justify-between mt-2 bg-br-gray rounded-3xl">
                        <input onBlur={(e) => { handleChange('count', e.target.value) }} max="20" className="flex-1 px-4 py-3 border border-gray-800 bg-br-gray rounded-3xl" type="text" id="count" name="count" defaultValue={formValue.count} />
                        <span className=" absolute font-bold right-5">edition(s)</span>
                    </div>
                </div>}

                
                {/* <div className="flex flex-col flex-1 mt-8">
                    <label htmlFor="requireAFC" className="font-bold text-left">$AFC Amount for bid</label>
                    <span className="text-left">The user needs to be holding at least this amount of $AFC to be able to buy/bid on this listing.</span>
                    <div className="grid grid-cols-2 mt-8">
                        {requireAFCMap.map((item, index) => (
                            <div className="col-span-1" key={index}>
                                <div className="flex flex-col mr-4 font-bold ">
                                    <input onChange={(e) => { handleChange('requireAFC', item.value) }} checked={String(formValue.requireAFC) == String(item.value)} 
                                        type="radio" name="radio1" id={`requireAFC-${item.value}`} className="hidden" />
                                    <label htmlFor={`requireAFC-${item.value}`} className="flex items-center text-left cursor-pointer">
                                        <span className="inline-block w-4 h-4 mr-1 border rounded-full border-dark"></span>
                                        {item.text}</label>
                                </div>
                            </div>
                        ))}
                    </div>
                </div> */}

                {/* <span className="px-4 py-3 mt-10 font-bold text-indigo-800 bg-red-400 rounded-3xl">No plagiarism is allowed, the artwork can be removed at anytime if detected to be infringing copyright. By submitting this form you agree that this is an original artwork. </span> */}

                <div className={classNames("fixed bottom-0 left-0 right-0 z-30 px-4  lg:z-0 lg:px-0 lg:p-0 lg:relative", isProcessing && 'opacity-60') } >
                    <button type="button" onClick={() => onSubmit(formValue)} className = "primaryBtn text-lg mt-10 w-[180px] py-2 dark:bg-none dark:hover:bg-gray-900 dark:bg-gray-800" >Create NFT</button>
                </div>


            </form>
        </div>
    )
}

interface NFTFormPropsModel {
    onSubmit: Function;
    onChangeData: Function;
    isProcessing?:boolean;
}


export default NFTForm
