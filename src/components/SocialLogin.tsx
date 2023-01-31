import { Box, Button, Divider, HStack, Text, VStack } from "@chakra-ui/react";
import { FaGithub, FaComment } from "react-icons/fa";

export default function SocialLogin() {
    return (
        <Box>
            <HStack>
                <Divider marginY={8} />
                <Text as='b' textTransform={"uppercase"}
                    color={"gray.500"} fontSize={"xs"}>
                    Or
                </Text>
                <Divider />
            </HStack>
            <VStack>
                <Button width="100%" leftIcon={<FaGithub />}
                    colorScheme={"telegram"}>
                    Continue with Github
                </Button>
                <Button width="100%" leftIcon={<FaComment />}
                    colorScheme={"yellow"}>
                    Continue with Kakao
                </Button>
            </VStack>
        </Box>
    )
}