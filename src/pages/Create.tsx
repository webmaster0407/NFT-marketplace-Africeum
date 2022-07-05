import { useEffect, useState } from 'react';
import { useActiveWeb3React } from '../hooks';
import useAuth from '../hooks/useAuth';
import { BsFillCloudArrowDownFill, BsFillCloudPlusFill } from 'react-icons/bs';
import { notification } from 'antd';


const Create = () => {

    const {account, library} = useActiveWeb3React()
    const {login} = useAuth()
    const [user, setUser] = useState(null)

    // useEffect(()=>{
    //     if(!account)
    //     notification.warn({
    //       message : "Warning",
    //       description : "Please login for more explore..."
    //     })
    //   },[account])

    return (
       <>
       {
           account ?<>
            
            <div className='flex flex-col md:flex-col w-full justify-center items-center'>
                    <div className=' text-left flex  w-[94vw] max-w-[600px] 2xl:max-w-[800px] flex-col  mt-[100px] justify-center items-left'>
                            <h1 className='text-5xl font-bold dark:text-white'>Creating ... </h1>
                        <p className="text-2xl mt-10 dark:text-white">
                            Choose the most suitable option for your needs. You need to sign
                            in for creation
                        </p>
                    </div>
                    <div className='flex md:flex-row flex-col '>
                    <div className='flex w-[94vw] my-[100px] max-w-[200px] 2xl:max-w-[300px] mx-20 text-blue-400 dark:text-gray-200'>
                        <a href="/import-collection" className=' hover:!text-blue-600'>
                        <BsFillCloudArrowDownFill className='w-full text-9xl'/>
                        <p className='text-gray-800 dark:text-white text-2xl 2xl:text-3xl'>Import Collection</p>
                        </a>
                    </div>
                    <div className='flex w-[94vw] my-[100px] max-w-[200px] 2xl:max-w-[300px] mx-20 text-blue-400 dark:text-gray-200'>
                    <a href='/create-item' className=' hover:!text-blue-600'>
                        <BsFillCloudPlusFill className='w-full text-9xl'/>
                        <p className='text-gray-800 dark:text-white text-2xl 2xl:text-3xl'>Cteate New Item</p>
                        </a>
                    </div>
                    </div>
               </div>
               </>
               :null
       }
       </>
    )
}


export default Create
