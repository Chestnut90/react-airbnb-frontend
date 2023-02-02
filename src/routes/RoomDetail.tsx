import { Box, Grid, GridItem, Heading, HStack, Image, Skeleton, Text, VStack } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getRoom } from "../api";
import { IRoomDetail } from "../type";

export default function RoomDetail() {
    const { roomPK } = useParams();
    const { isLoading, data } = useQuery<IRoomDetail>(["room", roomPK], getRoom);

    return (
        <Box
            mt={10}
            px={{
                base: 10,
                lg: 40,
            }}
        >
            <Heading>{data?.name}</Heading>
            <Grid
                mt={8}
                rounded="xl"
                overflow={"hidden"}
                gap={2}
                height="60vh"
                templateRows={"1fr 1fr"}
                templateColumns={"repeat(4, 1fr)"}
            >
                {data?.photos.map((photo, index) => (
                    <GridItem
                        colSpan={index === 0 ? 2 : 1}
                        rowSpan={index === 0 ? 2 : 1}
                        overflow={"hidden"}
                        key={index}
                    >
                        <Skeleton isLoaded={!isLoading} h="100%" w="100%">
                            <Image
                                objectFit={"cover"}
                                w="100%"
                                h="100%"
                                src={photo.url}
                            />
                        </Skeleton>
                    </GridItem>
                ))}
            </Grid>
        </Box>
    );
}