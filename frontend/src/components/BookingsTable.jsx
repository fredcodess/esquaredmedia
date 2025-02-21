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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <Table variant="striped" colorScheme="teal">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Email</Th>
            <Th>Type & Service</Th>
            <Th>Date</Th>
            <Th>Status</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {bookings.map((booking) => (
            <Tr key={booking._id}>
              <Td>{booking.fullname}</Td>
              <Td>{booking.email}</Td>
              <Td>
                {booking.event_type} {"&"} {booking.service_type}
              </Td>
              <Td>{booking.event_date}</Td>
              <Td>{booking.status}</Td>
              <Td>
                <IconButton
                  aria-label="Respond"
                  icon={<EmailIcon />}
                  colorScheme="blue"
                  onClick={() => {
                    setSelectedBooking(booking);
                    onOpen();
                  }}
                  mr={2}
                />
                <IconButton
                  aria-label="Delete"
                  icon={<DeleteIcon />}
                  colorScheme="red"
                  onClick={() => deleteBooking(booking._id)}
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      {selectedBooking && (
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Respond to {selectedBooking.name}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Textarea
                placeholder="Type your response here..."
                value={responseText}
                onChange={(e) => setResponseText(e.target.value)}
              />
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={handleRespond}>
                Send Response
              </Button>
              <Button variant="ghost" onClick={onClose}>
                Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </>
  );
};

export default BookingsTable;
