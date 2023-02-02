import { Heading, VStack, Text, Spinner, useToast } from "@chakra-ui/react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query"
import { signInWithGithub } from "../api";

export default function GithubConfirm() {

    const toast = useToast();
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const { search } = useLocation();
    const confirmSignIn = async () => {
        const params = new URLSearchParams(search);
        const code = params.get("code");
        if (code) {
            const status = await signInWithGithub(code);
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
            <Heading>Processing sign in...</Heading>
            <Text>Don't go anywhere</Text>
            <Spinner size={"lg"} />
        </VStack>
    );
}