import { Box, Heading } from "@chakra-ui/react";
import BookingsTable from "../components/BookingsTable";

const ManageBooking = () => {
  return (
    <Box p={5}>
      <Heading as="h1" size="xl" mb={5}>
        Manage Bookings
      </Heading>
      <BookingsTable />
    </Box>
  );
};

export default ManageBooking;
