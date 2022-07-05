import { Transition, Listbox } from '@headlessui/react';
import React, {useState, Fragment} from 'react';
import { AllItems, ShortBy } from '../components/api/dummy';
import AngleDownIcon from "./SVGIcon/AngleDownIcon";
import AppViewIcon from './SVGIcon/AppViewIcon';
import GridViewIcon from './SVGIcon/GridViewIcon';

const TopFilter = ({handleActiveView, activeView,handleShortBy}) => {
    const sortChange =(value)=> {
        setSelectedShortBy(value)
        if(handleShortBy){
            handleShortBy(value.id)
        }
    }

    const [selectedAllItem, setSelectedAllItem] = useState(AllItems[0]);
    const [selectedShortBy, setSelectedShortBy] = useState(ShortBy[0]);
    return (
        <div className="flex flex-wrap items-center justify-end w-full filter sm:w-auto">
            {/* <div className="all-item relative z-30 sm:mr-2 mb-2 sm:mb-0 w-full sm:w-[180px] 2xl:w-[227px]">
                <Listbox value={selectedAllItem} onChange={setSelectedAllItem}>
                    <Listbox.Button className='relative h-[45px] 2xl:h-[50px] w-full text-sm xl:text-base text-left pl-2 bg-white rounded-lg border border-solid border-Grey/40'>
                        {selectedAllItem.name}
                        <span className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                            <AngleDownIcon classes={'w-4 h-4'} />
                        </span>
                    </Listbox.Button>
                    <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                    >
                        <Listbox.Options className='absolute w-full mt-1 overflow-hidden text-base bg-white rounded-md shadow-2xl max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
                            {AllItems.map((item) => (
                                <Listbox.Option
                                    key={item.id}
                                    value={item}
                                    className='h-[50px] text-base font-semibold text-Dark flex items-center pl-2 border-b border-solid border-Grey/40 cursor-pointer transition ease-in hover:shadow-lg'
                                >
                                    {item.name}
                                </Listbox.Option>
                            ))}
                        </Listbox.Options>
                    </Transition>
                </Listbox>
            </div> */}
            <div className="shortby relative z-20 mr-2 w-[calc(100%-100px)] sm:w-[180px] 2xl:w-[227px]">
                <Listbox value={selectedShortBy} onChange={sortChange}>
                    <Listbox.Button className='relative h-[45px] 2xl:h-[50px] w-full text-sm xl:text-base text-left pl-2 bg-white rounded-lg border border-solid border-Grey/40'>
                        {selectedShortBy.name}
                        <span className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                            <AngleDownIcon classes={'w-4 h-4'} />
                        </span>
                    </Listbox.Button>
                    <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                    >
                        <Listbox.Options className='absolute w-full mt-1 overflow-hidden text-base bg-white rounded-md shadow-2xl max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
                            {ShortBy.map((item) => (
                            <Listbox.Option
                                key={item.id}
                                value={item}
                                className='h-[50px] text-base font-semibold text-Dark flex items-center pl-2 border-b border-solid border-Grey/40 cursor-pointer transition ease-in hover:shadow-lg'
                            >
                                {item.name}
                            </Listbox.Option>
                            ))}
                        </Listbox.Options>
                    </Transition>
                </Listbox>
            </div>
            <div className={`view relative z-20 flex w-[90px]`}>
                <button onClick={() => {handleActiveView('grid')}} disabled={activeView==='grid' ? true : false} className={`grid-view w-[45px] 2xl:w-[50px] h-[45px] 2xl:h-[50px] cursor-pointer flex items-center justify-center border border-solid border-Grey/40 rounded-l-lg ${activeView==='grid' ? 'bg-[rgb(243,251,254)] cursor-auto' : ''}`}><GridViewIcon /></button>
                <button onClick={() => {handleActiveView('list')}} disabled={activeView==='list' ? true : false} className={`app-view w-[45px] 2xl:w-[50px] h-[45px] 2xl:h-[50px] cursor-pointer flex items-center justify-center border border-l-0 border-solid border-Grey/40 rounded-r-lg ${activeView==='list' ? 'bg-[rgb(243,251,254)] cursor-auto' : ''}`}><AppViewIcon /></button>
            </div>
        </div>
    );
}

export default TopFilter;
