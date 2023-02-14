import { Avatar, Box, Button, Container, Grid, GridItem, Heading, HStack, Image, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Skeleton, Text, useToast, VStack } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { checkBooking, createBooking, getRoom, getRoomReviews } from "../api";
import { IReview, IRoomDetail } from "../type";
import { FaStar } from "react-icons/fa";
import Calendar from "react-calendar"
// import "react-calendar/dist/Calendar.css"
import "../css/calendar.css"
import { useState } from "react";
import { Helmet } from "react-helmet";

// TODO : show un-booking-able date
export default function RoomDetail() {
    const { roomPK } = useParams();
    const { isLoading, data } = useQuery<IRoomDetail>(["room", roomPK], getRoom);
    const { isLoading: isReviewLoading, data: reviewData } = useQuery<IReview[]>(['rooms', roomPK, 'reviews'], getRoomReviews);
    const [dates, setDates] = useState<Date[]>();
    const [guests, setGuests] = useState<number>(1);
    const toast = useToast();

    const { data: checkBookingData, isLoading: isLoadingCheckBookingData } = useQuery(
        ["check", roomPK, dates],
        checkBooking,
        {
            cacheTime: 0,
            enabled: dates !== undefined,
        }
    );

    const bookingMutation = useMutation(createBooking, {
        onSuccess: (data: any) => {
            toast({
                status: "success",
                title: "booking complete",
                description: `${data}`
            });

            // TODO : navigate to booking confirm page
        },
        onError: (data: any) => {
            // TODO : when reservation failed.
        },
    });

    const onBooking = () => {
        if (roomPK && dates && dates.length == 2) {
            bookingMutation.mutate({
                roomPk: roomPK,
                guests: guests,
                check_in: dates[0],
                check_out: dates[1],
            });
        }
    }

    return (
        <Box
            pb={40}
            mt={10}
            px={{
                base: 10,
                lg: 40,
            }}
        >
            <Helmet>
                <title>{data ? data.name : "Loading..."}</title>
            </Helmet>
            <Heading>{data?.name}</Heading>
            <Grid
                mt={8}
                rounded="xl"
                overflow={"hidden"}
                gap={2}
                height="60vh"
                templateRows={"1fr 1fr"}
                templateColumns={"repeat(4, 1fr)"}
            >
                {data?.photos.map((photo, index) => (
                    <GridItem
                        colSpan={index === 0 ? 2 : 1}
                        rowSpan={index === 0 ? 2 : 1}
                        overflow={"hidden"}
                        key={index}
                    >
                        <Skeleton isLoaded={!isLoading} h="100%" w="100%">
                            <Image
                                objectFit={"cover"}
                                w="100%"
                                h="100%"
                                src={photo.url}
                            />
                        </Skeleton>
                    </GridItem>
                ))}
            </Grid>
            <Grid gap={20} templateColumns={"2fr 1fr"} maxWidth={"container.lg"}>
                <Box>
                    <HStack justifyContent={"space-between"} marginTop={10}>
                        <VStack alignItems={"flex-start"}>
                            <Heading fontSize={"2xl"}>
                                House hosted by {data?.owner.name}
                            </Heading>
                            <HStack>
                                <Text>
                                    {data?.toilets} toilet{data?.toilets === 1 ? "" : "s"}
                                </Text>
                                <Text>∙</Text>
                                <Text>
                                    {data?.rooms} room{data?.rooms === 1 ? "" : "s"}
                                </Text>
                            </HStack>
                        </VStack>
                        <Avatar name={data?.owner.name} size={"xl"} src={data?.owner.avatar} />
                    </HStack>
                    <Box>
                        <Heading>
                            <HStack>
                                <FaStar /> <Text>{data?.rating}</Text>
                                <Text>∙</Text>
                                <Text>
                                    {reviewData?.length} review
                                    {reviewData?.length === 1 ? "" : "s"}
                                </Text>
                            </HStack>
                        </Heading>
                        <Container marginTop={16} maxWidth={"container.lg"} marginX={"none"}>
                            <Grid gap={10} templateColumns={"1fr 1fr"}>
                                {reviewData?.map((review, index) => (
                                    <VStack alignItems={"flex-start"} key={index}>
                                        <HStack>
                                            <Avatar name={review.user.name} src={review.user.avatar} size={"md"} />
                                            <VStack spacing={0} alignItems={"flex-start"}>
                                                <Heading fontSize={"md"}>
                                                    {review.user.name}
                                                </Heading>
                                                <HStack spacing={1}>
                                                    <FaStar size={"12px"} />
                                                    <Text>{review.rating}</Text>
                                                </HStack>
                                            </VStack>
                                        </HStack>
                                        <Text>{review.comment}</Text>
                                    </VStack>
                                ))}
                            </Grid>
                        </Container>
                        <Box paddingTop={10}>
                            <Calendar
                                goToRangeStartOnSelect
                                selectRange
                                onChange={setDates}
                                prev2Label={null}
                                next2Label={null}
                                minDetail={"month"}
                                minDate={new Date()}
                                maxDate={new Date(Date.now() + 60 * 60 * 24 * 7 * 4 * 6 * 1000)}
                            />
                            <HStack marginTop={5} justifyContent={"space-between"} >
                                <Text>Guests</Text>
                                <NumberInput
                                    value={guests}
                                    min={1}
                                    onChange={(valueString) => setGuests(parseInt(valueString))}>
                                    <NumberInputField />
                                    <NumberInputStepper>
                                        <NumberIncrementStepper />
                                        <NumberDecrementStepper />
                                    </NumberInputStepper>
                                </NumberInput>
                            </HStack>
                            <Button
                                onClick={onBooking}
                                disabled={!checkBookingData?.ok}
                                isLoading={isLoadingCheckBookingData && dates !== undefined}
                                my={5}
                                width={"100%"}
                                colorScheme={"red"}>
                                Make Booking
                            </Button>
                            {!isLoadingCheckBookingData
                                && !checkBookingData?.ok ? (
                                <Text color={"red.500"}>Sorry, Can't book on those dates.</Text>
                            ) : null}
                        </Box>
                    </Box>
                </Box>
            </Grid>
        </Box>
    );
}