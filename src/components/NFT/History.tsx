import axios from 'axios'
import { useEffect, useState } from 'react'
import HistoryItem from './HistoryItem'

const History = ({nft}) => {
    const [historyData, setHistoryData] = useState([])

    useEffect(() => {
        if(nft) {
            fetchHistory()
        }
    }, [nft])

    const fetchHistory = async() => {
        const res = await axios.get(`/item/history/${nft.id}`);

        setHistoryData(res.data?.events?.reverse())
    }

    return (
        <div className="mt-16">
            <h2 className="text-left font-bold text-2xl">History</h2>
            {
                historyData.map(item => { return <HistoryItem key={item.id} history={item} nft={nft}/> })
            }
        </div>
    )
}

export default History
