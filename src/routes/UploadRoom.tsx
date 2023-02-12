import { Text, Box, Button, Checkbox, Container, FormControl, FormHelperText, FormLabel, Grid, Heading, Input, InputGroup, InputLeftAddon, Select, Textarea, useToast, VStack } from "@chakra-ui/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { FaBed, FaDollarSign, FaToilet } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { getAmenities, IUploadRoomVariables, uploadRoom } from "../api";
import ProtectedPage from "../components/ProtectedPage";
import useHostOnlyPage from "../lib/useHostOnlyPage";
import { IAmenity, IRoomDetail } from "../type";

export default function UploadRoom() {
    useHostOnlyPage();

    const { data, isLoading } = useQuery<IAmenity[]>(["amenities"], getAmenities);
    const toast = useToast();
    const navigate = useNavigate();
    const mutation = useMutation(uploadRoom, {
        onSuccess: (data: IRoomDetail) => {
            toast({
                status: "success",
                title: "Room created",
                position: "bottom-left",
            })
            navigate(`/rooms/${data.id}`)
        }
    })
    const { register, handleSubmit } = useForm<IUploadRoomVariables>();
    const onSubmit = (data: IUploadRoomVariables) => {
        mutation.mutate(data);
    }

    return (
        <ProtectedPage>
            <Box paddingBottom={40} marginTop={40}
                px={{ base: 10, lg: 40, }}>
                <Container>
                    <Heading textAlign={"center"}>Upload Room</Heading>
                    <VStack spacing={5} marginTop={5}
                        as="form"
                        onSubmit={handleSubmit(onSubmit)} >
                        <FormControl>
                            <FormLabel>Name</FormLabel>
                            <Input
                                {...register("name", { required: true })}
                                type="text" />
                            <FormHelperText>Write the name of your room.</FormHelperText>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Country</FormLabel>
                            <Input
                                {...register("country", { required: true })}
                                type="text" />
                        </FormControl>
                        <FormControl>
                            <FormLabel>City</FormLabel>
                            <Input
                                {...register("city", { required: true })}
                                type="text" />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Address</FormLabel>
                            <Input
                                {...register("address", { required: true })}
                                type="text" />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Price</FormLabel>
                            <InputGroup>
                                <InputLeftAddon children={<FaDollarSign />} />
                                <Input
                                    {...register("price", { required: true })}
                                    type="number" min={0} />
                            </InputGroup>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Rooms</FormLabel>
                            <InputGroup>
                                <InputLeftAddon children={<FaBed />} />
                                <Input
                                    {...register("rooms", { required: true })}
                                    type="number" min={0} />
                            </InputGroup>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Toilet</FormLabel>
                            <InputGroup>
                                <InputLeftAddon children={<FaToilet />} />
                                <Input
                                    {...register("toilets", { required: true })}
                                    type="number" min={0} />
                            </InputGroup>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Description</FormLabel>
                            <Textarea
                                {...register("description", { required: true })} />
                        </FormControl>
                        <FormControl>
                            <Checkbox
                                {...register("pet_friendly", { required: true })}>Pet friendly?</Checkbox>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Kind of room</FormLabel>
                            <Select
                                {...register("kind", { required: true })}
                                placeholder="Choose a kind">
                                <option value="entire_place">Entire place</option>
                                <option value="private_room">Private room</option>
                                <option value="shared_room">Shared room</option>
                            </Select>
                            <FormHelperText>
                                What kind of room are you renting?
                            </FormHelperText>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Amenities</FormLabel>
                            <Grid templateColumns={"1fr 1fr"} gap={5}>
                                {data?.map(amenity =>
                                    <Box key={amenity.pk}>
                                        <Checkbox
                                            {...register("amenities", { required: true })}
                                            value={amenity.pk}>{amenity.name}</Checkbox>
                                        <FormHelperText>{amenity.description}</FormHelperText>
                                    </Box>)}
                            </Grid>
                        </FormControl>
                        {mutation.isError ?
                            <Text colorScheme={"red.500"} size={"lg"} w={"100%"}>
                                Something went wrong
                            </Text> :
                            null}
                        <Button type="submit" isLoading={mutation.isLoading}
                            colorScheme={"red"} size="lg" width={"100%"}>
                            Upload Room
                        </Button>
                    </VStack>
                </Container>
            </Box>
        </ProtectedPage>
    )
}