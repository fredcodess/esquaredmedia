import { useEffect, useState } from "react";
import { format } from "date-fns";
import {
  Box,
  Heading,
  Text,
  Input,
  Button,
  Flex,
  Card,
  VStack,
  HStack,
  Icon,
  Divider,
} from "@chakra-ui/react";
import { FiLock, FiCalendar, FiMapPin, FiUser, FiMail } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import useBookingStore from "../store/useBookingStore";

const Checkout = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [selectedDetails, setSelectedDetails] = useState(null);
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    eventLocation: "",
  });

  const navigate = useNavigate();
  const { handleCheckout } = useBookingStore();

  useEffect(() => {
    const plan = localStorage.getItem("selectedPlan");
    if (plan) {
      setSelectedPlan(JSON.parse(plan));
    } else {
      navigate("/");
    }

    const selectedTime = localStorage.getItem("selectedTime");
    if (selectedTime) {
      setSelectedDetails(JSON.parse(selectedTime));
    }
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePayment = async () => {
    if (!formData.userName || !formData.email || !formData.eventLocation) {
      alert("Please fill in all fields before proceeding.");
      return;
    }

    const bookingData = {
      fullname: formData.userName,
      email: formData.email,
      location: formData.eventLocation,
      price: selectedPlan.price,
      service_type: selectedPlan.name,
      selectedDate: selectedDetails.selectedDate,
      startTime: selectedDetails.startTime,
      endTime: selectedDetails.endTime,
      selectedDay: selectedDetails.selectedDay,
    };

    localStorage.setItem("bookingData", JSON.stringify(bookingData));

    try {
      await handleCheckout(selectedPlan.price, formData.email);
    } catch (error) {
      console.error("Checkout failed:", error);
    }
  };

  if (!selectedPlan || !selectedDetails) return <div>Loading...</div>;

  const formattedDate = format(
    new Date(selectedDetails.selectedDate),
    "MM/dd/yyyy"
  );

  return (
    <Flex
      justify="center"
      align="center"
      minH="100vh"
      bg="gray.50"
      p={{ base: 4, md: 0 }}
    >
      <Card
        p={8}
        w="100%"
        maxW="900px"
        boxShadow="xl"
        borderRadius="2xl"
        border="1px solid"
        borderColor="gray.100"
        bg="white"
      >
        <Flex
          direction={{ base: "column", md: "row" }}
          gap={8}
          justify="space-between"
        >
          {/* Plan Summary */}
          <VStack align="start" spacing={6} flex={1}>
            <Heading size="lg" fontWeight="700" color="gray.800">
              Your Plan Summary
            </Heading>
            <Box
              p={6}
              bg={`${selectedPlan.bgColor}.100`}
              borderRadius="xl"
              border="2px solid"
              borderColor={`${selectedPlan.bgColor}.200`}
              w="100%"
            >
              <VStack align="start" spacing={3}>
                <Heading size="md" color={`${selectedPlan.bgColor}.700`}>
                  {selectedPlan.name}
                </Heading>
                <Divider borderColor="gray.200" />
                <HStack spacing={4}>
                  <Box
                    bg={`${selectedPlan.bgColor}.50`}
                    p={2}
                    borderRadius="md"
                  >
                    <Text fontSize="sm" color={`${selectedPlan.bgColor}.700`}>
                      🛡️ {selectedPlan.coverage}% Coverage
                    </Text>
                  </Box>
                  <Box
                    bg={`${selectedPlan.bgColor}.50`}
                    p={2}
                    borderRadius="md"
                  >
                    <Text fontSize="sm" color={`${selectedPlan.bgColor}.700`}>
                      💰 ${selectedPlan.price}/mo
                    </Text>
                  </Box>
                </HStack>
                <VStack align="start" spacing={1} mt={4}>
                  <Text fontSize="sm" color="gray.600">
                    Premiums: {selectedPlan.premium}
                  </Text>
                  <Text fontSize="sm" color="gray.600">
                    Out-of-Pocket: {selectedPlan.outOfPocket}
                  </Text>
                </VStack>
              </VStack>
            </Box>
            {/* Selected Date & Time */}
            <Box w="100%" mt={4}>
              <Heading size="sm" mb={3} color="gray.700">
                <Icon as={FiCalendar} mr={2} /> Selected Time & Date
              </Heading>
              <Card p={4} bg="gray.50" borderRadius="lg">
                <VStack align="start" spacing={2}>
                  <HStack>
                    <Text fontSize="sm" fontWeight="500" color="gray.600">
                      📅 {formattedDate}
                    </Text>
                    <Text fontSize="sm" color="gray.500">
                      ({selectedDetails.selectedDay})
                    </Text>
                  </HStack>
                  <Text fontSize="sm" color="gray.600">
                    🕒 {selectedDetails.startTime} - {selectedDetails.endTime}
                  </Text>
                </VStack>
              </Card>
            </Box>
          </VStack>

          <VStack align="start" spacing={6} flex={1}>
            <Heading size="lg" fontWeight="700" color="gray.800">
              Contact Information
            </Heading>
            <VStack w="100%" spacing={4}>
              <Box w="100%">
                <Text mb={2} color="gray.600" fontWeight="500">
                  <Icon as={FiUser} mr={2} /> Full Name
                </Text>
                <Input
                  placeholder="John Doe"
                  name="userName"
                  value={formData.userName}
                  onChange={handleInputChange}
                  variant="filled"
                  focusBorderColor="teal.400"
                  size="lg"
                />
              </Box>
              <Box w="100%">
                <Text mb={2} color="gray.600" fontWeight="500">
                  <Icon as={FiMail} mr={2} /> Email Address
                </Text>
                <Input
                  placeholder="john@example.com"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  variant="filled"
                  focusBorderColor="teal.400"
                  size="lg"
                />
              </Box>
              <Box w="100%">
                <Text mb={2} color="gray.600" fontWeight="500">
                  <Icon as={FiMapPin} mr={2} /> Event Location
                </Text>
                <Input
                  placeholder="123 Main St, City"
                  name="eventLocation"
                  value={formData.eventLocation}
                  onChange={handleInputChange}
                  variant="filled"
                  focusBorderColor="teal.400"
                  size="lg"
                />
              </Box>
              <Button
                colorScheme="teal"
                size="lg"
                w="100%"
                mt={4}
                onClick={handlePayment}
                leftIcon={<FiLock />}
                _hover={{ transform: "translateY(-2px)" }}
                transition="all 0.2s"
              >
                Secure Checkout
              </Button>
            </VStack>
          </VStack>
        </Flex>
      </Card>
    </Flex>
  );
};

export default Checkout;
