import axios from "axios";
import { QueryFunctionContext } from "@tanstack/react-query";
import Cookie from "js-cookie";

const instance = axios.create({
    baseURL: "http://127.0.0.1:8000/api/v1/",
    withCredentials: true, // manually add cookies
})

export async function getRooms() {

    // @ test react-query?
    // const wait = (milli: number) => new Promise((r) => {
    //     setTimeout(r, milli);
    // })
    // await wait(2 * 1000);
    // console.log("end wait");

    return instance.get("rooms/").then((res) => res.data);
}

export const getRoom = ({ queryKey }: QueryFunctionContext) => {
    const [_, id] = queryKey;
    return instance.get(`rooms/${id}`).then(res => res.data);
}

export const getRoomReviews = ({ queryKey }: QueryFunctionContext) => {
    const [_, roomPk] = queryKey;
    return instance
        .get(`rooms/${roomPk}/reviews`)
        .then(res => res.data);
}

export const getMe = () =>
    instance.get("users/me").then(res => res.data);

export const signOut = () =>
    instance.post("users/signout", null, {
        headers: {
            "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
    }).then(res => res.data);

export const signInWithGithub = (code: string) =>
    instance.post("users/signin-github",
        { code },
        {
            headers: {
                "X-CSRFToken": Cookie.get("csrftoken") || "",
            }
        }).then(res => res.status);

export const signInWithKakao = (code: string) =>
    instance.post("users/signin-kakao",
        { code },
        {
            headers: {
                "X-CSRFToken": Cookie.get("csrftoken") || "",
            }
        }).then(res => res.status);

export interface ISignInVariables {
    username: string;
    password: string;
}

export interface ISignInSuccessVariables {
    ok: string;
}

export interface ISignInFailureVariables {
    error: string;
}

export const signIn = ({ username, password }: ISignInVariables) =>
    instance.post("users/signin",
        { username, password },
        {
            headers: {
                "X-CSRFToken": Cookie.get("csrftoken") || "",
            }
        }).then(res => res.data);

export const getAmenities = () =>
    instance.get("rooms/amenities").then(res => res.data)

export interface IUploadRoomVariables {
    name: string;
    country: string;
    city: string;
    address: string;
    description: string;
    kind: string;
    price: number;
    rooms: number;
    toilets: number;
    pet_friendly: boolean;
    amenities: number[];
}

// upload room api call
export const uploadRoom = (variables: IUploadRoomVariables) =>
    instance.post('rooms/', variables, {
        headers: {
            "X-CSRFToken": Cookie.get("csrftoken") || "",
        }
    }).then((res) => res.data);

export interface IUploadURL {
    id: string;
    uploadURL: string;
}

// request upload url to server
export const getUploadURL = () =>
    instance.post(`medias/photos/get-url`, null, {
        headers: {
            "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
    }).then<IUploadURL>(res => res.data)

export interface IUploadImageVariables {
    file: FileList;
    uploadURL: string;
}

export const uploadImage = ({ file, uploadURL }: IUploadImageVariables) => {
    const form = new FormData();
    form.append("file", file[0])
    return axios.post(uploadURL, form, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    }).then(res => res.data);
}

// TODO : how to upload using formal url
export const uploadImage2 = () => {
    const form = new FormData();
    form.append("metadata", "");
    form.append("requireSignedURLs", "");
    form.append("url", "[\"https://example.com/path/to/logo.png\"]");

    const options = {
        method: 'POST',
        url: 'https://api.cloudflare.com/client/v4/accounts/account_identifier/images/v1',
        headers: {
            'Content-Type': 'multipart/form-data; boundary=---011000010111000001101001',
            'X-Auth-Email': ''
        },
        data: '[form]'
    };

    return axios.request(options)
        .then(res => res.data)
        .catch(error => console.log(error));
}

export interface ICreatePhotoVariables {
    description: string;
    url: string;
    roomPk: string;
}

export const createPhoto = ({
    description,
    url,
    roomPk,
}: ICreatePhotoVariables) =>
    instance.post(`rooms/${roomPk}/photos`,
        { description, url },
        {
            headers: {
                "X-CSRFToken": Cookie.get("csrftoken") || "",
            },
        }).then(res => res.data);