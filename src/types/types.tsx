export interface NFTModel {
    id: number;
    collection: string;
    tokenId: number;
    name: string;
    description: string;
    image: string;
    imageBuffer?: any,
    type: string;
    uri: string;
    creator: string;
    liked?: string | number;
    mintable: boolean;
    count: number;
    currency: string;
    price: string | number;
    usdPrice?: string | number;
    auctionable: boolean;
    startTime?: number;
    endTime?: number;
    timeRemaining?: string;
    requireAFC?: number | string;
    owner: ArtistModel | null
}

export interface UserModel {
    id: number,
    address?: string,
    nonce?: number,
    fullname: string,
    username: string,
    description?: string,
    following?: number,
    follower?: number,
    likes?: number,
    liked?: number,
    admin?: boolean,
    socialLink?: string,
    image: string
    worth?: number;
}

export interface ArtistModel {
    address?: string,
    nonce?: number,
    fullname: string,
    username: string,
    description?: string,
    following?: number,
    follower?: number,
    likes?: number,
    liked?: number,
    admin?: boolean,
    socialLink?: string,
    image: string,
    created?: Art[] | null,
}

export interface HistoryModel {
    id: number,
    creator: string,
    date: string,
    time: string,
    price: string,
    usdPrice: string
    type: string,
    userImage: string
}

export interface Art {
    id: number,
    image: string
}


export interface NFTDataModel {
    title: string,
    description: string,
    fixedPrice: string,
    paidIn: PaidInType,
    noOfEditions: number,
    type: NFTType,
    image: any
}

export enum PaidInType {
    BNB = 'bnb',
    BITCOIN = 'bitcoin'
}

export enum NFTType {
    Fixed = 'fixed',
    Timed = 'timed',
}

export enum AssetType {
    NONE = 'none',
    IMAGE = 'image',
    AUDIO = 'audio',
    VIDEO = 'video',
    MULTi = 'multi'
}