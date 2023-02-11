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