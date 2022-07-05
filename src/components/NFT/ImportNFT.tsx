const ImportNFT = ({ onCancel, onConfirm }: any) => {
    return (
        <div className="flex flex-col w-full max-w-xl p-10 mx-4 lg:w-auto lg:mx-0 rounded-2xl shadow-btnShadow ">
            <div className="mt-10 text-left lg:mt-0">
                <h1 className="text-4xl font-bold">Import NFT</h1>
                <p className="mt-8 mb-2 font-bold text-br-dark-blue">Enter your contract address</p>
                <p>What is the address of your ERC721 or ERC1155 contract on the mainnet network?</p>

                <div className="flex justify-between mt-5">
                    <div className="flex items-start lex-col">
                        <div className="px-8 py-3 bg-br-gray rounded-3xl">
                            <select className={"pr-6  customSelect"}>
                                <option value="bnb">BNB</option>
                                <option value="bitcoin">BITCOIN</option>
                            </select>
                        </div>
                    </div>
                    <input className="flex-1 px-4 bg-br-gray rounded-3xl lg:ml-2" type="text" id="fixedPrice" name="fixedPrice" defaultValue={''} placeholder="Contract address..." />
                </div>

                <div className="flex justify-end mt-8 lg:ml-12">
                    <button onClick={() => onCancel()} className="px-5 py-2 mr-4 font-bold border border-gray-200 rounded-3xl">Cancel</button>
                    <button onClick={() => onConfirm()} className="px-5 py-2 font-bold bg-br-primary rounded-3xl ">Import</button>
                </div>
            </div>
        </div>
    )
}

export default ImportNFT
