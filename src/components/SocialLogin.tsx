import { Box, Button, Divider, HStack, Text, VStack } from "@chakra-ui/react";
import { FaGithub, FaComment } from "react-icons/fa";

export default function SocialLogin() {

    const kakaoParams = {
        client_id: "1cfd4ec5930374d180bdefea46e9b3d8",
        redirect_uri: "http://127.0.0.1:3000/social/kakao",
        response_type: "code",
    };
    const params = new URLSearchParams(kakaoParams).toString();

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
                <Button as="a"
                    href="https://github.com/login/oauth/authorize?client_id=8d6ae51b717a6e62f340&scope=read:user,user:email"
                    width="100%" leftIcon={<FaGithub />}
                    colorScheme={"telegram"}>
                    Continue with Github
                </Button>
                <Button width="100%"
                    as="a"
                    href={`https://kauth.kakao.com/oauth/authorize?${params}`}
                    leftIcon={<FaComment />}
                    colorScheme={"yellow"}>
                    Continue with Kakao
                </Button>
            </VStack>
        </Box>
    )
}