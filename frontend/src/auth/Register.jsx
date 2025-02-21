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

import toast from "react-hot-toast";
import { useUserStore } from "../store/useUserStore";
const Register = ({ bg }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const { signup, checkingAuth } = useUserStore();

  const validateForm = () => {
    if (!formData.firstName.trim()) {
      toast.error("First name is required");
      return false;
    }
    if (!formData.lastName.trim()) {
      toast.error("Last name is required");
      return false;
    }
    if (!formData.email.trim()) {
      toast.error("Email is required");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      toast.error("Invalid email format");
      return false;
    }
    if (!formData.password) {
      toast.error("Password is required");
      return false;
    }
    if (formData.password.length < 8) {
      toast.error("Password must be at least 6 characters");
      return false;
    }
    return true;
  };
  const isLargeScreen = useBreakpointValue({ base: false, md: true });
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate(`/login`);
  };

  const handleRegister = (e) => {
    e.preventDefault();

    const success = validateForm();

    if (success === true) {
      console.log("Form Data being sent to signup:", formData);
      signup(formData);
      navigate("/login");
    }
  };
  const textColor = useColorModeValue("gray.600", "gray.200");

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
          action="/register"
          method="POST"
          onSubmit={handleRegister}
          style={{ display: "flex", flexDirection: "column", gap: "24px" }}
        >
          <Heading as="h2" size="lg" textAlign="center" mb={6}>
            Create a new Account
          </Heading>

          <Box display="flex" gap={4}>
            <FormControl id="firstName" isRequired>
              <FormLabel fontSize="sm">Firstname</FormLabel>
              <Input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={(e) =>
                  setFormData({ ...formData, firstName: e.target.value })
                }
                placeholder="Firstname"
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
            <FormControl id="lastName" isRequired>
              <FormLabel fontSize="sm">Lastname</FormLabel>
              <Input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={(e) =>
                  setFormData({ ...formData, lastName: e.target.value })
                }
                placeholder="Lastname"
                minLength={5}
                maxLength={5}
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
          </Box>

          <FormControl id="email" isRequired>
            <FormLabel fontSize="sm">Email</FormLabel>
            <Input
              type="email"
              name="email"
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

          <Box display="flex" gap={4}>
            <FormControl id="password" isRequired>
              <FormLabel fontSize="sm">Password</FormLabel>
              <Input
                type="password"
                name="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                placeholder="Password"
                minLength={8}
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
          </Box>

          <Button
            type="submit"
            bg="black"
            color="white"
            w="full"
            p={3}
            _hover={{ bg: "gray.700" }}
            mt={4}
          >
            Sign Up
          </Button>

          <Text textAlign="center" fontSize="sm" mt={4}>
            Already have an account?{" "}
            <a
              onClick={handleLogin}
              style={{
                fontWeight: "bold",
                textDecoration: "underline",
              }}
            >
              Sign In
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

export default Register;
