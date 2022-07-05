import React from 'react'

function Filter({ filterActive,setFilterActive,setGroup,group1,group2,group3 }) {
    return (
        <div className={`left-filter overflow-hidden bg-white rounded-3xl lg:sticky fixed z-50 top-16 lg:block lg:left-0 lg:self-start transition ease-in ${filterActive ? 'filter-active w-[300px] py-5 px-6 left-0' : 'lg:w-0 w-[300px] -left-full'}`}>
        <div className={`left-filter-inner ${filterActive ? 'opacity-100' : 'opacity-0'}`}>
            <div className="pb-2 title">
                <h2 className='flex items-center justify-between text-[22px] font-bold leading-[1] text-black'>Filter <button onClick={() => {setFilterActive(!filterActive)}}><svg width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11 6.00019H3.41002L6.71002 2.71019C6.89832 2.52188 7.00411 2.26649 7.00411 2.00019C7.00411 1.73388 6.89832 1.47849 6.71002 1.29019C6.52172 1.10188 6.26632 0.996094 6.00002 0.996094C5.73372 0.996094 5.47832 1.10188 5.29002 1.29019L0.290018 6.29019C0.198978 6.38529 0.127613 6.49743 0.0800184 6.62019C-0.0199996 6.86365 -0.0199996 7.13672 0.0800184 7.38019C0.127613 7.50294 0.198978 7.61508 0.290018 7.71019L5.29002 12.7102C5.38298 12.8039 5.49358 12.8783 5.61544 12.9291C5.7373 12.9798 5.86801 13.006 6.00002 13.006C6.13203 13.006 6.26274 12.9798 6.3846 12.9291C6.50645 12.8783 6.61706 12.8039 6.71002 12.7102C6.80375 12.6172 6.87814 12.5066 6.92891 12.3848C6.97968 12.2629 7.00582 12.1322 7.00582 12.0002C7.00582 11.8682 6.97968 11.7375 6.92891 11.6156C6.87814 11.4937 6.80375 11.3831 6.71002 11.2902L3.41002 8.00019H11C11.2652 8.00019 11.5196 7.89483 11.7071 7.70729C11.8947 7.51976 12 7.2654 12 7.00019C12 6.73497 11.8947 6.48062 11.7071 6.29308C11.5196 6.10554 11.2652 6.00019 11 6.00019Z" fill="#11110F"></path></svg></button></h2>
                <p className='text-sm text-black opacity-80'>Found (1400 results)</p>
            </div>
            <form className='filter-form-wrap h-[calc(100vh-80px)] overflow-scroll'>
                <div className="group">
                    <h3 
                        className='flex items-center justify-between my-3 text-base text-black cursor-pointer'
                        onClick={() => {
                            setGroup(1,!group1);  
                        }}
                    >NFT State <svg className={`transition ease-in ${group1 ? 'rotate-90' : ''}`} viewBox="64 64 896 896" focusable="false" data-icon="right" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M765.7 486.8L314.9 134.7A7.97 7.97 0 00302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 000-50.4z"></path></svg></h3>
                    <ul className={`transition pt-1 ease-in relative ${group1 ? 'block' : 'hidden'}`}>
                        <li className='flex items-center mb-2'><input className='w-5 h-5 mr-2 rounded-md' type="checkbox" name='buynow' id='buynow' /> <label className='text-sm' htmlFor="buynow">Buy now</label></li>
                        <li className='flex items-center mb-2'><input className='w-5 h-5 mr-2 rounded-md' type="checkbox" name='onauction' id='onauction' /> <label className='text-sm' htmlFor="onauction">On auction</label></li>
                        <li className='flex items-center mb-2'><input className='w-5 h-5 mr-2 rounded-md' type="checkbox" name='sold' id='sold' /> <label className='text-sm' htmlFor="sold">Sold</label></li>
                        <li className='flex items-center mb-2'><input className='w-5 h-5 mr-2 rounded-md' type="checkbox" name='genesis' id='genesis' /> <label className='text-sm' htmlFor="genesis">Genesis NFTs</label></li>
                        <li className='flex items-center mb-2'><input className='w-5 h-5 mr-2 rounded-md' type="checkbox" name='hasoffers' id='hasoffers' /> <label className='text-sm' htmlFor="hasoffers">Has offers</label></li>
                    </ul>
                </div>
                <div className="group">
                    <h3 
                        className='flex items-center justify-between my-3 text-base text-black cursor-pointer'
                        onClick={() => {
                            setGroup(2,!group2);  
                        }}
                    >Market <svg className={`transition ease-in ${group2 ? 'rotate-90' : ''}`} viewBox="64 64 896 896" focusable="false" data-icon="right" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M765.7 486.8L314.9 134.7A7.97 7.97 0 00302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 000-50.4z"></path></svg></h3>
                    <ul className={`transition pt-1 ease-in relative ${group2 ? 'block' : 'hidden'}`}>
                        <li className='flex items-center mb-2'><input className='w-5 h-5 mr-2 rounded-md' type="checkbox" name='primary' id='primary' /> <label className='text-sm' htmlFor="primary">Primary</label></li>
                        <li className='flex items-center mb-2'><input className='w-5 h-5 mr-2 rounded-md' type="checkbox" name='secondary' id='secondary' /> <label className='text-sm' htmlFor="secondary">Secondary</label></li>
                    </ul>
                </div>
                <div className="group">
                    <h3 
                        className='flex items-center justify-between my-3 text-base text-black cursor-pointer'
                        onClick={() => {
                            setGroup(3,!group3);  
                        }}
                    >Categories <svg className={`transition ease-in ${group3 ? 'rotate-90' : ''}`} viewBox="64 64 896 896" focusable="false" data-icon="right" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M765.7 486.8L314.9 134.7A7.97 7.97 0 00302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 000-50.4z"></path></svg></h3>
                    <ul className={`transition pt-1 ease-in relative ${group3 ? 'block' : 'hidden'}`}>
                        <li className='flex items-center mb-2'><input className='w-5 h-5 mr-2 rounded-md' type="checkbox" name='1kbadge' id='1kbadge' /> <label className='text-sm' htmlFor="1kbadge">1k Badge</label></li>
                        <li className='flex items-center mb-2'><input className='w-5 h-5 mr-2 rounded-md' type="checkbox" name='cart' id='cart' /> <label className='text-sm' htmlFor="cart">Art</label></li>
                        <li className='flex items-center mb-2'><input className='w-5 h-5 mr-2 rounded-md' type="checkbox" name='cmusic' id='cmusic' /> <label className='text-sm' htmlFor="cmusic">Music</label></li>
                        <li className='flex items-center mb-2'><input className='w-5 h-5 mr-2 rounded-md' type="checkbox" name='csports' id='csports' /> <label className='text-sm' htmlFor="csports">Sports/Games</label></li>
                    </ul>
                </div>
            </form>
        </div>
    </div>
    )
}

export default Filter
