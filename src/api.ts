import axios from "axios";
import { QueryFunctionContext } from "@tanstack/react-query";

const instance = axios.create({
    baseURL: "http://127.0.0.1:8000/api/v1/",
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