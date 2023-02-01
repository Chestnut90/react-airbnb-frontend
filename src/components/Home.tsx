import { Grid } from "@chakra-ui/react";
import { randomInt } from "crypto";
import Room from "./Room";
import RoomSkeleton from "./RoomSkeleton";

export default function Home() {

    const rooms = [];
    for (let i = 0; i < 20; i++) {
        rooms.push(i);
    }

    const imageUrl = "https://a0.muscache.com/im/pictures/miso/Hosting-47181423/original/39c9d4e7-78d0-4807-9f0d-3029d987d02a.jpeg?im_w=720";
    const name = "Good room";
    const rating = 4.5;
    const city = "Seoul";
    const country = "South korea";
    const price = 72;

    // TODO : add fetch rooms

    return (
        <Grid
            templateColumns={{
                sm: "1fr",
                md: "1fr 1fr",
                lg: "repeat(3, 1fr)",
                xl: "repeat(4, 1fr)",
                "2xl": "repeat(5, 1fr)"
            }}
            marginTop={"10"}
            columnGap={4}
            rowGap={8}
            paddingX={"40"}>
            {
                rooms.map((v) => {
                    return <Room key={v}
                        imageUrl={imageUrl} name={name}
                        rating={rating}
                        city={city} country={country}
                        price={price} />
                })
            }
        </Grid>
    );
}