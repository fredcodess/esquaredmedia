import { Box, Heading } from "@chakra-ui/react";
import BookingsTable from "../components/BookingsTable";

const ManageBooking = () => {
  return (
    <Box p={5} mt={20}>
      <BookingsTable />
    </Box>
  );
};

export default ManageBooking;
