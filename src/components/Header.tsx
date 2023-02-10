import {
    useDisclosure,
    Box,
    Button,
    HStack,
    IconButton,
    LightMode,
    useColorMode,
    useColorModeValue,
    Avatar,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    useToast,
    ToastId
} from "@chakra-ui/react";
import { FaAirbnb, FaMoon, FaSun } from 'react-icons/fa'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { signIn, signOut } from "../api";
import useUser from "../lib/useUser";
import SignInModal from "./SignInModal";
import SignUpModal from "./SignUpModal";
import { useRef } from "react";
import { Link } from "react-router-dom";

// HStack spacing => space between items, rem
// find Default Theme for color
export default function Header() {

    const queryClient = useQueryClient();
    const toast = useToast();
    const toastId = useRef<ToastId>();
    const mutation = useMutation(signOut, {
        onMutate: () => {
            toastId.current = toast({
                title: "Sign out...",
                description: "Good bye and see you...",
                status: "loading",
                position: "bottom-right",
            });
        },
        onSuccess: () => {
            if (toastId.current) {
                queryClient.refetchQueries(["me"]);
                toast.update(toastId.current, {
                    status: "success",
                    title: "Done!",
                    description: "See you later...",
                });
            }
        }
    });

    const onSignOut = () => {
        mutation.mutate();
    }

    const { isLoading, user, isSignedIn } = useUser();

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
        <HStack paddingY={"10"} paddingX={"20"}
            borderBottomWidth={1}
            justifyContent={"space-between"}>
            <Box color={logoColorMode} as='a' href='/'>
                <FaAirbnb size={"2rem"} />
            </Box>
            <HStack spacing={"2"}>
                <IconButton aria-label="Toggle dark mode"
                    variant={"ghost"}
                    onClick={toggleColorMode}
                    icon={iconColorMode}></IconButton>
                {isLoading ?
                    null :
                    (isSignedIn ?
                        (
                            <Menu>
                                <MenuButton>
                                    <Avatar size={"md"} name={user?.name} src={user?.avatar} />
                                </MenuButton>
                                <MenuList>
                                    {user?.is_host ? (
                                        <Link to="/rooms/upload">
                                            <MenuItem>Upload room</MenuItem>
                                        </Link>
                                    ) : null}
                                    <MenuItem onClick={onSignOut}>Sign out</MenuItem>
                                </MenuList>
                            </Menu>
                        ) :
                        (
                            <>
                                <Button onClick={onSignInOpen}>Sign in</Button>
                                <LightMode>
                                    <Button onClick={onSignUpOpen} colorScheme={"red"}>Sign up</Button>
                                </LightMode>
                            </>
                        )
                    )
                }
            </HStack>
            <SignInModal isOpen={isSignInOpen} onClose={onSignInClose} />
            <SignUpModal isOpen={isSignUpOpen} onClose={onSignUpClose} />
        </HStack>
    )
};