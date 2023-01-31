import { Box, Button, Input, InputGroup, InputLeftElement, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, VStack } from "@chakra-ui/react";
import { FaLock, FaUserNinja } from "react-icons/fa";
import SocialLogin from "./SocialLogin";

interface ILoginModalProps {
    isOpen: boolean,
    onClose: () => void,
}

export default function SignInModal({ isOpen, onClose }: ILoginModalProps) {
    return (
        <Modal onClose={onClose} isOpen={isOpen}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Sign in</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <VStack>
                        <InputGroup size={"md"}>
                            <InputLeftElement>
                                <Box color={"gray.500"}>
                                    <FaUserNinja />
                                </Box>
                            </InputLeftElement>
                            <Input variant={"filled"} placeholder={"Username"} />
                        </InputGroup>
                        <InputGroup size={"md"}>
                            <InputLeftElement children={
                                <Box color={"gray.500"}>
                                    <FaLock />
                                </Box>
                            } />
                            <Input variant={"filled"} placeholder={"Password"} />
                        </InputGroup>
                    </VStack>
                    <Button marginTop={4} colorScheme={"red"} width={"100%"}>
                        Sign in
                    </Button>
                    <SocialLogin />
                </ModalBody>
            </ModalContent>
        </Modal >
    );
}
