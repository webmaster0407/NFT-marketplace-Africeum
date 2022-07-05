import { DefaultAvatar } from '../../config/constants';
import { useCoverBg } from '../../hooks/useCoverBg'
import useLink from '../../hooks/useLink';
import { HistoryModel } from '../../types/types';
import { toEth } from '../../utils';
import {  nFormatter } from '../../utils/helper';

const HistoryItem = ({ history, nft }: HistoryItemProp) => {
    const { linkToUser } = useLink()
    const userImage = useCoverBg(history.user?.image || DefaultAvatar);
    let historyType = '';
    switch(history.type) {
        case 'ItemCreated': historyType = 'Listed by'; break;
        case 'ItemImported': historyType = 'Imported by'; break;
        case 'ItemSold': historyType = 'Sold to'; break;
        case 'BidAddedToItem': historyType = 'Bid by'; break;
    }
    const historyDate = new Date(history.timestamp * 1000).toDateString()
    const historyTime = new Date(history.timestamp * 1000).toLocaleTimeString()
    let historyPrice = nft.price;
    if(history.type == 'BidAddedToItem') {
        historyPrice = toEth(history.args[2], nft.currencyObj.decimals || 18)
    } else if(history.type == 'ItemSold') {
        historyPrice = toEth(history.args[3], nft.currencyObj.decimals || 18)
    }
    
    return (
        <div className="flex items-center justify-between mt-6">
            <div className="flex items-center">
                <div className="w-10 h-10 mr-2 rounded-3xl" style={userImage}></div>
                <div className="flex flex-col items-start lg:flex-row">
                    <span className="mr-0 cursor-pointer lg:mr-8" onClick={() => {if(history.user) linkToUser(history.user)}}>{historyType} @{history?.user?.username || 'Artist'}</span>
                    <span className="text-gray-500">{historyDate} at {historyTime}</span>
                </div>
            </div>
            <div className="flex flex-col text-right justify-self-end">
                <span className="font-bold">{nFormatter(historyPrice, 4)} {nft.currencyObj.symbol}</span>
                <span className="text-gray-500">${nFormatter(nft.currencyObj.usdPrice * historyPrice, 4)} USD</span>
            </div>
        </div>
    )
}

interface HistoryItemProp {
    history: any;
    nft: any
}

export default HistoryItem
