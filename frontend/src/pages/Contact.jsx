import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  Heading,
  VStack,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { contactStore } from "../store/contactStore";
import { useNavigate } from "react-router-dom";

const MotionBox = motion(Box);
const MotionButton = motion(Button);

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

  const cardBg = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.700", "white");
  const buttonBg = useColorModeValue("black", "gray.200");
  const buttonText = useColorModeValue("white", "black");

  const handleSubmit = (e) => {
    e.preventDefault();
    contact(formData);
    navigate("/");
  };

  return (
    <MotionBox
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg={bg}
      p={{ base: 4, md: 8 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <MotionBox
        w="100%"
        maxW="2xl"
        bg={cardBg}
        p={{ base: 6, md: 8 }}
        rounded="2xl"
        shadow="2xl"
        display="flex"
        gap={8}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <VStack spacing={6} flex={1}>
          <Heading
            as="h1"
            size="xl"
            fontWeight="800"
            letterSpacing="tight"
            color={textColor}
          >
            Get in Touch
          </Heading>

          <form onSubmit={handleSubmit} style={{ width: "100%" }}>
            <VStack spacing={5} w="full">
              <FormControl id="fullname">
                <Input
                  type="text"
                  placeholder="Full Name"
                  size="lg"
                  borderRadius="lg"
                  value={formData.fullname}
                  onChange={(e) =>
                    setFormData({ ...formData, fullname: e.target.value })
                  }
                  variant="filled"
                  _focus={{
                    borderColor: "transparent",
                    boxShadow: "none",
                  }}
                  _focusVisible={{
                    borderColor: "transparent",
                    boxShadow: "none",
                  }}
                />
              </FormControl>

              <FormControl id="email">
                <Input
                  type="email"
                  placeholder="Email Address"
                  size="lg"
                  borderRadius="lg"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  variant="filled"
                  _focus={{
                    borderColor: "transparent",
                    boxShadow: "none",
                  }}
                  _focusVisible={{
                    borderColor: "transparent",
                    boxShadow: "none",
                  }}
                />
              </FormControl>

              <FormControl id="subject">
                <Input
                  type="text"
                  placeholder="Subject"
                  size="lg"
                  borderRadius="lg"
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData({ ...formData, subject: e.target.value })
                  }
                  variant="filled"
                  _focus={{
                    borderColor: "transparent",
                    boxShadow: "none",
                  }}
                  _focusVisible={{
                    borderColor: "transparent",
                    boxShadow: "none",
                  }}
                />
              </FormControl>

              <FormControl id="message">
                <Textarea
                  placeholder="Your Message"
                  size="lg"
                  borderRadius="lg"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  variant="filled"
                  h="150px"
                  _focus={{
                    borderColor: "transparent",
                    boxShadow: "none",
                  }}
                  _focusVisible={{
                    borderColor: "transparent",
                    boxShadow: "none",
                  }}
                />
              </FormControl>

              <MotionButton
                type="submit"
                size="lg"
                w="full"
                bg={buttonBg}
                color={buttonText}
                borderRadius="lg"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
                _hover={{
                  bg: buttonBg,
                  boxShadow: "md",
                }}
                _active={{
                  bg: buttonBg,
                  transform: "translateY(1px)",
                }}
                _focus={{
                  boxShadow: "outline",
                  outline: "none",
                }}
              >
                Send Message
              </MotionButton>
            </VStack>
          </form>
        </VStack>

        {isLargeScreen && (
          <MotionBox
            flex={1}
            position="relative"
            overflow="hidden"
            borderRadius="2xl"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <video
              autoPlay
              muted
              loop
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "1rem",
              }}
            >
              <source src="/media/contact-video.mp4" type="video/mp4" />
            </video>
            <MotionBox
              position="absolute"
              top={0}
              left={0}
              w="full"
              h="full"
              bg="blackAlpha.400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            />
          </MotionBox>
        )}
      </MotionBox>
    </MotionBox>
  );
};

export default Contact;
