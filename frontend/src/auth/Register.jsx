import React, { useEffect, useState } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Heading,
  Text,
  Divider,
  VStack,
  useColorModeValue,
  Flex,
  Icon,
} from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaGithub } from "react-icons/fa";
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

  const { signup } = useUserStore();
  const { googleLogin, checkingAuth, user } = useUserStore();
  const navigate = useNavigate();

  const inputBg = useColorModeValue("gray.100", "gray.700");
  const buttonTextColor = useColorModeValue("white", "black");
  const buttonBg = useColorModeValue("black", "gray.200");

  const validateForm = () => {
    if (!formData.firstName.trim())
      return toast.error("First name is required");
    if (!formData.lastName.trim()) return toast.error("Last name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email))
      return toast.error("Invalid email format");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 8)
      return toast.error("Password must be at least 8 characters");

    return true;
  };

  const handleLogin = () => navigate(`/login`);

  const handleRegister = (e) => {
    e.preventDefault();
    if (validateForm()) {
      signup(formData);
      navigate("/login");
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:5002/api/customer/google";
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get("accessToken");

    if (accessToken && !user) {
      googleLogin(accessToken)
        .then(() => {
          navigate("/");
          window.history.replaceState(
            {},
            document.title,
            window.location.pathname
          );
        })
        .catch((error) => console.error("Google login failed:", error));
    }
  }, [googleLogin, navigate, user]);

  return (
    <Box
      bg={bg}
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      px={4}
    >
      <Flex
        w={{ base: "full", md: "800px" }}
        boxShadow="lg"
        borderRadius="lg"
        overflow="hidden"
        bg={useColorModeValue("white", "gray.800")}
      >
        {/* Left - Registration Form */}
        <Box w={{ base: "full", md: "60%" }} p={8}>
          <Heading as="h2" size="lg" textAlign="center" mb={6}>
            Create an Account
          </Heading>

          <form onSubmit={handleRegister}>
            <Flex gap={4}>
              <FormControl id="firstName" isRequired>
                <FormLabel fontSize="sm">First Name</FormLabel>
                <Input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) =>
                    setFormData({ ...formData, firstName: e.target.value })
                  }
                  placeholder="First Name"
                  bg={inputBg}
                  focusBorderColor="blue.500"
                />
              </FormControl>

              <FormControl id="lastName" isRequired>
                <FormLabel fontSize="sm">Last Name</FormLabel>
                <Input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) =>
                    setFormData({ ...formData, lastName: e.target.value })
                  }
                  placeholder="Last Name"
                  bg={inputBg}
                  focusBorderColor="blue.500"
                />
              </FormControl>
            </Flex>

            <FormControl id="email" isRequired mt={4}>
              <FormLabel fontSize="sm">Email</FormLabel>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="Enter your email"
                bg={inputBg}
                focusBorderColor="blue.500"
              />
            </FormControl>

            <FormControl id="password" isRequired mt={4}>
              <FormLabel fontSize="sm">Password</FormLabel>
              <Input
                type="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                placeholder="********"
                minLength={8}
                bg={inputBg}
                focusBorderColor="blue.500"
              />
            </FormControl>

            <Button
              type="submit"
              bg={buttonBg}
              color={buttonTextColor}
              size="lg"
              w="full"
              borderRadius="lg"
              _hover={{ transform: "translateY(-1px)", shadow: "md" }}
            >
              Sign Up
            </Button>

            <Text textAlign="center" fontSize="sm" mt={4}>
              Already have an account?{" "}
              <Text
                as="span"
                fontWeight="bold"
                cursor="pointer"
                onClick={handleLogin}
                _hover={{ textDecoration: "underline" }}
              >
                Sign In
              </Text>
            </Text>
          </form>
        </Box>

        <Box
          w={{ base: "full", md: "40%" }}
          p={8}
          bg={useColorModeValue("gray.50", "gray.800")}
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Heading as="h3" size="md" mb={4}>
            Or Sign In With
          </Heading>

          <VStack spacing={4} w="full">
            <Button
              w="full"
              variant="outline"
              leftIcon={<Icon as={FcGoogle} boxSize={5} />}
              onClick={handleGoogleLogin}
              isLoading={checkingAuth}
              _hover={{ bg: useColorModeValue("gray.50", "gray.700") }}
            >
              Continue with Google
            </Button>
            <Button
              w="full"
              variant="outline"
              leftIcon={<Icon as={FaGithub} boxSize={5} />}
              _hover={{ bg: useColorModeValue("gray.50", "gray.700") }}
            >
              Continue with GitHub
            </Button>
            <Button
              w="full"
              variant="outline"
              leftIcon={<Icon as={FaFacebook} boxSize={5} />}
              _hover={{ bg: useColorModeValue("gray.50", "gray.700") }}
            >
              Continue with Facebook
            </Button>
          </VStack>
        </Box>
      </Flex>
    </Box>
  );
};

export default Register;
