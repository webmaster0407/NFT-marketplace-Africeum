import { DefaultAvatar } from '../../config/constants';
import { useCoverBg } from '../../hooks/useCoverBg'
import useFollowButton from '../../hooks/useFollowButton';
import useLink from '../../hooks/useLink';

const ArtistCard = ({ artist }: ArtistCardPropModle) => {
    const bg1 = useCoverBg(artist.recent?.[0]?.image || '/defaultArt.png');
    const bg2 = useCoverBg(artist.recent?.[1]?.image || '/defaultArt.png');
    const userBg = useCoverBg(artist.image || DefaultAvatar);

    const { didFollow, follow } = useFollowButton(artist)
    const { linkToItem, linkToUser } = useLink()

    return (
        <div className="flex flex-col items-start justify-center max-w-sm p-5 bg-dark shadow-nftShadow rounded-3xl">
            <div className="flex items-center justify-between w-full">
                <div className="flex items-center py-3">
                    <div className="w-12 h-12 mr-4 rounded-full" style={userBg}></div>
                    <div className="text-left cursor-pointer" onClick={() => linkToUser(artist)}>
                        <p className="text-lg font-bold">{artist.fullname}</p>
                        <p className="text-gray-50">@{artist.username}</p>
                    </div>
                </div>
                <button onClick={() => follow()} className="px-5 py-2 font-bold border border-gray-200 rounded-3xl">
                    {didFollow ? 'Following' : 'Follow'}
                </button>
            </div>
            <div className="flex justify-between w-full mt-2">
                <div className="w-40 h-32 mr-4 rounded-2xl" style={bg1} onClick={() => linkToItem(artist.recent?.[0])}></div>
                <div className="w-40 h-32 rounded-2xl" style={bg2} onClick={() => linkToItem(artist.recent?.[1])}></div>
            </div>
        </div>
    )
}

interface ArtistCardPropModle {
    artist: any
}

export default ArtistCard
