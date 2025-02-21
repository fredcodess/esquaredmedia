// components/ContactsTable.jsx
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
    onClose();
    toast({
      title: "Success",
      description: "Response sent and contact updated.",
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
            <Th>Subject</Th>
            <Th>Message</Th>
            <Th>Status</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {contacts.map((contact) => (
            <Tr key={contact._id}>
              <Td>{contact.name}</Td>
              <Td>{contact.email}</Td>
              <Td>{contact.subject}</Td>
              <Td>{contact.message}</Td>
              <Td>{contact.status}</Td>
              <Td>
                <IconButton
                  aria-label="Respond"
                  icon={<EmailIcon />}
                  colorScheme="blue"
                  onClick={() => {
                    setSelectedContact(contact);
                    onOpen();
                  }}
                  mr={2}
                />
                <IconButton
                  aria-label="Delete"
                  icon={<DeleteIcon />}
                  colorScheme="red"
                  onClick={() => deleteContact(contact._id)}
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      {/* Respond Modal */}
      {selectedContact && (
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Respond to {selectedContact.name}</ModalHeader>
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

export default ContactsTable;
