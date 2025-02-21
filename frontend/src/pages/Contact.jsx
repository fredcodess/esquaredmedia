import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  Heading,
  Stack,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useState } from "react";
import { contactStore } from "../store/contactStore";
import { useNavigate } from "react-router-dom";

const Contact = ({ bg }) => {
  const isLargeScreen = useBreakpointValue({ base: false, md: true });
  const { contact } = contactStore();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    description: "",
    message: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    contact(formData);
    navigate("/");
  };
  return (
    <Box
      bg={bg}
      p={8}
      rounded="lg"
      display="flex"
      justifyContent="space-around"
    >
      <Box p={8} w="full" md={{ w: "50%" }}>
        <form
          action="/contact"
          method="POST"
          style={{ display: "flex", flexDirection: "column", gap: "24px" }}
          onSubmit={handleSubmit}
        >
          <Heading as="h2" size="lg" textAlign="center" mb={8}>
            Contact
          </Heading>

          <FormControl id="fullname" isRequired>
            <FormLabel fontSize="sm" mb={2}>
              Full Name
            </FormLabel>
            <Input
              type="text"
              name="fullname"
              required
              focusBorderColor="blue.200"
              borderColor="gray.300"
              _focus={{
                borderColor: "gray.700",
                ring: "1px",
                ringColor: "blue.200",
              }}
              value={formData.fullname}
              onChange={(e) =>
                setFormData({ ...formData, fullname: e.target.value })
              }
            />
          </FormControl>

          <FormControl id="email" isRequired>
            <FormLabel fontSize="sm" mb={2}>
              Email
            </FormLabel>
            <Input
              type="email"
              name="email"
              required
              focusBorderColor="blue.200"
              borderColor="gray.300"
              _focus={{
                borderColor: "gray.700",
                ring: "1px",
                ringColor: "blue.200",
              }}
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </FormControl>

          <FormControl id="subject" isRequired>
            <FormLabel fontSize="sm" mb={2}>
              Subject
            </FormLabel>
            <Input
              type="text"
              name="subject"
              required
              focusBorderColor="blue.200"
              borderColor="gray.300"
              _focus={{
                borderColor: "gray.700",
                ring: "1px",
                ringColor: "blue.200",
              }}
              value={formData.subject}
              onChange={(e) =>
                setFormData({ ...formData, subject: e.target.value })
              }
            />
          </FormControl>

          <FormControl id="message" isRequired>
            <FormLabel fontSize="sm" mb={2}>
              Message
            </FormLabel>
            <Textarea
              name="message"
              required
              focusBorderColor="blue.200"
              borderColor="gray.300"
              _focus={{
                borderColor: "gray.700",
                ring: "1px",
                ringColor: "blue.200",
              }}
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
            />
          </FormControl>

          <input type="hidden" name="response" />

          <Button
            type="submit"
            bg="black"
            color="white"
            w="full"
            p={2}
            _hover={{ bg: "gray.700" }}
            mt={4}
            size="sm"
          >
            Submit
          </Button>
        </form>
      </Box>

      {isLargeScreen && (
        <Box
          className="login-img"
          display="flex"
          alignItems="center"
          justifyContent="center"
          ml={8}
        >
          <video
            src="/media/contact-video.mp4"
            autoPlay
            muted
            loop
            className="w-[500px] h-[600px] rounded-lg"
          ></video>
        </Box>
      )}
    </Box>
  );
};

export default Contact;
