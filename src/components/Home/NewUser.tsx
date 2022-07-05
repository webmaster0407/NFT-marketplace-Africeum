import { DefaultAvatar } from '../../config/constants'
import useLink from '../../hooks/useLink'
import { UserModel } from '../../types/types'

const NewUser = ({ user }: NewUserPropsModel) => {
    const { linkToUser } = useLink()
    return (
        <div onClick={() => linkToUser(user)} className="flex flex-none mr-12 items-center lg:mb-4 cursor-pointer">
            <div className="w-12 h-12 rounded-full" style={{ background: `center / cover no-repeat url('${user.image || DefaultAvatar}')` }}></div>
            <div className="flex flex-col text-left pl-4">
                <p className="text-lg font-bold">{user.fullname}</p>
                <p className="text-base text-gray-500">@{user.username}</p>
            </div>
        </div>
    )
}

interface NewUserPropsModel {
    user: UserModel;
}

export default NewUser
