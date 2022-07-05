import { useRef } from 'react';

const FileUploader = ({ onUpload }: FileUploaderProps) => {


    const ref: any = useRef(null);

    const uploadFile = () => {
        if (ref !== null) {
            ref.current.click();
        }
    }


    return (
        <>
            <button type="button" className="px-6 py-3 mt-5 font-bold text-white bg-br-primary rounded-3xl"
                onClick={() => uploadFile()} >Choose file</button>
            <input onChange={(e) => { onUpload(e) }} ref={ref} className="hidden" type="file" name="image upload" id="imageUpload" />
        </>

    )
}

interface FileUploaderProps {
    onUpload: Function;
}

export default FileUploader
