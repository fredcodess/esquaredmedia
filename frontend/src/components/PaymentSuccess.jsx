import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Heading, Text, Spinner, VStack } from "@chakra-ui/react";
import useBookingStore from "../store/useBookingStore";

const PaymentSuccess = ({ bg }) => {
  const navigate = useNavigate();
  const { booking } = useBookingStore();
  const hasBooked = useRef(false);

  useEffect(() => {
    const storeBooking = async () => {
      if (hasBooked.current) return;

      const bookingData = JSON.parse(localStorage.getItem("bookingData"));
      if (bookingData) {
        await booking(bookingData);
        hasBooked.current = true;
      }
      [
        "bookingData",
        "selectedDate",
        "selectedDay",
        "selectedPlan",
        "selectedTime",
      ].forEach((item) => {
        localStorage.removeItem(item);
      });
      setTimeout(() => {
        navigate("/");
      }, 5000);
    };

    storeBooking();
  }, [navigate, booking]);

  return (
    <Box
      minH="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      bg={bg}
    >
      <VStack
        p={8}
        bg="white"
        boxShadow="lg"
        borderRadius="xl"
        textAlign="center"
        spacing={4}
      >
        <Heading color="teal.500">🎉 Payment Successful!</Heading>
        <Text color="gray.600">
          Your booking has been confirmed. Redirecting you to the homepage...
        </Text>
        <Spinner size="lg" color="teal.500" />
      </VStack>
    </Box>
  );
};

export default PaymentSuccess;
