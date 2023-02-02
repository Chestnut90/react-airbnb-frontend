
export interface IUser {
    name: string;
    email: string;
    // avatar
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
    name: string;
    description: string;
}

export interface IRoomDetail extends IRoom {
    owner: IUser;
    amenities: IAmenity[];
}