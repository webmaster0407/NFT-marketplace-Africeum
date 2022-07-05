import Backdrop from './Backdrop';
import ClockLoader from "react-spinners/ClockLoader";

const Waiting = () => {

    return (
        <Backdrop>
            <div className="flex flex-col items-center w-full max-w-xl p-10 mx-4 bg-white border-2 border-br-primary lg:w-auto lg:mx-0 rounded-2xl shadow-btnShadow lg:flex-row lg:items-stretch">
                <div className="mt-4">
                    <h1 className="text-2xl font-bold text-left">Waiting Confirmation...</h1>
                    <h1 className="text-xl font-bold text-left">This may take a while, Please be wait</h1>
                    <div className="flex items-center justify-center mt-5 loader">
                        <ClockLoader color={'rgb(70, 207, 253)'} loading={true} size={80} />
                    </div>
                    <p className="mt-4 mb-8 text-left"></p>
                </div>
            </div>
        </Backdrop>
    )
}


export default Waiting
