import { Box, Checkbox, Container, FormControl, FormHelperText, FormLabel, Grid, Heading, Input, InputGroup, InputLeftAddon, Select, Textarea, VStack } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { FaBed, FaDollarSign, FaToilet } from "react-icons/fa";
import { getAmenities } from "../api";
import ProtectedPage from "../components/ProtectedPage";
import useHostOnlyPage from "../lib/useHostOnlyPage";
import { IAmenity } from "../type";

export default function UploadRoom() {
    useHostOnlyPage();

    const { data, isLoading } = useQuery<IAmenity[]>(["amenities"], getAmenities);

    return (
        <ProtectedPage>
            <Box paddingBottom={40} marginTop={40}
                px={{ base: 10, lg: 40, }}>
                <Container>
                    <Heading textAlign={"center"}>Upload Room</Heading>
                    <VStack spacing={5} as="form" marginTop={5}>
                        <FormControl>
                            <FormLabel>Name</FormLabel>
                            <Input required type="text" />
                            <FormHelperText>Write the name of your room.</FormHelperText>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Country</FormLabel>
                            <Input required type="text" />
                        </FormControl>
                        <FormControl>
                            <FormLabel>City</FormLabel>
                            <Input required type="text" />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Address</FormLabel>
                            <Input required type="text" />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Price</FormLabel>
                            <InputGroup>
                                <InputLeftAddon children={<FaDollarSign />} />
                                <Input required type="number" min={0} />
                            </InputGroup>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Rooms</FormLabel>
                            <InputGroup>
                                <InputLeftAddon children={<FaBed />} />
                                <Input required type="number" min={0} />
                            </InputGroup>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Toilet</FormLabel>
                            <InputGroup>
                                <InputLeftAddon children={<FaToilet />} />
                                <Input required type="number" min={0} />
                            </InputGroup>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Description</FormLabel>
                            <Textarea />
                        </FormControl>
                        <FormControl>
                            <Checkbox>Pet friendly?</Checkbox>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Kind of room</FormLabel>
                            <Select placeholder="Choose a kind">
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
                                        <Checkbox>{amenity.name}</Checkbox>
                                        <FormHelperText>{amenity.description}</FormHelperText>
                                    </Box>)}
                            </Grid>
                        </FormControl>
                    </VStack>
                </Container>
            </Box>
        </ProtectedPage>
    )
}