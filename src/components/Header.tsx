import {
    useDisclosure,
    Box,
    Button,
    HStack,
    IconButton,
    LightMode,
    useColorMode,
    useColorModeValue,
} from "@chakra-ui/react";
import { FaAirbnb, FaMoon, FaSun } from 'react-icons/fa'
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

    const { toggleColorMode } = useColorMode();
    const logoColorMode = useColorModeValue("red.500", "red.200");
    const iconColorMode = useColorModeValue(<FaMoon />, <FaSun />);
    return (
        <HStack paddingY={"5"} paddingX={"5"}
            borderBottomWidth={1}
            justifyContent={"space-between"}>
            <Box color={logoColorMode}>
                <FaAirbnb size={"2rem"} />
            </Box>
            <HStack spacing={"2"}>
                <IconButton aria-label="Toggle dark mode"
                    onClick={toggleColorMode}
                    icon={iconColorMode}></IconButton>
                <Button onClick={onSignInOpen}>Sign in</Button>
                <LightMode>
                    <Button onClick={onSignUpOpen} colorScheme={"red"}>Sign up</Button>
                </LightMode>
            </HStack>
            <SignInModal isOpen={isSignInOpen} onClose={onSignInClose} />
            <SignUpModal isOpen={isSignUpOpen} onClose={onSignUpClose} />
        </HStack>
    )
};