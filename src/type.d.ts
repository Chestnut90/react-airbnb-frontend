
export interface IUser {
    username: string;
    name: string;
    email: string;
    avatar: string;
    is_host: boolean;
    gender: string;
    language: string;
    currency: string;
    date_joined: string;
    last_login: string;
}

export interface IPhoto {
    pk: number;
    url: string;
    description: string;
}

export interface IRoom {
    pk: number;
    name: string;
    country: string;
    city: string;
    price: number;
    rating: number;
    is_owner: boolean;
    photos: IPhoto[];
}

export interface IAmenity {
    pk: number;
    name: string;
    description: string;
}

export interface IRoomDetail extends IRoom {
    owner: IUser;
    amenities: IAmenity[];
}