import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'
import NewUser from './NewUser'

const NewUsers = () => {
    const [users, setUsers] = useState([])

    useEffect(() => {
        fetchNewUsers()
    }, [])

    const fetchNewUsers = async() => {
        const res = await axios.get('/new-users');
        setUsers(res.data?.users)
    }

    return (
        <div className="pl-4 lg:pl-0">
            <h2 className="text-2xl font-bold text-left">New users</h2>
            <div className="h-16 mt-8 overflow-y-hidden lg:h-auto">
                <div className="flex pb-10 overflow-auto flex-nowrap lg:flex-wrap">
                    <div className="flex flex-nowrap lg:flex-wrap">
                        {users.map((user, index) => <NewUser key={index} user={user} />)}
                    </div>
                </div>
            </div>
            <div className="w-full h-px px-4 mt-10 bg-gray-200 lg:hidden"></div>
        </div>
    )
}

export default NewUsers
