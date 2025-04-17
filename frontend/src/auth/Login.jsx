import React, { useState, useEffect } from "react";
import {
  Box,
  FormControl,
  Input,
  Button,
  Heading,
  Text,
  VStack,
  HStack,
  Divider,
  useColorModeValue,
  Icon,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../store/useUserStore";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaGithub } from "react-icons/fa";
import { toast } from "react-hot-toast";

const Login = ({ bg }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { login, googleLogin, checkingAuth, user } = useUserStore();
  const navigate = useNavigate();
  const textColor = useColorModeValue("gray.600", "gray.200");
  const cardBg = useColorModeValue("white", "gray.800");
  const buttonTextColor = useColorModeValue("white", "black");
  const buttonBg = useColorModeValue("black", "gray.200");

  const handleRegister = () => navigate("/register");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(formData);
      const role = useUserStore.getState().user?.role;
      if (role === "admin") {
        navigate("/manage-bookings");
      } else if (role === "customer") {
        navigate("/");
        toast.success("Logged In Successfully");
      }
    } catch (error) {
      console.error("Login failed:", error);
      toast.error("An error occurred");
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = import.meta.env.VITE_GOOGLE_AUTH_URL;
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
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg={bg}
      p={{ base: 4, md: 8 }}
    >
      <Box
        w="100%"
        maxW="md"
        bg={cardBg}
        p={{ base: 6, md: 8 }}
        rounded="2xl"
        shadow="xl"
      >
        <VStack spacing={6}>
          <Heading as="h1" size="xl" fontWeight="800" letterSpacing="tight">
            Welcome Back
          </Heading>
          <Text color={textColor} textAlign="center">
            Sign in to continue to your account
          </Text>

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

          <HStack w="full" my={4}>
            <Divider />
            <Text fontSize="sm" px={2} color="gray.500">
              OR
            </Text>
            <Divider />
          </HStack>

          <form onSubmit={handleLogin} style={{ width: "100%" }}>
            <VStack spacing={5} w="full">
              <FormControl id="email">
                <Input
                  type="email"
                  placeholder="Email address"
                  size="lg"
                  borderRadius="lg"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  focusBorderColor="blue.500"
                />
              </FormControl>

              <FormControl id="password">
                <Input
                  type="password"
                  placeholder="Password"
                  size="lg"
                  borderRadius="lg"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
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
                isLoading={checkingAuth}
                _hover={{ transform: "translateY(-1px)", shadow: "md" }}
              >
                Sign In
              </Button>
            </VStack>
          </form>

          <Text textAlign="center" fontSize="sm" color={textColor}>
            Don't have an account?{" "}
            <Button
              variant="link"
              onClick={handleRegister}
              _hover={{ textDecoration: "underline" }}
            >
              Create account
            </Button>
          </Text>
        </VStack>
      </Box>
    </Box>
  );
};

export default Login;
