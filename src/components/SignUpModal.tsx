import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    VStack,
    InputGroup,
    InputLeftElement,
    Input,
    Button,
    Box
} from "@chakra-ui/react";
import { FaUserSecret, FaEnvelope, FaUserNinja, FaLock } from "react-icons/fa";
import SocialLogin from "./SocialLogin";

interface ISignUpModalProps {
    isOpen: boolean,
    onClose: () => void,
}

export default function SignUpModal({ isOpen, onClose }: ISignUpModalProps) {
    return (
        <Modal onClose={onClose} isOpen={isOpen}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Sign up</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <VStack>
                        <InputGroup>
                            <InputLeftElement
                                children={
                                    <Box color="gray.500">
                                        <FaUserSecret />
                                    </Box>
                                }
                            />
                            <Input variant={"filled"} placeholder="Name" />
                        </InputGroup>
                        <InputGroup>
                            <InputLeftElement
                                children={
                                    <Box color="gray.500">
                                        <FaEnvelope />
                                    </Box>
                                }
                            />
                            <Input variant={"filled"} placeholder="Email" />
                        </InputGroup>
                        <InputGroup>
                            <InputLeftElement
                                children={
                                    <Box color="gray.500">
                                        <FaUserNinja />
                                    </Box>
                                }
                            />
                            <Input variant={"filled"} placeholder="Username" />
                        </InputGroup>
                        <InputGroup>
                            <InputLeftElement
                                children={
                                    <Box color="gray.500">
                                        <FaLock />
                                    </Box>
                                }
                            />
                            <Input variant={"filled"} placeholder="Password" />
                        </InputGroup>
                    </VStack>
                    <Button mt={4} colorScheme={"red"} w="100%">
                        Sign up
                    </Button>
                    <SocialLogin />
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}