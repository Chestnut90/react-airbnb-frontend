const BASE_URL = "http://127.0.0.1:8000/api/v1";

export async function getRooms() {

    // @ test react-query?
    // const wait = (milli: number) => new Promise((r) => {
    //     setTimeout(r, milli);
    // })
    // await wait(2 * 1000);
    // console.log("end wait");

    const response = await fetch(`${BASE_URL}/rooms`);
    const json = await response.json();
    return json;
}