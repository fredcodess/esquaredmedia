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
            {bookings.map((booking) => (
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
