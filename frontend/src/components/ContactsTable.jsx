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
import useContactStore from "../store/useContactStore";
import { useEffect, useState } from "react";

const ContactsTable = () => {
  const {
    contacts,
    loading,
    error,
    fetchContacts,
    deleteContact,
    sendEmailResponse,
  } = useContactStore();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedContact, setSelectedContact] = useState(null);
  const [responseText, setResponseText] = useState("");
  const toast = useToast();
  const { colorMode } = useColorMode();

  const isMobile = useBreakpointValue({ base: true, md: false });

  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

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

    await sendEmailResponse(selectedContact._id, responseText);
    handleClose();
    toast({
      title: "Success",
      description: "Response sent and contact updated.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const handleClose = () => {
    onClose();
    setResponseText("");
  };

  const bgColor = useColorModeValue("rgba(255, 255, 255, 0.8)", "gray.800");
  const tableHoverBg = useColorModeValue("gray.100", "gray.700");
  const iconButtonHoverBg = useColorModeValue("blue.100", "blue.600");
  const deleteButtonHoverBg = useColorModeValue("red.100", "red.600");

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
              {!isMobile && <Th color="white">Subject</Th>}
              <Th color="white">Status</Th>
              <Th color="white">Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {contacts.map((contact) => (
              <Tr
                key={contact._id}
                _hover={{ bg: tableHoverBg, transition: "0.2s" }}
              >
                <Td fontWeight="bold">{contact.fullname}</Td>
                <Td fontSize={{ base: "xs", md: "md" }}>{contact.email}</Td>
                {!isMobile && <Td>{contact.subject}</Td>}
                <Td>
                  <Text
                    fontWeight="bold"
                    color={
                      contact.status === "Pending" ? "orange.500" : "green.500"
                    }
                  >
                    {contact.status}
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
                        setSelectedContact(contact);
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
                      onClick={() => deleteContact(contact._id)}
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
      {selectedContact && (
        <Modal
          isOpen={isOpen}
          onClose={handleClose}
          size={{ base: "full", md: "lg" }}
        >
          <ModalOverlay />
          <ModalContent borderRadius="lg" p={4} bg={bgColor}>
            <ModalHeader fontSize={{ base: "lg", md: "xl" }}>
              Respond to {selectedContact.fullname}
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Box mb={4}>
                <Text fontWeight="bold" mb={2}>
                  Original Message:
                </Text>
                <Text>{selectedContact.message}</Text>
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
              <Button variant="ghost" onClick={handleClose} ml={3} w="full">
                Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </Box>
  );
};

export default ContactsTable;
