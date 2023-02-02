import { Box, Grid, HStack, VStack, Image, Text, Button } from "@chakra-ui/react";
import { FaRegHeart, FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import { IPhoto } from "../type";

interface IRoomProp {
    pk: number;
    name: string;
    country: string;
    city: string;
    rating: number;
    price: number;
    photos: IPhoto[];
}

export default function Room(prop: IRoomProp) {
    return (
        <Link to={`/rooms/${prop.pk}`}>
            <VStack alignItems={"flex-start"}>
                <Box rounded={"2xl"} overflow={"hidden"} position={"relative"}>
                    <Button variant={"unstyled"} position={"absolute"} top={0} right={0} color={"white"}>
                        <FaRegHeart size={"20px"} />
                    </Button>
                    <Image minHeight={"280"}
                        src={prop.photos.length == 0 ?
                            undefined : prop.photos[0].url} />
                </Box>
                <Box>
                    <Grid gap={2} templateColumns={"6fr 1fr"}>
                        <Text display={"block"} fontSize={"md"}
                            as={"b"} noOfLines={1}>
                            {prop.name}
                        </Text>
                        <HStack spacing={1} alignItems={"center"}>
                            <FaStar size={12} />
                            <Text fontSize={"sm"}>{prop.rating}</Text>
                        </HStack>
                    </Grid>
                    <Text fontSize={"sm"} color={"gray"}>{prop.city}, {prop.country}</Text>
                </Box>
                <Text fontSize={"sm"} color={"gray"}>
                    <Text as={"b"}>${prop.price}</Text>/ night
                </Text>
            </VStack>
        </Link>
    );
}