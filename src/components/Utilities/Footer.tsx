const Footer = () => {
    return (
        <footer className="flex flex-col justify-end px-10 py-10 mt-auto font-sans font-extrabold text-white bg-br-primary lg:flex-row">
            <div className="flex items-start lg:items-center lg:flex-1">
                <img width="44px" height="38px" src="/grayLogo.png" alt="AFC logo" />
                <div className="flex flex-col flex-1 mx-8 lg:flex-row lg:justify-between">
                    <div className="flex justify-between flex-1 lg:justify-start">
                        <a className="mr-4" href="https://www.voxelxnetwork.com/" target="_blanck" rel="noreferrer">Official</a>
                        <a className="mr-4" href="https://twitter.com/VoxelXnetwork" target="_blanck" rel="noreferrer">Twitter</a>
                        <a className="mr-4" href="https://discord.com/invite/U6GK9V2hZD" target="_blanck" rel="noreferrer">Discord</a>
                        <a href="https://t.me/VoxelXNetwork_Official" target="_blanck" rel="noreferrer">Telegram</a>
                    </div>
                    <div className="flex justify-between mt-3 lg:mt-0">
                        {/* <a className="mr-4" href="http://" target="_blanck" rel="noreferrer">Home</a> */}
                        {/* <a className="mr-4" href="https://exchange.pancakeswap.finance/#/swap?outputCurrency=0x1e446CbEa52BAdeB614FBe4Ab7610F737995fB44" target="_blanck" rel="noreferrer">Buy $AFC</a> */}
                        {/* <a href="http://" target="_blanck" rel="noreferrer">My Profile</a> */}
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
