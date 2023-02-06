import { Box, Button, Input, InputGroup, InputLeftElement, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, useToast, VStack } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAnimationFrame } from "framer-motion";
import React, { useState } from "react";
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

    const { register, handleSubmit, formState: {
        errors
    } } = useForm<IForm>();

    const toast = useToast();
    const queryClient = useQueryClient();
    const mutation = useMutation<ISignInSuccessVariables,
        ISignInFailureVariables,
        ISignInVariables>(signIn, {
            onMutate: () => {
                console.log("mutation start.");
            },
            onSuccess: (data) => {
                toast({
                    title: "Welome back!",
                    status: "success",
                    description: `${data.ok}`
                });
                onClose();
                queryClient.refetchQueries(["me"]);
            },
            onError: (error) => {
                console.log("mutation has an error.");
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
