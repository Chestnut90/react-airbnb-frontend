import { Box, Button, Container, FormControl, Heading, Input, VStack } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import ProtectedPage from "../components/ProtectedPage";
import useHostOnlyPage from "../lib/useHostOnlyPage";

export default function UploadPhotos() {
    useHostOnlyPage();

    const { register, watch } = useForm();
    const { roomPK } = useParams();
    console.log(roomPK, watch())

    return (
        <ProtectedPage>
            <Box paddingBottom={40} marginTop={10}
                px={{ base: 10, lg: 40, }}>
                <Container>
                    <Heading textAlign={"center"}>Upload photos here</Heading>
                    <VStack spacing={5} marginTop={10}>
                        <FormControl>
                            <Input {...register("file")}
                                type="file" accept="image/*" />
                        </FormControl>
                        <Button width="full" colorScheme={"red"}>Upload photos</Button>
                    </VStack>
                </Container>
            </Box>
        </ProtectedPage>
    );
}