import { Grid } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import Room from "../components/Room";
import RoomSkeleton from "../components/RoomSkeleton";
import { getRooms } from "../api";
import { IRoom } from "../type";

function RoomSkeletons() {
    return (
        <>
            <RoomSkeleton />
            <RoomSkeleton />
            <RoomSkeleton />
            <RoomSkeleton />
            <RoomSkeleton />
            <RoomSkeleton />
            <RoomSkeleton />
            <RoomSkeleton />
            <RoomSkeleton />
        </>
    );
}

export default function Home() {

    // css
    const templateColumns = {
        sm: "1fr",
        md: "1fr 1fr",
        lg: "repeat(3, 1fr)",
        xl: "repeat(4, 1fr)",
        "2xl": "repeat(5, 1fr)"
    }

    const { isLoading, data } = useQuery<IRoom[]>(["rooms"], getRooms);

    return (
        <Grid
            templateColumns={templateColumns}
            marginTop={"10"}
            columnGap={4}
            rowGap={8}
            paddingX={"40"}>
            {isLoading ? <RoomSkeletons /> : null}
            {data?.map((v) => {
                return <Room key={v.pk}
                    pk={v.pk}
                    photos={v.photos}
                    name={v.name}
                    rating={v.rating}
                    city={v.city} country={v.country}
                    price={v.price} />
            })}
        </Grid>
    );
}