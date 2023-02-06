import { Text, Box, Button, Input, InputGroup, InputLeftElement, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, useToast, VStack } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { FaLock, FaUserNinja } from "react-icons/fa";
import { ISignInFailureVariables, ISignInSuccessVariables, ISignInVariables, signIn } from "../api";
import SocialLogin from "./SocialLogin";

interface ILoginModalProps {
    isOpen: boolean,
    onClose: () => void,
}

interface IForm {
    username: string;
    password: string;
}

export default function SignInModal({ isOpen, onClose }: ILoginModalProps) {
    // TODO : how to reset data when sign-in failed
    const { register, handleSubmit, reset, formState: {
        errors
    } } = useForm<IForm>({
        defaultValues: {
            username: "",
            password: "",
        }
    });

    const toast = useToast();
    const queryClient = useQueryClient();
    const mutation = useMutation(signIn, {
        onSuccess: () => {
            toast({
                title: "Welome back!",
                status: "success",
            });
            onClose();
            queryClient.refetchQueries(["me"]);
            reset();
        }
    });

    const onSubmit = (data: IForm) => {
        mutation.mutate(data);
    }

    return (
        <Modal onClose={onClose} isOpen={isOpen}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Sign in</ModalHeader>
                <ModalCloseButton />
                <ModalBody as="form" onSubmit={handleSubmit(onSubmit)}>
                    <VStack>
                        <InputGroup size={"md"}>
                            <InputLeftElement>
                                <Box color={"gray.500"}>
                                    <FaUserNinja />
                                </Box>
                            </InputLeftElement>
                            <Input variant={"filled"}
                                placeholder={"Username"}
                                isInvalid={Boolean(errors.username?.message)}
                                {...register("username", {
                                    required: "Please write a username",
                                })}
                            />
                        </InputGroup>
                        <InputGroup size={"md"}>
                            <InputLeftElement children={
                                <Box color={"gray.500"}>
                                    <FaLock />
                                </Box>
                            } />
                            <Input
                                {...register("password", {
                                    required: "Please write a password."
                                })}
                                isInvalid={Boolean(errors.password?.message)}
                                type={"password"}
                                variant={"filled"}
                                placeholder={"Password"} />
                        </InputGroup>
                    </VStack>
                    {
                        mutation.isError ? (
                            <Text color={"red.500"} textAlign={"center"}
                                fontSize="sm">
                                Username or Password are Wrong
                            </Text>
                        ) : null
                    }
                    <Button marginTop={4}
                        isLoading={mutation.isLoading}
                        type={"submit"}
                        colorScheme={"red"} width={"100%"}>
                        Sign in
                    </Button>
                    <SocialLogin />
                </ModalBody>
            </ModalContent>
        </Modal >
    );
}
