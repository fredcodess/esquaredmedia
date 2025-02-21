// pages/AnswerFQs.jsx
import { Box, Heading } from "@chakra-ui/react";
import ContactsTable from "../components/ContactsTable";

const AnswerFQs = () => {
  return (
    <Box p={5}>
      <Heading as="h1" size="xl" mb={5}>
        Contact Enquiries
      </Heading>
      <ContactsTable />
    </Box>
  );
};

export default AnswerFQs;
