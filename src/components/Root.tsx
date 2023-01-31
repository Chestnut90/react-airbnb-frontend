import { Box, Button, HStack, VStack } from "@chakra-ui/react";
import { FaAirbnb } from "react-icons/fa";
import { Outlet } from "react-router-dom";

// HStack spacing => space between items, rem
// find Default Theme for color
export default function Root() {
    return (
        <Box >
            <HStack paddingY={"5"} paddingX={"5"}
                borderBottomWidth={1}
                justifyContent={"space-between"}>
                <Box color={"red.500"}>
                    <FaAirbnb size={"2rem"} />

                </Box>
                <HStack spacing={"2rem"}>
                    <Button>Sign in</Button>
                    <Button colorScheme={"red"}>Sign up</Button>
                </HStack>
            </HStack>
            <Outlet />
            <h1>Footer Section</h1>
        </Box >
    )
}

