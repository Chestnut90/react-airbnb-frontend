import { Box, Grid, HStack, VStack, Image, Text, Button } from "@chakra-ui/react";
import { FaRegHeart, FaStar } from "react-icons/fa";

interface IRoomProps {
    imageUrl: string;
    name: string;
    rating: number;
    city: string;
    country: string;
    price: number;
}

export default function Room(prop: IRoomProps) {
    return (
        <VStack alignItems={"flex-start"}>
            <Box rounded={"2xl"} overflow={"hidden"} position={"relative"}>
                <Button variant={"unstyled"} position={"absolute"} top={0} right={0} color={"white"}>
                    <FaRegHeart size={"20px"} />
                </Button>
                <Image minHeight={"280"}
                    src={prop.imageUrl} />
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
    );
}