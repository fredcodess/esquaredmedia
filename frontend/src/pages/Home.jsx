import {
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  Text,
  useColorMode,
  VStack,
} from "@chakra-ui/react";
import { useEffect } from "react";

const Home = ({ bg }) => {
  const { colorMode, toggleColorMode } = useColorMode();
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://widget.taggbox.com/embed-lite.min.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);
  return (
    <Box bg={bg}>
      <Box
        bgImage="url('/media/emmzo.jpg')"
        bgSize="cover"
        bgPos="center"
        position="relative"
        textAlign="center"
        py={{ base: "40", md: "60" }}
        px={6}
      >
        <Box position="absolute" inset={0} bg="blackAlpha.600" />
        <VStack position="relative" zIndex={1} spacing={6} color="white">
          <Heading fontSize={{ base: "2xl", md: "3xl" }}>
            Capture Your Special Moments
          </Heading>
          <Text fontSize="lg">
            Professional photography and videography for all your events. We
            create memories that last a lifetime.
          </Text>
          <Flex gap={4}>
            <Button
              colorScheme="gray"
              as="a"
              href="/views/customer/authentication/login.html"
            >
              Book Now
            </Button>
            <Button
              colorScheme="gray"
              as="a"
              href="/views/customer/authentication/login.html"
            >
              Learn More
            </Button>
          </Flex>
        </VStack>
      </Box>

      <Box py={12} px={6} textAlign="center">
        <Heading fontSize="2xl" mb={8}>
          Our Services
        </Heading>
        <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={6}>
          {services.map((service) => (
            <Box
              key={service.title}
              bg={
                colorMode === "light"
                  ? "rgb(248,241,235)"
                  : "rgba(88,56,38,255)"
              }
              p={6}
              borderRadius="md"
              boxShadow="md"
              _hover={{ boxShadow: "lg" }}
            >
              <Box fontSize="4xl" mb={4}>
                {service.icon}
              </Box>
              <Heading fontSize="xl" mb={2}>
                {service.title}
              </Heading>
              <Text>{service.description}</Text>
            </Box>
          ))}
        </Grid>
      </Box>

      <Box py={12} px={6} textAlign="center">
        <Heading fontSize="2xl" mb={8}>
          Our Portfolio
        </Heading>
        <Box width="100%" height="100%">
          <div
            className="taggbox"
            style={{ width: "100%", height: "100%" }}
            data-widget-id="2153457"
            data-tags="false"
          ></div>
        </Box>
      </Box>

      <Box py={12} px={6} textAlign="center">
        <Heading fontSize="2xl" mb={6}>
          Client Testimonials
        </Heading>
        <VStack spacing={8}>
          {reviews.map((review, index) => (
            <Box key={index}>
              <Text fontStyle="italic" mb={4}>
                {review.text}
              </Text>
              <Text fontWeight="bold">- {review.author}</Text>
              <Text color="yellow.500">{review.stars}</Text>
            </Box>
          ))}
        </VStack>
      </Box>
    </Box>
  );
};

const services = [
  {
    icon: "📷",
    title: "Event Photography",
    description: "Capture the essence of your special day.",
  },
  {
    icon: "🎥",
    title: "Event Videography",
    description: "Create lasting memories with high-quality video production.",
  },
  {
    icon: "📦",
    title: "Photo & Video Packages",
    description: "Get the best of both worlds with our combined services.",
  },
];

const reviews = [
  {
    text: "EventCapture made our wedding day unforgettable. The photos and video are stunning!",
    author: "Emily R.",
    stars: "★★★★★",
  },
  {
    text: "Highly professional team with amazing results. They captured our corporate event perfectly.",
    author: "James T.",
    stars: "★★★★☆",
  },
  {
    text: "Loved the photoshoot session! Friendly team and great quality pictures.",
    author: "Sarah M.",
    stars: "★★★★★",
  },
];

export default Home;
