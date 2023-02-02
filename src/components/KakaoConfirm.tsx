import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query"
import { signInWithGithub, signInWithKakao } from "../api";
import { Heading, Text, Spinner, useToast, VStack } from "@chakra-ui/react";

export default function KakaoConfim() {

    const toast = useToast();
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const { search } = useLocation();
    const confirmSignIn = async () => {
        const params = new URLSearchParams(search);
        const code = params.get("code");
        if (code) {
            const status = await signInWithKakao(code);
            if (status === 200) {
                toast({
                    status: "success",
                    title: "Welcome!",
                    position: "bottom-right",
                    description: "Happy to have you back!",
                });
                queryClient.refetchQueries(["me"]);
                navigate("/");
            }
        }
    };

    useEffect(() => {
        // send to backend
        confirmSignIn();
    }, []);

    return (
        <VStack marginTop={"40"}
            justifyContent={"center"}>
            <Heading>Processing sign in with kakao...</Heading>
            <Text>Don't go anywhere</Text>
            <Spinner size={"lg"} />
        </VStack>
    );
}