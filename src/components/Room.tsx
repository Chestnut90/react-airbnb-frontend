import { Box, Grid, HStack, VStack, Image, Text, Button, Container } from "@chakra-ui/react";
import React from "react";
import { FaCamera, FaRegHeart, FaStar } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { IPhoto } from "../type";

interface IRoomProp {
    pk: number;
    isOwner: boolean;
    name: string;
    country: string;
    city: string;
    rating: number;
    price: number;
    photos: IPhoto[];
}

export default function Room(prop: IRoomProp) {
    const navigate = useNavigate();

    const onCameraClick = (event: React.SyntheticEvent<HTMLButtonElement>) => {
        event.preventDefault(); // do not propagate event to parent link.
        navigate(`/rooms/${prop.pk}/photos`);
    }

    return (
        <Link to={`/rooms/${prop.pk}`}>
            <VStack alignItems={"flex-start"}>
                <Box w={"100%"} rounded={"2xl"} overflow={"hidden"} position={"relative"}>
                    {prop.photos.length == 0 ?
                        <Box minH={"280px"} h={"100%"} w={"100%"} p={10} bg={"green.400"}></Box> :
                        <Image minHeight={"280px"}
                            src={prop.photos.length == 0 ? undefined : prop.photos[0].url} />}
                    <Button variant={"unstyled"} position={"absolute"}
                        top={0} right={0}
                        color={"white"}
                        onClick={prop.isOwner ? onCameraClick : undefined}>
                        <Container size={"20px"}>
                            {prop.isOwner ? <FaCamera /> : <FaRegHeart />}
                        </Container>
                    </Button>
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
        </Link >
    );
}