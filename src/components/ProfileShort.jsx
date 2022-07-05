import React from 'react'
import { DefaultAvatar } from '../config/constants'
import useLink from '../hooks/useLink'

function ProfileShort({postDetails,index}) {
    const { linkToUser} = useLink()
    return (
        <div className='short-profile'>
            <div onClick={() => linkToUser(postDetails)} className='flex items-center'>
                <div className="count mr-[10px]"><p className='text-lg text-black opacity-30'>{index}</p></div>
                <div className="profile w-[66px] h-[66px] mr-[10px] flex"><img className='w-full h-full rounded-full' src={ postDetails.image ||DefaultAvatar} alt="profile" /></div>
                <div className="info-wrapper">
                    <h4 className='flex items-center text-sm cursor-pointer text-primaryBlack opacity-80'>{postDetails.fullname} 
                     {
                         postDetails?.verified &&(
                            <span className='ml-1'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#0d6efd" className="verified" viewBox="0 0 16 16"><path d="M10.067.87a2.89 2.89 0 0 0-4.134 0l-.622.638-.89-.011a2.89 2.89 0 0 0-2.924 2.924l.01.89-.636.622a2.89 2.89 0 0 0 0 4.134l.637.622-.011.89a2.89 2.89 0 0 0 2.924 2.924l.89-.01.622.636a2.89 2.89 0 0 0 4.134 0l.622-.637.89.011a2.89 2.89 0 0 0 2.924-2.924l-.01-.89.636-.622a2.89 2.89 0 0 0 0-4.134l-.637-.622.011-.89a2.89 2.89 0 0 0-2.924-2.924l-.89.01-.622-.636zm.287 5.984l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708.708z"></path></svg></span>
                         )
                     }
                    </h4>
                    <h5 className='text-sm text-primaryBlack opacity-60'>@{postDetails.username}</h5>
                </div>
            </div>
        </div>
    )
}

export default ProfileShort
