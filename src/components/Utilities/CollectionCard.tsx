import { BsDiscord, BsGlobe2, BsInstagram, BsTwitter } from 'react-icons/bs';
import dateFormat from 'dateformat';
import { DefaultArt } from '../../config/constants';
import { useCoverBg } from '../../hooks/useCoverBg';
import { Badge } from 'antd';

const CollectionCard = ({ collection, key }: any) => {
    const { id, logoURL, bannerURL, title, twitter, website, discord, instagram, createdAt, category } = collection;
    const coverBg = useCoverBg(bannerURL || DefaultArt);

    const temp = (<>
        <div className="flex rounded-t-3xl h-36" style={coverBg}></div>
        <Badge.Ribbon text={category} color={"rgba(32,129,226)"}></Badge.Ribbon>
        <div className='flex h-20 justify-center'>
            <img src={logoURL} className="rounded-[500px] w-20 h-20 bg-white -mt-12 mb-12 justify-center items-center border border-solid border-black "></img>
        </div>
        <div className='flex flex-col justify-center items-center text-2xl -mt-10 mb-4 dark:text-white '>
            <div className='flex w-full justify-center text-black dark:text-white'>{title}</div>
            <div className='flex flex-row justify-end w-full items-center mt-4 h-[25px] px-4'>
                <div className='flex justify-start w-full pl-2 text-lg dark:text-gray-400'>{dateFormat(createdAt, "mmm d, yyyy")}</div>
                <div className='flex'>
                    <a href={website} target={"_blank"} className="text-[rgba(32,129,226)] hover:!text-[rgba(32,129,226)] dark:text-white hover:text-3xl w-[40px]">
                        <BsGlobe2 />
                    </a>
                </div>
                <div className='flex'>
                    <a href={twitter} target={"_blank"} className="text-[rgba(32,129,226)] hover:!text-[rgba(32,129,226)] dark:text-white hover:text-3xl w-[40px]">
                        <BsTwitter />
                    </a>
                </div>
                <div className='flex'>
                    <a href={discord} target={"_blank"} className="text-[rgba(32,129,226)] hover:!text-[rgba(32,129,226)] dark:text-white hover:text-3xl w-[40px]">
                        <BsDiscord />
                    </a>
                </div>
                <div className='flex'>
                    <a href={instagram} target={"_blank"} className="text-[rgba(32,129,226)] hover:!text-[rgba(32,129,226)] dark:text-white hover:text-3xl w-[40px]">
                        <BsInstagram />
                    </a>
                </div>
            </div>
        </div>
    </>)
    return (<a key={id}
        href={collection.creator ? `/exploreCollection?collectionid=${id}`:`/explore?collectionid=${id}`}
        className="dark:bg-gray-600 w-full mr-8 cursor-pointer roadmapb active rounded-3xl hover:opacity-80">
        <div className='dark:bg-gray-600 bg-white w-full h-full rounded-3xl border border-gray-800 dark:border-gray-300'>
            {temp}
        </div>
    </a>)

}

export default CollectionCard
