import {
    useDisclosure,
    Box,
    Button,
    HStack,
    IconButton,
} from "@chakra-ui/react";
import { FaAirbnb, FaMoon } from 'react-icons/fa'
import SignInModal from "./SignInModal";
import SignUpModal from "./SignUpModal";

// HStack spacing => space between items, rem
// find Default Theme for color
export default function Header() {
    const {
        isOpen: isSignInOpen,
        onOpen: onSignInOpen,
        onClose: onSignInClose } = useDisclosure();
    const {
        isOpen: isSignUpOpen,
        onOpen: onSignUpOpen,
        onClose: onSignUpClose } = useDisclosure();

    return (
        <HStack paddingY={"5"} paddingX={"5"}
            borderBottomWidth={1}
            justifyContent={"space-between"}>
            <Box color={"red.500"}>
                <FaAirbnb size={"2rem"} />
            </Box>
            <HStack spacing={"2"}>
                <IconButton aria-label="Toggle dark mode"
                    icon={<FaMoon />}></IconButton>
                <Button onClick={onSignInOpen}>Sign in</Button>
                <Button onClick={onSignUpOpen} colorScheme={"red"}>Sign up</Button>
            </HStack>
            <SignInModal isOpen={isSignInOpen} onClose={onSignInClose} />
            <SignUpModal isOpen={isSignUpOpen} onClose={onSignUpClose} />
        </HStack>
    )
};