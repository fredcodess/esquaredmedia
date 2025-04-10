import React from "react";
import {
  Box,
  Container,
  Grid,
  Image,
  Text,
  useColorMode,
  VStack,
} from "@chakra-ui/react";
import { motion } from "framer-motion";

const MotionBox = motion(Box);
const MotionImage = motion(Image);

const Team = ({ bg }) => {
  const { colorMode } = useColorMode();

  return (
    <Box bg={bg} py={28}>
      <Container maxW="container.xl">
        <Grid
          templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }}
          gap={8}
          alignItems="stretch"
        >
          {/* Emmanuel Snr Section */}
          <MotionBox
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            whileHover={{ scale: 1.05, boxShadow: "xl" }}
            bg={colorMode === "light" ? "rgb(248,241,235)" : "gray.800"}
            p={6}
            rounded="2xl"
            boxShadow="lg"
            textAlign="center"
          >
            <MotionImage
              src="/media/emmSnr.png"
              alt="Emma Snr"
              w="100%"
              h="250px"
              objectFit="contain"
              rounded="lg"
              mb={4}
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
              sx={{
                border:
                  colorMode === "light"
                    ? "2px solid rgba(238,92,9,1)"
                    : "2px solid rgba(229, 231, 235, 1)",
              }}
            />
            <VStack spacing={4}>
              <Text
                fontSize="xl"
                fontWeight="bold"
                color={colorMode === "light" ? "gray.800" : "gray.200"}
              >
                Emmanuel Snr (Founder & Photographer)
              </Text>
              <Text
                fontSize="md"
                color={colorMode === "light" ? "gray.600" : "gray.300"}
              >
                Hi guys! Meet Emmanuel—our Photographer, Editor, and founder of
                ESQUAREDMEDIA! A true Jack of all Trades.
              </Text>
            </VStack>
          </MotionBox>

          {/* Hedna Section */}
          <MotionBox
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            whileHover={{ scale: 1.05, boxShadow: "xl" }}
            bg={colorMode === "light" ? "rgb(248,241,235)" : "gray.800"}
            p={6}
            rounded="2xl"
            boxShadow="lg"
            textAlign="center"
          >
            <MotionImage
              src="/media/hedna.png"
              alt="Hedna"
              w="100%"
              h="250px"
              objectFit="contain"
              rounded="lg"
              mb={4}
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
              sx={{
                border:
                  colorMode === "light"
                    ? "2px solid rgba(238,92,9,1)"
                    : "2px solid rgba(229, 231, 235, 1)",
              }}
            />
            <VStack spacing={4}>
              <Text
                fontSize="xl"
                fontWeight="bold"
                color={colorMode === "light" ? "gray.800" : "gray.200"}
              >
                Hedna (Social Media & Content Creator)
              </Text>
              <Text
                fontSize="md"
                color={colorMode === "light" ? "gray.600" : "gray.300"}
              >
                Meet Hedna—our head of social media and planning! She’s also
                specialized in photography & content creation.
              </Text>
            </VStack>
          </MotionBox>

          {/* Jojo Section */}
          <MotionBox
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
            whileHover={{ scale: 1.05, boxShadow: "xl" }}
            bg={colorMode === "light" ? "rgb(248,241,235)" : "gray.800"}
            p={6}
            rounded="2xl"
            boxShadow="lg"
            textAlign="center"
          >
            <MotionImage
              src="/media/emma.png"
              alt="Jojo"
              w="100%"
              h="250px"
              objectFit="contain"
              rounded="lg"
              mb={4}
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
              sx={{
                border:
                  colorMode === "light"
                    ? "2px solid rgba(238,92,9,1)"
                    : "2px solid rgba(229, 231, 235, 1)",
              }}
            />
            <VStack spacing={4}>
              <Text
                fontSize="xl"
                fontWeight="bold"
                color={colorMode === "light" ? "gray.800" : "gray.200"}
              >
                Emmanuel (Jojo) - Team Manager
              </Text>
              <Text
                fontSize="md"
                color={colorMode === "light" ? "gray.600" : "gray.300"}
              >
                Meet Emmanuel aka Jojo or Kojoskiii! Our Team Manager &
                specialist in photography, videography, and editing.
              </Text>
            </VStack>
          </MotionBox>
        </Grid>
      </Container>
    </Box>
  );
};

export default Team;
