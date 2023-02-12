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
                <Box rounded={"2xl"} overflow={"hidden"} position={"relative"}>
                    <Button variant={"unstyled"} position={"absolute"}
                        top={0} right={0}
                        color={"white"}
                        onClick={prop.isOwner ? onCameraClick : undefined}>
                        <Container size={"20px"}>
                            {prop.isOwner ? <FaCamera /> : <FaRegHeart />}
                        </Container>
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
        </Link >
    );
}