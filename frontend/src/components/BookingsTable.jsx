import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  useDisclosure,
  Button,
  Textarea,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Box,
  Flex,
  Heading,
  Text,
  useBreakpointValue,
  useColorModeValue,
  useColorMode,
  Input,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { DeleteIcon, EmailIcon } from "@chakra-ui/icons";
import useBookingStore from "../store/useBookingStore";
import { useEffect, useState } from "react";

const BookingsTable = () => {
  const {
    bookings,
    loading,
    error,
    fetchBookings,
    deleteBooking,
    sendEmailResponse,
  } = useBookingStore();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [responseText, setResponseText] = useState("");
  const [filter, setFilter] = useState("all");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const toast = useToast();
  const { colorMode } = useColorMode();

  const isMobile = useBreakpointValue({ base: true, md: false });

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  const handleRespond = async () => {
    if (!responseText.trim()) {
      toast({
        title: "Error",
        description: "Response cannot be empty.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    await sendEmailResponse(selectedBooking._id, responseText);
    onClose();
    toast({
      title: "Success",
      description: "Response sent and booking updated.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const filteredBookings = bookings.filter((booking) => {
    const bookingDate = new Date(booking.selectedDate);

    if (filter === "pending") return booking.status === "Pending";
    if (filter === "responded") return booking.status === "Responded";

    if (startDate && endDate) {
      const start = new Date(startDate);
      start.setUTCHours(0, 0, 0, 0);
      const end = new Date(endDate);
      end.setUTCHours(23, 59, 59, 999);

      if (end < start) {
        toast({
          title: "Invalid Date Range",
          description: "End date cannot be before start date.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        return true;
      }

      return bookingDate >= start && bookingDate <= end;
    }
    return true;
  });

  const bgColor = useColorModeValue("white", "gray.800");
  const tableHoverBg = useColorModeValue("gray.100", "gray.700");
  const iconButtonHoverBg = useColorModeValue("blue.100", "blue.600");
  const deleteButtonHoverBg = useColorModeValue("red.100", "red.600");

  const formatISODate = (dateString) => {
    return new Date(dateString).toISOString().split("T")[0];
  };

  if (loading)
    return (
      <Flex justify="center" align="center" h="100vh">
        <Text fontSize="xl" fontWeight="bold">
          Loading...
        </Text>
      </Flex>
    );
  if (error)
    return (
      <Flex justify="center" align="center" h="100vh">
        <Text fontSize="xl" color="red.500">
          Error: {error}
        </Text>
      </Flex>
    );

  return (
    <Box p={6} maxW="container.lg" mx="auto">
      <Heading textAlign="center" mb={6} fontSize={{ base: "2xl", md: "3xl" }}>
        Booking Requests
      </Heading>

      {/* Filter Controls */}
      <Flex
        direction={{ base: "column", md: "row" }}
        mb={4}
        gap={4}
        justify="space-between"
        align="center"
      >
        <Flex gap={2}>
          <Button
            colorScheme={filter === "all" ? "blue" : "gray"}
            onClick={() => setFilter("all")}
            size={{ base: "sm", md: "md" }}
          >
            All
          </Button>
          <Button
            colorScheme={filter === "pending" ? "blue" : "gray"}
            onClick={() => setFilter("pending")}
            size={{ base: "sm", md: "md" }}
          >
            Pending
          </Button>
          <Button
            colorScheme={filter === "responded" ? "blue" : "gray"}
            onClick={() => setFilter("responded")}
            size={{ base: "sm", md: "md" }}
          >
            Responded
          </Button>
        </Flex>
        <Flex
          direction={{ base: "column", md: "row" }}
          gap={4}
          w={{ base: "100%", md: "auto" }}
        >
          <FormControl>
            <FormLabel fontSize={{ base: "sm", md: "md" }}>
              Start Date
            </FormLabel>
            <Input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              size={{ base: "sm", md: "md" }}
              max={endDate || undefined}
            />
          </FormControl>
          <FormControl>
            <FormLabel fontSize={{ base: "sm", md: "md" }}>End Date</FormLabel>
            <Input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              size={{ base: "sm", md: "md" }}
              min={startDate || undefined}
            />
          </FormControl>
        </Flex>
      </Flex>

      {startDate && endDate && (
        <Text mb={2} fontSize={{ base: "sm", md: "md" }}>
          Showing bookings from {new Date(startDate).toLocaleDateString()} to{" "}
          {new Date(endDate).toLocaleDateString()}
        </Text>
      )}

      <Box
        borderRadius="lg"
        overflowX="auto"
        boxShadow="lg"
        bg={bgColor}
        backdropFilter="blur(10px)"
        p={4}
      >
        <Table variant="simple" size={{ base: "sm", md: "md" }}>
          <Thead bg="black">
            <Tr>
              <Th color="white">Name</Th>
              <Th color="white">Email</Th>
              {!isMobile && <Th color="white">Type & Service</Th>}
              <Th color="white">Date</Th>
              <Th color="white">Status</Th>
              <Th color="white">Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredBookings.map((booking) => (
              <Tr
                key={booking._id}
                _hover={{ bg: tableHoverBg, transition: "0.2s" }}
              >
                <Td fontWeight="bold">{booking.fullname}</Td>
                <Td fontSize={{ base: "xs", md: "md" }}>{booking.email}</Td>
                {!isMobile && <Td>{booking.service_type}</Td>}
                <Td>{formatISODate(booking.selectedDate)}</Td>
                <Td>
                  <Text
                    fontWeight="bold"
                    color={
                      booking.status === "Pending" ? "orange.500" : "green.500"
                    }
                  >
                    {booking.status}
                  </Text>
                </Td>
                <Td>
                  <Flex direction={{ base: "column", md: "row" }} gap={2}>
                    <IconButton
                      aria-label="Respond"
                      icon={<EmailIcon />}
                      colorScheme="blue"
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setSelectedBooking(booking);
                        onOpen();
                      }}
                      _hover={{ bg: iconButtonHoverBg }}
                    />
                    <IconButton
                      aria-label="Delete"
                      icon={<DeleteIcon />}
                      colorScheme="red"
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteBooking(booking._id)}
                      _hover={{ bg: deleteButtonHoverBg }}
                    />
                  </Flex>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>

      {/* Respond Modal */}
      {selectedBooking && (
        <Modal
          isOpen={isOpen}
          onClose={onClose}
          size={{ base: "full", md: "lg" }}
        >
          <ModalOverlay />
          <ModalContent borderRadius="lg" p={4} bg={bgColor}>
            <ModalHeader fontSize={{ base: "lg", md: "xl" }}>
              Respond to {selectedBooking.fullname}
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Box mb={4}>
                <Text>Day: {selectedBooking.selectedDay}</Text>
                {selectedBooking.startTime && (
                  <Text>Start Time: {selectedBooking.startTime}</Text>
                )}
                {selectedBooking.endTime && (
                  <Text>End Time: {selectedBooking.endTime}</Text>
                )}
              </Box>
              <Textarea
                placeholder="Type your response here..."
                value={responseText}
                onChange={(e) => setResponseText(e.target.value)}
                size="lg"
                _focus={{
                  borderColor: "transparent",
                  boxShadow: "none",
                }}
                _focusVisible={{
                  borderColor: "transparent",
                  boxShadow: "none",
                }}
              />
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" onClick={handleRespond} w="full">
                Send Response
              </Button>
              <Button variant="ghost" onClick={onClose} ml={3} w="full">
                Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </Box>
  );
};

export default BookingsTable;
