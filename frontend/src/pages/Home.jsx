import {
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  Text,
  useColorMode,
  VStack,
  IconButton,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useUserStore } from "../store/useUserStore";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

const MotionBox = motion(Box);
const MotionButton = motion(Button);
const MotionHeading = motion(Heading);
const MotionText = motion(Text);

const Home = ({ bg }) => {
  const { visitorCount, fetchVisitorCount } = useUserStore();
  const { colorMode, toggleColorMode } = useColorMode();
  const scrollRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    fetchVisitorCount();

    const script = document.createElement("script");
    script.src = "https://widget.taggbox.com/embed-lite.min.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [fetchVisitorCount]);

  const scroll = (direction) => {
    const container = scrollRef.current;
    const scrollAmount = container.offsetWidth * 0.8;
    if (direction === "left") {
      container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    } else {
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <MotionBox
      bg={bg}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Hero Section*/}
      <MotionBox
        bgImage="url('/media/emmzo.jpg')"
        bgSize="cover"
        bgPos="center"
        position="relative"
        textAlign="center"
        py={{ base: "40", md: "60" }}
        px={6}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <Box position="absolute" inset={0} bg="blackAlpha.600" />
        <VStack position="relative" zIndex={1} spacing={6} color="white">
          <MotionHeading
            fontSize={{ base: "2xl", md: "3xl" }}
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Capture Your Special Moments
          </MotionHeading>
          <MotionText
            fontSize="lg"
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Professional photography and videography for all your events. We
            create memories that last a lifetime.
          </MotionText>
          <Flex gap={4}>
            <MotionButton
              colorScheme="gray"
              as="a"
              href="/views/customer/authentication/login.html"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              Book Now
            </MotionButton>
            <MotionButton
              colorScheme="gray"
              as="a"
              href="/team"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              Learn More
            </MotionButton>
          </Flex>
        </VStack>
      </MotionBox>

      {/* Services Section */}
      <MotionBox
        py={12}
        px={6}
        textAlign="center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <Heading fontSize="2xl" mb={8}>
          Our Services
        </Heading>
        <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={6}>
          {services.map((service) => (
            <MotionBox
              key={service.title}
              bg={colorMode === "light" ? "rgb(248,241,235)" : "gray.800"}
              p={6}
              borderRadius="md"
              boxShadow="md"
              whileHover={{ scale: 1.05, boxShadow: "xl" }}
              transition={{ duration: 0.3 }}
            >
              <Box fontSize="4xl" mb={4}>
                {service.icon}
              </Box>
              <Heading fontSize="xl" mb={2}>
                {service.title}
              </Heading>
              <Text>{service.description}</Text>
            </MotionBox>
          ))}
        </Grid>
      </MotionBox>

      {/* Portfolio Section */}
      <MotionBox
        py={12}
        px={6}
        textAlign="center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <Heading fontSize="2xl" mb={2}>
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
      </MotionBox>

      {/* Testimonials Section */}
      <MotionBox
        py={12}
        px={24}
        textAlign="center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <Heading fontSize="2xl" mb={8}>
          Client Testimonials
        </Heading>
        <Flex align="center" position="relative">
          <IconButton
            icon={<ChevronLeftIcon />}
            onClick={() => scroll("left")}
            aria-label="Scroll left"
            position="absolute"
            left={{ base: "-2", md: "-12" }}
            zIndex={2}
            colorScheme="gray"
            borderRadius="full"
            size="lg"
            whileHover={{ scale: 1.1 }}
          />
          <Box
            ref={scrollRef}
            overflowX="scroll"
            css={{
              "&::-webkit-scrollbar": { display: "none" },
              "-ms-overflow-style": "none",
              "scrollbar-width": "none",
            }}
            width="100%"
          >
            <Flex gap={6} px={{ base: 4, md: 12 }} minWidth="max-content">
              {reviews.map((review, index) => (
                <MotionBox
                  key={index}
                  minW={{ base: "300px", md: "350px" }}
                  bg={colorMode === "light" ? "rgb(248,241,235)" : "gray.800"}
                  p={6}
                  borderRadius="lg"
                  border="1px"
                  borderColor={colorMode === "light" ? "gray.200" : "gray.700"}
                  boxShadow="md"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Text fontStyle="italic" mb={4} fontSize="md">
                    "{review.text}"
                  </Text>
                  <Text fontWeight="bold" fontSize="sm">
                    - {review.author}
                  </Text>
                  <Text color="yellow.500" mt={2}>
                    {review.stars}
                  </Text>
                </MotionBox>
              ))}
            </Flex>
          </Box>
          <IconButton
            icon={<ChevronRightIcon />}
            onClick={() => scroll("right")}
            aria-label="Scroll right"
            position="absolute"
            right={{ base: "-2", md: "-12" }}
            zIndex={2}
            colorScheme="gray"
            borderRadius="full"
            size="lg"
            whileHover={{ scale: 1.1 }}
          />
        </Flex>
      </MotionBox>
    </MotionBox>
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
  {
    text: "The best photography service I've ever used. Exceeded all expectations!",
    author: "Michael K.",
    stars: "★★★★★",
  },
  {
    text: "Captured our family reunion beautifully. The attention to detail was impressive.",
    author: "Lisa P.",
    stars: "★★★★☆",
  },
  {
    text: "Professional, punctual, and incredibly talented. Highly recommend!",
    author: "David W.",
    stars: "★★★★★",
  },
];

export default Home;
