import React, {useState} from 'react';
import AnimatedPage from '../AnimatedPage';
import { Link } from "react-router-dom";
import NFTItemsCard from '../../components/NFTItemsCard';

const CreatorsArchivePosts = [
    { 
        "title": "Raghavendra Koppad",
        "slug": "amazing-devya",
        "tag": "raghavendrakoppad",
        "about": "I enjoy creating and collecting NFTs which are distinctive (single mint) art pieces related to my personal experiences, passions, and stories. I fully believe in the power that crypto and NFTs bring to artists and designers, now and in the future.",
        "facebook": "https://www.facebook.com/purviiadalal",
        "instagram": "https://www.instagram.com/purviiadalal/",
        "twitter": "https://twitter.com/purviadalal",
        "profile": {
            "banner": "https://wazirx-nft-production.imgix.net/cover/0xBE0ad5F19bB63f44a6c98F06F59146772c084130_wazirx-nft-cover-1.jpg",
            "pic": "https://wazirx-nft-production.imgix.net/profile/0xBE0ad5F19bB63f44a6c98F06F59146772c084130_profilepic.jpeg",
        },
        "metatag": {
            "creations": "444",
            "followers": "1000",
        },
        "posts": [
            { 
                "title": "INTO THE SANTAVERSE",
                "slug": "cyber-skull-forcen",
                "bid": "35 AFC (39.16 USD)",
                "time": "16h 57m 30s",
                "media": {
                    "image": "https://wazirx-nft-production.imgix.net/nft/QmWE6gskw91RgRmjf638VgQVf41QKDXSicRaKsAcpwZKcz?h=640&q=60&auto=format",
                    "video": "",
                },
                "creator": {
                    "name": "YashShetye",
                    "image": "https://wazirx-nft-production.imgix.net/profile/0x68d546D0a540689053810351D8A1B375087E8790_Newdp.jpg?h=100&q=80&auto=format",
                },
                "owner": {
                    "name": "YashShetye",
                    "image": "https://wazirx-nft-production.imgix.net/profile/0x68d546D0a540689053810351D8A1B375087E8790_Newdp.jpg?h=100&q=80&auto=format",
                },
            },
            { 
                "title": "Cyber Skull Force",
                "slug": "cyber-skull-forcen",
                "bid": "35 AFC (39.16 USD)",
                "time": "16h 57m 30s",
                "media": {
                    "image": "",
                    "video": "https://wazirxnft.s3-ap-southeast-1.amazonaws.com/preview/QmNmUfpNboy6sXUbAB5HA1z21FJ9NVpjsWiqRNzZgct9u9",
                },
                "creator": {
                    "name": "YashShetye",
                    "image": "https://wazirx-nft-production.imgix.net/profile/0x68d546D0a540689053810351D8A1B375087E8790_Newdp.jpg?h=100&q=80&auto=format",
                },
                "owner": {
                    "name": "YashShetye",
                    "image": "https://wazirx-nft-production.imgix.net/profile/0x68d546D0a540689053810351D8A1B375087E8790_Newdp.jpg?h=100&q=80&auto=format",
                },
            },
            { 
                "title": "Mystical woods",
                "slug": "cyber-skull-forcen",
                "bid": "35 AFC (39.16 USD)",
                "time": "16h 57m 30s",
                "media": {
                    "image": "https://wazirx-nft-production.imgix.net/nft/QmcsrJK7fdo7ULkLSpzz4y81LdXnrrv34REBZdZR1ooPwC?h=640&q=60&auto=format",
                    "video": "",
                },
                "creator": {
                    "name": "YashShetye",
                    "image": "https://wazirx-nft-production.imgix.net/profile/0x68d546D0a540689053810351D8A1B375087E8790_Newdp.jpg?h=100&q=80&auto=format",
                },
                "owner": {
                    "name": "YashShetye",
                    "image": "https://wazirx-nft-production.imgix.net/profile/0x68d546D0a540689053810351D8A1B375087E8790_Newdp.jpg?h=100&q=80&auto=format",
                },
            },
            { 
                "title": "Cyber Skull Force",
                "slug": "cyber-skull-forcen",
                "bid": "35 AFC (39.16 USD)",
                "time": "16h 57m 30s",
                "media": {
                    "image": "https://wazirx-nft-production.imgix.net/nft/QmWE6gskw91RgRmjf638VgQVf41QKDXSicRaKsAcpwZKcz?h=640&q=60&auto=format",
                    "video": "",
                },
                "creator": {
                    "name": "YashShetye",
                    "image": "https://wazirx-nft-production.imgix.net/profile/0x68d546D0a540689053810351D8A1B375087E8790_Newdp.jpg?h=100&q=80&auto=format",
                },
                "owner": {
                    "name": "YashShetye",
                    "image": "https://wazirx-nft-production.imgix.net/profile/0x68d546D0a540689053810351D8A1B375087E8790_Newdp.jpg?h=100&q=80&auto=format",
                },
            },
            { 
                "title": "Cyber Skull Force",
                "slug": "cyber-skull-forcen",
                "bid": "35 AFC (39.16 USD)",
                "time": "16h 57m 30s",
                "media": {
                    "image": "https://wazirx-nft-production.imgix.net/nft/QmWE6gskw91RgRmjf638VgQVf41QKDXSicRaKsAcpwZKcz?h=640&q=60&auto=format",
                    "video": "",
                },
                "creator": {
                    "name": "YashShetye",
                    "image": "https://wazirx-nft-production.imgix.net/profile/0x68d546D0a540689053810351D8A1B375087E8790_Newdp.jpg?h=100&q=80&auto=format",
                },
                "owner": {
                    "name": "YashShetye",
                    "image": "https://wazirx-nft-production.imgix.net/profile/0x68d546D0a540689053810351D8A1B375087E8790_Newdp.jpg?h=100&q=80&auto=format",
                },
            },
            { 
                "title": "INTO THE SANTAVERSE",
                "slug": "cyber-skull-forcen",
                "bid": "35 AFC (39.16 USD)",
                "time": "16h 57m 30s",
                "media": {
                    "image": "https://wazirx-nft-production.imgix.net/nft/QmWE6gskw91RgRmjf638VgQVf41QKDXSicRaKsAcpwZKcz?h=640&q=60&auto=format",
                    "video": "",
                },
                "creator": {
                    "name": "YashShetye",
                    "image": "https://wazirx-nft-production.imgix.net/profile/0x68d546D0a540689053810351D8A1B375087E8790_Newdp.jpg?h=100&q=80&auto=format",
                },
                "owner": {
                    "name": "YashShetye",
                    "image": "https://wazirx-nft-production.imgix.net/profile/0x68d546D0a540689053810351D8A1B375087E8790_Newdp.jpg?h=100&q=80&auto=format",
                },
            },
            { 
                "title": "Cyber Skull Force",
                "slug": "cyber-skull-forcen",
                "bid": "35 AFC (39.16 USD)",
                "time": "16h 57m 30s",
                "media": {
                    "image": "",
                    "video": "https://wazirxnft.s3-ap-southeast-1.amazonaws.com/preview/QmNmUfpNboy6sXUbAB5HA1z21FJ9NVpjsWiqRNzZgct9u9",
                },
                "creator": {
                    "name": "YashShetye",
                    "image": "https://wazirx-nft-production.imgix.net/profile/0x68d546D0a540689053810351D8A1B375087E8790_Newdp.jpg?h=100&q=80&auto=format",
                },
                "owner": {
                    "name": "YashShetye",
                    "image": "https://wazirx-nft-production.imgix.net/profile/0x68d546D0a540689053810351D8A1B375087E8790_Newdp.jpg?h=100&q=80&auto=format",
                },
            },
            { 
                "title": "Mystical woods",
                "slug": "cyber-skull-forcen",
                "bid": "35 AFC (39.16 USD)",
                "time": "16h 57m 30s",
                "media": {
                    "image": "https://wazirx-nft-production.imgix.net/nft/QmcsrJK7fdo7ULkLSpzz4y81LdXnrrv34REBZdZR1ooPwC?h=640&q=60&auto=format",
                    "video": "",
                },
                "creator": {
                    "name": "YashShetye",
                    "image": "https://wazirx-nft-production.imgix.net/profile/0x68d546D0a540689053810351D8A1B375087E8790_Newdp.jpg?h=100&q=80&auto=format",
                },
                "owner": {
                    "name": "YashShetye",
                    "image": "https://wazirx-nft-production.imgix.net/profile/0x68d546D0a540689053810351D8A1B375087E8790_Newdp.jpg?h=100&q=80&auto=format",
                },
            },
            { 
                "title": "Cyber Skull Force",
                "slug": "cyber-skull-forcen",
                "bid": "35 AFC (39.16 USD)",
                "time": "16h 57m 30s",
                "media": {
                    "image": "https://wazirx-nft-production.imgix.net/nft/QmWE6gskw91RgRmjf638VgQVf41QKDXSicRaKsAcpwZKcz?h=640&q=60&auto=format",
                    "video": "",
                },
                "creator": {
                    "name": "YashShetye",
                    "image": "https://wazirx-nft-production.imgix.net/profile/0x68d546D0a540689053810351D8A1B375087E8790_Newdp.jpg?h=100&q=80&auto=format",
                },
                "owner": {
                    "name": "YashShetye",
                    "image": "https://wazirx-nft-production.imgix.net/profile/0x68d546D0a540689053810351D8A1B375087E8790_Newdp.jpg?h=100&q=80&auto=format",
                },
            },
            { 
                "title": "Cyber Skull Force",
                "slug": "cyber-skull-forcen",
                "bid": "35 AFC (39.16 USD)",
                "time": "16h 57m 30s",
                "media": {
                    "image": "https://wazirx-nft-production.imgix.net/nft/QmWE6gskw91RgRmjf638VgQVf41QKDXSicRaKsAcpwZKcz?h=640&q=60&auto=format",
                    "video": "",
                },
                "creator": {
                    "name": "YashShetye",
                    "image": "https://wazirx-nft-production.imgix.net/profile/0x68d546D0a540689053810351D8A1B375087E8790_Newdp.jpg?h=100&q=80&auto=format",
                },
                "owner": {
                    "name": "YashShetye",
                    "image": "https://wazirx-nft-production.imgix.net/profile/0x68d546D0a540689053810351D8A1B375087E8790_Newdp.jpg?h=100&q=80&auto=format",
                },
            },
        ]
    },
];

function CollectorsArchive() {
    const [layout, setLayout] = useState(false);
    const [filterActive, setFilterActive] = useState(false);
    const [group1, setGroup1] = useState(false);
    const [group2, setGroup2] = useState(false);
    const [group3, setGroup3] = useState(false);
    return (
        <AnimatedPage>
            {CreatorsArchivePosts.map((CreatorsPost, index) => {
                return(
                    <div className="px-4 pb-20 archive-wrapper lg:px-10" key={index}>
                        <div className="archive-banner-wrap rounded-3xl flex relative overflow-hidden p-8 w-full h-full min-h-[500px] before:absolute before:w-full before:h-full before:top-0 before:left-0 before:bg-gradient-to-t before:from-archive2 before:to-archive1 before:z-20">
                            <img className='absolute top-0 left-0 z-10 object-cover object-center w-full h-full' src={CreatorsPost.profile.banner} alt={CreatorsPost.title} />
                            <div className="w-full max-w-[1400px] m-auto relative z-50 mb-0">
                                <div className="flex flex-wrap items-center head">
                                    <div className="flex w-24 h-24 mr-5 overflow-hidden border-4 border-white border-solid rounded-full pic">
                                        <img src={CreatorsPost.profile.pic} alt={CreatorsPost.title} />
                                    </div>
                                    <div className="my-4 title">
                                        <h2 className='text-[20px] sm:text-[25px] md:text-[28px] font-bold text-white mb-1'>{CreatorsPost.title}</h2>
                                        <p className='text-base text-white'>@{CreatorsPost.tag}</p>
                                    </div>
                                </div>
                                <div className="mt-4 mb-8 about md:mt-10">
                                    <h3 className='mb-3 text-lg text-white'>About</h3>
                                    <div className="text-sm text-white about-content md:text-base opacity-80">
                                        <p>{CreatorsPost.about}</p>
                                    </div>
                                </div>
                                <div className="flex flex-wrap items-center justify-between archive-banner-bottom">
                                    <div className="left">
                                        <div className="flex items-center social">
                                            <a href={CreatorsPost.facebook} target="_blank" rel="noreferrer" className='mr-4'>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 127.999 128"><path fill="#b4b3b3" d="M64 7.989c-30.885 0-56.01 25.126-56.01 56.01 0 30.885 25.125 56.012 56.01 56.012 30.883 0 56.01-25.127 56.01-56.012 0-30.884-25.127-56.01-56.01-56.01zm15.83 35.358a1 1 0 0 1-1 1l-6.367.004c-4.201 0-4.969 1.636-4.969 4.858v6.684h10.92c.287 0 .561.124.75.34s.277.503.242.788l-1.555 12.033a1 1 0 0 1-.992.872h-9.365v29.879a1 1 0 0 1-1 1H54.07a1 1 0 0 1-1-1V69.926h-9.395a1 1 0 0 1-1-1V56.893a1 1 0 0 1 1-1h9.395v-7.875c0-10.43 6.312-16.908 16.475-16.908 4.369 0 8.23.325 9.416.482a1 1 0 0 1 .869.991v10.764z"></path></svg>
                                            </a>
                                            <a href={CreatorsPost.instagram} target="_blank" rel="noreferrer" className='mr-4'>
                                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 -4.37114e-07C7.28625 -3.18492e-07 6.945 0.0124997 5.87875 0.0599997C4.8125 0.11 4.08625 0.2775 3.45 0.525C2.78262 0.776024 2.17811 1.16978 1.67875 1.67875C1.1701 2.17837 0.776384 2.7828 0.525 3.45C0.2775 4.085 0.10875 4.8125 0.0600003 5.875C0.0125003 6.94375 3.18383e-07 7.28375 4.37169e-07 10.0013C5.55845e-07 12.7163 0.0125006 13.0563 0.0600006 14.1225C0.110001 15.1875 0.277501 15.9137 0.525001 16.55C0.781251 17.2075 1.1225 17.765 1.67875 18.3212C2.23375 18.8775 2.79125 19.22 3.44875 19.475C4.08625 19.7225 4.81125 19.8912 5.87625 19.94C6.94375 19.9875 7.28375 20 10 20C12.7163 20 13.055 19.9875 14.1225 19.94C15.1863 19.89 15.915 19.7225 16.5513 19.475C17.2182 19.2238 17.8223 18.8301 18.3212 18.3212C18.8775 17.765 19.2188 17.2075 19.475 16.55C19.7213 15.9137 19.89 15.1875 19.94 14.1225C19.9875 13.0562 20 12.7162 20 10C20 7.28375 19.9875 6.94375 19.94 5.87625C19.89 4.8125 19.7213 4.085 19.475 3.45C19.2237 2.78278 18.8299 2.17834 18.3212 1.67875C17.822 1.16959 17.2175 0.775806 16.55 0.524999C15.9125 0.277499 15.185 0.108749 14.1213 0.0599994C13.0538 0.0124994 12.715 -5.5579e-07 9.9975 -4.37005e-07L10.0013 -4.37169e-07L10 -4.37114e-07ZM9.10375 1.8025L10.0013 1.8025C12.6713 1.8025 12.9875 1.81125 14.0413 1.86C15.0162 1.90375 15.5462 2.0675 15.8988 2.20375C16.365 2.385 16.6987 2.6025 17.0488 2.9525C17.3988 3.3025 17.615 3.635 17.7963 4.1025C17.9338 4.45375 18.0963 4.98375 18.14 5.95875C18.1887 7.0125 18.1987 7.32875 18.1987 9.9975C18.1988 12.6662 18.1887 12.9837 18.14 14.0375C18.0963 15.0125 17.9325 15.5412 17.7963 15.8937C17.6359 16.3279 17.38 16.7205 17.0475 17.0425C16.6975 17.3925 16.365 17.6088 15.8975 17.79C15.5475 17.9275 15.0175 18.09 14.0413 18.135C12.9875 18.1825 12.6713 18.1937 10.0013 18.1937C7.33125 18.1938 7.01375 18.1825 5.96 18.135C4.985 18.09 4.45625 17.9275 4.10375 17.79C3.66937 17.6299 3.27641 17.3745 2.95375 17.0425C2.62094 16.72 2.36465 16.3271 2.20375 15.8925C2.0675 15.5412 1.90375 15.0113 1.86 14.0363C1.8125 12.9825 1.8025 12.6663 1.8025 9.995C1.8025 7.325 1.8125 7.01 1.86 5.95625C1.905 4.98125 2.0675 4.45125 2.205 4.09875C2.38625 3.6325 2.60375 3.29875 2.95375 2.94875C3.30375 2.59875 3.63625 2.3825 4.10375 2.20125C4.45625 2.06375 4.985 1.90125 5.96 1.85625C6.8825 1.81375 7.24 1.80125 9.10375 1.8L9.10375 1.8025ZM15.3388 3.4625C15.1812 3.4625 15.0251 3.49354 14.8795 3.55384C14.7339 3.61415 14.6017 3.70254 14.4902 3.81397C14.3788 3.9254 14.2904 4.05769 14.2301 4.20328C14.1698 4.34887 14.1388 4.50491 14.1388 4.6625C14.1388 4.82009 14.1698 4.97613 14.2301 5.12172C14.2904 5.26731 14.3788 5.3996 14.4902 5.51103C14.6017 5.62246 14.7339 5.71085 14.8795 5.77115C15.0251 5.83146 15.1812 5.8625 15.3388 5.8625C15.657 5.8625 15.9622 5.73607 16.1873 5.51103C16.4123 5.28598 16.5387 4.98076 16.5387 4.6625C16.5387 4.34424 16.4123 4.03901 16.1873 3.81397C15.9622 3.58893 15.657 3.4625 15.3388 3.4625ZM10.0013 4.865C9.32009 4.85437 8.64362 4.97936 8.01122 5.23268C7.37883 5.486 6.80314 5.86259 6.31769 6.34053C5.83223 6.81847 5.44671 7.38821 5.18355 8.01657C4.9204 8.64494 4.78488 9.31938 4.78488 10.0006C4.78488 10.6819 4.9204 11.3563 5.18355 11.9847C5.44671 12.613 5.83223 13.1828 6.31769 13.6607C6.80314 14.1387 7.37883 14.5153 8.01122 14.7686C8.64362 15.0219 9.32009 15.1469 10.0013 15.1363C11.3494 15.1152 12.6353 14.5649 13.5812 13.6041C14.5272 12.6432 15.0574 11.349 15.0574 10.0006C15.0574 8.65228 14.5272 7.35801 13.5812 6.39719C12.6353 5.43636 11.3494 4.88603 10.0013 4.865ZM10.0013 6.66625C10.8854 6.66625 11.7334 7.01748 12.3586 7.64268C12.9838 8.26788 13.335 9.11583 13.335 10C13.335 10.8842 12.9838 11.7321 12.3586 12.3573C11.7334 12.9825 10.8854 13.3337 10.0013 13.3337C9.11709 13.3337 8.26913 12.9825 7.64393 12.3573C7.01873 11.7321 6.6675 10.8842 6.6675 10C6.6675 9.11583 7.01873 8.26788 7.64393 7.64268C8.26913 7.01748 9.11709 6.66625 10.0013 6.66625Z" fill="#b4b3b3"></path></svg>
                                            </a>
                                            <a href={CreatorsPost.twitter} target="_blank"  rel="noreferrer" className='mr-4'>
                                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><g clipPath="url(#clip0)"><path d="M20 3.79721C19.2642 4.12388 18.4733 4.34388 17.6433 4.44305C18.4908 3.93555 19.1417 3.13138 19.4475 2.17305C18.655 2.64305 17.7767 2.98471 16.8417 3.16888C16.0942 2.37138 15.0267 1.87305 13.8467 1.87305C11.1975 1.87305 9.25083 4.34471 9.84917 6.91055C6.44 6.73971 3.41667 5.10638 1.3925 2.62388C0.3175 4.46805 0.835 6.88055 2.66167 8.10221C1.99 8.08055 1.35667 7.89638 0.804167 7.58888C0.759167 9.48971 2.12167 11.268 4.095 11.6639C3.5175 11.8205 2.885 11.8572 2.24167 11.7339C2.76333 13.3639 4.27833 14.5497 6.075 14.583C4.35 15.9355 2.17667 16.5397 0 16.283C1.81583 17.4472 3.97333 18.1264 6.29 18.1264C13.9083 18.1264 18.2125 11.6922 17.9525 5.92138C18.7542 5.34221 19.45 4.61971 20 3.79721Z" fill="#b4b3b3"></path></g><defs><clipPath id="clip0"><rect width="20" height="20" fill="white"></rect></clipPath></defs></svg>
                                            </a>
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap items-center justify-start right sm:justify-end">
                                        <h3 className='my-3 mr-4 text-sm font-bold text-white md:text-base lg:text-lg md:mr-5 lg:mr-8'><span className='mr-1'>{CreatorsPost.metatag.followers}</span>Followers</h3>
                                        <h3 className='my-3 mr-4 text-sm font-bold text-white md:text-base lg:text-lg md:mr-5 lg:mr-8'><span className='mr-1'>{CreatorsPost.metatag.followers}</span>Followings</h3>
                                        <div className="share">
                                            <button type='button' className='bg-white text-black min-w-[90px] rounded-3xl cursor-pointer text-base h-[35px] leading-[35px]'>Share</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="creators-archive-page">
                            <div className="">
                                <div className="creators-archive-page-inner">
                                    <nav className="mt-5 archive-nav">
                                        <ul className='flex flex-wrap items-center justify-center'>
                                            <li><Link className='inline-block text-sm md:text-base mx-1 py-[6px] px-4 rounded-3xl text-black bg-transparent border-2 border-solid border-transparent transition ease-in hover:border-black' to="">Created</Link></li>
                                            <li><Link className='inline-block text-sm md:text-base mx-1 py-[6px] px-4 rounded-3xl text-black bg-transparent border-2 border-solid border-transparent transition ease-in hover:border-black' to="">Collected</Link></li>
                                            <li><Link className='inline-block text-sm md:text-base mx-1 py-[6px] px-4 rounded-3xl text-black bg-transparent border-2 border-solid border-transparent transition ease-in hover:border-black' to="">Splits </Link></li>
                                            <li><Link className='inline-block text-sm md:text-base mx-1 py-[6px] px-4 rounded-3xl text-black bg-transparent border-2 border-solid border-transparent transition ease-in hover:border-black' to="">Offers received</Link></li>
                                            <li><Link className='inline-block text-sm md:text-base mx-1 py-[6px] px-4 rounded-3xl text-black bg-transparent border-2 border-solid border-transparent transition ease-in hover:border-black' to="">Offers made</Link></li>
                                        </ul>
                                    </nav>
                                    <div className="sticky left-0 z-20 flex items-center self-start justify-between w-full py-6 filter-header top-11">
                                        <div className="left">
                                            <button 
                                                className={`flex items-center shadow-md text-[13px] py-2 px-4 rounded-3xl bg-white ${filterActive ? 'hidden' : 'inline-block'}`}
                                                onClick={() => {
                                                    setFilterActive(!filterActive);  
                                                }}
                                            ><svg className='mr-1' width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.5 1H2.5C2.10218 1 1.72064 1.15804 1.43934 1.43934C1.15804 1.72064 1 2.10218 1 2.5V3.085C0.999928 3.29147 1.04248 3.49573 1.125 3.685V3.715C1.19564 3.87549 1.2957 4.02133 1.42 4.145L4.5 7.205V10.5C4.49983 10.585 4.52132 10.6686 4.56244 10.7429C4.60355 10.8173 4.66294 10.88 4.735 10.925C4.81457 10.9743 4.90639 11.0003 5 11C5.07827 10.9995 5.15534 10.9807 5.225 10.945L7.225 9.945C7.30746 9.90345 7.3768 9.83988 7.42534 9.76133C7.47388 9.68279 7.49972 9.59233 7.5 9.5V7.205L10.56 4.145C10.6843 4.02133 10.7844 3.87549 10.855 3.715V3.685C10.9444 3.49722 10.9938 3.29289 11 3.085V2.5C11 2.10218 10.842 1.72064 10.5607 1.43934C10.2794 1.15804 9.89782 1 9.5 1ZM6.645 6.645C6.59866 6.69172 6.562 6.74713 6.53711 6.80805C6.51223 6.86897 6.49962 6.9342 6.5 7V9.19L5.5 9.69V7C5.50038 6.9342 5.48777 6.86897 5.46289 6.80805C5.438 6.74713 5.40134 6.69172 5.355 6.645L2.705 4H9.295L6.645 6.645ZM10 3H2V2.5C2 2.36739 2.05268 2.24021 2.14645 2.14645C2.24022 2.05268 2.36739 2 2.5 2H9.5C9.63261 2 9.75979 2.05268 9.85355 2.14645C9.94732 2.24021 10 2.36739 10 2.5V3Z" fill="#11110F"></path></svg> Filter</button>
                                        </div>
                                        <div className="flex items-center right">
                                            <div className="layout">
                                                <button 
                                                    className={`flex items-center shadow-md text-[13px] py-2 px-4 rounded-3xl bg-white ${layout ? 'layout-active' : ''}`}
                                                    onClick={() => {
                                                        setLayout(!layout);  
                                                    }}
                                                >
                                                    <span className='transition ease-in opacity-30'><svg xmlns="http://www.w3.org/2000/svg" width="24" height="20" viewBox="0 0 24 24"><path d="M3,11H11V3H3M3,21H11V13H3M13,21H21V13H13M13,3V11H21V3"></path></svg></span>
                                                    <span className='transition ease-in opacity-30'><svg viewBox="0 0 24 24" width="24" height="20"><path d="M3,9H7V5H3V9M3,14H7V10H3V14M8,14H12V10H8V14M13,14H17V10H13V14M8,9H12V5H8V9M13,5V9H17V5H13M18,14H22V10H18V14M3,19H7V15H3V19M8,19H12V15H8V19M13,19H17V15H13V19M18,19H22V15H18V19M18,5V9H22V5H18Z"></path></svg></span>
                                                </button>
                                            </div>
                                            <div className="relative ml-5 sort-dropdown">
                                                <label htmlFor="sort-dropdown-select"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="12" viewBox="0 0 18 12" fill="none"><path d="M7.50047 2.44727H17.2498C17.4488 2.44727 17.6396 2.36825 17.7802 2.2276C17.9209 2.08694 17.9999 1.89618 17.9999 1.69727C17.9999 1.49835 17.9209 1.30759 17.7802 1.16694C17.6396 1.02628 17.4488 0.947266 17.2498 0.947266H7.50047C7.30153 0.947266 7.11074 1.02628 6.97007 1.16694C6.82939 1.30759 6.75037 1.49835 6.75037 1.69727C6.75037 1.89618 6.82939 2.08694 6.97007 2.2276C7.11074 2.36825 7.30153 2.44727 7.50047 2.44727Z" fill="#292C36"></path><path d="M17.2498 5.13184H7.50047C7.40196 5.13184 7.30442 5.15124 7.21342 5.18893C7.12241 5.22662 7.03972 5.28186 6.97007 5.35151C6.90041 5.42115 6.84516 5.50383 6.80746 5.59482C6.76977 5.68582 6.75037 5.78334 6.75037 5.88184C6.75037 5.98033 6.76977 6.07785 6.80746 6.16885C6.84516 6.25984 6.90041 6.34252 6.97007 6.41217C7.03972 6.48181 7.12241 6.53705 7.21342 6.57475C7.30442 6.61244 7.40196 6.63184 7.50047 6.63184H17.2498C17.4488 6.63184 17.6396 6.55282 17.7802 6.41217C17.9209 6.27151 17.9999 6.08075 17.9999 5.88184C17.9999 5.68292 17.9209 5.49216 17.7802 5.35151C17.6396 5.21085 17.4488 5.13184 17.2498 5.13184Z" fill="#292C36"></path><path d="M17.2498 9.31641H7.50047C7.30153 9.31641 7.11074 9.39542 6.97007 9.53608C6.82939 9.67673 6.75037 9.86749 6.75037 10.0664C6.75037 10.2653 6.82939 10.4561 6.97007 10.5967C7.11074 10.7374 7.30153 10.8164 7.50047 10.8164H17.2498C17.4488 10.8164 17.6396 10.7374 17.7802 10.5967C17.9209 10.4561 17.9999 10.2653 17.9999 10.0664C17.9999 9.86749 17.9209 9.67673 17.7802 9.53608C17.6396 9.39542 17.4488 9.31641 17.2498 9.31641Z" fill="#292C36"></path><path d="M4.5663 2.14323C4.64052 2.14331 4.71309 2.12582 4.77481 2.09297C4.83653 2.06012 4.88462 2.01339 4.91297 1.95872C4.94132 1.90405 4.94866 1.8439 4.93406 1.7859C4.91945 1.72789 4.88355 1.67466 4.83093 1.63295L3.00092 0.174987C2.86026 0.0629409 2.66955 0 2.47069 0C2.27184 0 2.08112 0.0629409 1.94047 0.174987L0.111428 1.63295C0.058803 1.67466 0.0229094 1.72789 0.00830231 1.7859C-0.00630477 1.8439 0.00103317 1.90405 0.029385 1.95872C0.0577368 2.01339 0.105824 2.06012 0.167546 2.09297C0.229267 2.12582 0.30184 2.14331 0.376055 2.14323H1.72157V9.3167H0.376055C0.301757 9.31647 0.229049 9.33385 0.167178 9.36664C0.105307 9.39943 0.0570681 9.44615 0.0285954 9.50085C0.00012265 9.55556 -0.00729719 9.61577 0.00727941 9.67385C0.021856 9.73192 0.0577704 9.78523 0.110456 9.82699L1.94047 11.2849C2.08112 11.397 2.27184 11.4599 2.47069 11.4599C2.66955 11.4599 2.86026 11.397 3.00092 11.2849L4.83093 9.82699C4.88355 9.78527 4.91945 9.73204 4.93406 9.67404C4.94866 9.61604 4.94132 9.55588 4.91297 9.50121C4.88462 9.44654 4.83653 9.39982 4.77481 9.36697C4.71309 9.33412 4.64052 9.31662 4.5663 9.3167H3.22177V2.14323H4.5663Z" fill="#292C36"></path></svg> Sort by</label>
                                                <select className='h-[36px] pr-5 shadow-md rounded-3xl pl-24 bg-white outline-none text-sm border-none text-black/60' name="sort-dropdown-select" id="sort-dropdown-select">
                                                    <option value="">Date Listed: Newest</option>
                                                    <option value="a">Date Listed: Newest</option>
                                                    <option value="b">Date Listed: Newest</option>
                                                    <option value="c">Date Listed: Newest</option>
                                                    <option value="d">Date Listed: Newest</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={`with-left-filter flex ${filterActive ? 'filter-active-wrap' : ''}`}>
                                        <div className={`left-filter overflow-hidden bg-white rounded-3xl lg:sticky fixed z-50 top-16 lg:block lg:left-0 lg:self-start transition ease-in ${filterActive ? 'filter-active w-[300px] py-5 px-6 left-0' : 'lg:w-0 w-[300px] -left-full'}`}>
                                            <div className={`left-filter-inner ${filterActive ? 'opacity-100' : 'opacity-0'}`}>
                                                <div className="pb-2 title">
                                                    <h2 className='flex items-center justify-between text-[22px] font-bold leading-[1] text-black'>Filter <button onClick={() => {setFilterActive(!filterActive)}}><svg width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11 6.00019H3.41002L6.71002 2.71019C6.89832 2.52188 7.00411 2.26649 7.00411 2.00019C7.00411 1.73388 6.89832 1.47849 6.71002 1.29019C6.52172 1.10188 6.26632 0.996094 6.00002 0.996094C5.73372 0.996094 5.47832 1.10188 5.29002 1.29019L0.290018 6.29019C0.198978 6.38529 0.127613 6.49743 0.0800184 6.62019C-0.0199996 6.86365 -0.0199996 7.13672 0.0800184 7.38019C0.127613 7.50294 0.198978 7.61508 0.290018 7.71019L5.29002 12.7102C5.38298 12.8039 5.49358 12.8783 5.61544 12.9291C5.7373 12.9798 5.86801 13.006 6.00002 13.006C6.13203 13.006 6.26274 12.9798 6.3846 12.9291C6.50645 12.8783 6.61706 12.8039 6.71002 12.7102C6.80375 12.6172 6.87814 12.5066 6.92891 12.3848C6.97968 12.2629 7.00582 12.1322 7.00582 12.0002C7.00582 11.8682 6.97968 11.7375 6.92891 11.6156C6.87814 11.4937 6.80375 11.3831 6.71002 11.2902L3.41002 8.00019H11C11.2652 8.00019 11.5196 7.89483 11.7071 7.70729C11.8947 7.51976 12 7.2654 12 7.00019C12 6.73497 11.8947 6.48062 11.7071 6.29308C11.5196 6.10554 11.2652 6.00019 11 6.00019Z" fill="#11110F"></path></svg></button></h2>
                                                    <p className='text-sm text-black opacity-80'>Found (14000 results)</p>
                                                </div>
                                                <form className='filter-form-wrap h-[calc(100vh-80px)] overflow-scroll'>
                                                    <div className="group">
                                                        <h3 
                                                            className='flex items-center justify-between my-3 text-base text-black cursor-pointer'
                                                            onClick={() => {
                                                                setGroup1(!group1);  
                                                            }}
                                                        >NFT State <svg className={`transition ease-in ${group1 ? 'rotate-90' : ''}`} viewBox="64 64 896 896" focusable="false" data-icon="right" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M765.7 486.8L314.9 134.7A7.97 7.97 0 00302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 000-50.4z"></path></svg></h3>
                                                        <ul className={`transition pt-1 ease-in relative ${group1 ? 'block' : 'hidden'}`}>
                                                            <li className='flex items-center mb-2'><input className='w-5 h-5 mr-2 rounded-md' type="checkbox" name='Buynow' id='Buynow' /> <label className='text-sm' htmlFor="Buynow">Buy now</label></li>
                                                            <li className='flex items-center mb-2'><input className='w-5 h-5 mr-2 rounded-md' type="checkbox" name='Buynow1' id='Buynow1' /> <label className='text-sm' htmlFor="Buynow1">Buy now</label></li>
                                                            <li className='flex items-center mb-2'><input className='w-5 h-5 mr-2 rounded-md' type="checkbox" name='Buynow3' id='Buynow3' /> <label className='text-sm' htmlFor="Buynow3">Buy now</label></li>
                                                            <li className='flex items-center mb-2'><input className='w-5 h-5 mr-2 rounded-md' type="checkbox" name='Buynow4' id='Buynow4' /> <label className='text-sm' htmlFor="Buynow4">Buy now</label></li>
                                                        </ul>
                                                    </div>
                                                    <div className="group">
                                                        <h3 
                                                            className='flex items-center justify-between my-3 text-base text-black cursor-pointer'
                                                            onClick={() => {
                                                                setGroup2(!group2);  
                                                            }}
                                                        >NFT State <svg className={`transition ease-in ${group2 ? 'rotate-90' : ''}`} viewBox="64 64 896 896" focusable="false" data-icon="right" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M765.7 486.8L314.9 134.7A7.97 7.97 0 00302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 000-50.4z"></path></svg></h3>
                                                        <ul className={`transition pt-1 ease-in relative ${group2 ? 'block' : 'hidden'}`}>
                                                            <li className='flex items-center mb-2'><input className='w-5 h-5 mr-2 rounded-md' type="checkbox" name='Buynow5' id='Buynow5' /> <label className='text-sm' htmlFor="Buynow5">Buy now</label></li>
                                                            <li className='flex items-center mb-2'><input className='w-5 h-5 mr-2 rounded-md' type="checkbox" name='Buynow6' id='Buynow6' /> <label className='text-sm' htmlFor="Buynow6">Buy now</label></li>
                                                            <li className='flex items-center mb-2'><input className='w-5 h-5 mr-2 rounded-md' type="checkbox" name='Buynow7' id='Buynow7' /> <label className='text-sm' htmlFor="Buynow7">Buy now</label></li>
                                                            <li className='flex items-center mb-2'><input className='w-5 h-5 mr-2 rounded-md' type="checkbox" name='Buynow8' id='Buynow8' /> <label className='text-sm' htmlFor="Buynow8">Buy now</label></li>
                                                        </ul>
                                                    </div>
                                                    <div className="group">
                                                        <h3 
                                                            className='flex items-center justify-between my-3 text-base text-black cursor-pointer'
                                                            onClick={() => {
                                                                setGroup3(!group3);  
                                                            }}
                                                        >NFT State <svg className={`transition ease-in ${group3 ? 'rotate-90' : ''}`} viewBox="64 64 896 896" focusable="false" data-icon="right" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M765.7 486.8L314.9 134.7A7.97 7.97 0 00302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 000-50.4z"></path></svg></h3>
                                                        <ul className={`transition pt-1 ease-in relative ${group3 ? 'block' : 'hidden'}`}>
                                                            <li className='flex items-center mb-2'><input className='w-5 h-5 mr-2 rounded-md' type="checkbox" name='Buynow9' id='Buynow9' /> <label className='text-sm' htmlFor="Buynow9">Buy now</label></li>
                                                            <li className='flex items-center mb-2'><input className='w-5 h-5 mr-2 rounded-md' type="checkbox" name='Buynow10' id='Buynow10' /> <label className='text-sm' htmlFor="Buynow10">Buy now</label></li>
                                                            <li className='flex items-center mb-2'><input className='w-5 h-5 mr-2 rounded-md' type="checkbox" name='Buynow11' id='Buynow11' /> <label className='text-sm' htmlFor="Buynow11">Buy now</label></li>
                                                            <li className='flex items-center mb-2'><input className='w-5 h-5 mr-2 rounded-md' type="checkbox" name='Buynow12' id='Buynow12' /> <label className='text-sm' htmlFor="Buynow12">Buy now</label></li>
                                                        </ul>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                        <div className={`all-nfts-wrapper grid transition ease-in gap-7 ${filterActive ? 'filter-active w-full lg:w-[calc(100%-300px)] lg:pl-8' : 'w-full'} ${layout ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 layout-active' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5'}`}>
                                            {CreatorsPost.posts.map((TrendingAuctionPost, index) => {
                                                return(
                                                    <NFTItemsCard key={index} postDetails={TrendingAuctionPost} />
                                                )
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </AnimatedPage>
    )
}

export default CollectorsArchive
