import React, { useState } from "react";

import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Heading,
  Text,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../store/useUserStore";

const Login = ({ bg }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { login, checkingAuth } = useUserStore();
  // Check if the screen size is large enough to show the image section
  const isLargeScreen = useBreakpointValue({ base: false, md: true });
  const navigate = useNavigate();
  const textColor = useColorModeValue("gray.600", "gray.200");

  const handleRegister = () => {
    navigate(`/register`);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    login(formData);
    navigate("/");
  };
  return (
    <Box
      bg={bg}
      p={20}
      rounded="lg"
      display="flex"
      justifyContent="space-around"
    >
      <Box
        w="full"
        md={{ w: "50%" }}
        p={8}
        display="flex"
        flexDirection="column"
        spacing={6}
      >
        <form
          onSubmit={handleLogin}
          style={{ display: "flex", flexDirection: "column", gap: "24px" }}
        >
          <input type="hidden" name="_csrf" value="<%= locals.csrfToken %>" />
          <Heading as="h2" size="lg" textAlign="center" mb={6}>
            Welcome Back
          </Heading>

          {/* Email */}
          <FormControl id="email" isRequired>
            <FormLabel fontSize="sm">Email</FormLabel>
            <Input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              placeholder="Enter your email"
              required
              focusBorderColor="blue.500"
              borderColor="gray.300"
              _focus={{
                borderColor: "gray.700",
                ring: "1px",
                ringColor: "blue.200",
              }}
            />
          </FormControl>

          <FormControl id="password" isRequired>
            <FormLabel fontSize="sm">Password</FormLabel>
            <Input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              required
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              placeholder="********"
              focusBorderColor="blue.500"
              borderColor="gray.300"
              _focus={{
                borderColor: "gray.700",
                ring: "1px",
                ringColor: "blue.200",
              }}
            />
          </FormControl>

          <Button
            type="submit"
            bg="black"
            color="white"
            w="full"
            p={3}
            _hover={{ bg: "gray.700" }}
            mt={4}
          >
            Sign In
          </Button>

          <Text textAlign="center" fontSize="sm" mt={4}>
            Don't have an account?{" "}
            <a
              onClick={handleRegister}
              style={{
                fontWeight: "bold",
                textDecoration: "underline",
              }}
            >
              Register
            </a>
          </Text>
        </form>
      </Box>

      {isLargeScreen && (
        <Box
          p={4}
          display="flex"
          justifyContent="center"
          alignItems="center"
          w="1/2"
        >
          <img
            src="/media/camera.jpg"
            alt="camera"
            style={{
              borderRadius: "8px",
              width: "500px",
              height: "500px",
              objectFit: "cover",
            }}
          />
        </Box>
      )}
    </Box>
  );
};

export default Login;
