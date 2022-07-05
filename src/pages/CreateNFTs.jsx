import {useState } from "react";

function CreateNFTs() {
    // const [profile,  setProfile] = useState("")
    const [banner,  setBanner] = useState("")
     
    // const handleChangeProfile = (e) =>{
    //     setProfile(URL.createObjectURL(e.target.files[0]))
    // }
    const handleChangeBanner = (e) =>{
        // setBanner(URL.createObjectURL(e.target.files[0]))
        setBanner(e.target.files[0].name)
        console.log(e.target.files[0].name);
    }
    return (
        <div className="mt-[70px]">
            <div className="w-full max-w-5xl px-4 py-10 m-auto edit-profile-inner md:py-20">
                <form className="edit-profile-form">
                    <fieldset className="rounded-2xl md:rounded-3xl">
                        <legend className="px-12 py-2 text-sm font-semibold border border-black border-solid special-btn shadow-white rounded-2xl md:rounded-3xl md:text-lg">Create New Item:</legend>
                        <div className="w-full mt-5 mb-5 item">
                            <label htmlFor="profileBanner" className="block mb-2 text-sm font-semibold text-black">Image, Video, Audio, or #D Model *
                                <span className="block w-full text-xs text-black opacity-50">File types supported: JPG, PNG, GIF, SVG, MP4, WEBM, MP4, WAV, OGG, GLB, GLTF. Max size: 100MB</span>
                            </label>
                            <div className="relative w-full text-black border border-black border-solid outline-none upload-images h-36 rounded-2xl md:rounded-3xl bg-white/30 placeholder:text-black">
                                <input required onChange={handleChangeBanner} type="file" className="" placeholder="User Name" name="profileBanner" id="profileBanner" accept=".jpg, .jpeg, .png, .gif, .mp4, .webm, .svg, .wav, .ogg, .glab, .gltf" />
                                {/* <img className={`${banner ? 'opacity-100' : 'opacity-0'}`} src={banner} alt="pic"/> */}
                                {banner && <li className="block w-full px-4 py-10 break-all list-none">{banner}</li>}
                                <div className={`intro absolute h-full top-0 left-0 w-full flex flex-wrap pointer-events-none justify-center items-center ${banner ? 'opacity-0' : 'opacity-100'}`}>
                                    <div className="text-center">
                                    <p className="mb-2 text-sm text-black">Image, Video, Audio, or #D Model</p>
                                    <p className="py-2 text-sm bg-red-300 rounded-2xl md:rounded-3xl px-7">Choose file</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full mb-5 item">
                            <label htmlFor="name" className="block mb-2 text-sm font-semibold text-black">Name *</label>
                            <input required type="text" className="w-full h-12 px-5 text-black border border-black border-solid outline-none rounded-2xl md:rounded-3xl bg-white/30 placeholder:text-black" placeholder="Item Name" name="name" id="name" />
                        </div>
                        <div className="w-full mb-5 item">
                            <label htmlFor="externalLink" className="block mb-2 text-sm font-semibold text-black">External link
                                <span className="block w-full text-xs text-black opacity-50">OpenSea will include a link to this URL on this item's detail page. so tha users can click to learn more about it. You are welcome to link to your own webpage with more details</span>
                            </label>
                            <input type="text" className="w-full h-12 px-5 text-black border border-black border-solid outline-none rounded-2xl md:rounded-3xl bg-white/30 placeholder:text-black" placeholder="External link" name="externalLink" id="externalLink" />
                        </div>
                        <div className="flex flex-wrap w-full mb-5 item">
                            <label htmlFor="price" className="block w-full mb-2 text-sm font-semibold text-black">Price *</label>
                            <div className="w-full pr-0 md:w-1/2 md:pr-3">
                                <input required type="number" className="w-full h-12 px-5 text-black border border-black border-solid outline-none rounded-2xl md:rounded-3xl bg-white/30 placeholder:text-black" placeholder="Fixed Price" name="price" id="price" />
                            </div>
                            <div className="w-full pl-0 mt-5 md:w-1/2 md:pl-3 md:mt-0">
                                <input type="number" className="w-full h-12 px-5 text-black border border-black border-solid outline-none rounded-2xl md:rounded-3xl bg-white/30 placeholder:text-black" placeholder="Regular Price" name="regular-price" id="regular-price" />
                            </div>
                        </div>
                        <div className="w-full mb-5 item">
                            <label htmlFor="description" className="block mb-2 text-sm font-semibold text-black">Description *
                                <span className="block w-full text-xs text-black opacity-50">The description will be included on the item's detail page underneath it's image. Markdown syntax is supported.</span>
                            </label>
                            <textarea className="w-full px-5 py-5 text-black border border-black border-solid outline-none h-60 rounded-2xl md:rounded-3xl bg-white/30 placeholder:text-black" placeholder="Description" name="description" id="description"></textarea>
                        </div>
                        <div className="pt-5 mb-10 submit-btn">
                            <button type="submit" className="px-16 py-2 text-sm font-semibold special-btn shadow-white md:text-lg">Create NFTs</button>
                        </div>
                    </fieldset>
                </form>
            </div>
        </div>
    )
}

export default CreateNFTs