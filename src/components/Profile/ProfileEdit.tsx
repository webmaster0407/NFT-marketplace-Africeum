import axios from 'axios';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { getUser, loginUser, useAuthDispatch, useAuthState } from '../../contexts/AuthContext';
import { useActiveWeb3React } from '../../hooks';
import { UserModel } from '../../types/types';
import { isSameAddress } from '../../utils/helper';
import ipfs from '../../utils/ipfsApi';
import FileUploader from '../Utilities/FileUploader';
import qs from 'qs'
import { useNavigate } from 'react-router-dom';
import {Buffer} from 'buffer';


const ProfileEdit = ({ user, onCancel }: ProfilePropsModel) => {

    const [image, setImage] = useState<any>(user.image ? user.image : null);
    const [imageBuf, setImageBuf] = useState(null);
    const [fullname, setFullName] = useState(user.fullname);
    const [username, setUsername] = useState(user.username);
    const [description, setDescription] = useState(user.description);

    const [isProcessing, setIsProcessing] = useState(false);
    const {account, library} = useActiveWeb3React();
    const { token } = useAuthState()
    const dispath = useAuthDispatch()
    const navigate = useNavigate()

    const onFileUpload = (e: any) => {
        setImage(URL.createObjectURL(e.target.files[0]));
        var reader = new FileReader();
        reader.onload = function () {
            setImageBuf(reader.result);
        };
        reader.readAsArrayBuffer(e.target.files[0]);
    }

    const handleUpdate = async() => {
        if(!isSameAddress(user?.address, account)) {
            toast.error('Invalid User. you can edit only yours')
            return
        }
        setIsProcessing(true);
        
        if(!token) {
            await loginUser(dispath, account, user.nonce, library)
        }

        let imageUrl = image;
        if (imageBuf) {
            const result = await ipfs.add(Buffer.from(imageBuf));
            imageUrl = `https://ipfs.io/ipfs/${result.path}`;
        }

        await axios.post(`user/update`, qs.stringify({
            address: account,
            username: username,
            fullname: fullname,
            description: description,
            image: imageUrl
        }))

        await getUser(dispath, account)
        setIsProcessing(false);
        toast.success('User Profile has been updated');
        // history.go(0)
        navigate('/')
    }

    return (
        <div className="relative flex flex-col items-start w-full max-w-lg p-12 mx-4 overflow-y-auto bg-dark rounded-3xl lg:mx-0 max-h-90vh">
            <button onClick={() => onCancel()} className="absolute top-5 right-5">
                <img src="/close.svg" alt="close" width="24px" height="24px" />
            </button>
            <h1 className="text-3xl font-bold">Edit Profile</h1>
            <form className="flex flex-col w-full mt-8">
                <label htmlFor="imageUpload" className="font-bold text-left">Profile Picture</label>
                <div className="p-3 mt-2 border-2 border-dashed rounded-3xl border-light-blue-500">
                    <div className="mx-auto rounded-full w-28 h-28" style={{ background: `center / cover no-repeat url(${'image'})` }}></div>
                    {image === null && <p>JPG, PNG (Max 5MB)</p>}
                    <FileUploader onUpload={(e: Event) => { onFileUpload(e) }} />
                </div>


                <div className="flex justify-between mt-6">
                    <label htmlFor="name" className="font-bold text-left">Profile name</label>
                    <span className="text-gray-500">10</span>
                </div>
                <input onChange={(e) => {setFullName(e.target.value)}} maxLength={10} className="px-4 py-3 mt-2 bg-dark-10 rounded-3xl" type="text" id="name" name="name" defaultValue={fullname} />



                <div className="flex justify-between mt-6">
                    <label htmlFor="username" className="font-bold text-left">User name</label>
                    <span className="text-gray-500">20</span>
                </div>
                <input onChange={(e) => {setUsername(e.target.value)}} maxLength={20} className="px-4 py-3 mt-2 bg-dark-10 rounded-3xl" type="text" id="username" name="username" defaultValue={username} />



                <div className="flex justify-between mt-6">
                    <label htmlFor="description" className="font-bold text-left">Description</label>
                    <span className="text-gray-500">250</span>
                </div>
                <textarea rows={4} onChange={(e) => {setDescription(e.target.value)}} maxLength={250} className="px-4 py-3 mt-2 bg-dark-10 rounded-3xl" id="description" name="description" defaultValue={description} />
            </form>
            <div className="flex justify-end w-full mt-8">
                <button className="px-5 py-3 mr-3 font-bold border border-gray-200 rounded-3xl" onClick={() => {onCancel()}}>Cancel</button>
                <button className="px-5 py-3 font-bold border bg-br-primary rounded-3xl" onClick={() => {handleUpdate()}}>Save</button>
            </div>
        </div>
    )
}

interface ProfilePropsModel {
    user: UserModel;
    onCancel: Function;
}

export default ProfileEdit
