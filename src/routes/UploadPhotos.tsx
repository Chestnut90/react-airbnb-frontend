import { Box, Button, Container, FormControl, Heading, Input, useToast, VStack } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { createPhoto, getUploadURL, IUploadURL, uploadImage } from "../api";
import ProtectedPage from "../components/ProtectedPage";
import useHostOnlyPage from "../lib/useHostOnlyPage";

interface IForm {
    file: FileList;
}

export default function UploadPhotos() {
    useHostOnlyPage();
    const { register, watch, handleSubmit, reset } = useForm<IForm>();
    const { roomPK } = useParams();
    const toast = useToast();


    const createRoomPhotoMutation = useMutation(createPhoto, {
        onSuccess: (data: any) => {
            toast({
                status: "success",
                title: "Image uploaded!",
                isClosable: true,
                description: "Feel free to upload more images."
            });
            reset();
        }
    });

    const uploadImageMutation = useMutation(uploadImage, {
        onSuccess: ({ result }: any) => {
            if (roomPK) {
                createRoomPhotoMutation.mutate({
                    description: "description for image",
                    url: `https://imagedelivery.net/3atgXy-vglgphTX8te_cag/${result.id}/public`,
                    roomPk: roomPK,
                });
            }
        },
    })

    const uploadURLMutation = useMutation(getUploadURL, {
        onSuccess: (data: IUploadURL) => {
            console.log(data);
            uploadImageMutation.mutate({
                file: watch("file"),
                uploadURL: data.uploadURL,
            });
        },
    })

    const onSubmit = () => {
        uploadURLMutation.mutate();
    }

    return (
        <ProtectedPage>
            <Box paddingBottom={40} marginTop={10}
                px={{ base: 10, lg: 40, }}>
                <Container>
                    <Heading textAlign={"center"}>Upload photos here</Heading>
                    <VStack as="form"
                        onSubmit={handleSubmit(onSubmit)} spacing={5} marginTop={10}>
                        <FormControl>
                            <Input {...register("file")}
                                type="file" accept="image/*" />
                        </FormControl>
                        <Button width="full"
                            colorScheme={"red"}
                            type="submit">
                            Upload photos
                        </Button>
                    </VStack>
                </Container>
            </Box>
        </ProtectedPage>
    );
}