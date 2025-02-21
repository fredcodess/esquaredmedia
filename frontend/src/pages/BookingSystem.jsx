import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  VStack,
  HStack,
  useToast,
  Container,
  Heading,
  Text,
} from "@chakra-ui/react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TextField } from "@mui/material";
import useDisabledDatesStore from "../store/useDisabledDatesStore";
import useBookingStore from "../store/useBookingStore";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const muiTheme = createTheme();

const BookingSystem = ({ bg }) => {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    event_type: "",
    service_type: "",
    event_date: "",
    event_time: "",
    event_location: "",
    additional_info: "",
  });

  const [selectedDate, setSelectedDate] = useState(null);
  const { disabledDates, fetchDisabledDates } = useDisabledDatesStore();
  const [depositAmount, setDepositAmount] = useState(0);
  const { booking, handleCheckout } = useBookingStore();
  const toast = useToast();

  useEffect(() => {
    fetchDisabledDates();
  }, [fetchDisabledDates]);

  useEffect(() => {
    if (formData.event_date) {
      setSelectedDate(new Date(formData.event_date));
    }
  }, [formData.event_date]);

  useEffect(() => {
    calculateDeposit();
  }, [formData.event_type, formData.service_type]);

  const shouldDisableDate = (date) => {
    const formattedDate = date.toISOString().split("T")[0];
    return disabledDates.some(
      (disabledDate) =>
        new Date(disabledDate).toISOString().split("T")[0] === formattedDate
    );
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDateChange = (date) => {
    if (!date) return;
    setSelectedDate(date);
    setFormData((prev) => ({
      ...prev,
      event_date: date.toISOString().split("T")[0],
    }));
  };

  const calculateDeposit = () => {
    let amount = 0;
    if (formData.event_type === "Wedding") {
      if (formData.service_type === "Catering") amount = 200;
      if (formData.service_type === "Audio/Visual") amount = 150;
    } else if (formData.event_type === "Conference") {
      if (formData.service_type === "Security") amount = 100;
      if (formData.service_type === "Decorations") amount = 120;
    }
    setDepositAmount(amount);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !formData.fullname ||
      !formData.email ||
      !formData.event_type ||
      !formData.service_type ||
      !formData.event_date ||
      !formData.event_time
    ) {
      toast({
        title: "Missing Fields",
        description: "Please fill out all required fields before submitting.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }
    booking(formData);
    toast({
      title: "Booking Submitted",
      description: "Your event booking has been submitted successfully.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  const handlePayment = (e) => {
    e.preventDefault();
    if (depositAmount === 0) {
      toast({
        title: "No Deposit Required",
        description: "This booking does not require a deposit payment.",
        status: "info",
        duration: 5000,
        isClosable: true,
      });
      return;
    }
    handleCheckout(depositAmount, formData.email);
    booking(formData);
  };

  return (
    <Box bg={bg} py={24}>
      <Container maxW="container.lg" p={8} rounded="2xl" boxShadow="lg">
        <VStack spacing={6} p={8} align="stretch">
          <Heading size="xl" textAlign="center">
            Event Booking
          </Heading>
          <Text textAlign="center">
            Fill in the details below to book your event.
          </Text>

          <form onSubmit={handlePayment}>
            <VStack spacing={4} align="stretch">
              <FormControl isRequired>
                <FormLabel>Full Name</FormLabel>
                <Input
                  type="text"
                  name="fullname"
                  value={formData.fullname}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  size="lg"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  size="lg"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Event Type</FormLabel>
                <Select
                  name="event_type"
                  value={formData.event_type}
                  onChange={handleInputChange}
                  placeholder="Select event type"
                  size="lg"
                >
                  <option value="Conference">Conference</option>
                  <option value="Wedding">Wedding</option>
                  <option value="Seminar">Seminar</option>
                  <option value="Workshop">Workshop</option>
                </Select>
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Service Type</FormLabel>
                <Select
                  name="service_type"
                  value={formData.service_type}
                  onChange={handleInputChange}
                  placeholder="Select service type"
                  size="lg"
                >
                  <option value="Catering">Catering</option>
                  <option value="Audio/Visual">Audio/Visual</option>
                  <option value="Decorations">Decorations</option>
                  <option value="Security">Security</option>
                </Select>
              </FormControl>

              {depositAmount > 0 && (
                <Text fontSize="lg" fontWeight="bold" color="green.500">
                  Deposit Required: ${depositAmount}
                </Text>
              )}

              <HStack spacing={4}>
                <FormControl isRequired>
                  <ThemeProvider theme={muiTheme}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        label="Select a date"
                        value={selectedDate}
                        onChange={handleDateChange}
                        shouldDisableDate={shouldDisableDate}
                        renderInput={(params) => (
                          <TextField {...params} fullWidth size="small" />
                        )}
                      />
                    </LocalizationProvider>
                  </ThemeProvider>
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Event Time</FormLabel>
                  <Input
                    type="time"
                    name="event_time"
                    value={formData.event_time}
                    onChange={handleInputChange}
                    size="lg"
                  />
                </FormControl>
              </HStack>

              <FormControl isRequired>
                <FormLabel>Event Location</FormLabel>
                <Input
                  type="text"
                  name="event_location"
                  value={formData.event_location}
                  onChange={handleInputChange}
                  placeholder="Enter event location"
                  size="lg"
                />
              </FormControl>

              <FormControl>
                <FormLabel>Additional Information</FormLabel>
                <Textarea
                  name="additional_info"
                  value={formData.additional_info}
                  onChange={handleInputChange}
                  placeholder="Enter any additional information"
                  size="lg"
                />
              </FormControl>

              <Button colorScheme="blue" type="submit" size="lg">
                Submit & Pay Deposit
              </Button>
            </VStack>
          </form>
        </VStack>
      </Container>
    </Box>
  );
};

export default BookingSystem;
